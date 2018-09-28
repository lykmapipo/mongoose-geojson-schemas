'use strict';


/*** dependencies */
const path = require('path');
const _ = require('lodash');
const mongoose = require('mongoose');
const { expect } = require('chai');
const { Schema } = mongoose;
const { Point, GEO_2DSPHERE } = require(path.join(__dirname, '..'));


describe('Point', () => {

  let POI;
  const PoiSchema = new Schema({
    location: Point
  });

  it('should be a schema', () => {
    //assert shape
    expect(Point).to.be.an('object');
    expect(Point.index).to.be.equal(GEO_2DSPHERE);
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


  it('indexes are created when model is compiled', (done) => {
    POI = mongoose.model('POI', PoiSchema);

    POI.on('index', () => {
      POI
        .collection
        .getIndexes({ full: true }, (error, indexes) => {
          //assert indexes
          expect(error).to.not.exist;
          expect(indexes).to.exist;
          expect(indexes).to.have.length(2);

          //assert location 2dsphere index
          const index =
            (_.find(indexes, { key: { location: GEO_2DSPHERE } }));
          expect(index).to.exist;
          expect(index).to.be.an('object');

          done(error, indexes);
        });
    });
  });

  it('should be instantiable', () => {
    const poi = new POI({
      location: {
        coordinates: [-100.0, 0.0]
      }
    });

    expect(poi).to.exist;
    expect(poi.location).to.exist;
    expect(poi.location.type).to.exist;
    expect(poi.location.coordinates).to.exist;
  });

  it('should be able to generate fake seed', () => {
    const poi = POI.fake();

    expect(poi.location).to.exist;
    expect(poi.location.type).to.exist;
    expect(poi.location.coordinates).to.exist;
  });

  it('should be able to validate - valid', (done) => {
    const poi = new POI({
      location: {
        coordinates: [100.0, 0.0]
      }
    });

    poi.validate(function (error) {
      expect(error).to.not.exist;
      done();
    });
  });

  it('should be able to validate - invalid', (done) => {
    const poi = new POI({
      location: {
        coordinates: [Math.random()]
      }
    });

    poi.validate(function (error) {
      expect(error).to.exist;
      expect(error.name).to.be.equal('ValidationError');
      expect(error.errors.location).to.exist;
      expect(error.errors.location.message)
        .to.be.equal('location is not a valid GeoJSON Point');
      done();
    });
  });

  it('should be able to save - valid', (done) => {
    const poi = new POI({
      location: {
        coordinates: [100.0, 0.0]
      }
    });

    poi.save((error, saved) => {
      expect(error).to.not.exist;
      expect(saved).to.exist;
      expect(saved).to.exist;
      expect(saved.location).to.exist;

      expect(saved.location.type).to.exist;
      expect(saved.location.type).to.be.a('string');
      expect(saved.location.type).to.be.equal('Point');

      expect(saved.location.coordinates).to.exist;
      expect(saved.location.coordinates).to.be.an('array');
      expect(saved.location.coordinates).to.have.length(2);

      done(error, saved);
    });
  });

  it('should be able to save - valid', (done) => {
    const poi = {
      location: {
        coordinates: [100.0, 0.0]
      }
    };

    POI
      .create(poi, (error, created) => {
        expect(error).to.not.exist;
        expect(created).to.exist;
        expect(created).to.exist;
        expect(created.location).to.exist;

        expect(created.location.type).to.exist;
        expect(created.location.type).to.be.a('string');
        expect(created.location.type).to.be.equal('Point');

        expect(created.location.coordinates).to.exist;
        expect(created.location.coordinates).to.be.an('array');
        expect(created.location.coordinates).to.have.length(2);

        done(error, created);
      });
  });

  it('should be able to find saved', (done) => {
    POI
      .findOne((error, found) => {
        expect(error).to.not.exist;
        expect(found).to.exist;
        expect(found).to.exist;
        expect(found.location).to.exist;

        expect(found.location.type).to.exist;
        expect(found.location.type).to.be.a('string');
        expect(found.location.type).to.be.equal('Point');

        expect(found.location.coordinates).to.exist;
        expect(found.location.coordinates).to.be.an('array');
        expect(found.location.coordinates).to.have.length(2);

        done(error, found);
      });
  });

  it('should not save - invalid', (done) => {
    const poi = new POI({
      location: {
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
    POI.deleteMany(done);
  });

});