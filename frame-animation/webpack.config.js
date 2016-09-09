/**
 * Created by Administrator on 2016/8/21 0021.
 */
module.exports = {
    entry: {
        animation: './src/frame-animation.js'
    },
    output: {
        path: __dirname + '/bulid',
        filename: '[name].js',
        library: 'animation',
        libraryTarget: 'umd'
    }
};