import { connect, drop } from '@lykmapipo/mongoose-test-helpers';

process.env.NODE_ENV = 'test';

process.env.GEO_BBOX =
  '39.18239593505859,-6.866780089745249,39.280242919921875,-6.76553393902715';

before((done) => connect(done));

after((done) => drop(done));
