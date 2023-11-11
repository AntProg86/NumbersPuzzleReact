const path = require('path');
const webpack = require('webpack');
const createClearDirectory = require('./utils/create-clear-directory');
const logger = require('./utils/logger');
const statsLogger = require('./utils/stats-logger');
const clientWebpackConfigFactory = require('./webpack/webpack.client.prd');

createClearDirectory(path.resolve(process.cwd(), 'build'));

const clientLogger = logger({ name: 'build.js' });

const clientWebpackConfig = clientWebpackConfigFactory();

const clientCompiler = webpack(clientWebpackConfig);

clientCompiler.run((err, stats) => {
  statsLogger(clientLogger, err, stats);
});
