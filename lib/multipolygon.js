'use strict';


/* dependencies */
const { Schema } = require('mongoose');
const { isMultiPolygon } = require('geojson-validation');


/* local constants */
const MULTIPOLYGON = 'MultiPolygon';
const SCHEMA_OPTIONS =
  ({ timestamps: false, _id: false, id: false, emitIndexErrors: true });


/**
 * @name isValidMultiPolygon
 * @description mongoose validator for geojson multipolygon
 * @param  {Mixed}   value geojson value to validate
 * @param  {Function} done  a callback to invoke on success or error
 * @return {Boolean} whether is valid geojson multipolygon
 * @since 0.1.0
 * @version 0.1.0
 */
exports.isMultiPolygon = function isValidMultiPolygon(value, done) {
  isMultiPolygon(value, function (isValid /*, messages*/ ) {
    done(isValid);
  });
};


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
    default: MULTIPOLYGON,
    set: function () {
      return MULTIPOLYGON;
    }
  },



  /**
   * @name coordinates
   * @description array of data pairs for multipolygon. 
   * In format [ <x>, <y> ] or [ <longitude> , <latitude> ]
   * @see {@link https://docs.mongodb.com/manual/reference/geojson/#point}
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
    type: [
      [
        [
          [Number]
        ]
      ]
    ],
    default: undefined
  }
}, SCHEMA_OPTIONS);