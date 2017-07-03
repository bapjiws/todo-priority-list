const express = require('express');
const path = require('path');

const app = express();

const inProductionMode = process.env.NODE_ENV === 'production';

if (!inProductionMode) {
    const webpackConfig = require('./webpack.config');
    const compiler = require('webpack')(webpackConfig);

    // Webpack Dev Middleware: https://github.com/webpack/webpack-dev-middleware
    const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
        noInfo: true, publicPath: webpackConfig.output.publicPath
    });
    // Webpack Hot Middleware: https://github.com/glenjamin/webpack-hot-middleware
    const webpackHotMiddleware = require('webpack-hot-middleware')(compiler);

    app.use(webpackDevMiddleware);
    app.use(webpackHotMiddleware);

    const bundlePath = path.join(__dirname, './build/index.html');
    app.get('/tasks', (req, res) =>  {
        res.write(webpackDevMiddleware.fileSystem.readFileSync(bundlePath));
        res.end();
    });

    app.get('*', (req, res) => {
        res.send('NOT HERE');
    });
} else {
    app.use(express.static(path.join(__dirname, 'build')));

    app.get('/tasks', (req, res) => {
        res.sendFile(path.join(__dirname, 'build/index.html'));
    });

    app.get('*', (req, res) => {
        res.send('NOT HERE');
    });
}

const port = process.env.PORT || 3000;
app.listen(port, () => inProductionMode ?
    console.log(`♫ In production mode. Listening on port ${port} ♫`) :
    console.log(`♫ In development mode. Listening on port ${port}  ♫`)
);