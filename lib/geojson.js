'use strict';


/* dependencies */
const _ = require('lodash');
const async = require('async');
const turf = require('@turf/turf');
const env = require('@lykmapipo/env');
const { getNumbers } = env;
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
const GEOJSON_DEFAULT_BBOX = 'GEOJSON_DEFAULT_BBOX';


/* geojson geometry types */
exports.TYPE_POINT = 'Point';
exports.TYPE_LINESTRING = 'LineString';
exports.TYPE_POLYGON = 'Polygon';
exports.TYPE_MULTIPOINT = 'MultiPoint';
exports.TYPE_MULTILINESTRING = 'MultiLineString';
exports.TYPE_MULTIPOLYGON = 'MultiPolygon';
exports.TYPE_FEATURE = 'Feature';
exports.geometries = [
  exports.TYPE_POINT, exports.TYPE_LINESTRING,
  exports.TYPE_POLYGON, exports.TYPE_MULTIPOINT,
  exports.TYPE_MULTILINESTRING, exports.TYPE_MULTIPOLYGON
];


/* geojson validations */

/**
 * @name isValidPoint
 * @description mongoose validator for geojson point
 * @param {Mixed} value geojson value to validate
 * @param {Function} done  a callback to invoke on success or error
 * @return {Boolean} whether is valid geojson point
 * @since 0.1.0
 * @version 0.1.0
 */
exports.isPoint = function _isPoint(value, done) {
  isPoint(value, function (isValid /*, messages*/ ) {
    done(isValid);
  });
};


/**
 * @name isValidLineString
 * @description mongoose validator for geojson linestring
 * @param {Mixed} value geojson value to validate
 * @param {Function} done  a callback to invoke on success or error
 * @return {Boolean} whether is valid geojson linestring
 * @since 0.1.0
 * @version 0.1.0
 */
exports.isLineString = function _isLineString(value, done) {
  isLineString(value, function (isValid /*, messages*/ ) {
    done(isValid);
  });
};


/**
 * @name isValidPolygon
 * @description mongoose validator for geojson polygon
 * @param {Mixed} value geojson value to validate
 * @param {Function} done  a callback to invoke on success or error
 * @return {Boolean} whether is valid geojson polygon
 * @since 0.1.0
 * @version 0.1.0
 */
exports.isPolygon = function _isPolygon(value, done) {
  isPolygon(value, function (isValid /*, messages*/ ) {
    done(isValid);
  });
};


/**
 * @name isValidMultiPoint
 * @description mongoose validator for geojson multipoint
 * @param {Mixed} value geojson value to validate
 * @param {Function} done  a callback to invoke on success or error
 * @return {Boolean} whether is valid geojson multipoint
 * @since 0.1.0
 * @version 0.1.0
 */
exports.isMultiPoint = function _isMultiPoint(value, done) {
  isMultiPoint(value, function (isValid /*, messages*/ ) {
    done(isValid);
  });
};


/**
 * @name isValidMultiLineString
 * @description mongoose validator for geojson multilinestring
 * @param {Mixed} value geojson value to validate
 * @param {Function} done  a callback to invoke on success or error
 * @return {Boolean} whether is valid geojson multilinestring
 
 * @since 0.1.0
 * @version 0.1.0
 */
exports.isMultiLineString = function _isMultiLineString(value, done) {
  isMultiLineString(value, function (isValid /*, messages*/ ) {
    done(isValid);
  });
};


/**
 * @name isValidMultiPolygon
 * @description mongoose validator for geojson multipolygon
 * @param {Mixed} value geojson value to validate
 * @param {Function} done  a callback to invoke on success or error
 * @return {Boolean} whether is valid geojson multipolygon
 * @since 0.1.0
 * @version 0.1.0
 */
exports.isMultiPolygon = function _isMultiPolygon(value, done) {
  isMultiPolygon(value, function (isValid /*, messages*/ ) {
    done(isValid);
  });
};


/**
 * @name isValidGeometry
 * @description mongoose validator for geojson geometry
 * @param {Mixed} value geojson value to validate
 * @param {Function} done  a callback to invoke on success or error
 * @return {Boolean} whether is valid geojson geometry
 * @since 0.7.0
 * @version 0.1.0
 */
