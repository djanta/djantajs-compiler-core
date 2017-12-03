'use strict';

const { Annotation } = require('conga-annotations');

module.exports = class Serializable extends Annotation {

  constructor (data, filePath) {
    super(data, filePath)
  }

  /**
   * Gets the annotation annotation name name
   * @return {string} the valid annotation name
   */
  get annotationName() {
    throw new Error ('This method must be implement with the last annotation class');
  }

  /**
   * Convert the current class instance onto json data format
   * @return {object} a valid class instance json instance
   */
  get serialize() {
    throw new Error ('This method must be implement with the last annotation class');
  }
};
