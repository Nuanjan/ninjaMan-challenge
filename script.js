var world = [];

function randomWorld() {
  for (let i = 0; i < 20; i++) {
    // empty array to put the random value 0-3
    var column = [];
    for (let j = 0; j < 20; j++) {
      // if it is the corner div put 1 only to make a wall so ninja can't get out of container
      if (i === 0 || j === 0 || i === 19 || j === 19) column.push(0);
      // to not generate the wall to so ninja can get to any sushi or onigiri
      else if (i === 1 || j === 1 || i === 18 || j === 18) {
        var randomNum = Math.floor(Math.random() * 3 + 1);
        column.push(randomNum);
      } else {
        var randomNum = Math.floor(Math.random() * 4);
        column.push(randomNum);
      }
    }
    world.push(column);
  }
}
randomWorld();
var worldDict = {
  0: "wall",
  1: "blank",
  2: "sushi",
  3: "onigiri",
};

function drawWorld() {
  output = "";
  for (var row = 0; row < world.length; row++) {
    output += "<div class='row'>";
    for (var x = 0; x < world[row].length; x++) {
      output += "<div class='" + worldDict[world[row][x]] + "'></div>";
    }
    output += "</div>";
  }
  document.getElementById("world").innerHTML = output;
}
drawWorld();
// ninja cordination
// will start at middle x and y
var ninjaMan = {
  x: Math.floor(world.length / 2),
  y: Math.floor(world[0].length / 2) - 1,
};
// monster cordination
var pinky = {
  x: Math.floor(world.length / 2) - 1,
  y: Math.floor(world[0].length / 2) + 1,
};

var pumpky = {
  x: Math.floor(world.length / 2),
  y: Math.floor(world[0].length / 2) + 1,
};

var scaredy = {
  x: Math.floor(world.length / 2) + 1,
  y: Math.floor(world[0].length / 2) + 1,
};
world[ninjaMan.x][ninjaMan.y] = 1;
world[pinky.x][pinky.y] = 1;
world[pumpky.x][pumpky.y] = 1;
world[scaredy.x][scaredy.y] = 1;

function drawNinjanMan() {
  document.getElementById("ninjaman").style.top = ninjaMan.y * 40 + "px";
  document.getElementById("ninjaman").style.left = ninjaMan.x * 40 + "px";
}

function drawPinky() {
  document.getElementById("pinky").style.top = pinky.y * 40 + "px";
  document.getElementById("pinky").style.left = pinky.x * 40 + "px";
}

function drawPumpky() {
  document.getElementById("pumpky").style.top = pumpky.y * 40 + "px";
  document.getElementById("pumpky").style.left = pumpky.x * 40 + "px";
}

function drawScaredy() {
  document.getElementById("scaredy").style.top = scaredy.y * 40 + "px";
  document.getElementById("scaredy").style.left = scaredy.x * 40 + "px";
}

drawNinjanMan();
drawPinky();
drawPumpky();
drawScaredy();

function monsterDirection() {
  var direction = ["up", "down", "left", "right"];
  var index = Math.floor(Math.random() * 4);
  return direction[index];
}

function moveMonsters(monsterObject) {
  var monsterObjDirection = monsterDirection();
  if (
    monsterObjDirection === "up" &&
    world[monsterObject.y - 1][monsterObject.x] !== 0
  ) {
    monsterObject.y--;
  } else if (
    monsterObjDirection === "down" &&
    world[monsterObject.y + 1][monsterObject.x] !== 0
  ) {
    monsterObject.y++;
  } else if (
    monsterObjDirection === "left" &&
    world[monsterObject.y][monsterObject.x - 1] !== 0
  ) {
    monsterObject.x--;
  } else if (
    monsterObjDirection === "right" &&
    world[monsterObject.y][monsterObject.x + 1] !== 0
  ) {
    monsterObject.x++;
  }
}

var interval = setInterval(function () {
  moveMonsters(pinky);
  moveMonsters(pumpky);
  moveMonsters(scaredy);
  drawPinky();
  drawPumpky();
  drawScaredy();
}, 150);
// next challenge
// track the score of how many sushi's ninjanMan eats>
// sushi = 10pts onigiri = 5 pts
var point = 0;
document.onkeydown = function (e) {
  var pointText = document.getElementById("point");
  var status = gameStatus();
  // not get game over as I expected
  if (
    pinky.y * 40 === ninjaMan.y * 40 ||
    pumpky.y * 40 === ninjaMan.y * 40 ||
    scaredy.y * 40 === ninjaMan.y * 40
  ) {
    gameOver();
    var gameOverElement = document.getElementById("game-board");
    gameOverElement.style.display = "none";
    var container = document.getElementsByClassName("container");
    var text = document.createElement("p");
    var status = gameStatus();
    var node = document.createTextNode(status);
    text.appendChild(node);
    container[0].appendChild(text);
    document.onkeydown = null;
  }
  if (status === " You Won!!! ") {
    gameOver();
    var gameOverElement = document.getElementById("game-board");
    gameOverElement.style.display = "none";
    var container = document.getElementsByClassName("container");
    var text = document.createElement("p");
    var status = gameStatus();
    var node = document.createTextNode(status);
    text.appendChild(node);
    container[0].appendChild(text);
    document.onkeydown = null;
  }
  if (e.keyCode === 37) {
    // world at index [1][0] !== 1 mean not a wall
    if (world[ninjaMan.y][ninjaMan.x - 1] !== 0) ninjaMan.x--;
  }
  if (e.keyCode === 39) {
    if (world[ninjaMan.y][ninjaMan.x + 1] !== 0) ninjaMan.x++;
  }
  if (e.keyCode === 38) {
    if (world[ninjaMan.y - 1][ninjaMan.x] !== 0) ninjaMan.y--;
  }
  if (e.keyCode === 40) {
    if (world[ninjaMan.y + 1][ninjaMan.x] !== 0) ninjaMan.y++;
  }
  if (world[ninjaMan.y][ninjaMan.x] === 2) {
    point += 10;
  }
  if (world[ninjaMan.y][ninjaMan.x] === 3) {
    point += 5;
  }
  world[ninjaMan.y][ninjaMan.x] = 1;
  pointText.textContent = point;
  drawNinjanMan();
  drawWorld();
};

function gameOver() {
  console.log("clear");
  clearInterval(interval);
}

// check if ninjaMan win or lose
function gameStatus() {
  for (let i = 0; i < world.length; i++) {
    for (let j = 0; j < world[i].length; j++) {
      if (world[i][j] > 1) {
        return " Game Over!!!";
      }
    }
  }
  return " You Won!!! ";
}
// hacker challenge = create ghosts that chase ninjaMan
// create the direction object to track of where the monster start
