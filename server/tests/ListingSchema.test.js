var should = require('should'), 
    mongoose = require('mongoose'), 
    Listing = require('../models/ListingSchema'), 
    config = require('../config/config');

var listing;
var id;

listing = {
    modelNumber: "A101",
    description: "Wooden coffin",
    type: "Casket",
    price: 1000,
    compareToPrice: 5000,
    stock: 10,
    tags: ["Wooden","Oak","Casket"]
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
  
      it('saves properly when model number, description, price and type are given', function(done){
        new Listing({
          modelNumber: listing.modelNumber, 
          description: listing.description,
          price: listing.price,
          type: listing.type
        }).save(function(err, listing){
          should.not.exist(err);
          id = listing._id;
          done();
        });
      });
  
      it('saves properly when all properties provided', function(done){
        new Listing(listing).save(function(err, listing){
          should.not.exist(err);
          id = listing._id;
          done();
        });
      });
  
      it('throws an error when model number not provided', function(done){
        new Listing({
          description: listing.description,
          price: listing.price,
          type: listing.type
        }).save(function(err){
          should.exist(err);
          done();
        })
      });
  
      it('throws an error when description not provided', function(done){
        new Listing({
          modelNumber: listing.modelNumber,
          price: listing.price,
          type: listing.type
        }).save(function(err){
          should.exist(err);
          done();
        })
      });
      it('throws an error when price not provided', function(done){
          new Listing({
            modelNumber: listing.modelNumber,
            description: listing.description,
            type: listing.type,
          }).save(function(err){
              should.exist(err);
              done();
          })
      });

      it('throws an error when type not provided', function(done){
        new Listing({
          modelNumber: listing.modelNumber,
          description: listing.description,
          price: listing.price
        }).save(function(err){
            should.exist(err);
            done();
        })
    });
  
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
  