'use strict';

let { Annotation } = require('conga-annotations');

module.exports = {
  Compiler: require('./lib/compiler'),
  Handler: require('./lib/handler'),
  Serializable: require('./lib/serializable'),
  Annotation: Annotation
};
