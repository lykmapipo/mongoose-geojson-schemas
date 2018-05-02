'use strict';


/*** dependencies */
const path = require('path');
const _ = require('lodash');
const mongoose = require('mongoose');
const { expect } = require('chai');
const { Schema } = mongoose;
const { LineString, GEOSPHERE_INDEX } = require(path.join(__dirname, '..'));


describe('LineString', function () {

  const PoiSchema = new Schema({
    road: LineString
  });
  let LOI;

  before(function (done) {
    mongoose
      .connect('mongodb://localhost/mongoose-geojson-schemas', done);
  });

  it('should be a schema', function () {
    //assert shape
    expect(LineString).to.be.an('object');
    expect(LineString.index).to.be.equal(GEOSPHERE_INDEX);
    expect(LineString.type).to.be.an('object');
    expect(LineString.type.constructor.name).to.be.equal('Schema');

    //assert point type
    expect(LineString.type.paths.type).to.exist;
    expect(LineString.type.paths.type.constructor.name)
      .to.be.equal('SchemaString');

    //assert coordinates
    expect(LineString.type.paths.coordinates).exist;
    expect(LineString.type.paths.coordinates.constructor.name)
      .to.be.equal('SchemaArray');
  });


  it('indexes are created when model is compiled', function (done) {

    LOI = mongoose.model('LOI', PoiSchema);

    LOI.on('index', function () {
      LOI
        .collection
        .getIndexes({ full: true }, function (error, indexes) {
          //assert indexes
          expect(error).to.not.exist;
          expect(indexes).to.exist;
          expect(indexes).to.have.length(2);

          //assert road 2dsphere index
          const index =
            (_.find(indexes, { key: { road: GEOSPHERE_INDEX } }));
          expect(index).to.exist;
          expect(index).to.be.an('object');

          done(error, indexes);
        });
    });

  });

  it('should be instantiable', function () {

    const loi = new LOI({
      road: {
        coordinates: [
          [100.0, 0.0],
          [101.0, 1.0]
        ]
      }
    });

    expect(loi).to.exist;
    expect(loi.road).to.exist;
    expect(loi.road.type).to.exist;
    expect(loi.road.coordinates).to.exist;

  });

  it('should be able to validate - valid', function (done) {

    const loi = new LOI({
      road: {
        coordinates: [
          [100.0, 0.0],
          [101.0, 1.0]
        ]
      }
    });

    loi.validate(function (error) {
      expect(error).to.not.exist;
      done();
    });

  });

  it('should be able to validate - invalid', function (done) {

    const loi = new LOI({
      road: {
        coordinates: [Math.random()]
      }
    });

    loi.validate(function (error) {
      expect(error).to.exist;
      expect(error.name).to.be.equal('ValidationError');
      expect(error.errors.road).to.exist;
      expect(error.errors.road.message)
        .to.be.equal('road is not a valid GeoJSON LineString');
      done();
    });

  });

  after(function (done) {
    LOI.remove(done);
  });

});