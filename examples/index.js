import { Schema } from 'mongoose';
import {
  Point,
  LineString,
  Polygon,
  MultiPoint,
  MultiLineString,
  MultiPolygon,
  Geometry,
  GeometryCollection,
} from '../src';

// define Point
const Shop = new Schema({
  name: { type: String, required: true },
  location: Point,
});

// define LineString
const Road = new Schema({
  name: { type: String, required: true },
  footpath: LineString,
});

// define Polygon
const Farm = new Schema({
  owner: { type: String, required: true },
  boundary: Polygon,
});

// define MultiPoint
const Dump = new Schema({
  name: { type: String, required: true },
  area: MultiPoint,
});

// define MultiLineString
const Rail = new Schema({
  name: { type: String, required: true },
  ways: MultiLineString,
});

// define MultiPolygon
const Jurisdiction = new Schema({
  name: { type: String, required: true },
  boundaries: MultiPolygon,
});

// define Geometry
const Shape = new Schema({
  name: { type: String, required: true },
  form: Geometry,
});

// define GeomentryCollection
const Trash = new Schema({
  name: { type: String, required: true },
  pile: GeometryCollection,
});
