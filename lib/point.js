'use strict';


/*** dependencies */
const { Schema } = require('mongoose');
const { isPoint } = require('geojson-validation');


/*** local constants */
const GEO_POINT = 'Point';
const SCHEMA_OPTIONS =
  ({ timestamps: false, _id: false, id: false, emitIndexErrors: true });


/**
 * @name isValidPoint
 * @description mongoose validator for geojson point
 * @param  {Mixed}   value geojson value to validate
 * @param  {Function} done  a callback to invoke on success or error
 * @return {Boolean} whether is valid geojson point
 * @since 0.1.0
 * @version 0.1.0
 */
exports.isPoint = function isValidPoint(value, done) {
  console.log(value);
  isPoint(value, function (isValid /*, messages*/ ) {
    done(isValid);
  });
};


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
exports.Point = new Schema({
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
    default: GEO_POINT,
    set: function () {
      return GEO_POINT;
    }
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