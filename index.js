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
const geojson = require(path.join(__dirname, 'lib', 'geojson'));
const {
  isGeometry,
  isPoint,
  isLineString,
  isPolygon,
  isMultiPoint,
  isMultiLineString,
  isMultiPolygon
} = geojson;


/* merge geojson utils */
_.forEach(geojson, function (value, key) {
  exports[key] = value;
});


/* import geometries */
const { Geometry } = require(path.join(__dirname, 'lib', 'geometry'));
const { Point } = require(path.join(__dirname, 'lib', 'point'));
const { LineString } = require(path.join(__dirname, 'lib', 'linestring'));
const { Polygon } = require(path.join(__dirname, 'lib', 'polygon'));
const { MultiPoint } = require(path.join(__dirname, 'lib', 'multipoint'));
const { MultiPolygon } = require(path.join(__dirname, 'lib', 'multipolygon'));
const {
  MultiLineString
} = require(path.join(__dirname, 'lib', 'multilinestring'));


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
    isAsync: true,
    validator: isGeometry,
    message: '{PATH} is not a valid GeoJSON Geometry'
  },
  fake: {
    generator: function fakeGeometryGenerator() {
      const fakes = [
        exports.randomPoint,
        exports.randomLineString,
        exports.randomPolygon,
        exports.randomMultiPoint,
        exports.randomMultiLineString,
        exports.randomMultiPolygon,
      ];
      const fake = fakes[(Math.floor(Math.random() * fakes.length))];
      return fake();
    }
  }
};


/* export geojson point */
exports.Point = {
  type: Point,
  index: GEO_2DSPHERE,
  default: undefined,
  validate: {
    isAsync: true,
    validator: isPoint,
    message: '{PATH} is not a valid GeoJSON Point'
  },
  fake: {
    generator: function fakePointGenerator() {
      return exports.randomPoint();
    }
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
  },
  fake: {
    generator: function fakeLineStringGenerator() {
      return exports.randomLineString();
    }
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
  },
  fake: {
    generator: function fakePolygonGenerator() {
      return exports.randomPolygon();
    }
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
  },
  fake: {
    generator: function fakeMultiPointGenerator() {
      return exports.randomMultiPoint();
    }
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
  },
  fake: {
    generator: function fakeMultiLineStringGenerator() {
      return exports.randomMultiLineString();
    }
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
  },
  fake: {
    generator: function fakeMultiPolygonGenerator() {
      return exports.randomMultiPolygon();
    }
  }
};