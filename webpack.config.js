const path = require('path');
const glob = require('glob');
const srcDir = path.resolve('./src');
const srcHtml = path.resolve('./src/html');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const copyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: getEntries(),
    mode: "development",
    output: {
        filename: './js/[name].js',
        path: path.join(process.cwd(), 'dist'),
        publicPath: ''
    },
    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true,
        contentBase:  path.join(__dirname, "dist"),
        hot: true,
        progress:true,
        proxy: {
            '/ifinance': {
                target: 'http://10.3.150.59/ifinance/',
                changeOrigin: true,
                pathRewrite: {
                    '^/ifinance': ''
                },
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/, loader: "babel-loader" 
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: 'image/[name].[hash:7].[ext]'
                }
            },{
                test: /\.html$/,
                exclude: /html/,
                use: ['file-loader?name=[path][name].[ext]!extract-loader!html-loader' ]
            }
        ]
    },
    plugins: [/*new copyWebpackPlugin([
        {
            from: path.resolve(__dirname, './src/html'),
            to: './',
            ignore: ['.html']
        }
    ]),*/ ...htmlPluginArr(), new webpack.NamedModulesPlugin(),new webpack.HotModuleReplacementPlugin()
    ]
}

//获取html路径
function getEntries(){
    var entriies = glob.sync(path.resolve(__dirname, 'src/*.js'));

    let src = glob.sync(srcDir)[0];
    var map = {}
    entriies.forEach(function(entry){
        if(entry){
            var path = entry.replace(src+'/', './src/');
            var entryName = path.substring(6, path.length-3);
            map[entryName] = path
        }
    })
    return map;
}
//模板地址配置
function htmlPluginArr(){
    console.log(123)
    var arr = [];
    var entriies = glob.sync(path.resolve(__dirname, 'src/html/*.html'));
    var html = glob.sync(srcHtml)[0];
    entriies.forEach(function(entry){
        var path = entry.replace(html+'/', './src/html/');
        var fileName = entry.replace(html+'/', '/');
        var priviteChunkName = fileName.substring(1, fileName.length-5)
        arr.push(new HtmlWebpackPlugin({
            template: path,
            filename: './'+fileName,
            inject: 'body',
            minify: {
                removeComments: true,  //删除注释
            },
            chunks: [priviteChunkName]
        }))
    })
    return arr;
}