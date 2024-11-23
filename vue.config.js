const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
});

module.exports = {
  devServer: {
    host: "0.0.0.0",
    port: 3000,
  },

  transpileDependencies: [
    'vuetify'
  ]
};
