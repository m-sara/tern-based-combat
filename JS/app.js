// COMBAT AND INTERACTIVITY APP

// var users = [];
var enemies = [];
var level = 0;
var heroTurn = true;
var story = document.getElementById('story');
var flavor = document.getElementById('flavor');
var startButton = document.getElementById('startbutton');
var beginGame = document.getElementById('begingame');
var attack = document.getElementById('heroatk');
var heal = document.getElementById('heroheal');

var testText = document.getElementById('testtext');
var testText2 = document.getElementById('testtext2');
var testText3 = document.getElementById('testtext3');

var heroHP = document.getElementById('herohp');
var enemyHP = document.getElementById('enemyhp');

var heroButtonsGame = document.getElementById('herobuttonsgame');

function Hero() {
  // var userName = prompt('Tell us your name, Hero!');
  // this.name = userName;
  this.swings = 0;
  this.hits = 0;
  this.misses = 0;
  this.hitPoints = 100;
  this.idle = 'idle image path';
  this.swing = 'swing image path';
  this.isHit = 'isHit image path';
  this.win = 'win image path';
  this.dead = 'dead image path';
  // users.push(this);
}

Hero.prototype.calcSwings = function() {
  var totalSwings = (this.hits + this.misses);
  this.swings = totalSwings;
};

function Enemy(name, hp) {
  this.name = name;
  this.hitPoints = hp;
  this.idle = 'idle image path';
  this.swing = 'swing image path';
  this.isHit = 'isHit image path';
  this.win = 'win image path';
  this.dead = 'dead image path';
  enemies.push(this);
}

function titleScreen() {
  flavor.style.visibility = 'visible';
  beginGame.style.visibility = 'hidden';
  startButton.style.visibility = 'visible';
  story.textContent = '';
}

function begin() {
  //maybe (innerHTML = '')
  flavor.style.visibility = 'visible';
  //========================
  beginGame.style.visibility = 'visible';
  startButton.style.visibility = 'hidden';
  story.textContent = 'REPLACE WITH ACTUAL STORY CONTENT';
  dispHero();
}

function dispHero() {
  testText.textContent = 'This Displays the Hero';
  // display HP
  heroHP.textContent = testHero.hitPoints;
  // turn on buttons
}

function dispEnemy(baddie) {
  console.log(enemies[level]);
  testText2.textContent = 'This Displays the Enemy';
  testText3.textContent = enemies[level].name;
  enemyHP.textContent = enemies[level].hitPoints;
  heroButtonsGame.style.visibility = 'visible';
}

// function combatRound() {
//   dispHero();
//   dispEnemy();
// }

function turnSwap() {
  if (heroTurn === true) {
    heroTurn = false;
  } else {
    heroTurn = true;
  }
}

function randomHit() {
  var hitStatus = false;
  var hitChance = Math.random();
  if (hitChance >= .45) {
    hitStatus = true;
    testHero.hits += 1;
  }
  if (hitStatus === false) {
    miss();
    testHero.misses += 1;
  } else {
    hit();
  }
  turnSwap();
}
//
function lifeCheck() {
  if (testHero.hitPoints <= 0) {
    gameOver();
  } else if (enemies[level].hitPoints < 1 ) {
    newRound();
  } else {
    dispEnemy();
  }
}

function hit() {
  if (heroTurn) {
    enemies[level].hitPoints -= 20;
    testText2.textContent = 'HIT!';
    lifeCheck();
  } else {
    testText.textContent = 'HIT!';
    // here is where we change hero hp
    testHero.hitPoints -= 10;
    lifeCheck();
    dispHero();
  }
}

function newRound() {
  level += 1;
  if (level >= 5) {
    victory();
  } else {
    testHero.hitPoints = 100;
    dispHero();
    dispEnemy(enemies[level]);
  }
}

function gameOver() {
  story.style.visibility = 'visible';
  story.textContent = 'GAME OVER MAN!';
  heroButtonsGame.style.visibility = 'hidden';
  testHero.calcSwings();
}

function victory() {
  story.style.visibility = 'visible';
  story.textContent = 'You\'re out of Terns!';
  heroButtonsGame.style.visibility = 'hidden';
  testHero.calcSwings();
}

function miss() {
  if (heroTurn) {
    testText2.textContent = 'miss';
  } else {
    testText.textContent = 'miss';
  }
}

function heroHeal() {
  if(testHero.hitPoints === 100){
    testHero.hitPoints += 0;
    turnSwap();
    randomHit();
  } else {
    testHero.hitPoints += 10;
    heroHP.textContent = testHero.hitPoints;
    dispHero();
    turnSwap();
    randomHit();
  }
}

titleScreen();

// function updateUserData(user) {
//   for (var i = 0; i < users.length; i++) {
//     if (user.name === users[i].name) {
//
//     }
//   }
// }
function handleStart(){
  begin();
}

function handleBegin(){
  dispEnemy();
}

function handleAttack() {
  randomHit();
}

function handleHeal() {
  heroHeal();
}

var tern1 = new Enemy('Raoul', 50);
var tern2 = new Enemy('Vernon', 75);
var tern3 = new Enemy('Khaleesi', 100);
var tern4 = new Enemy('Vicious', 125);
var tern5 = new Enemy('Terninator', 200);
var testHero = new Hero();

flavor.style.visibility = 'hidden';
heroButtonsGame.style.visibility = 'hidden';

startButton.addEventListener('click', handleStart);
beginGame.addEventListener('click', handleBegin);
attack.addEventListener('click', handleAttack);
heal.addEventListener('click', handleHeal);
