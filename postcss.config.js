module.exports = {
  plugins: {
    "postcss-css-variables": {},
    "postcss-preset-env": {
      stage: 1,
      autoprefixer: { grid: true },
      browsers: [">1%", "not OperaMini all"]
    }
  }
};
