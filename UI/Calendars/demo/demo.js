/**
 * Created by sexyi on 2016/8/31.
 */
var cal = document.getElementsByClassName('cal')[0];
var cal2 = document.getElementsByClassName('cal')[1];
var cal3 = document.getElementsByClassName('cal')[2];

//默认模式1，选择日期
var Calendars1 = new Calendars(cal);
Calendars1.defaultSet();

//默认模式2，选择时间段
var Calendars2 = new Calendars(cal2);
Calendars2.defaultSet(true);

//自定义选择、显示和回调函数测试
var Calendars3 = new Calendars(cal3);
Calendars3.defaultSet(true).setSelectType(function (target) {
    this.init();
    this.createCalDOM(target.innerHTML);
}).setShowTextHandler(function () {
    var showText = this.showText;
    showText.innerHTML = '选择了' + this.fullDate.getFullYear() + '-' + (this.fullDate.getMonth() + 1) + '-' + this.fullDate.getDate();
    showText.className = 'showText';
    this.calendarPage.style.display = 'none';
}).setSelectFn(function (target) {
    alert(target.innerHTML);
});

/*Calendars3.init().createCalDOM().createDefaultControler().setSelectType(function (target) {
    this.init();
    this.createCalDOM(target.innerHTML);
}).setShowTextHandler(function () {
    var showText = this.showText;
    showText.innerHTML = '选择了' + this.fullDate.getFullYear() + '-' + (this.fullDate.getMonth() + 1) + '-' + this.fullDate.getDate();
    showText.className = 'showText';
    this.calendarPage.style.display = 'none';
}).setSelectFn(function (target) {
    alert(target.innerHTML);
});*/




