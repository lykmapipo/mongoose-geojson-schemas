import _ from 'lodash';
import { createTestModel, expect } from '@lykmapipo/mongoose-test-helpers';
import { LineString, GEO_2DSPHERE } from '../src';

describe('LineString', () => {
  let LOI;

  it('should be a schema', () => {
    // assert shape
    expect(LineString).to.be.an('object');
    expect(LineString.index).to.be.equal(GEO_2DSPHERE);
    expect(LineString.type).to.be.an('object');
    expect(LineString.type.constructor.name).to.be.equal('Schema');

    // assert point type
    expect(LineString.type.paths.type).to.exist;
    expect(LineString.type.paths.type.constructor.name).to.be.equal(
      'SchemaString'
    );

    // assert coordinates
    expect(LineString.type.paths.coordinates).exist;
    expect(LineString.type.paths.coordinates.constructor.name).to.be.equal(
      'SchemaArray'
    );
  });

  it('indexes are created when model is compiled', (done) => {
    LOI = createTestModel({
      road: LineString,
    });

    LOI.on('index', () => {
      LOI.collection.getIndexes({ full: true }, (error, indexes) => {
        // assert indexes
        expect(error).to.not.exist;
        expect(indexes).to.exist;
        expect(indexes).to.have.length.at.least(2);

        // assert road 2dsphere index
        const index = _.find(indexes, { key: { road: GEO_2DSPHERE } });
        expect(index).to.exist;
        expect(index).to.be.an('object');

        done(error, indexes);
      });
    });
  });

  it('should be able to generate fake seed', () => {
    const loi = LOI.fake();

    expect(loi.road).to.exist;
    expect(loi.road.type).to.exist;
    expect(loi.road.coordinates).to.exist;
  });

  it('should be instantiable', () => {
    const loi = new LOI({
      road: {
        coordinates: [
          [100.0, 0.0],
          [101.0, 1.0],
        ],
      },
    });

    expect(loi).to.exist;
    expect(loi.road).to.exist;
    expect(loi.road.type).to.exist;
    expect(loi.road.coordinates).to.exist;
  });

  it('should be able to validate - valid', (done) => {
    const loi = new LOI({
      road: {
        coordinates: [
          [100.0, 0.0],
          [101.0, 1.0],
        ],
      },
    });

    loi.validate((error) => {
      expect(error).to.not.exist;
      done();
    });
  });

  it('should be able to validate - valid', (done) => {
    const loi = LOI.fake();
    loi.validate((error) => {
      expect(error).to.not.exist;
      done();
    });
  });

  it('should be able to validate - invalid', (done) => {
    const loi = new LOI({
      road: {
        coordinates: [Math.random()],
      },
    });

    loi.validate((error) => {
      expect(error).to.exist;
      expect(error.name).to.be.equal('ValidationError');
      expect(error.errors.road).to.exist;
      expect(error.errors.road.message).to.be.equal(
        'road is not a valid GeoJSON LineString'
      );
      done();
    });
  });

  it('should be able to save - valid', (done) => {
    const loi = new LOI({
      road: {
        coordinates: [
          [100.0, 0.0],
          [101.0, 1.0],
        ],
      },
    });

    loi.save((error, saved) => {
      expect(error).to.not.exist;
      expect(saved).to.exist;
      expect(saved).to.exist;
      expect(saved.road).to.exist;

      expect(saved.road.type).to.exist;
      expect(saved.road.type).to.be.a('string');
      expect(saved.road.type).to.be.equal('LineString');

      expect(saved.road.coordinates).to.exist;
      expect(saved.road.coordinates).to.be.an('array');
      expect(saved.road.coordinates).to.have.length(2);

      done(error, saved);
    });
  });

  it('should be able to save - valid', (done) => {
    const loi = LOI.fake();

    loi.save((error, saved) => {
      expect(error).to.not.exist;
      expect(saved).to.exist;
      expect(saved).to.exist;
      expect(saved.road).to.exist;

      expect(saved.road.type).to.exist;
      expect(saved.road.type).to.be.a('string');
      expect(saved.road.type).to.be.equal('LineString');

      expect(saved.road.coordinates).to.exist;
      expect(saved.road.coordinates).to.be.an('array');
      expect(saved.road.coordinates).to.have.length(
        saved.road.coordinates.length
      );

      done(error, saved);
    });
  });

  it('should be able to save - valid', (done) => {
    const loi = {
      road: {
        coordinates: [
          [100.0, 0.0],
          [101.0, 1.0],
        ],
      },
    };

    LOI.create(loi, (error, created) => {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created).to.exist;
      expect(created.road).to.exist;

      expect(created.road.type).to.exist;
      expect(created.road.type).to.be.a('string');
      expect(created.road.type).to.be.equal('LineString');

      expect(created.road.coordinates).to.exist;
      expect(created.road.coordinates).to.be.an('array');
      expect(created.road.coordinates).to.have.length(2);

      done(error, created);
    });
  });

  it('should be able to find saved', (done) => {
    LOI.findOne((error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(found).to.exist;
      expect(found.road).to.exist;

      expect(found.road.type).to.exist;
      expect(found.road.type).to.be.a('string');
      expect(found.road.type).to.be.equal('LineString');

      expect(found.road.coordinates).to.exist;
      expect(found.road.coordinates).to.be.an('array');
      expect(found.road.coordinates).to.have.length.at.least(2);

      done(error, found);
    });
  });

  it('should not save - invalid', (done) => {
    const poi = new LOI({
      road: {
        coordinates: [Math.random()],
      },
    });

    poi.save((error, saved) => {
      expect(error).to.exist;
      expect(saved).to.not.exist;
      done();
    });
  });

  after((done) => {
    LOI.deleteMany(done);
  });
});
