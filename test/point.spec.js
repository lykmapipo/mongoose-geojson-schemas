'use strict';


/*** dependencies */
const path = require('path');
const _ = require('lodash');
const mongoose = require('mongoose');
const turf = require('@turf/turf');
const { isPoint } = require('geojson-validation');
const { expect } = require('chai');
const { Schema } = mongoose;
const { Point, GEOSPHERE_INDEX } = require(path.join(__dirname, '..'));


describe('Point', function () {

  const PoiSchema = new Schema({
    location: Point
  });
  let POI;

  before(function (done) {
    mongoose
      .connect('mongodb://localhost/mongoose-geojson-schemas', done);
  });

  it('should be a schema', function () {
    //assert shape
    expect(Point).to.be.an('object');
    expect(Point.index).to.be.equal(GEOSPHERE_INDEX);
    expect(Point.type).to.be.an('object');
    expect(Point.type.constructor.name).to.be.equal('Schema');

    //assert point type
    expect(Point.type.paths.type).to.exist;
    expect(Point.type.paths.type.constructor.name)
      .to.be.equal('SchemaString');

    //assert coordinates
    expect(Point.type.paths.coordinates).exist;
    expect(Point.type.paths.coordinates.constructor.name)
      .to.be.equal('SchemaArray');
  });


  it('indexes are created when model is compiled', function (done) {

    POI = mongoose.model('POI', PoiSchema);

    POI.on('index', function () {
      POI
        .collection
        .getIndexes({ full: true }, function (error, indexes) {
          //assert indexes
          expect(error).to.not.exist;
          expect(indexes).to.exist;
          expect(indexes).to.have.length(2);

          //assert location 2dsphere index
          const index =
            (_.find(indexes, { key: { location: GEOSPHERE_INDEX } }));
          expect(index).to.exist;
          expect(index).to.be.an('object');

          done(error, indexes);
        });
    });

  });

  it('should be instantiable', function (done) {

    const poi = new POI({
      location: {
        coordinates: turf.randomPosition()
      }
    });

    expect(poi).to.exist;
    expect(poi.location).to.exist;
    expect(poi.location.type).to.exist;
    expect(poi.location.coordinates).to.exist;

    isPoint(poi.location, function (error, result) {
      console.log(error);
      console.log(result);
      done();
    });

  });

  after(function (done) {
    POI.remove(done);
  });

});