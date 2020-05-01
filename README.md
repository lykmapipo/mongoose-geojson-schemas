# mongoose-geojson-schemas

[![Build Status](https://travis-ci.org/lykmapipo/mongoose-geojson-schemas.svg?branch=master)](https://travis-ci.org/lykmapipo/mongoose-geojson-schemas)
[![Dependencies Status](https://david-dm.org/lykmapipo/mongoose-geojson-schemas/status.svg)](https://david-dm.org/lykmapipo/mongoose-geojson-schemas)
[![npm version](https://badge.fury.io/js/mongoose-geojson-schemas.svg)](https://badge.fury.io/js/mongoose-geojson-schemas)

mongoose schema to support [GeoJSON](http://geojson.org/geojson-spec.html) fields.

*Note: All geojson types will added as single-embedded document(sub-schema) and `2dsphere` indexed*

## Requirements
- [NodeJS v9.9.0+](https://nodejs.org)
- [MongoDB v3.4.10+](https://www.mongodb.com/)
- [Mongoose v5.0.14+](https://github.com/Automattic/mongoose)

## Install
```sh
$ npm install --save mongoose mongoose-geojson-schemas
```

## Usage

```js
const { Schema } = require('mongoose');
const {
  Point,
  LineString,
  Polygon,
  MultiPoint,
  MultiLineString,
  MultiPolygon,
  Geometry,
  GeometryCollection
} = require('mongoose-geojson-schemas');

...

const Shop = new Schema({
  name: { type: String, required: true }
  location: Point
});

...

const Road = new Schema({
  name: { type: String, required: true }
  footpath: LineString
});

...

const Farm = new Schema({
  owner: { type: String, required: true }
  boundary: Polygon
});

...

const Dump = new Schema({
  name: { type: String, required: true }
  area: MultiPoint
});

...

const Rail = new Schema({
  name: { type: String, required: true }
  ways: MultiLineString
});

...

const Jurisdiction = new Schema({
  name: { type: String, required: true }
  boundaries: MultiPolygon
});

...

const Shape = new Schema({
  name: { type: String, required: true }
  form: Geometry
});

...

const Trash = new Schema({
  name: { type: String, required: true }
  pile: GeomentryCollection
});

...

```

## Testing
* Clone this repository

* Install all development dependencies
```sh
$ npm install
```
* Then run test
```sh
$ npm test
```

## References
 - [mongoose - Using GeoJSON](https://mongoosejs.com/docs/geojson.html)
 - [rfc7946](https://tools.ietf.org/html/rfc7946)
 - [geojson-spec.html](http://geojson.org/geojson-spec.html)
 - [GeoJSON_draft_version_6](http://wiki.geojson.org/GeoJSON_draft_version_6)
 - [GeoJSON Objects](https://docs.mongodb.com/manual/reference/geojson/)
 - [geojson-second-bite](https://macwright.org/2015/03/23/geojson-second-bite)

## Contribute
It will be nice, if you open an issue first so that we can know what is going on, then, fork this repo and push in your ideas. Do not forget to add a bit of test(s) of what value you adding.

## Licence
The MIT License (MIT)

Copyright (c) 2018 lykmapipo & Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 