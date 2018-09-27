'use strict';


/* @todo refactor to use geometry as base */
/* @todo refactor validations to utilities */
/* @todo refactor types to utilities */


/* dependencies */
const { Schema } = require('mongoose');
const { isMultiPoint } = require('geojson-validation');


/* constants */
const MULTIPOINT = 'MultiPoint';
const SCHEMA_OPTIONS =
  ({ timestamps: false, _id: false, id: false, emitIndexErrors: true });


/**
 * @name isValidMultiPoint
 * @description mongoose validator for geojson multipoint
 * @param  {Mixed}   value geojson value to validate
 * @param  {Function} done  a callback to invoke on success or error
 * @return {Boolean} whether is valid geojson multipoint
 * @since 0.1.0
 * @version 0.1.0
 */
exports.isMultiPoint = function isValidMultiPoint(value, done) {
  isMultiPoint(value, function (isValid /*, messages*/ ) {
    done(isValid);
  });
};


/**
 * @name MultiPoint
 * @description GeoJSON MultiPoint Geometry. 
 * Coordinates of MultiPoint are an array of Point coordinates.
 * @type {Schema}
 * @since 0.1.0
 * @version 0.1.0
 * @example
 * {
 *   type: 'MultiPoint',
 *   coordinates: [
 *       [100.0, 0.0],
 *       [101.0, 1.0]
 *     ]
 *  }
 * 
 */
exports.MultiPoint = new Schema({
  /**
   * @name type
   * @description type of geojson geometry
   * @type {Object}
   * @since 0.1.0
   * @version 0.1.0
   */
  type: {
    type: String,
    default: MULTIPOINT,
    set: function () {
      return MULTIPOINT;
    }
  },



  /**
   * @name coordinates
   * @description array of data pairs for multipoint. In format [ <x>, <y> ]
   *              or [ <longitude> , <latitude> ]
   * @see {@link https://docs.mongodb.com/manual/reference/geojson/#point}
   * @type {Object}
   * @since 0.1.0
   * @version 0.1.0
   * @example
   *   [
   *      [100.0, 0.0],
   *      [101.0, 1.0]
   *   ]
   */
  coordinates: {
    type: [
      [Number]
    ],
    default: undefined
  }
}, SCHEMA_OPTIONS);