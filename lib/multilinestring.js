'use strict';

/* @todo refactor to use geometry as base */
/* @todo refactor validations to utilities */
/* @todo refactor types to utilities */

/* dependencies */
const { Schema } = require('mongoose');
const { isMultiLineString } = require('geojson-validation');


/* constants */
const MULTILINESTRING = 'MultiLineString';
const SCHEMA_OPTIONS =
  ({ timestamps: false, _id: false, id: false, emitIndexErrors: true });


/**
 * @name isValidMultiLineString
 * @description mongoose validator for geojson multilinestring
 * @param  {Mixed}   value geojson value to validate
 * @param  {Function} done  a callback to invoke on success or error
 * @return {Boolean} whether is valid geojson multilinestring
 
 * @since 0.1.0
 * @version 0.1.0
 */
exports.isMultiLineString = function isValidMultiLineString(value, done) {
  isMultiLineString(value, function (isValid /*, messages*/ ) {
    done(isValid);
  });
};


/**
 * @name MultiLineString
 * @description GeoJSON MultiLineString Geometry. 
 * Coordinates of a MultiLineString are an array of LineString coordinates.
 * @type {Schema}
 * @since 0.1.0
 * @version 0.1.0
 * @example
 * {
 *   type: 'MultiLineString',
 *   coordinates: [
 *        [ 
 *          [100.0, 0.0], 
 *          [101.0, 1.0] 
 *        ],
 *        [ 
 *          [102.0, 2.0], 
 *          [103.0, 3.0] 
 *        ]
 *      ]
 *  }
 * 
 */
exports.MultiLineString = new Schema({
  /**
   * @name type
   * @description type of geojson geometry
   * @type {Object}
   * @since 0.1.0
   * @version 0.1.0
   */
  type: {
    type: String,
    default: MULTILINESTRING,
    set: function () {
      return MULTILINESTRING;
    }
  },



  /**
   * @name coordinates
   * @description array of data pairs for multilinestring. 
   * In format [ <x>, <y> ]or [ <longitude> , <latitude> ]
   * @see {@link https://docs.mongodb.com/manual/reference/geojson/#point}
   * @type {Object}
   * @since 0.1.0
   * @version 0.1.0
   * @example
   *   [
   *      [ 
   *        [100.0, 0.0], 
   *        [101.0, 1.0] 
   *      ],
   *      [
   *        [102.0, 2.0], 
   *        [103.0, 3.0] 
   *      ]
   *   ]
   */
  coordinates: {
    type: [
      [
        [Number]
      ]
    ],
    default: undefined
  }
}, SCHEMA_OPTIONS);