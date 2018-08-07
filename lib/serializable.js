'use strict';

let { Annotation } = require('conga-annotations');

/**
 * Serializeable interface.
 *
 * @abstract
 * @type {Serializable}
 */
module.exports = class Serializable extends Annotation {
  /**
   * Qualified default class constructor
   * @param {{}} data the annotation provided data
   * @param {string} filePath thhe given target script file.
   */
  constructor(data, filePath) {
    super(data, filePath)
  }

  /**
   * Gets the annotation annotation name name
   * @return {string} the valid annotation name
   */
  get annotationName() {
    throw new Error('This method must be implement with the last annotation class');
  }

  /**
   * Convert the current class instance onto json data format
   * @return {object} a valid class instance json instance
   */
  get serialize() {
    throw new Error('This method must be implement with the last annotation class');
  }
};
