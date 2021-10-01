import { Schema } from 'mongoose';
import { SUB_SCHEMA_OPTIONS } from '@lykmapipo/mongoose-common';
import { TYPE_GEOMETRYCOLLECTION } from './geojson';
import Geometry from './geometry';

/**
 * @name GeometryCollection
 * @description GeoJSON GeometryCollection.
 * @type {Schema}
 * @since 0.7.0
 * @version 0.1.0
 * @example
 * {
 *  type: 'GeometryCollection',
 *  geometries:[
 *   {
 *    type: 'Point',
 *    coordinates: [100.0, 0.0]
 *   },
 *   {
 *    type: 'Polygon',
 *    coordinates: [
 *       [
 *          [100.0, 0.0],
 *          [101.0, 0.0],
 *          [101.0, 1.0],
 *          [100.0, 1.0],
 *          [100.0, 0.0]
 *       ]
 *     ]
 *   }
 *  ]
 * }
 */
const GeometryCollection = new Schema(
  {
    /**
     * @name type
     * @description type of geojson geometry
     * @type {object}
     * @since 0.7.0
     * @version 0.1.0
     * @example
     */
    type: {
      type: String,
      default: TYPE_GEOMETRYCOLLECTION,
      set() {
        return TYPE_GEOMETRYCOLLECTION;
      },
    },

    /**
     * @name geometries
     * @description array of geojson geometry. In format Point, Polygon etc.
     * @see {@link https://docs.mongodb.com/manual/reference/geojson}
     * @see {@link https://docs.mongodb.com/manual/reference/geojson/#geometrycollection}
     * @see {@link http://geojson.org/geojson-spec.html#geometrycollection}
     * @type {object}
     * @since 0.7.0
     * @version 0.1.0
     * @example
     * {
     *  type: 'GeometryCollection',
     *  geometries:[
     *   {
     *    type: 'Point',
     *    coordinates: [100.0, 0.0]
     *   },
     *   {
     *    type: 'Polygon',
     *    coordinates: [
     *       [
     *          [100.0, 0.0],
     *          [101.0, 0.0],
     *          [101.0, 1.0],
     *          [100.0, 1.0],
     *          [100.0, 0.0]
     *       ]
     *     ]
     *   }
     *  ]
     * }
     */
    geometries: {
      type: [Geometry],
      default: undefined,
    },
  },
  SUB_SCHEMA_OPTIONS
);

export default GeometryCollection;
