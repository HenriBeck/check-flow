#!/usr/bin/env node
"use strict";

var _yargs = _interopRequireDefault(require("yargs"));

var _runFlow = _interopRequireDefault(require("./run-flow"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var argv = _yargs.default.argv;
var ignoreFiles = argv.ignore ? argv.ignore.split(',') : ['node_modules/**/*'];
(0, _runFlow.default)(ignoreFiles);