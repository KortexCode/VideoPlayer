const path = require("path"); //nos permite saber donde está ubicado este proyecto
//Si está en un servidor o computadora local
//PLUGINS
//Optimizar archivos al comprimirlos
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
//Minizar JS y Css
const TeserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: "./src/main.ts", //punto de entrada del proyecto
  output: {
    //punto de salida del proyecto optimizado y terminado
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js", //nombre del archivo optimizado(el index.js)
    publicPath: "./", //de manera manual esta es el "src" del js y css dentro del index.html
  },
  mode: "production",
  devtool: "source-map",
  resolve: {
    //Con que extensiones va a trabajar webpack
    extensions: [".js", ".ts"],
    /* alias: {
            '@': path.resolve(__dirname, 'src/'),
        } */
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
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
        test: /\.css$/,
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
      title: "Video Player",
      inject: true,
      template: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TeserPlugin(), new CssMinimizerPlugin()],
  },
};
