'use strict';


/**
 * @module mongoose-locale-schema
 * @description mongoose schema to support geojson fields
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */


/*** dependencies */
const path = require('path');


/*** declarations */
const Point = require(path.join(__dirname, 'lib', 'point'));


/*** export geosphere index */
exports.GEOSPHERE_INDEX = '2dsphere';


/*** export geojson point */
exports.Point = {
  type: Point,
  index: exports.GEOSPHERE_INDEX,
  default: undefined
};