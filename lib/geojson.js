'use strict';


/* dependencies */
const _ = require('lodash');
const turf = require('@turf/turf');
const { getNumbers } = require('@lykmapipo/env');
const {
  GEO_POINT,
  GEO_LINESTRING,
  GEO_POLYGON,
  GEO_MULTIPOINT,
  GEO_MULTILINESTRING,
  GEO_MULTIPOLYGON,
  GEO_GEOMETRY_COLLECTION,
  GEO_FEATURE,
  isPoint,
  isMultiPoint,
  isLineString,
  isMultiLineString,
  isPolygon,
  isMultiPolygon,
  isGeometryCollection,
  isGeometry,
} = require('@lykmapipo/geo-tools');
const {
  isPosition,
  isPolygonCoor
} = require('geojson-validation');


/* constants */
const GEOJSON_DEFAULT_BBOX = 'GEOJSON_DEFAULT_BBOX';


/* geojson geometry types */
exports.TYPE_POINT = GEO_POINT;
exports.TYPE_LINESTRING = GEO_LINESTRING;
exports.TYPE_POLYGON = GEO_POLYGON;
exports.TYPE_MULTIPOINT = GEO_MULTIPOINT;
exports.TYPE_MULTILINESTRING = GEO_MULTILINESTRING;
exports.TYPE_MULTIPOLYGON = GEO_MULTIPOLYGON;
exports.TYPE_GEOMETRYCOLLECTION = GEO_GEOMETRY_COLLECTION;
exports.TYPE_FEATURE = GEO_FEATURE;
exports.geometries = [
  exports.TYPE_POINT, exports.TYPE_LINESTRING,
  exports.TYPE_POLYGON, exports.TYPE_MULTIPOINT,
  exports.TYPE_MULTILINESTRING, exports.TYPE_MULTIPOLYGON,
  exports.TYPE_GEOMETRYCOLLECTION
];


/* geojson validations */

/**
 * @name isPoint
 * @description mongoose validator for geojson point
 * @param {Mixed} value geojson value to validate
 * @param {Function} done  a callback to invoke on success or error
 * @return {Boolean} whether is valid geojson point
 * @since 0.1.0
 * @version 0.1.0
 */
exports.isPoint = value => isPoint(value);


/**
 * @name isLineString
 * @description mongoose validator for geojson linestring
 * @param {Mixed} value geojson value to validate
 * @param {Function} done  a callback to invoke on success or error
 * @return {Boolean} whether is valid geojson linestring
 * @since 0.1.0
 * @version 0.1.0
 */
exports.isLineString = value => isLineString(value);


/**
 * @name isPolygon
 * @description mongoose validator for geojson polygon
 * @param {Mixed} value geojson value to validate
 * @param {Function} done  a callback to invoke on success or error
 * @return {Boolean} whether is valid geojson polygon
 * @since 0.1.0
 * @version 0.1.0
 */
exports.isPolygon = value => isPolygon(value);


/**
 * @name isMultiPoint
 * @description mongoose validator for geojson multipoint
 * @param {Mixed} value geojson value to validate
 * @param {Function} done  a callback to invoke on success or error
 * @return {Boolean} whether is valid geojson multipoint
 * @since 0.1.0
 * @version 0.1.0
 */
exports.isMultiPoint = value => isMultiPoint(value);


/**
 * @name isMultiLineString
 * @description mongoose validator for geojson multilinestring
 * @param {Mixed} value geojson value to validate
 * @param {Function} done  a callback to invoke on success or error
 * @return {Boolean} whether is valid geojson multilinestring
 
 * @since 0.1.0
 * @version 0.1.0
 */
exports.isMultiLineString = value => isMultiLineString(value);


/**
 * @name isMultiPolygon
 * @description mongoose validator for geojson multipolygon
 * @param {Mixed} value geojson value to validate
 * @param {Function} done  a callback to invoke on success or error
 * @return {Boolean} whether is valid geojson multipolygon
 * @since 0.1.0
 * @version 0.1.0
 */
exports.isMultiPolygon = value => isMultiPolygon(value);


