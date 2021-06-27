#!/usr/bin/env node
const path = require('path');
const tsconfig = require(path.join(process.cwd(), 'tsconfig.node.json'));
// 注册ts register，用于处理require的ts文件
require('ts-node').register({
    ...tsconfig
});
// 执行cli入口文件
require('../src/index.ts');
