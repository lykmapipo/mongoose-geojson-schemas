/* @todo refactor to use geometry as base */
/* @todo refactor validations to utilities */
/* @todo refactor types to utilities */

import { Schema } from 'mongoose';
import { SUB_SCHEMA_OPTIONS } from '@lykmapipo/mongoose-common';
import { TYPE_POINT } from './geojson';

/**
 * @name Point
 * @description GeoJSON Point Geometry. Point coordinates are in x, y
 * order (longitude, latitude for geographic coordinates).
 * @type {Schema}
 * @since 0.1.0
 * @version 0.1.0
 * @example
 * {
 *   type: 'Point',
 *   coordinates: [100.0, 0.0]
 * }
 */
const Point = new Schema(
  {
    /**
     * @name type
     * @description type of geojson geometry
     * @type {object}
     * @since 0.1.0
     * @version 0.1.0
     * @example
     */
    type: {
      type: String,
      default: TYPE_POINT,
      set() {
        return TYPE_POINT;
      },
    },

    /**
     * @name coordinates
     * @description data pair for longitude and latitude. In format [ <x>, <y> ]
     *              or [ <longitude> , <latitude> ]
     * @see {@link https://docs.mongodb.com/manual/reference/geojson}
     * @see {@link https://docs.mongodb.com/manual/reference/geojson/#point}
     * @see {@link http://geojson.org/geojson-spec.html#point}
     * @type {object}
     * @since 0.1.0
     * @version 0.1.0
     * @example
     *   [-73.856077, 40.848447]
     */
    coordinates: {
      type: Array,
      default: undefined,
    },
  },
  SUB_SCHEMA_OPTIONS
);

export default Point;
