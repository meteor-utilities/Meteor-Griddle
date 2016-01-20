Package.describe({
  name: "utilities:meteor-griddle",
  summary: "A smart Meteor wrapper for the Griddle React component",
  version: "0.1.0",
  git: "https://github.com/meteor-utilities/meteor-griddle.git"
});

Npm.depends({
  "griddle-react": "0.3.1",
  "externalify": "0.1.0"
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.0");
  
  api.use([
    'cosmos:browserify@0.9.3',
    'tmeasday:publish-counts@0.7.3'
  ]);
  
  api.addFiles([
    'package.browserify.js'
  ], ['client', 'server']);

  api.addAssets([
    'package.browserify.options.json'
  ], ['server']);

  api.addFiles([
    'MeteorGriddle.jsx'
  ], 'client');

  api.export([
    'MeteorGriddle'
  ]);

});
