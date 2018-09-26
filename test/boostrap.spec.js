'use strict';


/* ensure test environment*/
process.env.NODE_ENV = 'test';


/* dependencies */
const mongoose = require('mongoose');


const wipe = (done) => {
  if (mongoose.connection && mongoose.connection.dropDatabase) {
    mongoose.connection.dropDatabase(done);
  } else {
    done();
  }
};


//setup database
before((done) => {
  const database = 'mongodb://localhost/mongoose-geojson-schemas';
  mongoose.connect(database, { useNewUrlParser: true }, done);
});


// clear database
before(wipe);


// clear database
after(wipe);