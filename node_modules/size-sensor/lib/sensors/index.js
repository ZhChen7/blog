'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSensor = undefined;

var _object = require('./object');

// import { createSensor as createResizeObserverSensor } from './resizeObserver';

/**
 * 传感器使用策略
 */
var createSensorFunc = function createSensorFunc() {
  return _object.createSensor;
  // 部分浏览器 ResizeObserver 出现 crash
  // return typeof ResizeObserver !== 'undefined' ? createResizeObserverSensor : createObjectSensor;
}; /**
    * Created by hustcc on 18/7/5.
    * Contract: i@hust.cc
    */

var createSensor = exports.createSensor = createSensorFunc();