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