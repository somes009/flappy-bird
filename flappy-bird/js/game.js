//构造游戏
function Game() {
    this.sky = document.getElementById('game');
    this.oBird = document.getElementsByClassName('bird')[0];
    this.oStart = document.getElementsByClassName('start')[0];
    this.skyPosition = 0;
    this.birdTop = 220;
    this.startColor = 'white';
    this.skySpeed = 2;
    //初始化方法
    this.init = function () {
        this.timer();
    }
    //定时器
    this.timer = function () {
        var count = 0;
        setInterval( () => {
            this.skyMove();
            if (++count % 10 === 0) {
                this.birdJump();
                this.birdFly(count);
                this.colorChange();
            }
        }, 30);
    }
    //天空移动
    this.skyMove = function () {
        this.skyPosition -= this.skySpeed;
        this.sky.style.backgroundPositionX = this.skyPosition + 'px';
    }
    //小鸟上下蹦
    this.birdJump = function () {
        this.birdTop = this.birdTop === 220 ? 260 : 220;
        this.oBird.style.top = this.birdTop + 'px';
    }
    //小鸟扇翅膀
    this.birdFly = function (count) {
        this.oBird.style.backgroundPositionX = count * -30 + 'px';
    }
    //开始游戏字体变化
    this.colorChange = function () {
        var newColor = this.startColor;
        this.startColor = this.startColor === 'white' ? 'blue' : 'white';
        this.oStart.classList.remove(newColor);
        this.oStart.className = 'start ' + this.startColor;
    }
}

var game = new Game();
game.timer();