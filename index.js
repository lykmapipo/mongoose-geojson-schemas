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
const { Point, isPoint } = require(path.join(__dirname, 'lib', 'point'));
const GEOSPHERE_INDEX = '2dsphere';


/*** export geosphere index */
exports.GEOSPHERE_INDEX = GEOSPHERE_INDEX;


/*** export geojson point */
exports.Point = {
  type: Point,
  index: GEOSPHERE_INDEX,
  default: undefined,
  validate: {
    isAsync: true,
    validator: isPoint,
    message: '{PATH} is not a valid GeoJSON Point'
  }
};