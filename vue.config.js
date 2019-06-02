module.exports = {
  pwa: {
    workboxPluginMode: 'GenerateSW',
    workboxPluginOprions: {
      navigataFallback: '/index.html',
      runtimeCashing: [
        {
          urlPattern: new RegExp('^https://'),
          handler: 'networkFirst',
          options: {
            networkTimeoutSeconds: 20,
            cacheName: 'app-cache',
            cachableResponce: {
              statuses: [0, 200]
            }
          }
        }
      ]
    }
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        win: {
          icon: './assets/favSmall.ico'
        }
      }
    }
  }
};
