var should = require('should'), 
    request = require('supertest'), 
    express = require('../config/express'), 
    Listing = require('../models/ListingSchema');

/* Global variables */
var app, agent, id;

/* Unit tests for testing server side routes for the listings API */
describe('Listings CRUD tests', function() {

  this.timeout(10000);

  before(function(done) {
    app = express.init();
    agent = request.agent(app);

    done();
  });

  it('should it able to retrieve all listings', function(done) {
    agent.get('/api/listings')
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        should.exist(res);
        done();
      });
  });

  it('should be able to save a listing', function(done) {
    var listing = {
        modelNumber : 'TEST',
        description : 'Test Casket',
        price: 1200,
        type: 'Wood',
    };
    agent.post('/api/listings')
      .send(listing)
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        should.exist(res.body._id);
        res.body.modelNumber.should.equal('TEST');
        res.body.description.should.equal('Test Casket');
        res.body.price.should.equal(1200);
        res.body.type.should.equal('Wood');
        id = res.body._id;
        done();
      });
  });

  it('should be able to retrieve a single listing', function(done) {
    Listing.findOne({modelNumber: 'TEST'}, function(err, listing) {
      if(err) {
        console.log(err);
      } else {
        agent.get('/api/listings/' + listing._id)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
            should.exist(res);
            res.body.modelNumber.should.equal('TEST');
            res.body.description.should.equal('Test Casket');
            res.body.price.should.equal(1200);
            res.body.type.should.equal('Wood');
            done();
          });
      }
    });
  });

  it('should be able to update a listing', function(done) {
    var updatedListing = {
      modelNumber: 'CEN3031', 
      description: 'Casket for Software Engineering'
    };

    agent.put('/api/listings/' + id)
      .send(updatedListing)
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        should.exist(res.body._id);
        res.body.modelNumber.should.equal('CEN3031');
        res.body.description.should.equal('Casket for Software Engineering');
        done();
      });
  });

  it('should be able to delete a listing', function(done) {
    agent.delete('/api/listings/' + id)
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        should.exist(res);

        agent.get('/api/listings/' + id) 
          .expect(400)
          .end(function() {
            id = undefined;
            done();
          });
      })
  });

  after(function(done) {
    if(id) {
      Listing.deleteOne({_id: id}, function(err){
        if(err) throw err;
      }); 
    }else done();
  }); 
});