/**
 * @name isGeometryCollection
 * @description mongoose validator for geojson geometrycollection
 * @param {Mixed} value geojson value to validate
 * @param {Function} done  a callback to invoke on success or error
 * @return {Boolean} whether is valid geojson geometrycollection
 * @since 0.9.0
 * @version 0.1.0
 */
exports.isGeometryCollection = value => isGeometryCollection(value);


/**
 * @name isValidGeometry
 * @description mongoose validator for geojson geometry
 * @param {Mixed} value geojson value to validate
 * @param {Function} done  a callback to invoke on success or error
 * @return {Boolean} whether is valid geojson geometry
 * @since 0.7.0
 * @version 0.1.0
 */
exports.isGeometry = value => isGeometry(value);


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

  const linestring = turf.randomLineString(_size, { bbox: _bbox });
  let sample = turf.sample(linestring, _size);
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

  const linestrings = turf.randomLineString(_size, { bbox: _bbox });
  const _linestrings = turf.randomLineString(_size, { bbox: _bbox });
  let sample = turf.sample(linestrings, _size);
  let _sample = turf.sample(_linestrings, _size);
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

  const polygons = turf.randomPolygon(_size, { bbox: _bbox });
  let sample = turf.sample(polygons, _size);
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

  const polygons = turf.randomPolygon(_size, { bbox: _bbox });
  const _polygons = turf.randomPolygon(_size, { bbox: _bbox });
  let sample = turf.sample(polygons, _size);
  let _sample = turf.sample(_polygons, _size);
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



/**
 * @name randomGeometryCollection
 * @description generate random geojson geometrycollection(s)
 * @param {Number} [size=1] number of geometrycollections to generate
 * @param {Number[]} [bbox=[-80, 30, -60, 60]] A bounding box inside of which 
 * geometries are placed
 * @return {Object|Object[]} random geojson geometrycollection(s)
 */
exports.randomGeometryCollection = function (size = 1, bbox = [-80, 30, -60, 60]) {
  const _size = (size && size > 0 ? size : 1);

  const points = [].concat(exports.randomPoint(_size, bbox));
  const polygons = [].concat(exports.randomPolygon(_size, bbox));
  let sample = _.zipWith(points, polygons, function (point, polygon) {
    return {
      type: exports.TYPE_GEOMETRYCOLLECTION,
      geometries: [].concat([point, polygon])
    };
  });
  sample = (sample.length > 1 ? sample : _.first(sample));
  return sample;
};


/**
 * @name parseCoordinateString
 * @description create geojson geometry or coordinate array from string
 * @param {String} coords string to extract geojson geometry or coordinates
 * @param {String} [delimiter=','] long, lat seperator from string
 * @param {String} [separator=' '] long, lat pair seperator from string
 * @return {Geometry|Array} geojson geometry or coordinates
 */
exports.parseCoordinateString = function (coords = '', deliminator = ',',
  separator = ' ') {

  // prepare geometry
  try {
    let points;
    if (!_.isEmpty(coords)) {
      // parse coordinates
      const pairs = _.compact(_.split(coords, separator)); // [pair]
      points = _.map(pairs, function (pair) {
        return _.map(_.split(pair, deliminator), _.toNumber);
      }); // [[point]]

      // parse point
      if (_.size(points) === 1 && isPosition(_.first(points))) {
        const { geometry } = turf.point(_.first(points));
        return geometry;
      }

      // parse a polygon
      if (isPolygonCoor([points])) {
        const { geometry } = turf.polygon([points]);
        return geometry;
      }
    }
    //return coordinates
    return points;
  } catch (error) {
    return undefined;
  }
};


/**
 * @name toCoordinateString
 * @description convert geojson geometry coordinates string
 * @param {Geometry|Array} geometry valid geojson geometry or coordinates
 * @param {String} [delimiter=','] long, lat seperator from string
 * @param {String} [separator=' '] long, lat pair seperator from string
 * @return {String} string representation of geomentry coordinates
 */
exports.toCoordinateString = function (geometry, deliminator = ',',
  separator = ' ') {
  let coordinates = (geometry.coordinates || geometry);
  coordinates = _.chunk(_.flattenDeep(coordinates), 2);
  let coords = _.map(coordinates, function (point) {
    return point.join(deliminator);
  });
  coords = coords.join(separator);
  return coords;
};