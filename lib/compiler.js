'use strict';

let _ = require('lodash');
let Promise = require('bluebird');
let glob = require ('glob');

let Path = require('path');
let fs = require("fs");
let util = require("util");

let { Registry } = require('conga-annotations');
let { Reader } = require('conga-annotations');

let DEFAULT_FILTER = '**/*.js';
let DEFAULT_EXCLUDES = [
  'node_modules/**/*',
  'Grunt*.js',
  'grunt-*/**',
  'test/**/*',
  'tests/**/*',
  'Gulp*.js',
  'gulp-*/**',
  'example*/**/*',
];

let noop = () => {};

// let _ROOT = Path.resolve(__dirname, '.');

module.exports = class Compiler {
  /**
   * Qualified default class constructor
   */
  constructor (options = {}) {
    this._registry = new Registry(); // new annotations.Registry();
    this._handlers = [];

    this.options = _.merge({
      log: noop,
      error: noop,
      debug: noop,
      warn: noop,
      marker: noop
    }, options);
  }

  /**
   * Set the user adaptable message logger
   * @param logger the end target message logger
   */
  set logger(logger) {
    this.options.log = logger;
  }

  get logger() {
    return this.options.log;
  }

  /**
   * Set the user adaptable error message logger
   * @param logger the end target error message logger
   */
  set error(logger) {
    this.options.error = logger;
  }

  get error() {
    return this.options.error;
  }

  /**
   * Set the user adaptable debug message logger
   * @param logger the end target debug message logger
   */
  set debug(logger) {
    this.options.debug = logger;
  }

  get debug() {
    return this.options.debug;
  }

  /**
   * Set the user adaptable debug message logger
   * @param logger the end target debug message logger
   */
  set warn(logger) {
    this.options.warn = logger;
  }

  get warn() {
    return this.options.warn;
  }

  /**
   * Set the user adaptable bold message logger
   * @param logger the end target bold message logger
   */
  set marker (logger) {
    this.options.marker = logger;
  }

  get marker () {
    return this.options.marker;
  }

  /**
   * Initialize the compiler internal state
   *
   * @param {object} options the annotation initialization source configuration
   * @return {Compiler} the compiler self instance.
   * @private
   */
  _init(options) {
    let self = this;

    (options || []).forEach(opt => {
      self.logger('Scanning: %s', opt.src);
      glob.sync(opt.pattern || DEFAULT_FILTER, {
        cwd : opt.src,
        ignore : opt.excludes || DEFAULT_EXCLUDES
      }).forEach(file => {
        let target = Path.resolve((opt.src), file);
        self.logger('Parsing: %s', file);
        self._registry.registerAnnotation(target.replace('.js', ''));
      });
    });

    return self;
  }

  /**
   * Parse and the inject the enpoint annotated component handle
   * @param {object} handlers the handlers source configuration
   * @return {Compiler} the compiler class itself implementation
   * @private
   */
  _configure(handlers) {
    let self = this;

    (handlers || []).forEach(handler => {
      if (_.isString(handler)) {
        self._handlers.push(require(handler))
      }
      else if (!_.isNil(handler)) {
        self._handlers.push(handler);
      }
    });

    return self;
  }

  /**
   * Internal method use to introspect all the annotated given projects
   * @param {object} project the introspection settings
   * @return {Array} a resolved or reject promise as the introspection result
   * @private
   */
  _introspect (project) {
    let self = this;
    let reader = new Reader(self._registry);
    let introspections = [];
    let cwd = (project.src);

    self.logger ('Project Home: %s', cwd);

    glob.sync(project.pattern || DEFAULT_FILTER, {
      cwd : cwd,
      ignore: project.excludes || DEFAULT_EXCLUDES
    }).forEach((elected) => {
      let parsable = Path.resolve(cwd, elected);
      self.logger ('Inspecting: %s', elected);
      try {
        // parse the annotations from a elected, default parse ES6 elected, Reader.ES5 to force ES5
        reader.parse(parsable /*, elected, annotations.Reader.ES6*/);

        introspections.push({
          src: elected,
          directory: cwd,
          project: {
            classes: reader.definitionAnnotations || [],
            constructors: reader.constructorAnnotations || [],
            properties: reader.propertyAnnotations || [],
            methods: reader.methodAnnotations || []
          }
        });
      }
      catch (err) {
        self.error(util.inspect(err));
      }
    });
    return introspections || {};
  }

  compile(options = {}, callback) {
    options.annotations = typeof options.annotations === 'string' ? [{
      src: options.annotations,
      excludes: DEFAULT_EXCLUDES,
      pattern: DEFAULT_FILTER
    }] : Array.isArray(options.annotations) ? options.annotations :
        !_.isNil(options.annotations) ? [options.annotations] : [];

    let resources = this._init(options.annotations)
      ._configure(_.flatten(options.handlers || []))
      ._introspect(options.project);

    let argv = {
      resources: resources,
      outputDirectory: options.project.outputDirectory || options.project.src,
      outputFile: options.project.file || undefined,
      indent: options.indent || 2
    };

    (this._handlers || []).forEach(handler => {
      if (_.isFunction(handler)) {
        handler(argv);
      }
      else if(!_.isNil(handler.handle)) {
        handler.handle(argv);
      }
    });

    return !_.isNil(callback) && _.isFunction(callback) ?
      Promise.resolve().asCallback(callback) : Promise.resolve();
  }
};
