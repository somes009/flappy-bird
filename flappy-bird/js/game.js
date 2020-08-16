//背景图
var game = document.getElementById('game');
game.style.backgroundPositionX = '0px';
var gameTimer = setInterval(function () {
    game.style.backgroundPositionX = parseInt(game.style.backgroundPositionX) - 1 + 'px';
}, 20);
//小鸟
var bird = document.getElementsByClassName('bird')[0],
    speed = 60;
bird.style.backgroundPositionX = '0px';
bird.style.top = '235px';
bird.style.transition = 'top .5s';
//翅膀动
var birdTimer1 = setInterval( function () {
    bird.style.backgroundPositionX = parseInt(bird.style.backgroundPositionX) - 30 + 'px';
}, 250);
//上下动
var birdTimer2 = setInterval(function () { var top = parseInt(bird.style.top);
    speed *= -1;
    bird.style.top = top + speed + 'px';
}, 600)
//开始游戏字体大小
var start = document.getElementsByClassName('start')[0];
start.style.transition = 'all .4s';
var startTimer = setInterval(function () {
    start.className = start.className === 'start white' ? 'start blue' : 'start white';
}, 400)