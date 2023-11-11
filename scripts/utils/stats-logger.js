module.exports = function statsLogger(logger, error, stats) {
    if (error) {
      // Something happend
    } else if (stats) {
      const statsJson = stats.toJson();
      const statsString = stats.toString({
        assets: true,
        colors: true,
        depth: false,
        entrypoints: false,
        modules: false,
      });
  
      if (stats.hasErrors()) {
        logger.error(`THERE ARE ${statsJson.errors.length} ERRORS:`, {
          stack: statsString,
        });
      }
  
      if (stats.hasWarnings()) {
        logger.warn(`THERE ARE ${statsJson.warnings.length} WARNINGS:`, {
          stack: statsString,
        });
      }
  
      if (!stats.hasErrors() && !stats.hasWarnings()) {
        logger.info('Compilation compile successfully:', {
          stack: statsString,
        });
      }
    }
  };
  