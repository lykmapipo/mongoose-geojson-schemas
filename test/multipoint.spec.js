'use strict';


/*** dependencies */
const path = require('path');
const _ = require('lodash');
const mongoose = require('mongoose');
const { expect } = require('chai');
const { Schema } = mongoose;
const { MultiPoint, GEO_2DSPHERE } = require(path.join(__dirname, '..'));


describe('MultiPoint', function () {

  const MultiPointSchema = new Schema({
    waterpoint: MultiPoint
  });
  let MLOI;

  before(function (done) {
    mongoose
      .connect('mongodb://localhost/mongoose-geojson-schemas', done);
  });

  it('should be a schema', function () {
    //assert shape
    expect(MultiPoint).to.be.an('object');
    expect(MultiPoint.index).to.be.equal(GEO_2DSPHERE);
    expect(MultiPoint.type).to.be.an('object');
    expect(MultiPoint.type.constructor.name).to.be.equal('Schema');

    //assert point type
    expect(MultiPoint.type.paths.type).to.exist;
    expect(MultiPoint.type.paths.type.constructor.name)
      .to.be.equal('SchemaString');

    //assert coordinates
    expect(MultiPoint.type.paths.coordinates).exist;
    expect(MultiPoint.type.paths.coordinates.constructor.name)
      .to.be.equal('SchemaArray');
  });


  it('indexes are created when model is compiled', function (done) {

    MLOI = mongoose.model('MLOI', MultiPointSchema);

    MLOI.on('index', function () {
      MLOI
        .collection
        .getIndexes({ full: true }, function (error, indexes) {
          //assert indexes
          expect(error).to.not.exist;
          expect(indexes).to.exist;
          expect(indexes).to.have.length(2);

          //assert waterpoint 2dsphere index
          const index =
            (_.find(indexes, { key: { waterpoint: GEO_2DSPHERE } }));
          expect(index).to.exist;
          expect(index).to.be.an('object');

          done(error, indexes);
        });
    });

  });

  it('should be instantiable', function () {

    const loi = new MLOI({
      waterpoint: {
        coordinates: [
          [100.0, 0.0],
          [101.0, 1.0]
        ]
      }
    });

    expect(loi).to.exist;
    expect(loi.waterpoint).to.exist;
    expect(loi.waterpoint.type).to.exist;
    expect(loi.waterpoint.coordinates).to.exist;

  });

  it('should be able to validate - valid', function (done) {

    const loi = new MLOI({
      waterpoint: {
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

    const loi = new MLOI({
      waterpoint: {
        coordinates: [Math.random()]
      }
    });

    loi.validate(function (error) {
      expect(error).to.exist;
      expect(error.name).to.be.equal('ValidationError');
      expect(error.errors.waterpoint).to.exist;
      expect(error.errors.waterpoint.message)
        .to.be.equal('waterpoint is not a valid GeoJSON MultiPoint');
      done();
    });

  });

  it('should be able to save - valid', function (done) {

    const loi = new MLOI({
      waterpoint: {
        coordinates: [
          [100.0, 0.0],
          [101.0, 1.0]
        ]
      }
    });

    loi.save(function (error, saved) {
      expect(error).to.not.exist;
      expect(saved).to.exist;
      expect(saved).to.exist;
      expect(saved.waterpoint).to.exist;

      expect(saved.waterpoint.type).to.exist;
      expect(saved.waterpoint.type).to.be.a('string');
      expect(saved.waterpoint.type).to.be.equal('MultiPoint');

      expect(saved.waterpoint.coordinates).to.exist;
      expect(saved.waterpoint.coordinates).to.be.an('array');
      expect(saved.waterpoint.coordinates).to.have.length(2);

      done(error, saved);
    });

  });

  it('should be able to save - valid', function (done) {

    const loi = {
      waterpoint: {
        coordinates: [
          [100.0, 0.0],
          [101.0, 1.0]
        ]
      }
    };

    MLOI.create(loi, function (error, created) {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created).to.exist;
      expect(created.waterpoint).to.exist;

      expect(created.waterpoint.type).to.exist;
      expect(created.waterpoint.type).to.be.a('string');
      expect(created.waterpoint.type).to.be.equal('MultiPoint');

      expect(created.waterpoint.coordinates).to.exist;
      expect(created.waterpoint.coordinates).to.be.an('array');
      expect(created.waterpoint.coordinates).to.have.length(2);

      done(error, created);
    });

  });

  it('should be able to find saved', function (done) {

    MLOI
      .findOne(function (error, found) {
        expect(error).to.not.exist;
        expect(found).to.exist;
        expect(found).to.exist;
        expect(found.waterpoint).to.exist;

        expect(found.waterpoint.type).to.exist;
        expect(found.waterpoint.type).to.be.a('string');
        expect(found.waterpoint.type).to.be.equal('MultiPoint');

        expect(found.waterpoint.coordinates).to.exist;
        expect(found.waterpoint.coordinates).to.be.an('array');
        expect(found.waterpoint.coordinates).to.have.length(2);

        done(error, found);
      });

  });

  it('should not save - invalid', function (done) {

    const poi = new MLOI({
      waterpoint: {
        coordinates: [Math.random()]
      }
    });

    poi.save(function (error, saved) {
      expect(error).to.exist;
      expect(saved).to.not.exist;
      done();
    });

  });

  after(function (done) {
    MLOI.remove(done);
  });

});