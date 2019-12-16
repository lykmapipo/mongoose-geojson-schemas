'use strict';

/* @todo refactor to use geometry as base */
/* @todo refactor validations to utilities */
/* @todo refactor types to utilities */

/* dependencies */
const { Schema } = require('mongoose');
const { TYPE_POLYGON } = require('./geojson');


/* constants */
const SCHEMA_OPTIONS =
  ({ timestamps: false, _id: false, id: false, emitIndexErrors: true });


/**
 * @name Polygon
 * @description GeoJSON Polygon Geometry. 
 * Coordinates of a Polygon are an array of LinearRing coordinates 
 * (LineString coordinates where the first and last points are equivalent). 
 * The first element in the array represents the exterior ring. 
 * Any subsequent elements represent interior rings (or holes).
 * @type {Schema}
 * @since 0.1.0
 * @version 0.1.0
 * @example
 * {
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
exports.Polygon = new Schema({
  /**
   * @name type
   * @description type of geojson geometry
   * @type {Object}
   * @since 0.1.0
   * @version 0.1.0
   */
  type: {
    type: String,
    default: TYPE_POLYGON,
    set: function () {
      return TYPE_POLYGON;
    }
  },



  /**
   * @name coordinates
   * @description array of data pairs for polygon. In format [ <x>, <y> ]
   *              or [ <longitude> , <latitude> ]
   * @see {@link https://docs.mongodb.com/manual/reference/geojson}
   * @see {@link https://docs.mongodb.com/manual/reference/geojson/#polygon}
   * @see {@link http://geojson.org/geojson-spec.html#polygon}
   * @type {Object}
   * @since 0.1.0
   * @version 0.1.0
   * @example
   *   [
   *     [ 
   *       [100.0, 0.0], 
   *       [101.0, 0.0], 
   *       [101.0, 1.0], 
   *       [100.0, 1.0], 
   *       [100.0, 0.0] 
   *     ]
   *   ]
   */
  coordinates: {
    type: Array,
    default: undefined
  }
}, SCHEMA_OPTIONS);