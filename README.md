# djantajs-compiler-core

[![Gitter][gitter-image]][gitter-url]
[![NPM version][npm-image]][npm-url]
[![Linux + OSX Build Status][ci-image]][ci-url]
[![Windows Build Status][appveyor-image]][appveyor-url]
[![Test Coverage][coverage-image]][coverage-url]
[![Follow @djantaio on Twitter][twitter-image]][twitter-url]

> djantaJS core annotation compiler bundle.

## Getting Started

The djantaJS core annotation compile provide the main entry point which'll be use all across you contribution to extract and compilet your bundle annotation


##Changelog
- v1.0.0 - Releasing the first initial version as `1.0.0` 

### Install

```shell
npm i djantajs-compiler-core --save-dev
```

Once the plugin has been installed, it may be able to require any of provided tools as follow:

```js
let {Compiler, Handler, Serializable, Annotation} = require('djantajs-compiler-core')
```

or as follow: 

```js
let compiler = require('djantajs-compiler-core')
```

## Usage

### How to implement your annotation
This component has provided the easiest way to implement your own annotation component. Therefore, you'll simply need to implelent the given interface 

```js
let { Annotation, Serializable } = require('djantajs-compiler-core');

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
  constructor (data, filePath){
    super(data, filePath)
  }
  
  get annotationName () {
    return 'MySerializableAnnotation';
  }
  
  set name (name) {
    this._name = name;
  }
  
  get name () {
    return this._name;
  }
  
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
Type: `String`
Default value: ``
required: `true`

A string value that will difine the logical annotation name.

#### options.punctuation
Type: `String`
Default value: `'.'`

A string value that is used to do something else with whatever else.

### Expected class static properties (Options)

#### targets
Type: `Array`
Default value: `[Annotation.DEFINITION, Annotation.CONSTRUCTOR, Annotation.PROPERTY, Annotation.METHOD]`
required: `true`

An array string value which'll be used to locate your annotation retention.

### Usage Examples

#### Default Options

Here's how developers can use your annotion contribution

```js
/**
 * @MySerializableAnnotation(name='MyFirstAnnotation')
 */
module.exports = class ImDeveloper {
   constructor () {}
}
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Therefore, please follow the nested instructions

* Fork repository
* Update source code
* Update README.md change log

## Versioning
This package will be maintained under the Semantic Versioning guidelines as much as possible. Releases will be numbered with the following format:

`<major>.<minor>.<patch>`

## Release History
_(Nothing yet)_

## License

[MIT](https://github.com/djanta/djantajs-compiler-core/blob/master/LICENSE)
