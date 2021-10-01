import _ from 'lodash';
import { createTestModel, expect } from '@lykmapipo/mongoose-test-helpers';
import {
  Geometry,
  GEO_2DSPHERE,
  randomPoint,
  randomLineString,
  randomPolygon,
} from '../src';

describe('Geometry', () => {
  let GOI;

  it('should be a schema', () => {
    // assert shape
    expect(Geometry).to.be.an('object');
    expect(Geometry.index).to.be.equal(GEO_2DSPHERE);
    expect(Geometry.type).to.be.an('object');
    expect(Geometry.type.constructor.name).to.be.equal('Schema');

    // assert point type
    expect(Geometry.type.paths.type).to.exist;
    expect(Geometry.type.paths.type.constructor.name).to.be.equal(
      'SchemaString'
    );

    // assert coordinates
    expect(Geometry.type.paths.coordinates).exist;
    expect(Geometry.type.paths.coordinates.constructor.name).to.be.equal(
      'SchemaArray'
    );
  });

  it('indexes are created when model is compiled', (done) => {
    GOI = createTestModel({
      point: Geometry,
      line: Geometry,
      polygon: Geometry,
    });

    GOI.on('index', () => {
      GOI.collection.getIndexes({ full: true }, (error, indexes) => {
        // assert indexes
        expect(error).to.not.exist;
        expect(indexes).to.exist;
        expect(indexes).to.have.length.at.least(4);

        // assert point 2dsphere index
        let index = _.find(indexes, { key: { point: GEO_2DSPHERE } });
        expect(index).to.exist;
        expect(index).to.be.an('object');

        // assert line 2dsphere index
        index = _.find(indexes, { key: { line: GEO_2DSPHERE } });
        expect(index).to.exist;
        expect(index).to.be.an('object');

        // assert polygon 2dsphere index
        index = _.find(indexes, { key: { polygon: GEO_2DSPHERE } });
        expect(index).to.exist;
        expect(index).to.be.an('object');

        done(error, indexes);
      });
    });
  });

  it('should be instantiable with point', () => {
    const poi = new GOI({
      point: randomPoint(),
    });

    expect(poi).to.exist;
    expect(poi.point).to.exist;
    expect(poi.point.type).to.exist;
    expect(poi.point.coordinates).to.exist;
  });

  it('should be instantiable with line', () => {
    const loi = new GOI({
      line: randomLineString(),
    });

    expect(loi).to.exist;
    expect(loi.line).to.exist;
    expect(loi.line.type).to.exist;
    expect(loi.line.coordinates).to.exist;
  });

  it('should be instantiable with polygon', () => {
    const poi = new GOI({
      polygon: randomPolygon(),
    });

    expect(poi).to.exist;
    expect(poi.polygon).to.exist;
    expect(poi.polygon.type).to.exist;
    expect(poi.polygon.coordinates).to.exist;
  });

  it('should be able to validate - valid point', (done) => {
    const poi = new GOI({
      point: randomPoint(),
    });

    poi.validate((error) => {
      expect(error).to.not.exist;
      done();
    });
  });

  it('should be able to validate - valid line', (done) => {
    const loi = new GOI({
      line: randomLineString(),
    });

    loi.validate((error) => {
      expect(error).to.not.exist;
      done();
    });
  });

  it('should be able to validate - valid polygon', (done) => {
    const poi = new GOI({
      polygon: randomPolygon(),
    });

    poi.validate((error) => {
      expect(error).to.not.exist;
      done();
    });
  });

  it('should be able to validate - invalid point', (done) => {
    const poi = new GOI({
      point: {
        coordinates: [Math.random()],
      },
    });

    poi.validate((error) => {
      expect(error).to.exist;
      expect(error.name).to.be.equal('ValidationError');
      expect(error.errors.point).to.exist;
      expect(error.errors.point.message).to.be.equal(
        'point is not a valid GeoJSON Geometry'
      );
      done();
    });
  });

  it('should be able to save - valid point', (done) => {
    const poi = new GOI({
      point: randomPoint(),
    });

    poi.save((error, saved) => {
      expect(error).to.not.exist;
      expect(saved).to.exist;
      expect(saved).to.exist;
      expect(saved.point).to.exist;

      expect(saved.point.type).to.exist;
      expect(saved.point.type).to.be.a('string');
      expect(saved.point.type).to.be.equal('Point');

      expect(saved.point.coordinates).to.exist;
      expect(saved.point.coordinates).to.be.an('array');
      expect(saved.point.coordinates).to.have.length(2);

      done(error, saved);
    });
  });

  it('should be able to save - valid point', (done) => {
    const poi = {
      point: randomPoint(),
    };

    GOI.create(poi, (error, created) => {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created).to.exist;
      expect(created.point).to.exist;

      expect(created.point.type).to.exist;
      expect(created.point.type).to.be.a('string');
      expect(created.point.type).to.be.equal('Point');

      expect(created.point.coordinates).to.exist;
      expect(created.point.coordinates).to.be.an('array');
      expect(created.point.coordinates).to.have.length(2);

      done(error, created);
    });
  });

  it('should be able to find saved - point', (done) => {
    GOI.findOne((error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(found).to.exist;
      expect(found.point).to.exist;

      expect(found.point.type).to.exist;
      expect(found.point.type).to.be.a('string');

      expect(found.point.coordinates).to.exist;
      expect(found.point.coordinates).to.be.an('array');

      done(error, found);
    });
  });

  it('should not save - invalid', (done) => {
    const poi = new GOI({
      point: {
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
    GOI.deleteMany(done);
  });
});
