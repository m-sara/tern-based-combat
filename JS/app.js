// COMBAT AND INTERACTIVITY APP

// Global Variables
var users = [];
var enemies = [];
var heroLS = [];
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

// Object Constructors
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
  users.push(this);
}

var testHero = new Hero();

Hero.prototype.calcSwings = function() {
  var totalSwings = (this.hits + this.misses);
  this.swings = totalSwings;
};

function Enemy(name, hp, enemyFlavor) {
  this.name = name;
  this.hitPoints = hp;
  this.enemyFlavor = enemyFlavor;
  this.idle = 'idle image path';
  this.swing = 'swing image path';
  this.isHit = 'isHit image path';
  this.win = 'win image path';
  this.dead = 'dead image path';
  enemies.push(this);
}

var tern1 = new Enemy('Tern Fonk', 50, 'Oh jeeze Tern Fonk is here!  He is just a low level thug, but the worst kind of low level thug.  Careful at every Tern.');
var tern2 = new Enemy('Tina Terner', 75, 'What?!  How did Tina Terner get here?  This is not good.  They’re swarming (flocking? I don’t know how this works…).');
var tern3 = new Enemy('Ternie Sanders', 100, 'Well done!  This isn\'t so bad afte… OH NO LOOK OUT IT\'s Ternie Sanders!');
var tern4 = new Enemy('The Atterney at Law', 125, 'So the last time I saw Ternie Sanders, The Atterney at Law  was NOT far behind... Yeah ok.  I am out of here.  Yer on your own, kid.');
var tern5 = new Enemy('The Terninator', 200, '*The Terninator* Your clothes, give them to me.  Now.');

// Functions for Landing Page

function titleScreen() {
  flavor.style.visibility = 'visible';
  beginGame.style.visibility = 'hidden';
  startButton.style.visibility = 'visible';
  story.textContent = '';
}

function begin() {
  flavor.style.visibility = 'visible';
  beginGame.style.visibility = 'visible';
  startButton.style.visibility = 'hidden';
  story.textContent = '*Narrator* They’re taking over.  All of the terns.  They’re everywhere.  It’s up to you to take them down, one at a time. Hack, slash and heal your way to their leader.  Do you have what it takes to stop all the terns?';
  dispHero();
}

function dispHero() {
  testText.textContent = 'This Displays the Hero';
  heroHP.textContent = testHero.hitPoints;
}

function dispEnemy(baddie) {
  story.textContent = enemies[level].enemyFlavor;
  testText2.textContent = 'This Displays the Enemy';
  testText3.textContent = enemies[level].name;
  enemyHP.textContent = enemies[level].hitPoints;
  heroButtonsGame.style.visibility = 'visible';
}

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
  heroToLS();
}

function victory() {
  story.style.visibility = 'visible';
  story.textContent = 'You\'re out of Terns!';
  heroButtonsGame.style.visibility = 'hidden';
  testHero.calcSwings();
  heroToLS();
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

// Stats for Chart

function heroToLS() {
  ourStats = [testHero.swings, testHero.hits, testHero.misses, 11, 45];
  localStorage.setItem('heroData', JSON.stringify(ourStats));
}

// Event Handlers

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

flavor.style.visibility = 'hidden';
heroButtonsGame.style.visibility = 'hidden';

// Event Listeners

startButton.addEventListener('click', handleStart);
beginGame.addEventListener('click', handleBegin);
attack.addEventListener('click', handleAttack);
heal.addEventListener('click', handleHeal);
