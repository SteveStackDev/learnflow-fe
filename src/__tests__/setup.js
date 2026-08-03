import React from "react";
import "@testing-library/jest-dom";

global.React = React;

global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};
