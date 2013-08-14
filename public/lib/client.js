var socket = io.connect('http://localhost');
var player;
var other;
var players = [];
var keys = [];
var bindings = [];
bindings[87] = "jump"; //bindings for actions in library.actions
bindings[83] = "fall"; //binds key code to function name
var ping = new Date().getTime();
socket.emit(library.protocals.ping,{});
socket.on(library.protocals.ping_awk, function (data) {
	console.log("ping:" + (new Date().getTime() - ping));
});
socket.on(library.protocals.init, function (data) {
    console.log(data);
    player = data.player;
    players = data.others;
    socket.emit(library.protocals.init_awk, {});
    draw();
});
socket.on(library.protocals.update, function (data) {
    other = data;
    players[data.name] = data;
    socket.emit(library.protocals.update_awk, {});
    draw();
});
var canvas = document.getElementById("main");
var context = canvas.getContext("2d");
context.fillStyle = "rgb(200,0,0)";
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
        if(!(ele==null||ele.name == player.name)){
            context.fillRect (ele.x, ele.y, 55, 50);
        }
    });
    context.fillRect (player.x, player.y, 55, 50);
}
canvas.onclick = function(evt){
    var rect = canvas.getBoundingClientRect();
    player.x = evt.clientX - rect.left;
    player.y = evt.clientY - rect.top;
    socket.emit(library.protocals.update, player);
};
canvas.onmousemove = function(evt){
    var rect = canvas.getBoundingClientRect();
    player.x = evt.clientX - rect.left;
    player.y = evt.clientY - rect.top;
    socket.emit(library.protocals.update, player);
};
document.onkeydown = function(evt){
    if(!keys[evt.keyCode] ){
        console.log(evt);
        keys[evt.keyCode] = true;
        if(bindings[evt.keyCode])
            socket.emit(library.protocals.action, {action: bindings[evt.keycode], turn: true});
    }
};
document.onkeyup = function(evt){
    console.log(evt);
    keys[evt.keyCode] = false;
    if(bindings[evt.keyCode])
        socket.emit(library.protocals.action, {action: bindings[evt.keycode], turn: false});
};

