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

  //get single customer
  server.get('/customers/:id', async (req, res, next) => {
    try{
      const customers = await Customer.findById(req.params.id);
      res.send(customer);
      next();
    } catch(err) {
      return next(
        new errors.resourceNotFoundError(
          'there is no customer with the id of' + req.params.id));
    }
  });

  //add customer
  server.post('/customers', async (req, res, next) => {
    //check for JSON
    if(!req.is('application/json')) {
      return next(new errors.InvalidContentError("Expects 'application/json'"
      )
    );
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

  //update customer
  server.put('/customers/:id', async (req, res, next) => {
    //check for JSON
    if(!req.is('application/json')) {
      return next(new errors.InvalidContentError("Expects 'application/json'"));
    }

    try {
      const customer = await Customer.findOneAndUpdate({ _id: req.params.id }, req.body);
      res.send(200);
      next();
    } catch(err) {
      return next(newErrors.InternalError(err.message));
    }
  });

  //delete customer
  server.del('/customers/:id', async (req, res, next) => {
    try {
      const customer = await Customer.findOneAndRemove({ _id: req.params.id });
      //204 something was removed
      res.send(204);
      next();
    } catch(err) {
      return next(
        new errors.resourceNotFoundError(
          'there is no customer with the id of' + req.params.id
        )
      );
    }
  });
};
