'use strict';


/*** dependencies */
const path = require('path');
const _ = require('lodash');
const mongoose = require('mongoose');
const { expect } = require('chai');
const { Schema } = mongoose;
const { MultiLineString, GEO_2DSPHERE } = require(path.join(__dirname, '..'));


describe('MultiLineString', function () {

  let MLOI;
  const MLoiSchema = new Schema({
    railway: MultiLineString
  });

  it('should be a schema', function () {
    //assert shape
    expect(MultiLineString).to.be.an('object');
    expect(MultiLineString.index).to.be.equal(GEO_2DSPHERE);
    expect(MultiLineString.type).to.be.an('object');
    expect(MultiLineString.type.constructor.name).to.be.equal('Schema');

    //assert point type
    expect(MultiLineString.type.paths.type).to.exist;
    expect(MultiLineString.type.paths.type.constructor.name)
      .to.be.equal('SchemaString');

    //assert coordinates
    expect(MultiLineString.type.paths.coordinates).exist;
    expect(MultiLineString.type.paths.coordinates.constructor.name)
      .to.be.equal('SchemaArray');
  });


  it('indexes are created when model is compiled', function (done) {

    MLOI = mongoose.model('MLOI', MLoiSchema);

    MLOI.on('index', function () {
      MLOI
        .collection
        .getIndexes({ full: true }, function (error, indexes) {
          //assert indexes
          expect(error).to.not.exist;
          expect(indexes).to.exist;
          expect(indexes).to.have.length(2);

          //assert railway 2dsphere index
          const index =
            (_.find(indexes, { key: { railway: GEO_2DSPHERE } }));
          expect(index).to.exist;
          expect(index).to.be.an('object');

          done(error, indexes);
        });
    });

  });

  it('should be instantiable', function () {

    const mloi = new MLOI({
      railway: {
        coordinates: [
          [
            [100.0, 0.0],
            [101.0, 1.0]
          ],
          [
            [102.0, 2.0],
            [103.0, 3.0]
          ]
        ]
      }
    });

    expect(mloi).to.exist;
    expect(mloi.railway).to.exist;
    expect(mloi.railway.type).to.exist;
    expect(mloi.railway.coordinates).to.exist;

  });

  it('should be able to validate - valid', function (done) {

    const mloi = new MLOI({
      railway: {
        coordinates: [
          [
            [100.0, 0.0],
            [101.0, 1.0]
          ],
          [
            [102.0, 2.0],
            [103.0, 3.0]
          ]
        ]
      }
    });

    mloi.validate(function (error) {
      expect(error).to.not.exist;
      done();
    });

  });

  it('should be able to validate - invalid', function (done) {

    const mloi = new MLOI({
      railway: {
        coordinates: [Math.random()]
      }
    });

    mloi.validate(function (error) {
      expect(error).to.exist;
      expect(error.name).to.be.equal('ValidationError');
      expect(error.errors.railway).to.exist;
      expect(error.errors.railway.message)
        .to.be.equal(
          'railway is not a valid GeoJSON MultiLineString');
      done();
    });

  });

  it('should be able to save - valid', function (done) {

    const mloi = new MLOI({
      railway: {
        coordinates: [
          [
            [100.0, 0.0],
            [101.0, 1.0]
          ],
          [
            [102.0, 2.0],
            [103.0, 3.0]
          ]
        ]
      }
    });

    mloi.save(function (error, saved) {
      expect(error).to.not.exist;
      expect(saved).to.exist;
      expect(saved).to.exist;
      expect(saved.railway).to.exist;

      expect(saved.railway.type).to.exist;
      expect(saved.railway.type).to.be.a('string');
      expect(saved.railway.type).to.be.equal('MultiLineString');

      expect(saved.railway.coordinates).to.exist;
      expect(saved.railway.coordinates).to.be.an('array');
      expect(saved.railway.coordinates).to.have.length(2);

      done(error, saved);
    });

  });


  it('should be able to save - valid', function (done) {

    const mloi = new MLOI({
      railway: {
        coordinates: [
          [
            [100.0, 0.0],
            [101.0, 1.0]
          ],
          [
            [102.0, 2.0],
            [103.0, 3.0]
          ]
        ]
      }
    });

    mloi.save(function (error, saved) {
      expect(error).to.not.exist;
      expect(saved).to.exist;
      expect(saved).to.exist;
      expect(saved.railway).to.exist;

      expect(saved.railway.type).to.exist;
      expect(saved.railway.type).to.be.a('string');
      expect(saved.railway.type).to.be.equal('MultiLineString');

      expect(saved.railway.coordinates).to.exist;
      expect(saved.railway.coordinates).to.be.an('array');
      expect(saved.railway.coordinates).to.have.length(2);

      done(error, saved);
    });

  });

  it('should be able to save - valid', function (done) {

    const mloi = {
      railway: {
        coordinates: [
          [
            [100.0, 0.0],
            [101.0, 1.0]
          ],
          [
            [102.0, 2.0],
            [103.0, 3.0]
          ]
        ]
      }
    };

    MLOI.create(mloi, function (error, created) {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created).to.exist;
      expect(created.railway).to.exist;

      expect(created.railway.type).to.exist;
      expect(created.railway.type).to.be.a('string');
      expect(created.railway.type).to.be.equal('MultiLineString');

      expect(created.railway.coordinates).to.exist;
      expect(created.railway.coordinates).to.be.an('array');
      expect(created.railway.coordinates).to.have.length(2);

      done(error, created);
    });

  });

  it('should be able to save - valid', function (done) {

    const mloi = {
      railway: {
        coordinates: [
          [
            [100.0, 0.0],
            [101.0, 1.0]
          ],
          [
            [102.0, 2.0],
            [103.0, 3.0]
          ]
        ]
      }
    };

    MLOI.create(mloi, function (error, created) {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created).to.exist;
      expect(created.railway).to.exist;

      expect(created.railway.type).to.exist;
      expect(created.railway.type).to.be.a('string');
      expect(created.railway.type).to.be.equal('MultiLineString');

      expect(created.railway.coordinates).to.exist;
      expect(created.railway.coordinates).to.be.an('array');
      expect(created.railway.coordinates).to.have.length(2);

      done(error, created);
    });

  });

  it('should be able to find saved', function (done) {

    MLOI
      .findOne(function (error, found) {
        expect(error).to.not.exist;
        expect(found).to.exist;
        expect(found).to.exist;
        expect(found.railway).to.exist;

        expect(found.railway.type).to.exist;
        expect(found.railway.type).to.be.a('string');
        expect(found.railway.type).to.be.equal('MultiLineString');

        expect(found.railway.coordinates).to.exist;
        expect(found.railway.coordinates).to.be.an('array');
        expect(found.railway.coordinates).to.have.length(2);

        done(error, found);
      });

  });

  it('should not save - invalid', function (done) {

    const poi = new MLOI({
      railway: {
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
    MLOI.deleteMany(done);
  });

});