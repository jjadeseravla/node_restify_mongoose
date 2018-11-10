const errors = require('restify-errors');
const Customer = require('../models/Customer');

module.exports = server => {
  //get customers
  server.get('/customers', async (req, res, next) => {
    try{
      const customers = await Customer.find({});
      res.send(customers);
      next();
    } catch(err) {
      return next(new errors.InvalidContentError(err));
    }
  });

  //add customer
  server.post('/customers' async (req, res, next) => {
    //check for JSON
    if(!req.is('application/json')) {
      return next(new errors.InvalidContentError("Expects 'application/json'"));
    }

    const customer = new Customer
  });
};
