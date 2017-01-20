var socket = io();
$('.update-btn').click(function(){
  socket.emit('random number');
})

socket.on('update number', function(data){
  $('.fans-num').text(data);
})
