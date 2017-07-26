/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */
import { configure } from '@storybook/react';

// Stories loader
const req = require.context("../src", true, /.stories.[jt]sx?$/);
function loadStories() {
  req.keys().forEach(req);
}

// Initialize react-storybook
configure(loadStories, module);
