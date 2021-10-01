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
import GeometrySchema from './schemas/geometry';
import PointSchema from './schemas/point';
import LineStringSchema from './schemas/linestring';
import PolygonSchema from './schemas/polygon';
import MultiPointSchema from './schemas/multipoint';
import MultiPolygonSchema from './schemas/multipolygon';
import MultiLineStringSchema from './schemas/multilinestring';
import GeometryCollectionSchema from './schemas/geometrycollection';

import {
  GEO_2DSPHERE,
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
} from './schemas/geojson';

// export geojson utils
export * from './schemas/geojson';

// export geojson geometry
export const Geometry = {
  type: GeometrySchema,
  index: GEO_2DSPHERE,
  default: undefined,
  validate: {
    validator: isGeometry,
    message: '{PATH} is not a valid GeoJSON Geometry',
  },
  fake: () => randomGeometry(),
};

// export geojson point
export const Point = {
  type: PointSchema,
  index: GEO_2DSPHERE,
  default: undefined,
  validate: {
    validator: isPoint,
    message: '{PATH} is not a valid GeoJSON Point',
  },
  fake: () => randomPoint(),
};

// export geojson linestring
export const LineString = {
  type: LineStringSchema,
  index: GEO_2DSPHERE,
  default: undefined,
  validate: {
    validator: isLineString,
    message: '{PATH} is not a valid GeoJSON LineString',
  },
  fake: () => randomLineString(),
};

// export geojson polygon
export const Polygon = {
  type: PolygonSchema,
  index: GEO_2DSPHERE,
  default: undefined,
  validate: {
    validator: isPolygon,
    message: '{PATH} is not a valid GeoJSON Polygon',
  },
  fake: () => randomPolygon(),
};

// export geojson multipoint
export const MultiPoint = {
  type: MultiPointSchema,
  index: GEO_2DSPHERE,
  default: undefined,
  validate: {
    validator: isMultiPoint,
    message: '{PATH} is not a valid GeoJSON MultiPoint',
  },
  fake: () => randomMultiPoint(),
};

// export geojson multilinestring
export const MultiLineString = {
  type: MultiLineStringSchema,
  index: GEO_2DSPHERE,
  default: undefined,
  validate: {
    validator: isMultiLineString,
    message: '{PATH} is not a valid GeoJSON MultiLineString',
  },
  fake: () => randomMultiLineString(),
};

// export geojson multipolygon
export const MultiPolygon = {
  type: MultiPolygonSchema,
  index: GEO_2DSPHERE,
  default: undefined,
  validate: {
    validator: isMultiPolygon,
    message: '{PATH} is not a valid GeoJSON MultiPolygon',
  },
  fake: () => randomMultiPolygon(),
};

// export geojson geometrycollection
export const GeometryCollection = {
  type: GeometryCollectionSchema,
  index: GEO_2DSPHERE,
  default: undefined,
  validate: {
    validator: isGeometryCollection,
    message: '{PATH} is not a valid GeoJSON GeometryCollection',
  },
  fake: () => randomGeometryCollection(),
};
