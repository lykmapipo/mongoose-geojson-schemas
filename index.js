'use strict';


/**
 * @module mongoose-geojson-schemas
 * @description mongoose schema to support geojson fields
 * @see {@link https://tools.ietf.org/html/rfc7946}
 * @see {@link http://geojson.org/}
 * @see {@link http://geojson.org/geojson-spec.html}
 * @see {@link http://wiki.geojson.org/GeoJSON_draft_version_6}
 * @see {@link https://docs.mongodb.com/manual/reference/geojson/}
 * @see {@link https://docs.mongodb.com/manual/geospatial-queries/#geo-overview-location-data}
 * @see {@link https://gist.github.com/aheckmann/5241574}
 * @see {@link https://gist.github.com/eastenluis/d4564daf7312c657748fc6a3dc5fceec}
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */


/* dependencies */
const path = require('path');
const _ = require('lodash');
const turf = require('@turf/turf');


/* declarations */
const {
  Point,
  isPoint
} = require(path.join(__dirname, 'lib', 'point'));

const {
  LineString,
  isLineString
} = require(path.join(__dirname, 'lib', 'linestring'));

const {
  Polygon,
  isPolygon
} = require(path.join(__dirname, 'lib', 'polygon'));

const {
  MultiPoint,
  isMultiPoint
} = require(path.join(__dirname, 'lib', 'multipoint'));

const {
  MultiLineString,
  isMultiLineString
} = require(path.join(__dirname, 'lib', 'multilinestring'));

const {
  MultiPolygon,
  isMultiPolygon
} = require(path.join(__dirname, 'lib', 'multipolygon'));

const GEO_2DSPHERE = '2dsphere';


/* export geosphere index */
exports.GEO_2DSPHERE = GEO_2DSPHERE;


/* export geojson point */
exports.Point = {
  type: Point,
  index: GEO_2DSPHERE,
  default: undefined,
  validate: {
    isAsync: true,
    validator: isPoint,
    message: '{PATH} is not a valid GeoJSON Point'
  }
};


/* export geojson linestring */
exports.LineString = {
  type: LineString,
  index: GEO_2DSPHERE,
  default: undefined,
  validate: {
    isAsync: true,
    validator: isLineString,
    message: '{PATH} is not a valid GeoJSON LineString'
  }
};


/* export geojson polygon */
exports.Polygon = {
  type: Polygon,
  index: GEO_2DSPHERE,
  default: undefined,
  validate: {
    isAsync: true,
    validator: isPolygon,
    message: '{PATH} is not a valid GeoJSON Polygon'
  }
};


/* export geojson multipoint */
exports.MultiPoint = {
  type: MultiPoint,
  index: GEO_2DSPHERE,
  default: undefined,
  validate: {
    isAsync: true,
    validator: isMultiPoint,
    message: '{PATH} is not a valid GeoJSON MultiPoint'
  }
};


/* export geojson multilinestrin */
exports.MultiLineString = {
  type: MultiLineString,
  index: GEO_2DSPHERE,
  default: undefined,
  validate: {
    isAsync: true,
    validator: isMultiLineString,
    message: '{PATH} is not a valid GeoJSON MultiLineString'
  }
};


/* export geojson multipolygon */
exports.MultiPolygon = {
  type: MultiPolygon,
  index: GEO_2DSPHERE,
  default: undefined,
  validate: {
    isAsync: true,
    validator: isMultiPolygon,
    message: '{PATH} is not a valid GeoJSON MultiPolygon'
  }
};


/**
 * @name centroidOf
 * @description calculates the centroid of a feature(s) using 
 * the mean of all vertices
 * @param  {Object} geojson feature to be centered
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
 * @param  {Number} [size=1] number of point to generate
 * @return {Object|Object[]} random geojson point(s)
 */
exports.randomPoint = function (size) {
  size = (size && size > 0 ? size : 1);
  const points = turf.randomPoint(size, { bbox: [-80, 30, -60, 60] });
  let sample = turf.sample(points, size);
  sample = _.map(sample.features, 'geometry');
  sample = (sample.length > 1 ? sample : _.first(sample));
  return sample;
};


/**
 * @name randomMultiPoint
 * @description generate random geojson multi point(s)
 * @param  {Number} [size=1] number of point to generate
 * @return {Object|Object[]} random geojson point(s)
 */
exports.randomMultiPoint = function (size) {
  size = (size && size > 0 ? size : 1);
  const points = turf.randomPoint(size, { bbox: [-80, 30, -60, 60] });
  const _points = turf.randomPoint(size, { bbox: [-80, 30, -60, 60] });
  let sample = turf.sample(points, size);
  let _sample = turf.sample(_points, size);
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
 * @param  {Number} [size=1] number of linestrings to generate
 * @return {Object|Object[]} random geojson linestring(s)
 */
exports.randomLineString = function (size) {
  size = (size && size > 0 ? size : 1);
  const points = turf.randomLineString(size, { bbox: [-80, 30, -60, 60] });
  let sample = turf.sample(points, size);
  sample = _.map(sample.features, 'geometry');
  sample = (sample.length > 1 ? sample : _.first(sample));
  return sample;
};


/**
 * @name randomMultiLineString
 * @description generate random geojson multilinestring(s)
 * @param  {Number} [size=1] number of multilinestrings to generate
 * @return {Object|Object[]} random geojson multilinestring(s)
 */
exports.randomMultiLineString = function (size) {
  size = (size && size > 0 ? size : 1);
  const points = turf.randomLineString(size, { bbox: [-80, 30, -60, 60] });
  const _points = turf.randomLineString(size, { bbox: [-80, 30, -60, 60] });
  let sample = turf.sample(points, size);
  let _sample = turf.sample(_points, size);
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
 * @param  {Number} [size=1] number of polygons to generate
 * @return {Object|Object[]} random geojson polygon(s)
 */
exports.randomPolygon = function (size) {
  size = (size && size > 0 ? size : 1);
  const points = turf.randomPolygon(size, { bbox: [-80, 30, -60, 60] });
  let sample = turf.sample(points, size);
  sample = _.map(sample.features, 'geometry');
  sample = (sample.length > 1 ? sample : _.first(sample));
  return sample;
};


/**
 * @name randomMultiPolygon
 * @description generate random geojson multipolygon(s)
 * @param  {Number} [size=1] number of multipolygons to generate
 * @return {Object|Object[]} random geojson multipolygon(s)
 */
exports.randomMultiPolygon = function (size) {
  size = (size && size > 0 ? size : 1);
  const points = turf.randomPolygon(size, { bbox: [-80, 30, -60, 60] });
  const _points = turf.randomPolygon(size, { bbox: [-80, 30, -60, 60] });
  let sample = turf.sample(points, size);
  let _sample = turf.sample(_points, size);
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


/* export types */
exports.TYPE_LINESTRING = 'LineString';
exports.TYPE_MULTILINESTRING = 'MultiLineString';
exports.TYPE_MULTIPOINT = 'MultiPoint';
exports.TYPE_MULTIPOLYGON = 'MultiPolygon';
exports.TYPE_POINT = 'Point';
exports.TYPE_POLYGON = 'Polygon';