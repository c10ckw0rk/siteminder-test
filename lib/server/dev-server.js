const path = require('path');
const webpack = require('webpack');
const MFS = require('memory-fs');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const clientConfig = require('../../build/webpack.client.config');
const serverConfig = require('../../build/webpack.server.config');

module.exports = function setupDevServer(app, onUpdate) {
    // setup on the fly compilation + hot-reload

    const HotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin();
    const NoEmitOnErrorsPlugin = new webpack.NoEmitOnErrorsPlugin();

    clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app];
    clientConfig.plugins.push(HotModuleReplacementPlugin, NoEmitOnErrorsPlugin);

    const clientCompiler = webpack(clientConfig);

    app.use(webpackDevMiddleware(clientCompiler, {
        publicPath: clientConfig.output.publicPath,
        stats: {
            colors: true,
            chunks: false
        }
    }));

    app.use(webpackHotMiddleware(clientCompiler));

  // watch and update server renderer
    const serverCompiler = webpack(serverConfig);
    const mfs = new MFS();
    const outputPath = path.join(serverConfig.output.path, serverConfig.output.filename);
    serverCompiler.outputFileSystem = mfs;
    serverCompiler.watch({}, (err, stats) => {
        if (err) throw err;
        stats = stats.toJson();
        stats.errors.forEach(err => console.error(err));
        stats.warnings.forEach(err => console.warn(err));
        onUpdate(mfs.readFileSync(outputPath, 'utf-8'));
    });
};
