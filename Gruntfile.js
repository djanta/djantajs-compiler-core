/*
 * grunt-djantajs-compiler-core
 * https://github.com/djanta/djantajs-compiler-core
 *
 * Copyright (c) 2017 team.infinite@djanta.io
 * Licensed under the MIT license.
 */

'use strict';

/* eslint no-sync:0 */

let fs = require('fs');
let path = require('path');

module.exports = (grunt) => {
  grunt.loadNpmTasks('grunt-bump');

  grunt.initConfig({
    bump: {
      options: {
        files: ['package.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'upstream',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
        globalReplace: false,
        prereleaseName: false,
        metadata: '',
        regExp: false
      }
    },
  });
};
