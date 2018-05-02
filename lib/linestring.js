'use strict';


/* dependencies */
const { Schema } = require('mongoose');
const { isLineString } = require('geojson-validation');


/* local constants */
const LINESTRING = 'LineString';
const SCHEMA_OPTIONS =
  ({ timestamps: false, _id: false, id: false, emitIndexErrors: true });


/**
 * @name isValidLineString
 * @description mongoose validator for geojson linestring
 * @param  {Mixed}   value geojson value to validate
 * @param  {Function} done  a callback to invoke on success or error
 * @return {Boolean} whether is valid geojson linestring
 * @since 0.1.0
 * @version 0.1.0
 */
exports.isLineString = function isValidLineString(value, done) {
  isLineString(value, function (isValid /*, messages*/ ) {
    done(isValid);
  });
};


/**
 * @name LineString
 * @description GeoJSON LineString Geometry. 
 * Coordinates of LineString are an array of Point coordinates.
 * @type {Schema}
 * @since 0.1.0
 * @version 0.1.0
 * @example
 * {
 *   type: 'LineString',
 *   coordinates: [
 *       [100.0, 0.0],
 *       [101.0, 1.0]
 *     ]
 *  }
 * 
 */
exports.LineString = new Schema({
  /**
   * @name type
   * @description type of geojson geometry
   * @type {Object}
   * @since 0.1.0
   * @version 0.1.0
   */
  type: {
    type: String,
    default: LINESTRING,
    set: function () {
      return LINESTRING;
    }
  },



  /**
   * @name coordinates
   * @description array of data pairs for linestring. In format [ <x>, <y> ]
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