exports.isGeometry = function _isGeometry(value, done) {
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


/* geojson generators */


/**
 * @name centroidOf
 * @description calculates the centroid of a feature(s) using 
 * the mean of all vertices
 * @param {Object} geojson feature to be centered
 * @return {Object} an Object that can be used as centroid
 */
exports.centroidOf = function (geojson) {

  try {
    let centroid = turf.centroid(geojson);
    if (centroid && centroid.geometry) {
      centroid = centroid.geometry;
    }
    return centroid;
  } catch (error) {
    return undefined;
  }

};


/**
 * @name randomPoint
 * @description generate random geojson point(s)
 * @param {Number} [size=1] number of point to generate
 * @param {Number[]} [bbox=[-80, 30, -60, 60]] A bounding box inside of which 
 * geometries are placed
 * @return {Object|Object[]} random geojson point(s)
 */
exports.randomPoint = function (size = 1, bbox = [-80, 30, -60, 60]) {
  const _size = (size && size > 0 ? size : 1);

  let _bbox = getNumbers(GEOJSON_DEFAULT_BBOX);
  _bbox = !_.isEmpty(_bbox) ? [].concat(_bbox) : [].concat(bbox);

  const points = turf.randomPoint(_size, { bbox: _bbox });
  let sample = turf.sample(points, _size);
  sample = _.map(sample.features, 'geometry');
  sample = (sample.length > 1 ? sample : _.first(sample));
  return sample;
};


/**
 * @name randomMultiPoint
 * @description generate random geojson multi point(s)
 * @param {Number} [size=1] number of point to generate
 * @param {Number[]} [bbox=[-80, 30, -60, 60]] A bounding box inside of which 
 * geometries are placed
 * @return {Object|Object[]} random geojson point(s)
 */
exports.randomMultiPoint = function (size = 1, bbox = [-80, 30, -60, 60]) {
  const _size = (size && size > 0 ? size : 1);

  let _bbox = getNumbers(GEOJSON_DEFAULT_BBOX);
  _bbox = !_.isEmpty(_bbox) ? [].concat(_bbox) : [].concat(bbox);

  const points = turf.randomPoint(_size, { bbox: _bbox });
  const _points = turf.randomPoint(_size, { bbox: _bbox });
  let sample = turf.sample(points, _size);
  let _sample = turf.sample(_points, _size);
  sample = _.map(sample.features, 'geometry');
  _sample = _.map(_sample.features, 'geometry');
  sample = _.map(sample, function (value, index) {
    const next = _sample[index];
    return {
      type: exports.TYPE_MULTIPOINT,
      coordinates: [
        value.coordinates,
        next.coordinates
      ]
    };
  });
  sample = (sample.length > 1 ? sample : _.first(sample));
  return sample;
};


/**
 * @name randomLineString
 * @description generate random geojson linestring(s)
 * @param {Number} [size=1] number of linestrings to generate
 * @param {Number[]} [bbox=[-80, 30, -60, 60]] A bounding box inside of which 
 * geometries are placed
 * @return {Object|Object[]} random geojson linestring(s)
 */
exports.randomLineString = function (size = 1, bbox = [-80, 30, -60, 60]) {
  const _size = (size && size > 0 ? size : 1);

  let _bbox = getNumbers(GEOJSON_DEFAULT_BBOX);
  _bbox = !_.isEmpty(_bbox) ? [].concat(_bbox) : [].concat(bbox);

  const points = turf.randomLineString(_size, { bbox: _bbox });
  let sample = turf.sample(points, _size);
  sample = _.map(sample.features, 'geometry');
  sample = (sample.length > 1 ? sample : _.first(sample));
  return sample;
};


/**
 * @name randomMultiLineString
 * @description generate random geojson multilinestring(s)
 * @param {Number} [size=1] number of multilinestrings to generate
 * @param {Number[]} [bbox=[-80, 30, -60, 60]] A bounding box inside of which 
 * geometries are placed
 * @return {Object|Object[]} random geojson multilinestring(s)
 */
exports.randomMultiLineString = function (size = 1, bbox = [-80, 30, -60, 60]) {
  const _size = (size && size > 0 ? size : 1);

  let _bbox = getNumbers(GEOJSON_DEFAULT_BBOX);
  _bbox = !_.isEmpty(_bbox) ? [].concat(_bbox) : [].concat(bbox);

  const points = turf.randomLineString(_size, { bbox: _bbox });
  const _points = turf.randomLineString(_size, { bbox: _bbox });
  let sample = turf.sample(points, _size);
  let _sample = turf.sample(_points, _size);
  sample = _.map(sample.features, 'geometry');
  _sample = _.map(_sample.features, 'geometry');
  sample = _.map(sample, function (value, index) {
    const next = _sample[index];
    return {
      type: exports.TYPE_MULTILINESTRING,
      coordinates: [
        value.coordinates,
        next.coordinates
      ]
    };
  });
  sample = (sample.length > 1 ? sample : _.first(sample));
  return sample;
};


/**
 * @name randomPolygon
 * @description generate random geojson polygon(s)
 * @param {Number} [size=1] number of polygons to generate
 * @param {Number[]} [bbox=[-80, 30, -60, 60]] A bounding box inside of which 
 * geometries are placed
 * @return {Object|Object[]} random geojson polygon(s)
 */
exports.randomPolygon = function (size = 1, bbox = [-80, 30, -60, 60]) {
  const _size = (size && size > 0 ? size : 1);

  let _bbox = getNumbers(GEOJSON_DEFAULT_BBOX);
  _bbox = !_.isEmpty(_bbox) ? [].concat(_bbox) : [].concat(bbox);

  const points = turf.randomPolygon(_size, { bbox: _bbox });
  let sample = turf.sample(points, _size);
  sample = _.map(sample.features, 'geometry');
  sample = (sample.length > 1 ? sample : _.first(sample));
  return sample;
};


/**
 * @name randomMultiPolygon
 * @description generate random geojson multipolygon(s)
 * @param {Number} [size=1] number of multipolygons to generate
 * @param {Number[]} [bbox=[-80, 30, -60, 60]] A bounding box inside of which 
 * geometries are placed
 * @return {Object|Object[]} random geojson multipolygon(s)
 */
exports.randomMultiPolygon = function (size = 1, bbox = [-80, 30, -60, 60]) {
  const _size = (size && size > 0 ? size : 1);

  let _bbox = getNumbers(GEOJSON_DEFAULT_BBOX);
  _bbox = !_.isEmpty(_bbox) ? [].concat(_bbox) : [].concat(bbox);

  const points = turf.randomPolygon(_size, { bbox: _bbox });
  const _points = turf.randomPolygon(_size, { bbox: _bbox });
  let sample = turf.sample(points, _size);
  let _sample = turf.sample(_points, _size);
  sample = _.map(sample.features, 'geometry');
  _sample = _.map(_sample.features, 'geometry');
  sample = _.map(sample, function (value, index) {
    const next = _sample[index];
    return {
      type: exports.TYPE_MULTIPOLYGON,
      coordinates: [
        value.coordinates,
        next.coordinates
      ]
    };
  });
  sample = (sample.length > 1 ? sample : _.first(sample));
  return sample;
};