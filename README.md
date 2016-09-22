# AnalyticsWebpackPlugin
Plugin using GA to Report Webpack Statistics

## Install
`npm install analytics-webpack-plugin --save-dev`

## Usage

**webpack.config.js**

```javascript
var AnalyticsWebpackPlugin = require('analytics-webpack-plugin');


module.exports = {
  plugins: [
    new AnalyticsWebpackPlugin({analyticsId: 'UA-XXXXXXXX-X'})
  ]
};
```

## Experimental
This is experimental

## Thanks
yeoman/insight

## License
MIT
