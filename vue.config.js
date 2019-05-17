module.exports = {
  outputDir: '../backend/dist',
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        win: {
          icon: './src/assets/favSmall.ico'
        }
      }
    }
  }
};
