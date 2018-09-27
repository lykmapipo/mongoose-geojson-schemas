'use strict';


/* dependencies */
const async = require('async');
const { Schema } = require('mongoose');
const {
  isGeometryObject,
  isPoint,
  isLineString,
  isPolygon,
  isMultiPoint,
  isMultiLineString,
  isMultiPolygon
} = require('geojson-validation');


/* constants */
const GEOMETRIES = [
  'LineString', 'MultiLineString',
  'MultiPoint', 'MultiPolygon',
  'Point', 'Polygon'
];
const SCHEMA_OPTIONS =
  ({ timestamps: false, _id: false, id: false, emitIndexErrors: true });


/**
 * @name isValidGeometry
 * @description mongoose validator for geojson geometry
 * @param {Mixed} value geojson value to validate
 * @param {Function} done  a callback to invoke on success or error
 * @return {Boolean} whether is valid geojson geometry
 * @since 0.7.0
 * @version 0.1.0
 */
exports.isGeometry = function isValidGeometry(value, done) {
  async.parallel({
    isGeometryObject: function (next) {
      isGeometryObject(value, function (isValid /*, messages*/ ) {
        next(null, isValid);
      });
    },
    isPoint: function (next) {
      isPoint(value, function (isValid /*, messages*/ ) {
        next(null, isValid);
      });
    },
    isLineString: function (next) {
      isLineString(value, function (isValid /*, messages*/ ) {
        next(null, isValid);
      });
    },
    isPolygon: function (next) {
      isPolygon(value, function (isValid /*, messages*/ ) {
        next(null, isValid);
      });
    },
    isMultiPoint: function (next) {
      isMultiPoint(value, function (isValid /*, messages*/ ) {
        next(null, isValid);
      });
    },
    isMultiLineString: function (next) {
      isMultiLineString(value, function (isValid /*, messages*/ ) {
        next(null, isValid);
      });
    },
    isMultiPolygon: function (next) {
      isMultiPolygon(value, function (isValid /*, messages*/ ) {
        next(null, isValid);
      });
    }
  }, function (error, results) {
    if (error) {
      return done(false);
    } else {
      const isValid = results.isGeometryObject && (
        results.isPoint ||
        results.isLineString ||
        results.isPolygon ||
        results.isMultiPoint ||
        results.isMultiLineString ||
        results.isMultiPolygon
      );
      return done(isValid);
    }
  });
};


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