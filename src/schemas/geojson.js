import _ from 'lodash';
import * as turf from '@turf/turf';
import {
  GEO_POINT,
  GEO_LINESTRING,
  GEO_POLYGON,
  GEO_MULTIPOINT,
  GEO_MULTILINESTRING,
  GEO_MULTIPOLYGON,
  GEO_GEOMETRY_COLLECTION,
  GEO_FEATURE,
  isPoint as isGeoJSONPoint,
  isMultiPoint as isGeoJSONMultiPoint,
  isLineString as isGeoJSONLineString,
  isMultiLineString as isGeoJSONMultiLineString,
  isPolygon as isGeoJSONPolygon,
  isMultiPolygon as isGeoJSONMultiPolygon,
  isGeometryCollection as isGeoJSONGeometryCollection,
  isGeometry as isGeoJSONGeometry,
  randomPoint as randomGeoJSONPoint,
  randomLineString as randomGeoJSONLineString,
  randomPolygon as randomGeoJSONPolygon,
  randomMultiPoint as randomGeoJSONMultiPoint,
  randomMultiLineString as randomGeoJSONMultiLineString,
  randomMultiPolygon as randomGeoJSONMultiPolygon,
  randomGeometry as randomGeoJSONGeometry,
  randomGeometryCollection as randomGeoJSONGeometryCollection,
} from '@lykmapipo/geo-tools';
import { isPosition, isPolygonCoor } from 'geojson-validation';

// geojson geometry types
export const TYPE_POINT = GEO_POINT;
export const TYPE_LINESTRING = GEO_LINESTRING;
export const TYPE_POLYGON = GEO_POLYGON;
export const TYPE_MULTIPOINT = GEO_MULTIPOINT;
export const TYPE_MULTILINESTRING = GEO_MULTILINESTRING;
export const TYPE_MULTIPOLYGON = GEO_MULTIPOLYGON;
export const TYPE_GEOMETRYCOLLECTION = GEO_GEOMETRY_COLLECTION;
export const TYPE_FEATURE = GEO_FEATURE;
export const GEOMETRIES = [
  TYPE_POINT,
  TYPE_LINESTRING,
  TYPE_POLYGON,
  TYPE_MULTIPOINT,
  TYPE_MULTILINESTRING,
  TYPE_MULTIPOLYGON,
  TYPE_GEOMETRYCOLLECTION,
];

// mongodb geosphere index
export const GEO_2DSPHERE = '2dsphere';

// geojson validations

/**
 * @name isPoint
 * @description mongoose validator for geojson point
 * @param {object} value geojson value to validate
 * @returns {boolean} whether is valid geojson point
 * @since 0.1.0
 * @version 0.1.0
 */
export const isPoint = (value) => isGeoJSONPoint(value);

/**
 * @name isLineString
 * @description mongoose validator for geojson linestring
 * @param {object} value geojson value to validate
 * @returns {boolean} whether is valid geojson linestring
 * @since 0.1.0
 * @version 0.1.0
 */
export const isLineString = (value) => isGeoJSONLineString(value);

/**
 * @name isPolygon
 * @description mongoose validator for geojson polygon
 * @param {object} value geojson value to validate
 * @returns {boolean} whether is valid geojson polygon
 * @since 0.1.0
 * @version 0.1.0
 */
export const isPolygon = (value) => isGeoJSONPolygon(value);

/**
 * @name isMultiPoint
 * @description mongoose validator for geojson multipoint
 * @param {object} value geojson value to validate
 * @returns {boolean} whether is valid geojson multipoint
 * @since 0.1.0
 * @version 0.1.0
 */
export const isMultiPoint = (value) => isGeoJSONMultiPoint(value);

/**
 * @name isMultiLineString
 * @description mongoose validator for geojson multilinestring
 * @param {object} value geojson value to validate
 * @returns {boolean} whether is valid geojson multilinestring
 * @since 0.1.0
 * @version 0.1.0
 */
