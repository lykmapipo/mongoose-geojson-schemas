# mongoose-geojson-schemas

[![Build Status](https://app.travis-ci.com/lykmapipo/mongoose-geojson-schemas.svg?branch=master)](https://app.travis-ci.com/lykmapipo/mongoose-geojson-schemas)
[![Dependencies Status](https://david-dm.org/lykmapipo/mongoose-geojson-schemas.svg)](https://david-dm.org/lykmapipo/mongoose-geojson-schemas)
[![Coverage Status](https://coveralls.io/repos/github/lykmapipo/mongoose-geojson-schemas/badge.svg?branch=master)](https://coveralls.io/github/lykmapipo/mongoose-geojson-schemas?branch=master)
[![GitHub License](https://img.shields.io/github/license/lykmapipo/mongoose-geojson-schemas)](https://github.com/lykmapipo/mongoose-geojson-schemas/blob/master/LICENSE)

[![Commitizen Friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Code Style](https://badgen.net/badge/code%20style/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)
[![npm version](https://img.shields.io/npm/v/mongoose-geojson-schemas)](https://www.npmjs.com/package/mongoose-geojson-schemas)

mongoose schema to support [GeoJSON](http://geojson.org/geojson-spec.html) fields.

*Note: All geojson types will added as single-embedded document(sub-schema) and `2dsphere` indexed*

## Requirements

- [NodeJS v13+](https://nodejs.org)
- [Npm v6.12+](https://www.npmjs.com/)
- [MongoDB v4+](https://www.mongodb.com/)
- [Mongoose v6+](https://github.com/Automattic/mongoose)

## Installation

```sh
npm install mongoose mongoose-geojson-schemas --save
```

## Usage

```js
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
} from 'mongoose-geojson-schemas';

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
```

## Testing

- Clone this repository

- Install all development dependencies

```sh
npm install
```

- Run example

```sh
npm run dev
```

- Then run test

```sh
npm test
```

## Contribute

It will be nice, if you open an issue first so that we can know what is going on, then, fork this repo and push in your ideas. Do not forget to add a bit of test(s) of what value you adding.

## License

The MIT License (MIT)

Copyright (c) lykmapipo & Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
