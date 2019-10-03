/*Note about model test
  This is not actually testing how content gets saved in your database or not. 
  It is testing that you model works. If you deleted your database this would still work. 
  If you ran this with the code provided in the assignment it would still pass most tests because 
  you have empty constructors.

  Note: It may actually run initially but save garbage in your database that will then cause
  other issues later. So delete your database so 
  you can start clean once you complete the  listings.server.model.js file 


  */

var should = require('should'), 
    mongoose = require('mongoose'), 
    Listing = require('../models/listings.server.model'), 
    config = require('../config/config');

var listing, id, latitude, longitude;

listing =  {
  code: "LBWEST", 
  name: "Library West", 
  address: "1545 W University Ave, Gainesville, FL 32603, United States"
}

describe('Listing Schema Unit Tests', function() {

  before(function(done) {
    mongoose.connect(config.db.uri, { useNewUrlParser: true });
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);
    done();
  });

  describe('Saving to database', function() {
    /*
      Mocha's default timeout for tests is 2000ms. To ensure that the tests do not fail 
      prematurely, we can increase the timeout setting with the method this.timeout()
     */
    this.timeout(10000);

    it('saves properly when code and name provided', function(done){
      new Listing({
        name: listing.name, 
        code: listing.code
      }).save(function(err, listing){
        should.not.exist(err);
        id = listing._id;
        done();
      });
    });

    it('saves properly when all three properties provided', function(done){
      new Listing(listing).save(function(err, listing){
        should.not.exist(err);
        id = listing._id;
        done();
      });
    });

    it('throws an error when name not provided', function(done){
      new Listing({
        code: listing.code
      }).save(function(err){
        should.exist(err);
        done();
      })
    });

    it('throws an error when code not provided', function(done){
      new Listing({
        name: listing.name
      }).save(function(err){
        should.exist(err);
        done();
      })
    });

  });

  it('throws an error when adress and code not provided', function(done){
    new Listing({
      address: listing.address
    }, {code: listing.code}).save(function(err){
      should.exist(err);
      done();
    })
  });

  it('throws an error when name and code not provided', function(done){
    new Listing({
      name: listing.name
    }, {code: listing.code}).save(function(err){
      should.exist(err);
      done();
    })
  });

  afterEach(function(done) {
    if(id) {
      Listing.deleteOne({ _id: id }).exec(function() {
        id = null;
        done();
      });
    } else {
      done();
    }
  });
});