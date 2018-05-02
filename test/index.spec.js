'use strict';


/*** dependencies */
const path = require('path');
const { expect } = require('chai');
const {
  randomPoint,
  randomLineString,
  randomPolygon,
  centroidOf
} = require(path.join(__dirname, '..'));


describe('GeoJSON', function () {

  it('should be able to generate randomPoint', function () {
    const point = randomPoint();
    expect(point).to.exist;
    expect(point).to.be.an('object');
    expect(point.type).to.exist;
    expect(point.type).to.be.equal('Point');
    expect(point.coordinates).to.exist;
  });


  it('should be able to generate randomPoints', function () {
    const points = randomPoint(2);
    expect(points).to.exist;
    expect(points).to.be.an('array');
    expect(points).to.have.length(2);
  });


  it('should be able to generate randomLineString', function () {
    const line = randomLineString();
    expect(line).to.exist;
    expect(line).to.be.an('object');
    expect(line.type).to.exist;
    expect(line.type).to.be.equal('LineString');
    expect(line.coordinates).to.exist;
  });


  it('should be able to generate randomLineStrings', function () {
    const lines = randomLineString(2);
    expect(lines).to.exist;
    expect(lines).to.be.an('array');
    expect(lines).to.have.length(2);
  });


  it('should be able to generate randomPolygon', function () {
    const polygon = randomPolygon();
    expect(polygon).to.exist;
    expect(polygon).to.be.an('object');
    expect(polygon.type).to.exist;
    expect(polygon.type).to.be.equal('Polygon');
    expect(polygon.coordinates).to.exist;
  });


  it('should be able to generate randomPolygons', function () {
    const polygons = randomPolygon(2);
    expect(polygons).to.exist;
    expect(polygons).to.be.an('array');
    expect(polygons).to.have.length(2);
  });

  it('should be able to compute polygon centroid', function () {
    const polygon = randomPolygon();
    const centroid = centroidOf(polygon);
    expect(centroid).to.exist;
    expect(centroid).to.be.an('object');
    expect(centroid.type).to.exist;
    expect(centroid.type).to.be.equal('Point');
    expect(centroid.coordinates).to.exist;
  });

});