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
  server.post('/customers', async (req, res, next) => {
    //check for JSON
    if(!req.is('application/json')) {
      return next(new errors.InvalidContentError("Expects 'application/json'"));
    }

    const { name, email, balance } = req.body;

    const customer = new Customer({
      name: name,
      email: email,
      balance: balance
    });

    try {
      const newCustomer = await customer.save();
      //201 is a response where everything was ok but something was created
      res.send(201);
      next();
    } catch(err) {
      return next(newErrors.InternalError(err.message));
    }
  });
};
