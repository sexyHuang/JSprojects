/**
 * Created by sexyi on 2016/8/31.
 */

/**
 * 日历类
 * @param element 目标元素
 * @constructor
 */
function Calendars(element) {
    var that = this;
    //this.nowDate = new Date();
    this.ele = element;
    if (this.ele.getElementsByClassName('showText')) {
        this.showText = this.ele.getElementsByClassName('showText')[0];
    }
    this.calendarPage = document.createElement('div');
    this.calendarPage.className = 'calPage';
    this.fullDate = new Date();
    this.calendar = document.createElement('table');
    this.calendar.className = 'calendars';
    this.calendarPage.appendChild(this.calendar);
    this.ele.appendChild(this.calendarPage);
    this.selectFn;
    this.selectDates;
    this.start;
    this.end;
    this.showTextHandler;


    this.calendar.addEventListener('click', function (event) {
        //event.stopPropagation();
        var target = event.target,
            tClass = target.className,
            date;
        if (tClass.indexOf('Month') < 0) return;

        date = target.innerHTML;
        that.setDate(date);
        if (target.className.indexOf('perMonth') >= 0) {
            if (that.month == 0) {
                that.setMonth(11);
                that.setYear(that.year - 1);
            } else {
                that.setMonth(that.month - 1);
            }
        } else if (target.className.indexOf('nextMonth') >= 0) {
            if (that.month == 11) {
                that.setMonth(0);
                that.setYear(that.year + 1);
            } else {
                that.setMonth(that.month + 1);
            }
        }

        that.setDate(date);
        if (that.selectType) {
            that.selectType(target);
        }
        if(that.showTextHandler) {
            that.showTextHandler(target);
        }
        if (that.selectFn) {
            that.selectFn(target);
        }
        //console.log(that.fullDate.toDateString());
    });
    this.bindClick();
}

/**
 * 初始化
 */
Calendars.prototype.init = function () {
    var date = this.fullDate;
    this.year = date.getFullYear();
    this.month = date.getMonth();
    this.Date = date.getDate();
    this.Day = date.getDay();

    //console.log(this.fullDate.toDateString());

    //console.log(day_1 + ';' + dates);
    // this.createCalDOM();
    return this;
};

/**
 * 创建日历文件对象
 * @param firstDay  1号的星期
 * @param mDates    本月的日数
 */
Calendars.prototype.createCalDOM = function (date) {

    var day_1, dates, tClass = '',
        today = new Date(),
        selectDate = date ? date : -1,
        start = 0, end = 0,
        startmonth, endmonth,
        startyear, endyear;
    dates = monthDays(this.month, this.year);

    if (this.start && this.end) {
        startmonth = this.start.getMonth();
        endmonth = this.end.getMonth();
        startyear = this.start.getFullYear();
        endyear = this.end.getFullYear();
        if (startyear == this.year && endyear == this.year) {
            if (startmonth <= this.month && endmonth >= this.month) {
                start = this.start.getMonth() == this.month ? this.start.getDate() : 0;
                end = this.end.getMonth() == this.month ? this.end.getDate() : 32;
            }
        } else if (startyear < this.year && endyear > this.year) {
            start = 0;
            end = 32;
        } else if (startyear == this.year && endyear > this.year) {
            if (startmonth <= this.month) {
                start = this.start.getMonth() == this.month ? this.start.getDate() : 0;
                end = 32;
            }
        } else if (startyear < this.year && endyear == this.year) {
            if (endmonth >= this.month) {
                end = this.end.getMonth() == this.month ? this.end.getDate() : 32;
            }
        }

    }
    //console.log(this.start+';'+this.end);
    day_1 = this.Day - (this.Date % 7 - 1);
    if (day_1 < 0) {
        day_1 += 7;
    }

    var fDay = day_1,
        perMonthDates,
        perMonthDate,
        items = '<thead><tr>',
        i,
        count = 1,
        days = ['日', '一', '二', '三', '四', '五', '六'];
    for (i = 0; i < 7; i++) {
        items += '<th class="title">' + days[i] + '</th>';
    }
    items += '</tr></thead><tbody>';
    if (fDay != 0) {
        if (count % 7 == 0) {
            items += '<tr>'
        }
        if (this.month == 0) {
            perMonthDates = monthDays(11, this.year - 1);
        } else {
            perMonthDates = monthDays(this.month - 1, this.year);
        }
        for (i = 0; i < fDay; i++) {
            tClass = 'perMonth';
            count++;
            perMonthDate = perMonthDates - fDay + 1 + i;
            items += '<td class="' + tClass + '">' + perMonthDate + '</td>';
        }
    }
    for (i = 1; i <= dates; i++) {
        tClass = 'thisMonth';
        if (start == 0 && end == 0 && this.selectDates) {

            if (this.selectDates.getFullYear() == this.year && this.selectDates.getMonth() == this.month && i == this.selectDates.getDate()) {
                tClass = ' select';
            }
        }
        if (i == start || i == end) {
            tClass += ' select';
        }
        if (i > start && i < end) {
            tClass += ' pass'
        }
        if (this.year == today.getFullYear() && this.month == today.getMonth() && i == today.getDate()) {
            tClass += ' today';
        }
        if (i == selectDate) {
            tClass += ' select';
        }
        items += '<td class="' + tClass + '">' + i + '</td>';
        if (count % 7 == 0) {
            items += '</tr><tr>'
        }
        count++;
    }
    if ((fDay + dates) % 7 != 0) {
        var nextMonthDates = 6 - (fDay + dates) % 7;
        for (i = 0; i <= nextMonthDates; i++) {
            items += '<td class="nextMonth">' + (i + 1) + '</td>';
        }
    }
    items += '</tr></tbody>';
    this.calendar.innerHTML = items;
    return this;
};

