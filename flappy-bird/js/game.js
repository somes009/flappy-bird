//构造游戏
function Game() {
    this.sky = document.getElementById('game');
    this.oBird = document.getElementsByClassName('bird')[0];
    this.oStart = document.getElementsByClassName('start')[0];
    this.oScore = document.getElementsByClassName('score')[0];
    this.oMark = document.getElementsByClassName('mark')[0];
    this.oFinScore = document.getElementsByClassName('finnal-score')[0];
    this.reset = document.getElementsByClassName('reset')[0];
    this.skyPosition = 0;
    this.birdTop = 235;
    this.startColor = 'white';
    this.skyStep = 2;
    this.gameFlag = false;
    this.birdStepY = 1;
    this.minTop = 0;
    this.maxTop = 570;
    this.pipeArr = [];
    this.score = 0;
  /*  //初始化方法
    this.init = function () {
        game.score = 0;
        game.birdTop = 235;
        game.oMark.style.display = 'none';
        game.oScore.style.display = 'none';
        timer = game.timer();
        for (var key in game.pipeArr) {
            var up = game.pipeArr[key].up;
            var down = game.pipeArr[key].down;
            game.sky.removeChild(up);
            game.sky.removeChild(down);
        }
        game.pipeArr = [];
        for (let i = 0; i < 7; i++) {
            game.creataPipe(300 * (i + 1));
        }    }
    //重新开始游戏
    addEvent(this.reset, 'click', this.init, false);*/
    //点击开始游戏
    this.startClick = function () {
        game.skyStep = 5;
        game.oBird.style.left = '80px';
        game.oBird.style.transition = 'none';
        game.oStart.style.display = 'none';
        game.oScore.style.display = 'block';
        game.gameFlag = true;
        for (let i = 0; i < 7; i++) {
            game.creataPipe(300 * (i + 1));
        }

    }
    addEvent(this.oStart, 'click', this.startClick, false);

    //定时器
    this.timer = function () {
        var count = 0;
        return this.timer = setInterval(() => {
            this.skyMove();
            if (this.gameFlag) {
                this.birdDrop();
                this.pipeMove();
            }
            if (++count % 10 === 0) {
                if (!this.gameFlag) {
                    this.birdJump();
                    this.colorChange();
                }
                this.birdFly(count);
            }
        }, 30);
    }
    //天空移动
    this.skyMove = function () {
        this.skyPosition -= this.skyStep;
        this.sky.style.backgroundPositionX = this.skyPosition + 'px';
    }
    //点击天空小鸟蹦一下
    this.skyClick = function (e) {
        e = e || window.event;
        if (!e.target.classList.contains('start')) {
            game.birdStepY = -10;
        }
    }
    addEvent(this.sky, 'click', this.skyClick, false);
    //小鸟上下蹦
    this.birdJump = function () {
        this.birdTop = this.birdTop === 220 ? 260 : 220;
        this.oBird.style.top = this.birdTop + 'px';
    }
    //小鸟扇翅膀
    this.birdFly = function (count) {
        this.oBird.style.backgroundPositionX = count * -30 + 'px';
    }
    //小鸟自由下落
    this.birdDrop = function () {
        this.birdTop += ++this.birdStepY;
        this.oBird.style.top = this.birdTop + 'px';

        this.judgeBoundary();
    }
    //判断小鸟是否撞到边界
    this.judgeBoundary = function () {
        if (this.birdTop <= this.minTop || this.birdTop >= this.maxTop)
            this.lossGame();
    }
    //判断小鸟是否碰到管道
    this.judgePipe = function (x, y) {
        var left = this.oBird.offsetLeft,
            top = this.oBird.offsetTop;
        if ((left >= x - 20 && left <= x + 52) && (top <= y || top >= y + 120))
            this.lossGame();
    }
    //判断小鸟分数加
    this.addScore = function (x) {
        if (x + 55 === 80)
            this.oScore.innerText = ++this.score + '';
    }
    //创建管道
    this.creataPipe = function (x) {
        var upHeight = Math.floor(Math.random() * 175 + 50),
            downHeight = 450 - upHeight;
        var upPipe = creataEle('div', ['pipe', 'pipe-up'], {
                height: upHeight + 'px',
                left: x + 'px'
            }),
            downPipe = creataEle('div', ['pipe', 'pipe-down'], {
                height: downHeight + 'px',
                left: x + 'px'
            });
        this.sky.appendChild(upPipe);
        this.sky.appendChild(downPipe);
        this.pipeArr.push({
            up: upPipe,
            down: downPipe
        })
    }
    //管道移动
    this.pipeMove = function () {
        var len = this.pipeArr.length;
        if (len < 7) {
            this.creataPipe(2100);
            len++;
        }
        for (let i = 0; i < len; i++) {
            var oPipeUp = this.pipeArr[i].up,
                oPipeDown = this.pipeArr[i].down;

            var x = oPipeUp.offsetLeft - this.skyStep,
                y = oPipeUp.offsetHeight;

            oPipeUp.style.left = x + 'px';
            oPipeDown.style.left = x + 'px';

            if (x < -55) {
                this.sky.removeChild(oPipeUp);
                this.sky.removeChild(oPipeDown);
                this.pipeArr.shift();
                i--;
                len--;
            }
            this.judgePipe(x + this.skyStep, y);
            this.addScore(x)
        }
    }
    //开始游戏字体变化
    this.colorChange = function () {
        var newColor = this.startColor;
        this.startColor = this.startColor === 'white' ? 'blue' : 'white';
        this.oStart.classList.remove(newColor);
        this.oStart.className = 'start ' + this.startColor;
    }

    //游戏失败
    this.lossGame = function () {
        clearInterval(timer);
        this.oMark.style.display = 'block';
        this.oFinScore.innerText = this.score + '';
    }
}

var game = new Game();
var timer = game.timer();