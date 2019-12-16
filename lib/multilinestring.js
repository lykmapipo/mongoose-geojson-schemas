'use strict';

/* @todo refactor to use geometry as base */
/* @todo refactor validations to utilities */
/* @todo refactor types to utilities */

/* dependencies */
const { Schema } = require('mongoose');
const { TYPE_MULTILINESTRING } = require('./geojson');


/* constants */
const SCHEMA_OPTIONS =
  ({ timestamps: false, _id: false, id: false, emitIndexErrors: true });


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
    default: TYPE_MULTILINESTRING,
    set: function () {
      return TYPE_MULTILINESTRING;
    }
  },



  /**
   * @name coordinates
   * @description array of data pairs for multilinestring. 
   * In format [ <x>, <y> ]or [ <longitude> , <latitude> ]
   * @see {@link https://docs.mongodb.com/manual/reference/geojson}
   * @see {@link https://docs.mongodb.com/manual/reference/geojson/#multilinestring}
   * @see {@link http://geojson.org/geojson-spec.html#multilinestring}
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
    type: Array,
    default: undefined
  }
}, SCHEMA_OPTIONS);