/**
 * 年份设置接口
 * @param fullYear 完整年份
 */
Calendars.prototype.setYear = function (fullYear) {
    //this.fullDate.setDate(1);
    this.fullDate.setFullYear(fullYear);
    // console.log(this.fullDate.toDateString());
};

/**
 * 月份设置接口
 * @param month
 */
Calendars.prototype.setMonth = function (month) {
    var dates = monthDays(month, this.year);
    if (this.Date > dates) {
        this.fullDate.setDate(1);
    }
    this.fullDate.setMonth(month);
    //console.log(this.fullDate.toDateString());

};

/**
 * 日期设置接口
 * @param date
 */
Calendars.prototype.setDate = function (date) {
    this.fullDate.setDate(date);
    //console.log(this.fullDate.toDateString());

};


/**
 * 绑定显示控件的单击事件
 */
Calendars.prototype.bindClick = function () {
    var that = this;
    if (this.showText) {
        var showText = this.showText;

        this.calendarPage.style.display = 'none';
        this.calendarPage.style.position = 'absolute';
        showText.addEventListener('click', function (event) {
            //event.stopPropagation();
            if (showText.className.indexOf('focus') >= 0) {
                showText.className = 'showText';
                that.calendarPage.style.display = 'none';
            } else {
                showText.className += ' focus';
                that.calendarPage.style.display = 'block';

            }
        });

        //阻止日历控件的click事件继续向上冒泡
        this.ele.addEventListener('click', function (event) {
            event.stopPropagation();
        });


        document.body.addEventListener('click', function () {
            showText.className = 'showText';
            that.calendarPage.style.display = 'none';
        });

    }
};


/**
 * 创建默认控制器(class: controler)
 * Buttons:{
 *      到上一月按钮：{
 *          class:perMonthBtn,
 *      },
 *      到下一月按钮:{
 *          class: nextMonthBtn
 *      },
 *      返回今天按钮:{
 *          class: todayBtn
 *      }
 * }
 */
Calendars.prototype.createDefaultControler = function () {
    var that = this;
    var controler = document.createElement('div');
    controler.className = 'controler';
    var todayBtn = document.createElement('span');
    todayBtn.className = 'todayBtn';
    todayBtn.title = 'return to today';
    var yearText = document.createElement('span');
    yearText.className = 'year';
    var monthText = document.createElement('span');
    monthText.className = 'month';
    setDateDom(yearText, monthText);
    var perMonthBtn = document.createElement('i');
    perMonthBtn.className = 'perMonth';
    perMonthBtn.innerHTML = '&lt;';
    var nextMonthBtn = document.createElement('i');
    nextMonthBtn.className = 'nextMonth';
    nextMonthBtn.innerHTML = '&gt;';
    todayBtn.appendChild(yearText);
    todayBtn.appendChild(monthText);

    controler.appendChild(perMonthBtn);
    controler.appendChild(todayBtn);
    controler.appendChild(nextMonthBtn);

    this.calendarPage.insertBefore(controler, this.calendar);
    todayBtn.addEventListener('click', function (event) {
        // event.stopPropagation();
        that.fullDate = new Date();
        that.init();
        that.createCalDOM();

        setDateDom(yearText, monthText);
    });
    perMonthBtn.addEventListener('click', function (event) {
        //event.stopPropagation();
        var month = that.month;
        if (month == 0) {
            that.setYear(that.year - 1);
            that.setMonth(11);
        } else {
            that.setMonth(that.month - 1);
        }
        that.init();
        that.createCalDOM();
        setDateDom(yearText, monthText);
    });
    nextMonthBtn.addEventListener('click', function (event) {
        //event.stopPropagation();
        var month = that.month;
        if (month == 12) {
            that.setYear(that.year + 1);
            that.setMonth(0);
        } else {
            that.setMonth(that.month + 1);
        }
        that.init();
        that.createCalDOM();
        setDateDom(yearText, monthText);
    });
    this.calendar.addEventListener('click', function (event) {
        //event.stopPropagation();
        setDateDom(yearText, monthText);
    });
    function setDateDom(year, month) {
        year.innerHTML = that.year + '年';
        month.innerHTML = that.month + 1 + '月';
    }

    return this;
};


