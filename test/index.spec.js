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
  parseCoordinateString,
  toCoordinateString
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

  describe('parseCoordinateString', () => {
    it('should not parse empty string coordinates', () => {
      const coords = '';
      const geometry = parseCoordinateString(coords);
      expect(geometry).to.not.exist;
    });

    it('should parse a point', () => {
      const coords = '30,10';
      const geometry = parseCoordinateString(coords);
      expect(geometry).to.exist;
      expect(geometry.type).to.be.equal('Point');
      expect(geometry.coordinates).to.exist;
      expect(geometry.coordinates).to.be.an('array');
    });

    it('should parse a polygon', () => {
      const coords = '35,10 45,45 15,40 10,20 35,10';
      const geometry = parseCoordinateString(coords);
      expect(geometry).to.exist;
      expect(geometry.type).to.be.equal('Polygon');
      expect(geometry.coordinates).to.exist;
      expect(geometry.coordinates).to.be.an('array');
    });

    it('should parse and return coordinates', () => {
      const coords = '10,40 40,30 20,20 30,10';
      const coordinates = parseCoordinateString(coords);
      expect(coordinates).to.exist;
      expect(coordinates).to.be.an('array');
    });
  });

  describe('toCoordinateString', () => {

    it('should format a point', () => {
      const _coords = '30,10';
      const geometry = parseCoordinateString(_coords);
      const coords = toCoordinateString(geometry);
      expect(coords).to.be.equal(_coords);
    });

    it('should format a polygon', () => {
      const _coords = '35,10 45,45 15,40 10,20 35,10';
      const geometry = parseCoordinateString(_coords);
      const coords = toCoordinateString(geometry);
      expect(coords).to.be.equal(_coords);
    });

    it('should format array of coordinates', () => {
      const _coords = '10,40 40,30 20,20 30,10';
      const geometry = parseCoordinateString(_coords);
      const coords = toCoordinateString(geometry);
      expect(coords).to.be.equal(_coords);
    });
  });

});