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
const _ = require('lodash');
const geojson = require('./lib/geojson');
const {
  isGeometry,
  isPoint,
  isLineString,
  isPolygon,
  isMultiPoint,
  isMultiLineString,
  isMultiPolygon,
  isGeometryCollection,
  randomPoint,
  randomLineString,
  randomPolygon,
  randomMultiPoint,
  randomMultiLineString,
  randomMultiPolygon,
  randomGeometry,
  randomGeometryCollection,
} = geojson;


/* merge geojson utils */
_.forEach(geojson, function (value, key) {
  exports[key] = value;
});


/* import geometries */
const { Geometry } = require('./lib/geometry');
const { Point } = require('./lib/point');
const { LineString } = require('./lib/linestring');
const { Polygon } = require('./lib/polygon');
const { MultiPoint } = require('./lib/multipoint');
const { MultiPolygon } = require('./lib/multipolygon');
const { MultiLineString } = require('./lib/multilinestring');
const { GeometryCollection } = require('./lib/geometrycollection');


/* constants */
const GEO_2DSPHERE = '2dsphere';


/* export geosphere index */
exports.GEO_2DSPHERE = GEO_2DSPHERE;


/* export geojson geometry */
exports.Geometry = {
  type: Geometry,
  index: GEO_2DSPHERE,
  default: undefined,
  validate: {
    validator: isGeometry,
    message: '{PATH} is not a valid GeoJSON Geometry'
  },
  fake: () => randomGeometry()
};


/* export geojson point */
exports.Point = {
  type: Point,
  index: GEO_2DSPHERE,
  default: undefined,
  validate: {
    validator: isPoint,
    message: '{PATH} is not a valid GeoJSON Point'
  },
  fake: () => randomPoint()
};


/* export geojson linestring */
exports.LineString = {
  type: LineString,
  index: GEO_2DSPHERE,
  default: undefined,
  validate: {
    validator: isLineString,
    message: '{PATH} is not a valid GeoJSON LineString'
  },
  fake: () => randomLineString()
};


/* export geojson polygon */
exports.Polygon = {
  type: Polygon,
  index: GEO_2DSPHERE,
  default: undefined,
  validate: {
    validator: isPolygon,
    message: '{PATH} is not a valid GeoJSON Polygon'
  },
  fake: () => randomPolygon()
};


/* export geojson multipoint */
exports.MultiPoint = {
  type: MultiPoint,
  index: GEO_2DSPHERE,
  default: undefined,
  validate: {
    validator: isMultiPoint,
    message: '{PATH} is not a valid GeoJSON MultiPoint'
  },
  fake: () => randomMultiPoint()
};


/* export geojson multilinestrin */
exports.MultiLineString = {
  type: MultiLineString,
  index: GEO_2DSPHERE,
  default: undefined,
  validate: {
    validator: isMultiLineString,
    message: '{PATH} is not a valid GeoJSON MultiLineString'
  },
  fake: () => randomMultiLineString()
};


/* export geojson multipolygon */
exports.MultiPolygon = {
  type: MultiPolygon,
  index: GEO_2DSPHERE,
  default: undefined,
  validate: {
    validator: isMultiPolygon,
    message: '{PATH} is not a valid GeoJSON MultiPolygon'
  },
  fake: () => randomMultiPolygon()
};


/* export geojson geometrycollection */
exports.GeometryCollection = {
  type: GeometryCollection,
  index: GEO_2DSPHERE,
  default: undefined,
  validate: {
    validator: isGeometryCollection,
    message: '{PATH} is not a valid GeoJSON GeometryCollection'
  },
  fake: () => randomGeometryCollection()
};