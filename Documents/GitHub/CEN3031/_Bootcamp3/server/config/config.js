//copy this file's contents to another file 'config.js' and store your MongoLab uri there

module.exports = {
  db: {
    uri: 'mongodb+srv://JoseQ:AlbaC@cen3031-firstcluster-sr3yl.mongodb.net/test?retryWrites=true&w=majority',//place the URI of your mongo database here.
  }, 
  openCage: {
    key: '80746c4d9d7e49a6ae7ba453e7398d8b' //place your openCage public key here - Sign-up for a free key https://opencagedata.com/
  },
  port: 8080
};