# djantajs-compiler-core

[![npm](https://img.shields.io/npm/v/@djanta/djantajs-compiler-core.svg?style=flat)](https://www.npmjs.com/package/@djanta/djantajs-compiler-core)
[![npm downloads](https://img.shields.io/npm/dw/djantajs-compiler-core.svg?style=flat)](https://www.npmjs.com/package/@djanta/djantajs-compiler-core)
[![Build Status](https://travis-ci.org/djanta/djantajs-compiler-core.svg?branch=master)](https://travis-ci.org/djanta/djantajs-compiler-core)
[![Coverage Status](https://coveralls.io/repos/github/djanta/djantajs-compiler-core/badge.svg?branch=master)](https://coveralls.io/github/djanta/djantajs-compiler-core?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/312ea725f33a184b0464/maintainability)](https://codeclimate.com/github/djanta/djantajs-compiler-core/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/312ea725f33a184b0464/test_coverage)](https://codeclimate.com/github/djanta/djantajs-compiler-core/test_coverage)
[![Known Vulnerabilities](https://snyk.io/test/github/djanta/djantajs-compiler-core/badge.svg)](https://snyk.io/test/github/djanta/djantajs-compiler-core)

> djantaJS initiative that help developer for auto generate the platform dependent .djanta-rc.json.

## Getting Started

The djantajs core annotation compile provide the main entry point which'll be use all across you contribution to extract and compilet your bundle annotation

### Install

```shell
npm i @djanta/djantajs-compiler-core --save[-S]
```

Once the plugin has been installed, it may be able to require any of provided tools as follow:

```js
let { Compiler, Handler, Serializable, Annotation } = require('@djanta/djantajs-compiler-core')
```

or as follow to import the module context: 

```js
let compiler = require('@djanta/djantajs-compiler-core')
```

## Usage

### How to implement a specific annotation
This component has provided the easiest way to implement your own annotation component. Therefore, you'll simply need to implelent the given interface 

```js
let { Annotation, Serializable } = require('@djanta/djantajs-compiler-core');
/**
 * Default class level documentation
 * @type MySerializableAnnotation
 */
module.exports = class MySerializableAnnotation extends Serializable {
  /**
   * The possible target retention
   *
   * (Annotation.DEFINITION, Annotation.CONSTRUCTOR, Annotation.PROPERTY, Annotation.METHOD)
   *
   * @type {Array}
   */
  static get targets () {
    return [Annotation.DEFINITION];
  }
    
  /**
   * The class default qualified contrustor.
   * @param {{}} data the annotation input data extracted from the target source
   * @param {string} filePath the source file where the annotation data has been extracted from
   */
  constructor (data, filePath) {
    super(data, filePath)
  }
  
  /**
   * This method is mandatory and must return the given annotation litteral name
   * @return {string} Returns the annotation name.
   */
  get annotationName () {
    return 'MySerializableAnnotation';
  }
  
  /**
   * User provided property with aim to set the <code>name</code> property throught the annotation
   * @param {string} name the given annotation name.
   */
  set name (name) {
    this._name = name;
  }
  
  /**
   * Returns the annotation <code>name</code> property set throught the annotation
   * @return {string} Returns the <code>name</code> property set via the annotation
   */
  get name () {
    return this._name;
  }
  
  /**
   * Mandatory rendered method which must return the annottion serialized context
   * @return {*} Returns the annotation serialized context.
   */
  get serialize () {
    let self = this;
    return {
      name: self.name,
      comment: 'Anything i want here or read from class property'
    };
  }
};
```

### Expected instance properties (Options)

#### options.annotationName
**Type:** `Property` <br/>
**Default value:** `` <br/>
**Required:** `true` <br/>

A string value that will difine the logical annotation name.

#### options.serialize
**Type:** `Property` <br/>
**Default value:** `` <br/>
**Required:** `true` <br/>

The serialize property not an instance **method** will be called at the rendering.


### Expected class static properties (Options)

#### targets
Type: `Array`<br/>
Default value: `[Annotation.DEFINITION, Annotation.CONSTRUCTOR, Annotation.PROPERTY, Annotation.METHOD]`<br/>
required: `true`<br/>

An array string value which'll be used to locate your annotation retention.

### Usage Examples

#### Implementation

Here's the usage of the _**MySerializableAnnotation**_

```js
/**
 * @MySerializableAnnotation(name='MyFirstAnnotation')
 */
module.exports = class ImDeveloper {
  /**
   * Qualified default class constructor
   * @Constructor
   */
   constructor () {}
}
```

#### Rendering result
```json
{
  "name": "MyFirstAnnotation",
  "comment": "Anything i want here or read from class property"
}
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Therefore, please follow the nested instructions

* Fork repository
* Update source code
* Update README.md and the changelog.md

## Versioning
This package will be maintained under the Semantic Versioning guidelines as much as possible. Releases will be numbered with the following format:

_`<major>.<minor>.<patch>`_

## License

[MIT](https://github.com/djanta/djantajs-compiler-core/blob/master/LICENSE)
