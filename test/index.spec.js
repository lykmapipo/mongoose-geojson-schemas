'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');
const {
  randomPoint,
  randomMultiPoint,
  randomLineString,
  randomMultiLineString,
  randomPolygon,
  randomMultiPolygon,
  centroidOf,
  fromString
} = require(path.join(__dirname, '..'));

describe('GeoJSON', () => {

  it('should be able to generate randomPoint', () => {
    const point = randomPoint();
    expect(point).to.exist;
    expect(point).to.be.an('object');
    expect(point.type).to.exist;
    expect(point.type).to.be.equal('Point');
    expect(point.coordinates).to.exist;
  });


  it('should be able to generate randomPoints', () => {
    const points = randomPoint(2);
    expect(points).to.exist;
    expect(points).to.be.an('array');
    expect(points).to.have.length(2);
  });


  it('should be able to generate randomMultiPoint', () => {
    const multipoint = randomMultiPoint();
    expect(multipoint).to.exist;
    expect(multipoint).to.be.an('object');
    expect(multipoint.type).to.exist;
    expect(multipoint.type).to.be.equal('MultiPoint');
    expect(multipoint.coordinates).to.exist;
    expect(multipoint.coordinates).to.have.length(2);
  });


  it('should be able to generate randomMultiPoints', () => {
    const multipoints = randomMultiPoint(2);
    expect(multipoints).to.exist;
    expect(multipoints).to.be.an('array');
    expect(multipoints).to.have.length(2);
  });



  it('should be able to generate randomLineString', () => {
    const line = randomLineString();
    expect(line).to.exist;
    expect(line).to.be.an('object');
    expect(line.type).to.exist;
    expect(line.type).to.be.equal('LineString');
    expect(line.coordinates).to.exist;
  });


  it('should be able to generate randomMultiLineString', () => {
    const multiline = randomMultiLineString();
    expect(multiline).to.exist;
    expect(multiline).to.be.an('object');
    expect(multiline.type).to.exist;
    expect(multiline.type).to.be.equal('MultiLineString');
    expect(multiline.coordinates).to.exist;
  });


  it('should be able to generate randomLineStrings', () => {
    const lines = randomLineString(2);
    expect(lines).to.exist;
    expect(lines).to.be.an('array');
    expect(lines).to.have.length(2);
  });

  it('should be able to generate randomMultiLineStrings', () => {
    const multilines = randomMultiLineString(2);
    expect(multilines).to.exist;
    expect(multilines).to.be.an('array');
    expect(multilines).to.have.length(2);
  });


  it('should be able to generate randomPolygon', () => {
    const polygon = randomPolygon();
    expect(polygon).to.exist;
    expect(polygon).to.be.an('object');
    expect(polygon.type).to.exist;
    expect(polygon.type).to.be.equal('Polygon');
    expect(polygon.coordinates).to.exist;
  });

  it('should be able to generate randomMultiPolygon', () => {
    const multipolygon = randomMultiPolygon();
    expect(multipolygon).to.exist;
    expect(multipolygon).to.be.an('object');
    expect(multipolygon.type).to.exist;
    expect(multipolygon.type).to.be.equal('MultiPolygon');
    expect(multipolygon.coordinates).to.exist;
  });


  it('should be able to generate randomPolygons', () => {
    const polygons = randomPolygon(2);
    expect(polygons).to.exist;
    expect(polygons).to.be.an('array');
    expect(polygons).to.have.length(2);
  });

  it('should be able to generate randomMultiPolygons', () => {
    const multipolygons = randomMultiPolygon(2);
    expect(multipolygons).to.exist;
    expect(multipolygons).to.be.an('array');
    expect(multipolygons).to.have.length(2);
  });

  it('should be able to compute polygon centroid', () => {
    const polygon = randomPolygon();
    const centroid = centroidOf(polygon);
    expect(centroid).to.exist;
    expect(centroid).to.be.an('object');
    expect(centroid.type).to.exist;
    expect(centroid.type).to.be.equal('Point');
    expect(centroid.coordinates).to.exist;
  });


  describe('bbox', () => {
    before(() => {
      process.env.GEOJSON_DEFAULT_BBOX = '-70, 20, -50, 40';
    });

    it('should be able to generate randomPoint with .env bbox', () => {
      const point = randomPoint();
      expect(point).to.exist;
      expect(point).to.be.an('object');
      expect(point.type).to.exist;
      expect(point.type).to.be.equal('Point');
      expect(point.coordinates).to.exist;

      //asset bbox
      expect(point.coordinates[0]).to.be.above(-70);
      expect(point.coordinates[0]).to.be.below(-50);
      expect(point.coordinates[1]).to.be.above(20);
      expect(point.coordinates[1]).to.be.below(40);
    });

    after(() => {
      delete process.env.GEOJSON_DEFAULT_BBOX;
    });
  });

  describe('fromString', () => {
    it('should not parse empty string coordinates', () => {
      const coords = '';
      const geometry = fromString(coords);
      expect(geometry).to.not.exist;
    });

    it('should parse a point', () => {
      const coords = '-10.6,40.2';
      const geometry = fromString(coords);
      expect(geometry).to.exist;
      expect(geometry.type).to.be.equal('Point');
      expect(geometry.coordinates).to.exist;
      expect(geometry.coordinates).to.be.an('array');
    });

    it('should parse a polygon', () => {
      const coords =
        '-8.3,31.7 -9,32.1 -9.2,32.6 -9.4,33 -9.5,33.6 -9.8,34.1 -10.3,34.4 -10.9,34.6 -11.5,34.7 -11.6,35.4 -11.3,35.8 -10.9,35.8 -10.2,35.7 -9.4,35.2 -8.9,34.7 -8.7,34.2 -8.3,33.3 -8.1,32.7 -8.3,31.7';
      const geometry = fromString(coords);
      expect(geometry).to.exist;
      expect(geometry.type).to.be.equal('Polygon');
      expect(geometry.coordinates).to.exist;
      expect(geometry.coordinates).to.be.an('array');
    });
  });

});