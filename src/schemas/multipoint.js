/* @todo refactor to use geometry as base */
/* @todo refactor validations to utilities */
/* @todo refactor types to utilities */

import { Schema } from 'mongoose';
import { SUB_SCHEMA_OPTIONS } from '@lykmapipo/mongoose-common';
import { TYPE_MULTIPOINT } from './geojson';

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
 */
const MultiPoint = new Schema(
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
      default: TYPE_MULTIPOINT,
      set() {
        return TYPE_MULTIPOINT;
      },
    },

    /**
     * @name coordinates
     * @description array of data pairs for multipoint. In format [ <x>, <y> ]
     *              or [ <longitude> , <latitude> ]
     * @see {@link https://docs.mongodb.com/manual/reference/geojson}
     * @see {@link https://docs.mongodb.com/manual/reference/geojson/#multipoint}
     * @see {@link http://geojson.org/geojson-spec.html#multipoint}
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

export default MultiPoint;
