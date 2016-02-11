Package.describe({
  name: "utilities:meteor-griddle",
  summary: "A smart Meteor wrapper for the Griddle React component",
  version: "0.1.0",
  git: "https://github.com/meteor-utilities/meteor-griddle.git"
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.0");
  
  Npm.depends({
    "griddle-react": "0.3.1"
  });

  api.use([
    'tmeasday:publish-counts@0.7.3',
    'react-meteor-data',
    'jsx'
  ]);

  api.addFiles([
    'MeteorGriddle.jsx'
  ], 'client');

  api.export([
    'MeteorGriddle'
  ]);

});
