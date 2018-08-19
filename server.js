const express = require('express'),
      path =  require('path'),
      port = process.env.PORT || 8000,
      app = express();

let counter = 0;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', function(request, response) {
  response.render('index');
});

const server = app.listen(port, () => console.log(`listening on ${port}`)),
      io = require('socket.io')(server);

io.on('connection', function(socket) {

  socket.emit('current_count', { count: counter });

  socket.on('increment_count', function() {
    counter += 1;
    io.emit('update_count', { count: counter });
  });

  socket.on('reset_count', function() {
    counter = 0;
    io.emit('update_count', { count: counter });
  });

});
