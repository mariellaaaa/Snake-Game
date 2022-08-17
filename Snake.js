  let unit = 16;
  let score = 0;

  let food = new Image();
  food.src = "../Snake/apple2.1.png"

  let snake = [];
  snake[0] = {
    x : 9 * unit,
    y : 9 * unit
  }

  let apple = {
    x : Math.floor(Math.random() * 25 + 0) * unit,
    y : Math.floor(Math.random() * 25 + 0) * unit
  }

  let direction;

  let canvas = document.getElementById('snake');
  let context = canvas.getContext('2d');

  document.addEventListener("keydown", snakeDirection);

  function main() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawApple();
    moveSnake();
    drawSnake();
    drawScore();
  }

  function drawApple() {
    context.drawImage(food, apple.x, apple.y);
  }

  function snakeDirection(event) {
    let key = event.keyCode;
    if (key == 37 && direction != 'RIGHT') {
      direction = "LEFT";
    } else if (key == 38 && direction != 'DOWN') {
      direction = "UP";
    } else if (key == 39 && direction != 'LEFT') {
      direction = "RIGHT";
    } else if (key == 40 && direction != 'UP') {
      direction = "DOWN";
    }
  }

  function drawSnake() {
    for(let i = 0; i < snake.length; ++i) {
      context.fillStyle = (i == 0)? "#62422C" : "#FF8000";
      context.fillRect(snake[i].x, snake[i].y, unit, unit);
    }
  }

  function moveSnake() {
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "LEFT") {
      snakeX -= unit;
    } else if (direction == "UP") {
      snakeY -= unit;
    } else if (direction == "RIGHT") {
      snakeX += unit;
    } else if (direction == "DOWN") {
      snakeY += unit;
    }

    if (snakeX == apple.x && snakeY == apple.y) {
      ++score;
      apple = {
        x : Math.floor(Math.random() * 25 + 0) * unit,
        y : Math.floor(Math.random() * 25 + 0) * unit
      }
    } else {
      snake.pop();
    }

    let newSnake = {
      x : snakeX,
      y : snakeY
    }

    if (snakeX < 1 || snakeX > 23 * unit || snakeY < 1 || snakeY > 23 * unit || collision(newSnake, snake)) {
      clearInterval(interval);
      gameOver();
    }
    snake.unshift(newSnake);
  }

  function collision (head, array) {
    for ( let i = 0; i < array.length; ++i) {
      if (head.x == array[i].x && head.y == array[i].y) {
        return true;
      }
    }
  }

  function drawScore(){
    document.getElementById('p1').innerHTML = score;
  }

  function gameOver() {
    context.fillStyle="red";
    context.font="50px verdana";
    context.fillText("Game Over! ", canvas.clientWidth/6.5, canvas.clientHeight/2);
  }

  function reload() {
    window.location.reload();
  }

  let interval = setInterval(main, 100);
