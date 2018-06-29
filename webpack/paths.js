const path = require('path');

const root = path.resolve(__dirname, '..');

function resolve(relative) {
  return path.resolve(root, relative)
}

const dist = resolve('dist');
const src = resolve('src');
const example = resolve('example');

module.exports = {
  root,
  dist,
  example,
  src
};