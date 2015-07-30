/**
 * Created by lihui on 14-7-30.
 */

module.exports = angular.module('filter', [])
  .filter('analysis', require('./analysis'));

