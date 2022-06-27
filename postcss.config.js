module.exports = {
  plugins: [
    "postcss-flexbugs-fixes",
    [
      "postcss-preset-env",
      {
        autoprefixer: {
          flexbox: "no-2009",
        },
        stage: 2,
        features: {
          "nesting-rules": true,
          "color-functional-notation": true,
          "custom-properties": {
            importFrom: "./src/styles/vars.css",
            preserve: false,
          },
        },
      },
    ],
  ],
};
