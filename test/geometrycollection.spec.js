'use strict';


/*** dependencies */
const path = require('path');
const _ = require('lodash');
const mongoose = require('mongoose');
const { expect } = require('chai');
const { Schema } = mongoose;
const {
  GeometryCollection,
  GEO_2DSPHERE,
  randomGeometryCollection
} = require(path.join(__dirname, '..'));


describe('GeometryCollection', () => {

  let GOIC;
  const GoiSchema = new Schema({
    trash: GeometryCollection
  });

  it('should be a schema', () => {
    //assert shape
    expect(GeometryCollection).to.be.an('object');
    expect(GeometryCollection.index).to.be.equal(GEO_2DSPHERE);
    expect(GeometryCollection.type).to.be.an('object');
    expect(GeometryCollection.type.constructor.name)
      .to.be.equal('Schema');

    //assert point type
    expect(GeometryCollection.type.paths.type).to.exist;
    expect(GeometryCollection.type.paths.type.constructor.name)
      .to.be.equal('SchemaString');

    //assert geometries
    expect(GeometryCollection.type.paths.geometries).exist;
    expect(GeometryCollection.type.paths.geometries.constructor.name)
      .to.be.equal('DocumentArrayPath');
  });


  it('indexes are created when model is compiled', (done) => {

    GOIC = mongoose.model('GOIC', GoiSchema);

    GOIC.on('index', () => {
      GOIC
        .collection
        .getIndexes({ full: true }, function (error, indexes) {
          //assert indexes
          expect(error).to.not.exist;
          expect(indexes).to.exist;
          expect(indexes).to.have.length(2);

          //assert trash 2dsphere index
          const index = (_.find(indexes, { key: { trash: GEO_2DSPHERE } }));
          expect(index).to.exist;
          expect(index).to.be.an('object');

          done(error, indexes);
        });
    });

  });

  it('should be instantiable', () => {
    const goic = new GOIC({
      trash: randomGeometryCollection()
    });

    expect(goic).to.exist;
    expect(goic.trash).to.exist;
    expect(goic.trash.type).to.exist;
    expect(goic.trash.geometries).to.exist;
  });

  it('should be able to generate fake seed', () => {
    const goic = GOIC.fake();

    expect(goic.trash).to.exist;
    expect(goic.trash.type).to.exist;
    expect(goic.trash.geometries).to.exist;
  });

  it('should be able to validate - valid', (done) => {
    const goic = new GOIC({
      trash: randomGeometryCollection()
    });

    goic.validate(function (error) {
      expect(error).to.not.exist;
      done();
    });
  });

  it('should be able to validate - invalid', (done) => {
    const goic = new GOIC({
      trash: {
        geometries: [Math.random()]
      }
    });

    goic.validate(function (error) {
      expect(error).to.exist;
      expect(error.name).to.be.equal('ValidationError');
      expect(error.errors.trash).to.exist;
      expect(error.errors.trash.message)
        .to.be.equal(
          'trash is not a valid GeoJSON GeometryCollection');
      done();
    });
  });

  it('should be able to save - valid', (done) => {
    const goic = new GOIC({
      trash: randomGeometryCollection()
    });

    goic.save((error, saved) => {
      expect(error).to.not.exist;
      expect(saved).to.exist;
      expect(saved).to.exist;
      expect(saved.trash).to.exist;

      expect(saved.trash.type).to.exist;
      expect(saved.trash.type).to.be.a('string');
      expect(saved.trash.type).to.be.equal('GeometryCollection');

      expect(saved.trash.geometries).to.exist;
      expect(saved.trash.geometries).to.be.an('array');
      expect(saved.trash.geometries).to.have.length.at.least(1);

      done(error, saved);
    });
  });

  it('should be able to find saved', (done) => {
    GOIC
      .findOne((error, found) => {
        expect(error).to.not.exist;
        expect(found).to.exist;
        expect(found).to.exist;
        expect(found.trash).to.exist;

        expect(found.trash.type).to.exist;
        expect(found.trash.type).to.be.a('string');
        expect(found.trash.type).to.be.equal('GeometryCollection');

        expect(found.trash.geometries).to.exist;
        expect(found.trash.geometries).to.be.an('array');
        expect(found.trash.geometries).to.have.length.at.least(1);

        done(error, found);
      });
  });

  it('should not save - invalid', (done) => {
    const goic = new GOIC({
      trash: {
        geometries: [Math.random()]
      }
    });

    goic.save((error, saved) => {
      expect(error).to.exist;
      expect(saved).to.not.exist;
      done();
    });
  });


  after((done) => {
    GOIC.deleteMany(done);
  });

});