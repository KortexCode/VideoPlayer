const path = require("path"); //nos permite saber donde está ubicado este proyecto
//Si está en un servidor o computadora local
//PLUGINS
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.ts", //punto de entrada del proyecto
  output: {
    //punto de salida del proyecto optimizado y terminado
    path: path.resolve(__dirname, "dist"),
    filename: "main.js", //nombre del archivo optimizado(el index.js)
    publicPath: "./",
  },
  mode: "development",
  devtool: "source-map",
  resolve: {
    //Con que extensiones va a trabajar webpack
    extensions: [".js", ".ts"],
    /*  alias: {
            '@': path.resolve(__dirname, 'src/'),
        } */
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
        },
      },
      {
        test: /\.(css|scss)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif|mp4)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      inject: true,
      template: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    historyApiFallback: true, //para tener un historial
    port: 9000, //configura el puerto
    open: true,
  },
};
