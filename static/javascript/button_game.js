$(document).ready(function() {

  var socket = io();

  $('#epic_button').click(function() {
    socket.emit('increment_count');
  });

  $('#reset_button').click(function() {
    socket.emit('reset_count');
  });

  socket.on('current_count', function(data) {
    countMessage(data.count);
  });

  socket.on('update_count', function(data) {
    countMessage(data.count);
  });


});

function countMessage(count) {
  $('#count').html(`The button has been pushed ${count} time(s)`);
}
