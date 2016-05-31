// COMBAT AND INTERACTIVITY APP

var users = [];
var enemies = [];
var level = 0;
var story = document.getElementById('story');
var flavor = document.getElementById('flavor');
var startButton = document.getElementById('startbutton');
var beginGame = document.getElementById('begingame');

var testText = document.getElementById('testtext');
var testText2 = document.getElementById('testtext2');


function Hero() {
  var userName = prompt('Tell us your name, Hero!');
  this.name = userName;
  this.swings = 0;
  this.hits = 0;
  this.misses = 0;
  this.alive = true;
  this.hitPoints = 100;
  users.push(this);
}

function Enemy(name, hitPoints) {
  this.name = name;
  this.hitPoints = hitPoints;
  this.alive = true;
  enemies.push(this);
}

function titleScreen() {
  flavor.style.visibility = 'visible';
  beginGame.style.visibility = 'hidden';
  startButton.style.visibility = 'visible';
  story.textContent = '';
}

function beginGame() {
  //maybe (innerHTML = '')
  flavor.style.visibility = 'visible';
  //========================
  beginGame.style.visibility = 'visible';
  startButton.style.visibility = 'hidden';
  story.textContent = 'REPLACE WITH ACTUAL STORY CONTENT';
}

function dispHero() {
  testText.textContent = 'This Displays the Hero';
}

function dispEnemy() {
  testText2.textContent = 'This Displays the Enemy';
}

function combatRound() {
  dispHero();
  dispEnemy();
}



titleScreen();

// function updateUserData(user) {
//   for (var i = 0; i < users.length; i++) {
//     if (user.name === users[i].name) {
//
//     }
//   }
// }

// var tern1 = new Enemy('Balthasar', 50);
flavor.style.visibility = 'hidden';