/**
 * 日历默认设置：
 *  有默认的日历控制台
 *  默认拥有两种选择行为
 *  当this.ele(父元素)下有class为'showText'的元素时，设置该元素内容的默认函数
 * @param flag 选择日期（false/null）或时间段（true）的标志
 * @returns {Calendars}
 */
Calendars.prototype.defaultSet = function (flag) {


    this.init().createCalDOM().createDefaultControler();

    if (flag) {
        this.selectType = function (target) {
            //var calendar = this.ele.getElementsByClassName('calendars')[0];

            if (this.selectDates) {
                //console.log(this.selectDates.getTime()==this.fullDate.getTime())
                if (this.selectDates.getTime() > this.fullDate.getTime()) {
                    this.start = new Date(this.fullDate.getTime());
                    this.end = this.selectDates;
                } else {
                    this.start = this.selectDates;
                    this.end = new Date(this.fullDate.getTime());
                }
                this.init();
                this.createCalDOM();
                this.selectDates = null;
            } else {
                this.start = null;
                this.end = null;
                this.selectDates = new Date(this.fullDate.getTime());
                this.init();
                this.createCalDOM(target.innerHTML);
            }
            //target.className += ' select';
        };

        if (this.showText) {
            this.showTextHandler = function (target) {
                var showText = this.showText;
                var min_dTime = 3 * 24 * 60 * 60 * 1000;
                if (this.start && this.end) {
                    if (this.end.getTime() - this.start.getTime() < min_dTime) {
                        this.selectDates = new Date(this.start.getTime());
                        this.fullDate = new Date(this.start.getTime());
                        this.start = null;
                        this.end = null;
                        this.init();
                        this.createCalDOM(this.selectDates.getDate());
                        alert('选择时段应大于3天！');
                    } else {
                        showText.innerHTML = '选择了' + this.start.getFullYear() + '-' + (this.start.getMonth() + 1) + '-' + this.start.getDate() + '~' +
                            this.end.getFullYear() + '-' + (this.end.getMonth() + 1) + '-' + this.end.getDate();
                        showText.className = 'showText';
                        this.calendarPage.style.display = 'none';
                    }
                    //console.log('During ' + this.start + ' to ' + this.end)
                }
            };
        }
    } else {
        this.selectType = function (target) {
            this.init();
            this.createCalDOM(target.innerHTML);
        };
        //this.setSelectDayFn();
        if (this.showText) {
            this.showTextHandler = function () {
                var showText = this.showText;
                showText.innerHTML = '选择了' + this.fullDate.getFullYear() + '-' + (this.fullDate.getMonth() + 1) + '-' + this.fullDate.getDate();
                showText.className = 'showText';
                this.calendarPage.style.display = 'none';
            };
        }
    }
    return this;
};

/**
 * 设置选择模式
 * @param fn 选择函数
 * @returns {Calendars}
 */
Calendars.prototype.setSelectType = function (fn) {
    this.selectType = fn;
    return this;
};

/**
 * 设置显示模式
 * @param fn 显示函数
 * @returns {Calendars}
 */
Calendars.prototype.setShowTextHandler = function (fn) {
    this.showTextHandler = fn;
    return this;
};

/**
 * 设置选择后的回调函数
 * @param fn 回调函数
 * @returns {Calendars}
 */
Calendars.prototype.setSelectFn = function (fn) {
    if (Object.prototype.toString.call(fn) !== '[object Function]') return;
    this.selectFn = fn;
    return this;
};


/**
 * 获取月份的日数
 * @param month
 * @param year
 * @returns {number} 日数
 */
function monthDays(month, year) {

    switch (month) {
        case 0:
        case 2:
        case 4:
        case 6:
        case 7:
        case 9:
        case 11:
            return 31;
        case 3:
        case 5:
        case 8:
        case 10:
            return 30;

        case 1:
            if (isleap(year)) {
                return 29;
            } else {
                return 28;
            }
            break;
    }
}

/**
 * 判断year是否为闰年
 * @param year
 * @returns {boolean}
 */
function isleap(year) {
    return year % 4 == 0 && year % 100 != 0 || year % 400 == 0;
}