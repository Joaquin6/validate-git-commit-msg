#!/usr/bin/env node

var ghpages = require('gh-pages');
var path = require('path');

ghpages.publish(path.join(__dirname, 'docs'), {
  message: 'chore(docs): rebuild documentation'
}, function(err) {
  if (err) {
    throw err;
  }

  console.log('Documentation pushed to gh-pages');
});
