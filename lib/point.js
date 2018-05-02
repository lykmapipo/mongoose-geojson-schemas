'use strict';


/*** dependencies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


/*** local constants */
const GEO_POINT = 'Point';
const SCHEMA_OPTIONS =
  ({ timestamps: false, _id: false, id: false, emitIndexErrors: true });


/**
 * @name Point
 * @description GeoJSON Point Geometry
 * @type {Schema}
 * @since 0.1.0
 * @version 0.1.0
 * @see {@link http://geojson.org/geojson-spec.html#point}
 * @see {@link https://docs.mongodb.com/manual/reference/geojson/}
 * @see {@link http://geojson.org/}
 * @see {@link https://tools.ietf.org/html/rfc7946}
 * @see {@link https://docs.mongodb.com/manual/geospatial-queries/#geo-overview-location-data}
 * @see {@link https://gist.github.com/aheckmann/5241574}
 * @see {@link https://gist.github.com/eastenluis/d4564daf7312c657748fc6a3dc5fceec}
 * @example
 * { type: "Point", coordinates: [ 40, 5 ] }
 * 
 */
const Point = new Schema({
  /**
   * @name type
   * @description type of geojson geometry
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   * @example
   * Point
   */
  type: {
    type: String,
    trim: true,
    default: GEO_POINT,
    enum: [GEO_POINT]
  },



  /**
   * @name geometry
   * @description data pair for longitude and latitude. In format [ <x>, <y> ]
   *              or [ <longitude> , <latitude> ]
   * @see {@link https://docs.mongodb.com/manual/reference/geojson/#point}
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   * @example
   * [-73.856077, 40.848447]
   */
  coordinates: {
    type: [Number],
    default: undefined
  }
}, SCHEMA_OPTIONS);


/*** export geojson point schema*/
module.exports = Point;