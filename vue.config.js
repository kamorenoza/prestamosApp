const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  pwa: {
    manifestOptions: {
      name: 'Mis Préstamos',
      short_name: 'Mis Préstamos',
      start_url: './',
      display: 'standalone',
      theme_color: '#4564bf',
      icons: [
        {
          src: './img/icons/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: './img/icons/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },

    themeColor: '#4564bf',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'white',
    iconPaths: {
      maskicon: null,
      favicon32: './favicon32.png',
      favicon16: './favicon16.png',
      appleTouchIcon: null,
      msTileImage: null
    },
    workboxPluginMode: 'GenerateSW'
  }
});
