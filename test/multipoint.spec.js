import _ from 'lodash';
import { createTestModel, expect } from '@lykmapipo/mongoose-test-helpers';
import { MultiPoint, GEO_2DSPHERE } from '../src';

describe('MultiPoint', () => {
  let MPOI;

  it('should be a schema', () => {
    // assert shape
    expect(MultiPoint).to.be.an('object');
    expect(MultiPoint.index).to.be.equal(GEO_2DSPHERE);
    expect(MultiPoint.type).to.be.an('object');
    expect(MultiPoint.type.constructor.name).to.be.equal('Schema');

    // assert point type
    expect(MultiPoint.type.paths.type).to.exist;
    expect(MultiPoint.type.paths.type.constructor.name).to.be.equal(
      'SchemaString'
    );

    // assert coordinates
    expect(MultiPoint.type.paths.coordinates).exist;
    expect(MultiPoint.type.paths.coordinates.constructor.name).to.be.equal(
      'SchemaArray'
    );
  });

  it('indexes are created when model is compiled', (done) => {
    MPOI = createTestModel({
      waterpoint: MultiPoint,
    });

    MPOI.on('index', () => {
      MPOI.collection.getIndexes({ full: true }, (error, indexes) => {
        // assert indexes
        expect(error).to.not.exist;
        expect(indexes).to.exist;
        expect(indexes).to.have.length.at.least(2);

        // assert waterpoint 2dsphere index
        const index = _.find(indexes, { key: { waterpoint: GEO_2DSPHERE } });
        expect(index).to.exist;
        expect(index).to.be.an('object');

        done(error, indexes);
      });
    });
  });

  it('should be instantiable', () => {
    const mpoi = new MPOI({
      waterpoint: {
        coordinates: [
          [100.0, 0.0],
          [101.0, 1.0],
        ],
      },
    });

    expect(mpoi).to.exist;
    expect(mpoi.waterpoint).to.exist;
    expect(mpoi.waterpoint.type).to.exist;
    expect(mpoi.waterpoint.coordinates).to.exist;
  });

  it('should be able to generate fake seed', () => {
    const mpoi = MPOI.fake();

    expect(mpoi.waterpoint).to.exist;
    expect(mpoi.waterpoint.type).to.exist;
    expect(mpoi.waterpoint.coordinates).to.exist;
  });

  it('should be able to validate - valid', (done) => {
    const mpoi = new MPOI({
      waterpoint: {
        coordinates: [
          [100.0, 0.0],
          [101.0, 1.0],
        ],
      },
    });

    mpoi.validate((error) => {
      expect(error).to.not.exist;
      done();
    });
  });

  it('should be able to validate - invalid', (done) => {
    const mpoi = new MPOI({
      waterpoint: {
        coordinates: [Math.random()],
      },
    });

    mpoi.validate((error) => {
      expect(error).to.exist;
      expect(error.name).to.be.equal('ValidationError');
      expect(error.errors.waterpoint).to.exist;
      expect(error.errors.waterpoint.message).to.be.equal(
        'waterpoint is not a valid GeoJSON MultiPoint'
      );
      done();
    });
  });

  it('should be able to save - valid', (done) => {
    const mpoi = new MPOI({
      waterpoint: {
        coordinates: [
          [100.0, 0.0],
          [101.0, 1.0],
        ],
      },
    });

    mpoi.save((error, saved) => {
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

  it('should be able to save - valid', (done) => {
    const mpoi = {
      waterpoint: {
        coordinates: [
          [100.0, 0.0],
          [101.0, 1.0],
        ],
      },
    };

    MPOI.create(mpoi, (error, created) => {
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

  it('should be able to find saved', (done) => {
    MPOI.findOne((error, found) => {
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

  it('should not save - invalid', (done) => {
    const mpoi = new MPOI({
      waterpoint: {
        coordinates: [Math.random()],
      },
    });

    mpoi.save((error, saved) => {
      expect(error).to.exist;
      expect(saved).to.not.exist;
      done();
    });
  });

  after((done) => {
    MPOI.deleteMany(done);
  });
});
