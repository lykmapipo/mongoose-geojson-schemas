/* @todo refactor to use geometry as base */
/* @todo refactor validations to utilities */
/* @todo refactor types to utilities */

import { Schema } from 'mongoose';
import { SUB_SCHEMA_OPTIONS } from '@lykmapipo/mongoose-common';
import { TYPE_MULTIPOLYGON } from './geojson';

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
 */
const MultiPolygon = new Schema(
  {
    /**
     * @name type
     * @description type of geojson geometry
     * @type {object}
     * @since 0.1.0
     * @version 0.1.0
     */
    type: {
      type: String,
      default: TYPE_MULTIPOLYGON,
      set() {
        return TYPE_MULTIPOLYGON;
      },
    },

    /**
     * @name coordinates
     * @description array of data pairs for multipolygon.
     * In format [ <x>, <y> ] or [ <longitude> , <latitude> ]
     * @see {@link https://docs.mongodb.com/manual/reference/geojson}
     * @see {@link https://docs.mongodb.com/manual/reference/geojson/#multipolygon}
     * @see {@link http://geojson.org/geojson-spec.html#multipolygon}
     * @type {object}
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
      default: undefined,
    },
  },
  SUB_SCHEMA_OPTIONS
);

export default MultiPolygon;