export const isMultiLineString = (value) => isGeoJSONMultiLineString(value);

/**
 * @name isMultiPolygon
 * @description mongoose validator for geojson multipolygon
 * @param {object} value geojson value to validate
 * @returns {boolean} whether is valid geojson multipolygon
 * @since 0.1.0
 * @version 0.1.0
 */
export const isMultiPolygon = (value) => isGeoJSONMultiPolygon(value);

/**
 * @name isGeometryCollection
 * @description mongoose validator for geojson geometrycollection
 * @param {object} value geojson value to validate
 * @returns {boolean} whether is valid geojson geometrycollection
 * @since 0.9.0
 * @version 0.1.0
 */
export const isGeometryCollection = (value) =>
  isGeoJSONGeometryCollection(value);

/**
 * @name isValidGeometry
 * @description mongoose validator for geojson geometry
 * @param {object} value geojson value to validate
 * @returns {boolean} whether is valid geojson geometry
 * @since 0.7.0
 * @version 0.1.0
 */
export const isGeometry = (value) => isGeoJSONGeometry(value);

/* geojson generators */

/**
 * @name centroidOf
 * @description calculates the centroid of a feature(s) using
 * the mean of all vertices
 * @param {object} geojson feature to be centered
 * @returns {object} an Object that can be used as centroid
 */
