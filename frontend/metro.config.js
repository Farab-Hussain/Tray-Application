/* eslint-env node */
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');

const config = getDefaultConfig(__dirname);

module.exports = mergeConfig(config, {
  resolver: {
    blockList: exclusionList([
      /node_modules\/.*\/node_modules\/react-native\/.*/,
    ]),
  },
});
