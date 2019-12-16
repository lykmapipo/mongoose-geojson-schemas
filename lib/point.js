'use strict';


/* @todo refactor to use geometry as base */
/* @todo refactor validations to utilities */
/* @todo refactor types to utilities */


/* dependencies */
const { Schema } = require('mongoose');
const { TYPE_POINT } = require('./geojson');


/* constants */
const SCHEMA_OPTIONS =
  ({ timestamps: false, _id: false, id: false, emitIndexErrors: true });


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
 * 
 */
exports.Point = new Schema({
  /**
   * @name type
   * @description type of geojson geometry
   * @type {Object}
   * @since 0.1.0
   * @version 0.1.0
   * @example
   */
  type: {
    type: String,
    default: TYPE_POINT,
    set: function () {
      return TYPE_POINT;
    }
  },



  /**
   * @name coordinates
   * @description data pair for longitude and latitude. In format [ <x>, <y> ]
   *              or [ <longitude> , <latitude> ]
   * @see {@link https://docs.mongodb.com/manual/reference/geojson}
   * @see {@link https://docs.mongodb.com/manual/reference/geojson/#point}
   * @see {@link http://geojson.org/geojson-spec.html#point}
   * @type {Object}
   * @since 0.1.0
   * @version 0.1.0
   * @example
   *   [-73.856077, 40.848447]
   */
  coordinates: {
    type: Array,
    default: undefined
  }
}, SCHEMA_OPTIONS);