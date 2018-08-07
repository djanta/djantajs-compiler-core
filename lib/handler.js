'use strict';

let Serializable = require('./serializable');

module.exports = class Handler extends Serializable {
  /**
   * Qualified default class constructor
   */
  constructor () {
    super();
  }

  /**
   * Callback function that'll be use to handle each annotion configuration
   * @param {*} options the object to handle
   */
  handle(options) {
    throw new Error('the end developer must implement this method');
  }
};