export const centroidOf = (geojson) => {
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
 * @param {number} [size=1] number of point to generate
 * @param {number[]} [bbox=[-80, 30, -60, 60]] A bounding box inside of which
 * geometries are placed
 * @returns {object | object[]} random geojson point(s)
 */
export const randomPoint = (size = 1, bbox = undefined) => {
  const $size = size && size > 0 ? size : 1;

  let sample = _.map(_.range($size), () => randomGeoJSONPoint({ bbox }));
  sample = sample.length > 1 ? sample : _.first(sample);
  return sample;
};

/**
 * @name randomMultiPoint
 * @description generate random geojson multi point(s)
 * @param {number} [size=1] number of point to generate
 * @param {number[]} [bbox=[-80, 30, -60, 60]] A bounding box inside of which
 * geometries are placed
 * @returns {object | object[]} random geojson point(s)
 */
export const randomMultiPoint = (size = 1, bbox = undefined) => {
  const $size = size && size > 0 ? size : 1;

  let sample = _.map(_.range($size), () => randomGeoJSONMultiPoint({ bbox }));
  sample = sample.length > 1 ? sample : _.first(sample);
  return sample;
};

/**
 * @name randomLineString
 * @description generate random geojson linestring(s)
 * @param {number} [size=1] number of linestrings to generate
 * @param {number[]} [bbox=[-80, 30, -60, 60]] A bounding box inside of which
 * geometries are placed
 * @returns {object | object[]} random geojson linestring(s)
 */
export const randomLineString = (size = 1, bbox = undefined) => {
  const $size = size && size > 0 ? size : 1;

  let sample = _.map(_.range($size), () => randomGeoJSONLineString({ bbox }));
  sample = sample.length > 1 ? sample : _.first(sample);
  return sample;
};

/**
 * @name randomMultiLineString
 * @description generate random geojson multilinestring(s)
 * @param {number} [size=1] number of multilinestrings to generate
 * @param {number[]} [bbox=[-80, 30, -60, 60]] A bounding box inside of which
 * geometries are placed
 * @returns {object | object[]} random geojson multilinestring(s)
 */
export const randomMultiLineString = (size = 1, bbox = undefined) => {
  const $size = size && size > 0 ? size : 1;

  let sample = _.map(_.range($size), () =>
    randomGeoJSONMultiLineString({ bbox })
  );
  sample = sample.length > 1 ? sample : _.first(sample);
  return sample;
};

/**
 * @name randomPolygon
 * @description generate random geojson polygon(s)
 * @param {number} [size=1] number of polygons to generate
 * @param {number[]} [bbox=[-80, 30, -60, 60]] A bounding box inside of which
 * geometries are placed
 * @returns {object | object[]} random geojson polygon(s)
 */
export const randomPolygon = (size = 1, bbox = undefined) => {
  const $size = size && size > 0 ? size : 1;

  let sample = _.map(_.range($size), () => randomGeoJSONPolygon({ bbox }));
  sample = sample.length > 1 ? sample : _.first(sample);
  return sample;
};

/**
 * @name randomMultiPolygon
 * @description generate random geojson multipolygon(s)
 * @param {number} [size=1] number of multipolygons to generate
 * @param {number[]} [bbox=[-80, 30, -60, 60]] A bounding box inside of which
 * geometries are placed
 * @returns {object | object[]} random geojson multipolygon(s)
 */
export const randomMultiPolygon = (size = 1, bbox = undefined) => {
  const $size = size && size > 0 ? size : 1;

  let sample = _.map(_.range($size), () => randomGeoJSONMultiPolygon({ bbox }));
  sample = sample.length > 1 ? sample : _.first(sample);
  return sample;
};

/**
 * @name randomGeometryCollection
 * @description generate random geojson geometrycollection(s)
 * @param {number} [size=1] number of geometrycollections to generate
 * @param {number[]} [bbox=[-80, 30, -60, 60]] A bounding box inside of which
 * geometries are placed
 * @returns {object | object[]} random geojson geometrycollection(s)
 */
export const randomGeometryCollection = (size = 1, bbox = undefined) => {
  const $size = size && size > 0 ? size : 1;

  let sample = _.map(_.range($size), () =>
    randomGeoJSONGeometryCollection({ bbox })
  );
  sample = sample.length > 1 ? sample : _.first(sample);
  return sample;
};

/**
 * @name randomGeometry
 * @description generate random geojson geometry(s)
 * @param {number} [size=1] number of point to generate
 * @param {number[]} [bbox=[-80, 30, -60, 60]] A bounding box inside of which
 * geometries are placed
 * @returns {object | object[]} random geojson point(s)
 */
export const randomGeometry = (size = 1, bbox = undefined) => {
  const $size = size && size > 0 ? size : 1;

  let sample = _.map(_.range($size), () => randomGeoJSONGeometry({ bbox }));
  sample = sample.length > 1 ? sample : _.first(sample);
  return sample;
};

/**
 * @name parseCoordinateString
 * @description create geojson geometry or coordinate array from string
 * @param {string} coords string to extract geojson geometry or coordinates
 * @param {string} [delimiter=','] long, lat seperator from string
 * @param {string} [separator=' '] long, lat pair seperator from string
 * @returns {object|Array} geojson geometry or coordinates
 */
export const parseCoordinateString = (
  coords = '',
  delimiter = ',',
  separator = ' '
) => {
  // prepare geometry
  try {
    let points;
    if (!_.isEmpty(coords)) {
      // parse coordinates
      const pairs = _.compact(_.split(coords, separator)); // [pair]
      points = _.map(pairs, (pair) => {
        return _.map(_.split(pair, delimiter), _.toNumber);
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
    // return coordinates
    return points;
  } catch (error) {
    return undefined;
  }
};

/**
 * @name toCoordinateString
 * @description convert geojson geometry coordinates string
 * @param {object|Array} geometry valid geojson geometry or coordinates
 * @param {string} [delimiter=','] long, lat seperator from string
 * @param {string} [separator=' '] long, lat pair seperator from string
 * @returns {string} string representation of geomentry coordinates
 */
export const toCoordinateString = (
  geometry,
  delimiter = ',',
  separator = ' '
) => {
  let coordinates = geometry.coordinates || geometry;
  coordinates = _.chunk(_.flattenDeep(coordinates), 2);
  let coords = _.map(coordinates, (point) => {
    return point.join(delimiter);
  });
  coords = coords.join(separator);
  return coords;
};
