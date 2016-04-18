Package.describe({
  name: 'utilities:meteor-griddle',
  summary: 'A smart Meteor wrapper for the Griddle React component',
  version: '1.0.0',
  git: 'https://github.com/meteor-utilities/meteor-griddle.git'
});

Package.onUse(function(api) {

  api.versionsFrom('METEOR@1.3');

  api.use([
    'tmeasday:publish-counts@0.7.3',
    'react-meteor-data',
    'jsx',
    'tmeasday:check-npm-versions'
  ]);

  api.addFiles([
    'MeteorGriddle.jsx'
  ], 'client');

  api.export([
    'MeteorGriddle'
  ]);

});
