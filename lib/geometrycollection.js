'use strict';


/* dependencies */
const { Schema } = require('mongoose');
const { TYPE_GEOMETRYCOLLECTION } = require('./geojson');
const { Geometry } = require('./geometry');


/* constants */
const SCHEMA_OPTIONS =
  ({ timestamps: false, _id: false, id: false, emitIndexErrors: true });


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
 * 
 */
exports.GeometryCollection = new Schema({
  /**
   * @name type
   * @description type of geojson geometry
   * @type {Object}
   * @since 0.7.0
   * @version 0.1.0
   * @example
   */
  type: {
    type: String,
    default: TYPE_GEOMETRYCOLLECTION,
    set: function () {
      return TYPE_GEOMETRYCOLLECTION;
    }
  },



  /**
   * @name geometries
   * @description array of geojson geometry. In format Point, Polygon etc.
   * 
   * @see {@link https://docs.mongodb.com/manual/reference/geojson}
   * @see {@link https://docs.mongodb.com/manual/reference/geojson/#geometrycollection}
   * @see {@link http://geojson.org/geojson-spec.html#geometrycollection}
   * @type {Object}
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
    default: undefined
  }
}, SCHEMA_OPTIONS);