'use strict';


/* @todo refactor to use geometry as base */
/* @todo refactor validations to utilities */
/* @todo refactor types to utilities */


/* dependencies */
const { Schema } = require('mongoose');
const { isPoint } = require('geojson-validation');


/* constants */
const POINT = 'Point';
const SCHEMA_OPTIONS =
  ({ timestamps: false, _id: false, id: false, emitIndexErrors: true });


/**
 * @name isValidPoint
 * @description mongoose validator for geojson point
 * @param  {Mixed}   value geojson value to validate
 * @param  {Function} done  a callback to invoke on success or error
 * @return {Boolean} whether is valid geojson point
 * @since 0.1.0
 * @version 0.1.0
 */
exports.isPoint = function isValidPoint(value, done) {
  isPoint(value, function (isValid /*, messages*/ ) {
    done(isValid);
  });
};


/**
 * @name Point
 * @description GeoJSON Point Geometry. Point coordinates are in x, y 
 * order (longitude, latitude for geographic coordinates).
 * @type {Schema}
 * @since 0.1.0
 * @version 0.1.0
 * @example
 * {
 *   type: 'Point',
 *   coordinates: [100.0, 0.0]
 * }
 * 
 */
exports.Point = new Schema({
  /**
   * @name type
   * @description type of geojson geometry
   * @type {Object}
   * @since 0.1.0
   * @version 0.1.0
   * @example
   */
  type: {
    type: String,
    default: POINT,
    set: function () {
      return POINT;
    }
  },



  /**
   * @name coordinates
   * @description data pair for longitude and latitude. In format [ <x>, <y> ]
   *              or [ <longitude> , <latitude> ]
   * @see {@link https://docs.mongodb.com/manual/reference/geojson/#point}
   * @type {Object}
   * @since 0.1.0
   * @version 0.1.0
   * @example
   *   [-73.856077, 40.848447]
   */
  coordinates: {
    type: [Number],
    default: undefined
  }
}, SCHEMA_OPTIONS);