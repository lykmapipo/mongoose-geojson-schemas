'use strict';


/* @todo refactor to use geometry as base */
/* @todo refactor validations to utilities */
/* @todo refactor types to utilities */


/* dependencies */
const { Schema } = require('mongoose');
const { TYPE_MULTIPOLYGON } = require('./geojson');


/* constants */
const SCHEMA_OPTIONS =
  ({ timestamps: false, _id: false, id: false, emitIndexErrors: true });


/**
 * @name MultiPolygon
 * @description GeoJSON MultiPolygon Geometry. 
 * Coordinates of a MultiPolygon are an array of Polygon coordinates.
 * @type {Schema}
 * @since 0.1.0
 * @version 0.1.0
 * @example
 * {
 *   type: 'MultiPolygon',
 *   coordinates: [
 *      [
 *          [ 
 *            [102.0, 2.0], 
 *            [103.0, 2.0], 
 *            [103.0, 3.0], 
 *            [102.0, 3.0], 
 *            [102.0, 2.0] 
 *          ]
 *      ],
 *      [
 *          [ 
 *            [100.0, 0.0], 
 *            [101.0, 0.0], 
 *            [101.0, 1.0], 
 *            [100.0, 1.0], 
 *            [100.0, 0.0]
 *          ],
 *          [ 
 *            [100.2, 0.2], 
 *            [100.8, 0.2], 
 *            [100.8, 0.8], 
 *            [100.2, 0.8], 
 *            [100.2, 0.2] 
 *          ]
 *      ]
 *    ]
 *  }
 * 
 */
exports.MultiPolygon = new Schema({
  /**
   * @name type
   * @description type of geojson geometry
   * @type {Object}
   * @since 0.1.0
   * @version 0.1.0
   */
  type: {
    type: String,
    default: TYPE_MULTIPOLYGON,
    set: function () {
      return TYPE_MULTIPOLYGON;
    }
  },



  /**
   * @name coordinates
   * @description array of data pairs for multipolygon. 
   * In format [ <x>, <y> ] or [ <longitude> , <latitude> ]
   * @see {@link https://docs.mongodb.com/manual/reference/geojson}
   * @see {@link https://docs.mongodb.com/manual/reference/geojson/#multipolygon}
   * @see {@link http://geojson.org/geojson-spec.html#multipolygon}
   * @type {Object}
   * @since 0.1.0
   * @version 0.1.0
   * @example
   * [
   *    [
   *        [ 
   *          [102.0, 2.0], 
   *          [103.0, 2.0], 
   *          [103.0, 3.0], 
   *          [102.0, 3.0], 
   *          [102.0, 2.0]
   *        ]
   *    ],
   *    [
   *        [ 
   *          [100.0, 0.0], 
   *          [101.0, 0.0], 
   *          [101.0, 1.0], 
   *          [100.0, 1.0], 
   *          [100.0, 0.0] 
   *        ],
   *        [ 
   *          [100.2, 0.2], 
   *          [100.8, 0.2], 
   *          [100.8, 0.8], 
   *          [100.2, 0.8], 
   *          [100.2, 0.2]
   *        ]
   *    ]
   * ]
   */
  coordinates: {
    type: Array,
    default: undefined
  }
}, SCHEMA_OPTIONS);