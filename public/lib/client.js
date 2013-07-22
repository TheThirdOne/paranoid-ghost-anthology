var socket = io.connect('http://localhost');
var player;
var other;
var players = [];
socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
});
socket.on('return', function (data) {
	console.log(data);
	document.getElementById("button").innerHTML = data.text;
});
socket.on(library.protocals.ping_awk, function (data) {
	console.log("ping:" + (new Date().getTime() - time));
});
socket.on(library.protocals.init, function (data) {
    player = data;
    player.others = [];
    socket.emit(library.protocals.init_awk, {});
    draw();
});
socket.on(library.protocals.update, function (data) {
    other = data;
    console.log(data.name);
    players[data.name] = data;
    console.log(players);
    socket.emit(library.protocals.update_awk, {});
    draw();
});
var canvas = document.getElementById("main");
var context = canvas.getContext("2d");
context.fillStyle = "rgb(200,0,0)";
var ping = new Date().getTime();
socket.emit(library.protocals.ping,{});
var time;
var x = 0;
function draw() {
    requestAnimationFrame(draw);
    var now = new Date().getTime(),
        dt = now - (time || now);
//    console.log(dt);
    time = now;
//    console.log(this.x);
    x += dt/20;
    context.clearRect(0, 0, canvas.width,canvas.height);
    players.forEach(function(ele, ind ,arr){
        context.fillRect (ele.x, ele.y, 55, 50);
    });
    context.fillRect (player.x, player.y, 55, 50);
}
canvas.onclick = function(evt){
    var rect = canvas.getBoundingClientRect();
    player.x = evt.clientX - rect.left;
    player.y = evt.clientY - rect.top;
    socket.emit(library.protocals.update, player);
};

