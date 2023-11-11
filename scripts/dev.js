const path = require('path');
const config = require('config');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const logger = require('./utils/logger');
const clientWebpackConfigFactory = require('./webpack/webpack.client.dev');

const clientLogger = logger({ name: 'dev.js:client' });

const clientWebpackConfig = clientWebpackConfigFactory();
const clientCompiler = webpack(clientWebpackConfig);

const clientDevServer = new WebpackDevServer(clientCompiler, {
  static: [
    {
      directory: path.resolve(process.cwd(), '.build'),
    }
  ],
});

clientDevServer.listen(config.get('clientPort'), config.get('clientHost'), (error) => {
  if (error) {
    clientLogger.error(error);
  } else {
    clientLogger.info(`Client dev-server started "${config.get('clientHost')}:${config.get('clientPort')}"`);
  }
});