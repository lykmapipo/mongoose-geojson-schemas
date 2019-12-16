'use strict';


/*** dependencies */
const _ = require('lodash');
const { createTestModel, expect } = require('@lykmapipo/mongoose-test-helpers');
const { Polygon, GEO_2DSPHERE } = require('..');


describe('Polygon', () => {

  let PLOI;

  it('should be a schema', () => {
    //assert shape
    expect(Polygon).to.be.an('object');
    expect(Polygon.index).to.be.equal(GEO_2DSPHERE);
    expect(Polygon.type).to.be.an('object');
    expect(Polygon.type.constructor.name).to.be.equal('Schema');

    //assert point type
    expect(Polygon.type.paths.type).to.exist;
    expect(Polygon.type.paths.type.constructor.name)
      .to.be.equal('SchemaString');

    //assert coordinates
    expect(Polygon.type.paths.coordinates).exist;
    expect(Polygon.type.paths.coordinates.constructor.name)
      .to.be.equal('SchemaArray');
  });


  it('indexes are created when model is compiled', (done) => {
    PLOI = createTestModel({
      farm: Polygon
    });

    PLOI.on('index', () => {
      PLOI
        .collection
        .getIndexes({ full: true }, (error, indexes) => {
          //assert indexes
          expect(error).to.not.exist;
          expect(indexes).to.exist;
          expect(indexes).to.have.length.at.least(2);

          //assert farm 2dsphere index
          const index =
            (_.find(indexes, { key: { farm: GEO_2DSPHERE } }));
          expect(index).to.exist;
          expect(index).to.be.an('object');

          done(error, indexes);
        });
    });
  });

  it('should be instantiable', () => {
    const ploi = new PLOI({
      farm: {
        coordinates: [
          [
            [100.0, 0.0],
            [101.0, 0.0],
            [101.0, 1.0],
            [100.0, 1.0],
            [100.0, 0.0]
          ]
        ]
      }
    });

    expect(ploi).to.exist;
    expect(ploi.farm).to.exist;
    expect(ploi.farm.type).to.exist;
    expect(ploi.farm.coordinates).to.exist;
  });

  it('should be able to generate fake seed', () => {
    const ploi = PLOI.fake();

    expect(ploi.farm).to.exist;
    expect(ploi.farm.type).to.exist;
    expect(ploi.farm.coordinates).to.exist;
  });

  it('should be able to validate - valid', (done) => {
    const ploi = new PLOI({
      farm: {
        coordinates: [
          [
            [100.0, 0.0],
            [101.0, 0.0],
            [101.0, 1.0],
            [100.0, 1.0],
            [100.0, 0.0]
          ]
        ]
      }
    });

    ploi.validate((error) => {
      expect(error).to.not.exist;
      done();
    });
  });

  it('should be able to validate - invalid', (done) => {
    const ploi = new PLOI({
      farm: {
        coordinates: [Math.random()]
      }
    });

    ploi.validate((error) => {
      expect(error).to.exist;
      expect(error.name).to.be.equal('ValidationError');
      expect(error.errors.farm).to.exist;
      expect(error.errors.farm.message)
        .to.be.equal('farm is not a valid GeoJSON Polygon');
      done();
    });
  });

  it('should be able to save - valid', (done) => {
    const ploi = new PLOI({
      farm: {
        coordinates: [
          [
            [100.0, 0.0],
            [101.0, 0.0],
            [101.0, 1.0],
            [100.0, 1.0],
            [100.0, 0.0]
          ]
        ]
      }
    });

    ploi.save((error, saved) => {
      expect(error).to.not.exist;
      expect(saved).to.exist;
      expect(saved).to.exist;
      expect(saved.farm).to.exist;

      expect(saved.farm.type).to.exist;
      expect(saved.farm.type).to.be.a('string');
      expect(saved.farm.type).to.be.equal('Polygon');

      expect(saved.farm.coordinates).to.exist;
      expect(saved.farm.coordinates).to.be.an('array');
      expect(saved.farm.coordinates).to.have.length(1);

      done(error, saved);
    });
  });


  it('should be able to save - valid', (done) => {
    const ploi = new PLOI({
      farm: {
        coordinates: [
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
      }
    });

    ploi.save((error, saved) => {
      expect(error).to.not.exist;
      expect(saved).to.exist;
      expect(saved).to.exist;
      expect(saved.farm).to.exist;

      expect(saved.farm.type).to.exist;
      expect(saved.farm.type).to.be.a('string');
      expect(saved.farm.type).to.be.equal('Polygon');

      expect(saved.farm.coordinates).to.exist;
      expect(saved.farm.coordinates).to.be.an('array');
      expect(saved.farm.coordinates).to.have.length(2);

      done(error, saved);
    });
  });

  it('should be able to save - valid', (done) => {
    const ploi = {
      farm: {
        coordinates: [
          [
            [100.0, 0.0],
            [101.0, 0.0],
            [101.0, 1.0],
            [100.0, 1.0],
            [100.0, 0.0]
          ]
        ]
      }
    };

    PLOI.create(ploi, (error, created) => {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created).to.exist;
      expect(created.farm).to.exist;

      expect(created.farm.type).to.exist;
      expect(created.farm.type).to.be.a('string');
      expect(created.farm.type).to.be.equal('Polygon');

      expect(created.farm.coordinates).to.exist;
      expect(created.farm.coordinates).to.be.an('array');
      expect(created.farm.coordinates).to.have.length(1);

      done(error, created);
    });
  });

  it('should be able to save - valid', (done) => {
    const ploi = {
      farm: {
        coordinates: [
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
      }
    };

    PLOI.create(ploi, (error, created) => {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created).to.exist;
      expect(created.farm).to.exist;

      expect(created.farm.type).to.exist;
      expect(created.farm.type).to.be.a('string');
      expect(created.farm.type).to.be.equal('Polygon');

      expect(created.farm.coordinates).to.exist;
      expect(created.farm.coordinates).to.be.an('array');
      expect(created.farm.coordinates).to.have.length(2);

      done(error, created);
    });
  });

  it('should be able to find saved', (done) => {
    PLOI
      .findOne((error, found) => {
        expect(error).to.not.exist;
        expect(found).to.exist;
        expect(found).to.exist;
        expect(found.farm).to.exist;

        expect(found.farm.type).to.exist;
        expect(found.farm.type).to.be.a('string');
        expect(found.farm.type).to.be.equal('Polygon');

        expect(found.farm.coordinates).to.exist;
        expect(found.farm.coordinates).to.be.an('array');
        expect(found.farm.coordinates).to.have.length(1);

        done(error, found);
      });
  });

  it('should not save - invalid', (done) => {
    const poi = new PLOI({
      farm: {
        coordinates: [Math.random()]
      }
    });

    poi.save((error, saved) => {
      expect(error).to.exist;
      expect(saved).to.not.exist;
      done();
    });
  });

  after((done) => {
    PLOI.deleteMany(done);
  });

});