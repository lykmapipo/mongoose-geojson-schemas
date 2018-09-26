'use strict';


/*** dependencies */
const path = require('path');
const _ = require('lodash');
const mongoose = require('mongoose');
const { expect } = require('chai');
const { Schema } = mongoose;
const { MultiPolygon, GEO_2DSPHERE } = require(path.join(__dirname, '..'));


describe('MultiPolygon', function () {

  let MPLOI;
  const PoiSchema = new Schema({
    jurisdiction: MultiPolygon
  });

  it('should be a schema', function () {
    //assert shape
    expect(MultiPolygon).to.be.an('object');
    expect(MultiPolygon.index).to.be.equal(GEO_2DSPHERE);
    expect(MultiPolygon.type).to.be.an('object');
    expect(MultiPolygon.type.constructor.name).to.be.equal('Schema');

    //assert point type
    expect(MultiPolygon.type.paths.type).to.exist;
    expect(MultiPolygon.type.paths.type.constructor.name)
      .to.be.equal('SchemaString');

    //assert coordinates
    expect(MultiPolygon.type.paths.coordinates).exist;
    expect(MultiPolygon.type.paths.coordinates.constructor.name)
      .to.be.equal('SchemaArray');
  });


  it('indexes are created when model is compiled', function (done) {

    MPLOI = mongoose.model('MPLOI', PoiSchema);

    MPLOI.on('index', function () {
      MPLOI
        .collection
        .getIndexes({ full: true }, function (error, indexes) {
          //assert indexes
          expect(error).to.not.exist;
          expect(indexes).to.exist;
          expect(indexes).to.have.length(2);

          //assert jurisdiction 2dsphere index
          const index =
            (_.find(indexes, { key: { jurisdiction: GEO_2DSPHERE } }));
          expect(index).to.exist;
          expect(index).to.be.an('object');

          done(error, indexes);
        });
    });

  });

  it('should be instantiable', function () {

    const ploi = new MPLOI({
      jurisdiction: {
        coordinates: [
          [
            [
              [102.0, 2.0],
              [103.0, 2.0],
              [103.0, 3.0],
              [102.0, 3.0],
              [102.0, 2.0]
            ]
          ],
          [
            [
              [100.0, 0.0],
              [101.0, 0.0],
              [101.0, 1.0],
              [100.0, 1.0],
              [100.0, 0.0]
            ],
            [
              [100.2, 0.2],
              [100.8, 0.2],
              [100.8, 0.8],
              [100.2, 0.8],
              [100.2, 0.2]
            ]
          ]
        ]
      }
    });

    expect(ploi).to.exist;
    expect(ploi.jurisdiction).to.exist;
    expect(ploi.jurisdiction.type).to.exist;
    expect(ploi.jurisdiction.coordinates).to.exist;

  });

  it('should be able to validate - valid', function (done) {

    const ploi = new MPLOI({
      jurisdiction: {
        coordinates: [
          [
            [
              [102.0, 2.0],
              [103.0, 2.0],
              [103.0, 3.0],
              [102.0, 3.0],
              [102.0, 2.0]
            ]
          ],
          [
            [
              [100.0, 0.0],
              [101.0, 0.0],
              [101.0, 1.0],
              [100.0, 1.0],
              [100.0, 0.0]
            ],
            [
              [100.2, 0.2],
              [100.8, 0.2],
              [100.8, 0.8],
              [100.2, 0.8],
              [100.2, 0.2]
            ]
          ]
        ]
      }
    });

    ploi.validate(function (error) {
      expect(error).to.not.exist;
      done();
    });

  });

  it('should be able to validate - invalid', function (done) {

    const ploi = new MPLOI({
      jurisdiction: {
        coordinates: [Math.random()]
      }
    });

    ploi.validate(function (error) {
      expect(error).to.exist;
      expect(error.name).to.be.equal('ValidationError');
      expect(error.errors.jurisdiction).to.exist;
      expect(error.errors.jurisdiction.message)
        .to.be.equal(
          'jurisdiction is not a valid GeoJSON MultiPolygon');
      done();
    });

  });

  it('should be able to save - valid', function (done) {

    const ploi = new MPLOI({
      jurisdiction: {
        coordinates: [
          [
            [
              [102.0, 2.0],
              [103.0, 2.0],
              [103.0, 3.0],
              [102.0, 3.0],
              [102.0, 2.0]
            ]
          ],
          [
            [
              [100.0, 0.0],
              [101.0, 0.0],
              [101.0, 1.0],
              [100.0, 1.0],
              [100.0, 0.0]
            ],
            [
              [100.2, 0.2],
              [100.8, 0.2],
              [100.8, 0.8],
              [100.2, 0.8],
              [100.2, 0.2]
            ]
          ]
        ]
      }
    });

    ploi.save(function (error, saved) {
      expect(error).to.not.exist;
      expect(saved).to.exist;
      expect(saved).to.exist;
      expect(saved.jurisdiction).to.exist;

      expect(saved.jurisdiction.type).to.exist;
      expect(saved.jurisdiction.type).to.be.a('string');
      expect(saved.jurisdiction.type).to.be.equal('MultiPolygon');

      expect(saved.jurisdiction.coordinates).to.exist;
      expect(saved.jurisdiction.coordinates).to.be.an('array');
      expect(saved.jurisdiction.coordinates).to.have.length(2);

      done(error, saved);
    });

  });


  it('should be able to save - valid', function (done) {

    const ploi = new MPLOI({
      jurisdiction: {
        coordinates: [
          [
            [
              [102.0, 2.0],
              [103.0, 2.0],
              [103.0, 3.0],
              [102.0, 3.0],
              [102.0, 2.0]
            ]
          ],
          [
            [
              [100.0, 0.0],
              [101.0, 0.0],
              [101.0, 1.0],
              [100.0, 1.0],
              [100.0, 0.0]
            ],
            [
              [100.2, 0.2],
              [100.8, 0.2],
              [100.8, 0.8],
              [100.2, 0.8],
              [100.2, 0.2]
            ]
          ]
        ]
      }
    });

    ploi.save(function (error, saved) {
      expect(error).to.not.exist;
      expect(saved).to.exist;
      expect(saved).to.exist;
      expect(saved.jurisdiction).to.exist;

      expect(saved.jurisdiction.type).to.exist;
      expect(saved.jurisdiction.type).to.be.a('string');
      expect(saved.jurisdiction.type).to.be.equal('MultiPolygon');

      expect(saved.jurisdiction.coordinates).to.exist;
      expect(saved.jurisdiction.coordinates).to.be.an('array');
      expect(saved.jurisdiction.coordinates).to.have.length(2);

      done(error, saved);
    });

  });

  it('should be able to save - valid', function (done) {

    const ploi = {
      jurisdiction: {
        coordinates: [
          [
            [
              [102.0, 2.0],
              [103.0, 2.0],
              [103.0, 3.0],
              [102.0, 3.0],
              [102.0, 2.0]
            ]
          ],
          [
            [
              [100.0, 0.0],
              [101.0, 0.0],
              [101.0, 1.0],
              [100.0, 1.0],
              [100.0, 0.0]
            ],
            [
              [100.2, 0.2],
              [100.8, 0.2],
              [100.8, 0.8],
              [100.2, 0.8],
              [100.2, 0.2]
            ]
          ]
        ]
      }
    };

    MPLOI.create(ploi, function (error, created) {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created).to.exist;
      expect(created.jurisdiction).to.exist;

      expect(created.jurisdiction.type).to.exist;
      expect(created.jurisdiction.type).to.be.a('string');
      expect(created.jurisdiction.type).to.be.equal('MultiPolygon');

      expect(created.jurisdiction.coordinates).to.exist;
      expect(created.jurisdiction.coordinates).to.be.an('array');
      expect(created.jurisdiction.coordinates).to.have.length(2);

      done(error, created);
    });

  });

  it('should be able to save - valid', function (done) {

    const ploi = {
      jurisdiction: {
        coordinates: [
          [
            [
              [102.0, 2.0],
              [103.0, 2.0],
              [103.0, 3.0],
              [102.0, 3.0],
              [102.0, 2.0]
            ]
          ],
          [
            [
              [100.0, 0.0],
              [101.0, 0.0],
              [101.0, 1.0],
              [100.0, 1.0],
              [100.0, 0.0]
            ],
            [
              [100.2, 0.2],
              [100.8, 0.2],
              [100.8, 0.8],
              [100.2, 0.8],
              [100.2, 0.2]
            ]
          ]
        ]
      }
    };

    MPLOI.create(ploi, function (error, created) {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created).to.exist;
      expect(created.jurisdiction).to.exist;

      expect(created.jurisdiction.type).to.exist;
      expect(created.jurisdiction.type).to.be.a('string');
      expect(created.jurisdiction.type).to.be.equal('MultiPolygon');

      expect(created.jurisdiction.coordinates).to.exist;
      expect(created.jurisdiction.coordinates).to.be.an('array');
      expect(created.jurisdiction.coordinates).to.have.length(2);

      done(error, created);
    });

  });

  it('should be able to find saved', function (done) {

    MPLOI
      .findOne(function (error, found) {
        expect(error).to.not.exist;
        expect(found).to.exist;
        expect(found).to.exist;
        expect(found.jurisdiction).to.exist;

        expect(found.jurisdiction.type).to.exist;
        expect(found.jurisdiction.type).to.be.a('string');
        expect(found.jurisdiction.type).to.be.equal('MultiPolygon');

        expect(found.jurisdiction.coordinates).to.exist;
        expect(found.jurisdiction.coordinates).to.be.an('array');
        expect(found.jurisdiction.coordinates).to.have.length(2);

        done(error, found);
      });

  });

  it('should not save - invalid', function (done) {

    const poi = new MPLOI({
      jurisdiction: {
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
    MPLOI.deleteMany(done);
  });

});