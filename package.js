Package.describe({
  name: 'utilities:meteor-griddle',
  summary: 'A smart Meteor wrapper for the Griddle React component',
  version: '1.2.1',
  git: 'https://github.com/meteor-utilities/meteor-griddle.git'
});

Package.onUse(function(api) {

  api.versionsFrom('METEOR@1.3');

  api.use([
    'tmeasday:publish-counts@0.7.3',
    'react-meteor-data@0.2.9',
    'jsx@0.2.4',
    'tmeasday:check-npm-versions@0.2.0',
    'underscore'
  ]);

  api.addFiles([
    'MeteorGriddle.jsx'
  ], 'client');

  api.export([
    'MeteorGriddle'
  ]);

});
