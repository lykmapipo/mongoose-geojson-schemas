/* @todo refactor to use geometry as base */
/* @todo refactor validations to utilities */
/* @todo refactor types to utilities */

import { Schema } from 'mongoose';
import { SUB_SCHEMA_OPTIONS } from '@lykmapipo/mongoose-common';
import { TYPE_MULTILINESTRING } from './geojson';

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
 */
const MultiLineString = new Schema(
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
      default: TYPE_MULTILINESTRING,
      set() {
        return TYPE_MULTILINESTRING;
      },
    },

    /**
     * @name coordinates
     * @description array of data pairs for multilinestring.
     * In format [ <x>, <y> ]or [ <longitude> , <latitude> ]
     * @see {@link https://docs.mongodb.com/manual/reference/geojson}
     * @see {@link https://docs.mongodb.com/manual/reference/geojson/#multilinestring}
     * @see {@link http://geojson.org/geojson-spec.html#multilinestring}
     * @type {object}
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
      default: undefined,
    },
  },
  SUB_SCHEMA_OPTIONS
);

export default MultiLineString;
