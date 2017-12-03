'use strict';

const { Annotation } = require('conga-annotations');

module.exports = {
  Compiler: require('./lib/compiler'),
  Handler: require('./lib/handler'),
  Serializable: require('./lib/routine'),
  Annotation: Annotation
};
