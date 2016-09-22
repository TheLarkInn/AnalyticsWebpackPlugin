const Insight = require('insight');
const pkg = require('./package.json');


function AnalyticsWebpackPlugin (options) {
  this.analyticsId = options.analyticsId;
};

module.exports = AnalyticsWebpackPlugin;
AnalyticsWebpackPlugin.prototype.apply = function(compiler) {
  var insight = new Insight({
      // Google Analytics tracking code
      trackingCode: this.analyticsId,
      pkg: pkg
  });

  if (insight.optOut === undefined) {
    insight.askPermission();
  }

  compiler.plugin('run', function(comp, cb) {

    insight.track('plugin','compiler','run');
    //track loaders used
    comp.options.module.loaders.forEach((loaderObj) => {
      loaderObj.loaders.forEach((loaderString) => {
        insight.track('loader', loaderString);
      })
    });

    // debugger;
    cb();
  });

  compiler.plugin('watch-run', function(watching, cb) {
    insight.track('plugin','compiler','watch-run');
    cb();
  });

  compiler.plugin('normal-module-factory', function(nmf) {
    insight.track('plugin','compiler','normal-module-factory');

    nmf.plugin('before-resolve', function(data, cb) {
      insight.track('plugin','normal','module-factory:before-resolve');
      cb(null, data);
    });

    nmf.plugin('after-resolve', function(data, cb) {
      insight.track('plugin','normal','module-factory:after-resolve');
      cb(null, data);
    });
  });

  compiler.plugin('context-module-factory', function(cmf) {
    insight.track('plugin','compiler','context-module-factory');

    cmf.plugin('before-resolve', function(data, cb) {
      insight.track('plugin','context','module-factory:before-resolve');
      cb(null, data);
    });

    cmf.plugin('after-resolve', function(data, cb) {
      insight.track('plugin','context','module-factory:after-resolve');
      cb(null, data);
    });

    cmf.plugin('alternatives', function(options, cb) {
      insight.track('plugin','context','module-factory:alternatives');
      cb(null, options);
    });
  });

  compiler.plugin('compile', function(params) {
    insight.track('plugin','compiler','compile');
  });

  compiler.plugin('make', function(c, cb) {
    insight.track('plugin','compiler','make');
    cb();
  });

  compiler.plugin('after-compile', function(c, cb) {
    insight.track('plugin','compiler','after-compile');
    cb();
  });

  compiler.plugin('compilation', function(c, params) {
    insight.track('plugin','compiler','compilation');

    c.plugin('normal-module-loader', function(loaderContext, module) {
      insight.track('plugin','compilation','normal-module-loader');
    });

    c.plugin('seal', function() {
      insight.track('plugin','compilation','seal');
    });

    c.plugin('optimize', function() {
      insight.track('plugin','compilation','optimize');
    });

    c.plugin('optimize-tree', function(chunks, modules, cb) {
      insight.track('plugin','compilation','optimize-tree');
      cb();
    });

    c.plugin('optimize-modules', function(modules) {
      insight.track('plugin','compilation','optimize-modules');
    });

    c.plugin('after-optimize-modules', function(modules) {
      insight.track('plugin','compilation','after-optimize-modules');
    });

    c.plugin('optimize-module-order', function(modules) {
      insight.track('plugin','compilation','optimize-module-order');
    });

    c.plugin('optimize-module-ids', function(modules) {
      insight.track('plugin','compilation','optimize-module-ids');
    });

    c.plugin('after-optimize-module-ids', function(modules) {
      insight.track('plugin','compilation','after-optimize-module-ids');
    });

    c.plugin('record-modules', function(modules, records) {
      insight.track('plugin','compilation','record-modules');
    });

    c.plugin('revive-modules', function(modules, records) {
      insight.track('plugin','compilation','revive-modules');
    });

    c.plugin('optimize-chunks', function(chunks) {
      insight.track('plugin','compilation','optimize-chunks');
    });

    c.plugin('after-optimize-chunks', function(chunks) {
      insight.track('plugin','compilation','after-optimize-chunks');
    });

    c.plugin('optimize-chunk-order', function(chunks) {
      insight.track('plugin','compilation','optimize-chunk-order');
    });

    c.plugin('optimize-chunk-ids', function(chunks) {
      insight.track('plugin','compilation','optimize-chunk-ids');
    });

    c.plugin('after-optimize-chunk-ids', function(chunks) {
      insight.track('plugin','compilation','after-optimize-chunk-ids');
    });

    c.plugin('record-chunks', function(modules, records) {
      insight.track('plugin','compilation','record-chunks');
    });

    c.plugin('revive-chunks', function(chunks, records) {
      insight.track('plugin','compilation','revive-chunks');
    });

    c.plugin('before-hash', function() {
      insight.track('plugin','compilation','before-hash');
    });

    c.plugin('after-hash', function() {
      insight.track('plugin','compilation','after-hash');
    });

    c.plugin('before-chunk-assets', function() {
      insight.track('plugin','compilation','before-chunk-assets');
    });

    c.plugin('additional-chunk-assets', function(chunks) {
      insight.track('plugin','compilation','additional-chunk-assets');
    });

    c.plugin('optimize-chunk-assets', function(chunks, cb) {
      insight.track('plugin','compilation','optimize-chunk-assets');
      cb();
    });

    c.plugin('after-optimize-chunk-assets', function(chunks) {
      insight.track('plugin','compilation','after-optimize-chunk-assets');
    });

    c.plugin('record', function(compilation, records) {
      insight.track('plugin','compilation','record');
    });

    c.plugin('optimize-assets', function(assets, cb) {
      insight.track('plugin','compilation','optimize-assets');
      cb();
    });

    c.plugin('after-optimize-assets', function(assets) {
      insight.track('plugin','compilation','after-optimize-assets');
    });

    c.plugin('build-module', function(module) {
      insight.track('plugin','compilation','build-module');
    });

    c.plugin('succeed-module', function(module) {
      insight.track('plugin','compilation','succeed-module');
    });

    c.plugin('failed-module', function(module) {
      insight.track('plugin','compilation','failed-module');
    });

    c.plugin('module-asset', function(module, filename) {
      insight.track('plugin','compilation','module-asset');
    });

    c.plugin('chunk-asset', function(chunk, filename) {
      insight.track('plugin','compilation','chunk-asset');
    });

    c.mainTemplate.plugin('startup', function(source, module, hash) {
      insight.track('plugin','compilation','mainTemplate:startup');
      return source;
    });
  });

  compiler.plugin('emit', function(c, cb) {
    insight.track('plugin','compiler','emit');
    cb();
  });

  compiler.plugin('after-emit', function(c, cb) {
    insight.track('plugin','compiler','after-emit');
    cb();
  });

  compiler.plugin('done', function(stats) {
    insight.track('plugin','compiler','done');
    insight.trackEvent({
      category: 'pluginEvent',
      action: 'done',
      label: 'Plugin Event - Done',
      value: stats.toJson()
    })
  });

  compiler.plugin('failed', function(err) {
    insight.track('plugin','compiler','failed');
  });

  compiler.plugin('invalid', function(err) {
    insight.track('plugin','compiler','invalid');
  });

  compiler.plugin('after-plugins', function(comp) {
    insight.track('plugin','compiler','after-plugins');
  });

  compiler.plugin('after-resolvers', function(comp) {
    insight.track('plugin','compiler','after-resolvers');
  });

};