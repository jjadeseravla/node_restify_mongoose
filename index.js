const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');

//initialize server
const server = restify.createServer();

//middleware
server.use(restify.plugins.bodyParser());

// server.get('/hello/:name', respond);
// server.head('/hello/:name', respond);

server.listen(config.PORT, function() {
  mongoose.set('useFindAndModify', false);
  mongoose.connect(config.MONGODB_URI, { userNewURLParser: true }
  );
});

const db = mongoose.connection;

db.on('error', (err) => console.log(err));

//opening db and it only happens once.
db.once('open', () => {
  require('./routes/customers')(server);
  require('./routes/users')(server);
  console.log('server started on port' + config.PORT);
})
