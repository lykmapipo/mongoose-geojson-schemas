'use strict';


/* dependencies */
const { Schema } = require('mongoose');
const { GEOMETRIES } = require('./geojson');


/* constants */
const SCHEMA_OPTIONS =
  ({ timestamps: false, _id: false, id: false, emitIndexErrors: true });


/**
 * @name Geometry
 * @description GeoJSON Geometry.
 * @type {Schema}
 * @since 0.7.0
 * @version 0.1.0
 * @example
 * {
 *   type: 'Point',
 *   coordinates: [100.0, 0.0]
 * }
 *
 * or
 *
 *{
 *   type: 'Polygon',
 *   coordinates: [
 *       [ 
 *          [100.0, 0.0], 
 *          [101.0, 0.0], 
 *          [101.0, 1.0], 
 *          [100.0, 1.0], 
 *          [100.0, 0.0] 
 *       ]
 *     ]
 *  }
 * 
 */
exports.Geometry = new Schema({
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
    trim: true,
    enum: GEOMETRIES
  },



  /**
   * @name coordinates
   * @description data pair(s) for longitude and latitude. In format 
   * [ <x>, <y> ] or [ <longitude> , <latitude> ]. 
   *
   * Note: The structure for the elements in coordinates array is determined 
   * by the type of geometry.
   * 
   * @see {@link https://docs.mongodb.com/manual/reference/geojson/}
   * @see {@link http://geojson.org/geojson-spec.html#geometry-objects}
   * @type {Object}
   * @since 0.7.0
   * @version 0.1.0
   * @example
   * 
   * [-73.856077, 40.848447]
   *
   * or 
   * 
   * [
   *    [ 
   *       [100.0, 0.0], 
   *       [101.0, 0.0], 
   *       [101.0, 1.0], 
   *       [100.0, 1.0], 
   *       [100.0, 0.0] 
   *     ]
   *  ]
   * 
   */
  coordinates: {
    type: Array,
    default: undefined
  }
}, SCHEMA_OPTIONS);