const path = require('path');
const nodemon = require('nodemon');
const createClearDirectory = require('./utils/create-clear-directory');
const logger = require('./utils/logger');

// Создаем или очищаем дирректорию с временными файлами для запуска сервера
createClearDirectory(path.resolve(process.cwd(), '.build'));

const Logger = logger({ name: 'live.js' });

nodemon({
  script: './scripts/dev.js',
  ext: 'js json',
  ignore: [
    'live.js',
    'utils/',
  ],
  watch: [
    'scripts/',
    'libs/',
  ],
  env: {
    NODE_ENV: 'development',
  },
  verbose: true,
});

nodemon
  .on('start', () => {
    Logger.info('App has started');
  })
  .on('quit', () => {
    Logger.info('App has quit');
    process.exit();
  })
  .on('restart', (files) => {
    // eslint-disable-next-line no-console
    console.log('\x1Bc');
    // eslint-disable-next-line no-console
    console.clear();
    Logger.info('App restarted due to: ', { lines: files });
  });
