/* @todo refactor to use geometry as base */
/* @todo refactor validations to utilities */
/* @todo refactor types to utilities */

import { Schema } from 'mongoose';
import { SUB_SCHEMA_OPTIONS } from '@lykmapipo/mongoose-common';
import { TYPE_LINESTRING } from './geojson';

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
 */
const LineString = new Schema(
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
      default: TYPE_LINESTRING,
      set() {
        return TYPE_LINESTRING;
      },
    },

    /**
     * @name coordinates
     * @description array of data pairs for linestring. In format [ <x>, <y> ]
     *              or [ <longitude> , <latitude> ]
     * @see {@link https://docs.mongodb.com/manual/reference/geojson}
     * @see {@link https://docs.mongodb.com/manual/reference/geojson/#linestring}
     * @see {@link http://geojson.org/geojson-spec.html#linestring}
     * @type {object}
     * @since 0.1.0
     * @version 0.1.0
     * @example
     *   [
     *      [100.0, 0.0],
     *      [101.0, 1.0]
     *   ]
     */
    coordinates: {
      type: Array,
      default: undefined,
    },
  },
  SUB_SCHEMA_OPTIONS
);

export default LineString;
