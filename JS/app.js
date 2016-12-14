// COMBAT AND INTERACTIVITY APP

// (function(module) {

// Global Variables
var users = [];
var enemies = [];
// var heroLS = [];
var level = 0;
var heroTurn = true;
var heroImg = document.getElementById('heroimg');
var enemyImg = document.getElementById('enemyimg');
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
var fade = document.getElementsByClassName('overlay')[0];
// var nav = document.getElementById('nav');
var heroName = document.getElementById('heroname');
var endFade = document.getElementsByClassName('endoverlay')[0];
// endFade.style.visibility = 'hidden';

// Object Constructors
function Hero() {
  var userName = prompt('Tell us your name, Hero!');
  this.name = userName;
  this.swings = 0;
  this.hits = 0;
  this.misses = 0;
  this.hitPoints = 100;
  this.idle = 'images/hero_idle.png';
  this.swing = 'images/hero_attack.png';
  this.dead = 'images/hero_dead.png';
  users.push(this);
}

Hero.prototype.calcSwings = function() {
  var totalSwings = (this.hits + this.misses);
  this.swings = totalSwings;
};

function Enemy(name, hp, enemyFlavor) {
  this.name = name;
  this.hitPoints = hp;
  this.enemyFlavor = enemyFlavor;
  this.idle = 'images/' + this.name + '.png';
  this.dead = 'images/' + this.name + '_dead.png';
  enemies.push(this);
}

function Bio (obj) {
  this.name = obj.name;
  this.imgSource = obj.imgSource;
  this.bio = obj.bio;
}

Bio.allBios = [];

Bio.prototype.toHtml = function() {
  var htmlTemp = $('#template').html(); //#template refers to the ID of the Handlebars script tag right above the HTML template
  var temp = Handlebars.compile(htmlTemp); //Handlebars.compile returns a function, so we store it in a variable, pass 'this' into it (next line), and return it.
  return temp(this);
};

Bio.loadAll = function(bios) {
  bios.forEach(function(ele) {
    Bio.allBios.push(new Bio(ele));
  });
};

Bio.fetchAll = function() {
  if (localStorage.aboutUs) {
    var lsBio = JSON.parse(localStorage.getItem('aboutUs'));
    Bio.loadAll(lsBio);
  } else {
    $.getJSON('../data/aboutUs.json').then(
      function(bioData) {
        localStorage.setItem('aboutUs', JSON.stringify(bioData));
        Bio.loadAll(bioData);
      }
    );
  }
};

Bio.fetchAll();

var tern1 = new Enemy('fonk', 50, 'Oh jeeze Tern Fonk is here! Local celebrities always tern up in places like this. Hope you have insurance!');
var tern2 = new Enemy('tina', 75, 'What?! How did Tina Terner get here? I suppose one bad tern deserves another!');
var tern3 = new Enemy('sanders', 100, 'Job well done! This isn\'t so bad afte... OH NO LOOK OUT IT\'s Ternie Sanders! Here to tern democracy on it\'s head!');
var tern4 = new Enemy('atterney', 125, 'So the last time I saw Ternie Sanders, The Atterney at Law was NOT far behind. I would brief you on him, but you would object to his sustained attacks regardless. Looks like there is danger no matter where you tern!');
var tern5 = new Enemy('terninator', 200, 'UH-OH!  Here comes *The Terninator* Your clothes, give them to me. Now.');

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
  story.textContent = 'Welcome to the arctic! You\'ve just picked up your lunch when trouble comes a-squawking. Can you tern the tide against these birdbrains so you can eat your lunch in peace? (PRESS ATTACK TO....um ATTACK and HEAL to... well you get the idea.)';
  dispHero();
}

function heroDead() {
  heroImg.src = testHero.dead;
  heroHP.textContent = 0;
}

function heroSwing() {
  heroImg.src = testHero.swing;
}

function dispHero() {
  heroName.textContent = testHero.name;
  heroImg.src = testHero.idle;
  heroHP.textContent = testHero.hitPoints + ' - HP -';
}

function dispEnemy(baddie) {
  story.textContent = enemies[level].enemyFlavor;
  enemyImg.src = enemies[level].idle;
  testText3.textContent = enemies[level].name;
  enemyHP.textContent = enemies[level].hitPoints + ' - HP -';
}

function turnSwap() {
  console.log('turnswap was called');
  if (heroTurn === true) {
    heroTurn = false;
    heroButtonsGame.style.visibility = 'hidden';
    if (enemies[level].hitPoints < 1) {
      lifeCheck();
      var users = [];
      var enemies = [];
      var heroLS = [];
      var level = 0;
      var heroTurn = true;
      var heroImg = $('#heroimg');
      var enemyImg = $('#enemyimg');
      var story = $('#story');
      var flavor = $('#flavor');
      var startButton = $('#startbutton');
      var beginGame = $('#begingame');
      var attack = $('#heroatk');
      var heal = $('#heroheal');
      var testText = $('#testtext');
      var testText2 = $('#testtext2');
      var testText3 = $('#testtext3');
      var heroHP = $('#herohp');
      var enemyHP = $('#enemyhp');
      var heroButtonsGame = $('#herobuttonsgame');
      var fade = $('.overlay')[0];
      var nav = $('#nav');
      var heroName = $('#heroname');
      var endFade = $('.endoverlay')[0];
      endFade.style.visibility = 'hidden';

      // Object Constructors
      function Hero() {
        var userName = prompt('Tell us your name, Hero!');
        this.name = userName;
        this.swings = 0;
        this.hits = 0;
        this.misses = 0;
        this.hitPoints = 100;
        this.idle = 'images/hero_idle.png';
        this.swing = 'images/hero_attack.png';
        this.dead = 'images/hero_dead.png';
        users.push(this);
      }

      Hero.prototype.calcSwings = function() {
        var totalSwings = (this.hits + this.misses);
        this.swings = totalSwings;
      };

      function Enemy(name, hp, enemyFlavor) {
        this.name = name;
        this.hitPoints = hp;
        this.enemyFlavor = enemyFlavor;
        this.idle = 'images/' + this.name + '.png';
        this.dead = 'images/' + this.name + '_dead.png';
        enemies.push(this);
      }

      var tern1 = new Enemy('fonk', 50, 'Oh jeeze Tern Fonk is here! Local celebrities always tern up in places like this. Hope you have insurance!');
      var tern2 = new Enemy('tina', 75, 'What?! How did Tina Terner get here? I suppose one bad tern deserves another!');
      var tern3 = new Enemy('sanders', 100, 'Job well done! This isn\'t so bad afte... OH NO LOOK OUT IT\'s Ternie Sanders! Here to tern democracy on it\'s head!');
      var tern4 = new Enemy('atterney', 125, 'So the last time I saw Ternie Sanders, The Atterney at Law was NOT far behind. I would brief you on him, but you would object to his sustained attacks regardless. Looks like there is danger no matter where you tern!');
      var tern5 = new Enemy('terninator', 200, 'UH-OH!  Here comes *The Terninator* Your clothes, give them to me. Now.');

      // Functions for Landing Page

      function titleScreen() {
        // var testHero = new Hero();
        flavor.style.visibility = 'visible';
        beginGame.style.visibility = 'hidden';
        startButton.style.visibility = 'visible';
        story.textContent = '';
      }

      function begin() {
        flavor.style.visibility = 'visible';
        beginGame.style.visibility = 'visible';
        startButton.style.visibility = 'hidden';
        story.textContent = 'Welcome to the arctic! You\'ve just picked up your lunch when trouble comes a-squawking. Can you tern the tide against these birdbrains so you can eat your lunch in peace? (PRESS ATTACK TO....um ATTACK and HEAL to... well you get the idea.)';
        dispHero();
      }

      function heroDead() {
        heroImg.src = testHero.dead;
        heroHP.textContent = 0;
      }

      function heroSwing() {
        heroImg.src = testHero.swing;
      }

      function dispHero() {
        heroName.textContent = testHero.name;
        heroImg.src = testHero.idle;
        heroHP.textContent = testHero.hitPoints + ' - HP -';
      }

      function dispEnemy(baddie) {
        story.textContent = enemies[level].enemyFlavor;
        enemyImg.src = enemies[level].idle;
        testText3.textContent = enemies[level].name;
        enemyHP.textContent = enemies[level].hitPoints + ' - HP -';
      }

      function turnSwap() {
        console.log('turnswap was called');
        if (heroTurn === true) {
          heroTurn = false;
          heroButtonsGame.style.visibility = 'hidden';
          if (enemies[level].hitPoints < 1) {
            lifeCheck();
            heroButtonsGame.style.visibility = 'visible';
          } else {
            setTimeout(enemyAtkStab, 1500);
            setTimeout(randomHit, 1750);
          }
        } else {
          heroTurn = true;
          heroButtonsGame.style.visibility = 'visible';
        }
        lifeCheck();
      }

      function randomHit() {
        var hitStatus = false;
        var hitChance = Math.random();
        if (hitChance >= .55) {
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

      function enemyDead() {
        enemyImg.src = enemies[level].dead;
      }

      function lifeCheck() {
        if (testHero.hitPoints < 1) {
          gameOver();
        } else if (enemies[level].hitPoints < 1 ) {
          setTimeout(enemyDead, 750);
          setTimeout(newRound, 1500);
        } else {
          dispEnemy();
        }
      }

      function clearText() {
        testText2.textContent = '';
        testText.textContent = '';
      }

      function hit() {
        var audio = new Audio('audio/clank.mp3');
        audio.play();
        if (heroTurn) {
          enemies[level].hitPoints -= 25;
          testText2.textContent = 'HIT!';
          setTimeout(enemyDamageShake, 300);
          setTimeout(dispEnemy, 325);
        } else {
          testText.textContent = 'HIT!';
          testHero.hitPoints -= 12;
          setTimeout(heroDamageShake, 100);
          setTimeout(dispEnemy, 125);
          setTimeout(dispHero, 150);
        }
        setTimeout(clearText, 1000);
      }

      function newRound() {
        level += 1;
        heroTurn = true;
        if (level >= 5) {
          victory();
        } else {
          testHero.hitPoints = 100;
          dispHero();
          dispEnemy(enemies[level]);
        }
      }

      function gameOver() {
        heroButtonsGame.style.visibility = 'hidden';
        story.textContent = 'GAME OVER MAN!';
        endFade.style.visibility = 'visible';
        testHero.calcSwings();
        heroToLS();
      }

      function victory() {
        var audio = new Audio('audio/fanfare.mp3');
        audio.play();
        heroButtonsGame.style.visibility = 'hidden';
        // nav.style.visibility = 'visible';
        story.style.visibility = 'visible';
        story.textContent = 'YOU WON! GREAT JOB! Now enjoy that sandwich pal, you\'ve terned.... um.. EARNED it!';
        testHero.calcSwings();
        heroToLS();
      }

      function miss() {
        var audio = new Audio('audio/woosh.mp3');
        audio.play();
        if (heroTurn) {
          testText2.textContent = 'miss';
        } else {
          testText.textContent = 'miss';
        }
        setTimeout(clearText, 1500);
      }

      function heroHeal() {
        if(testHero.hitPoints === 100){
          testHero.hitPoints += 0;
          turnSwap();
        } else {
          testHero.hitPoints += 15;
          heroHP.textContent = testHero.hitPoints;
          dispHero();
          turnSwap();
        }
      }

      // Animation functions
      var heroShake = $('#heroimg');
      function heroDamageShake() {
        heroShake.className = 'shake-opacity shake-constant';
        setTimeout(stopHeroShake, 500);
      }
      function stopHeroShake() {
        heroShake.className = '';
      }

      var enemyShake = $('#enemyimg');
      function enemyDamageShake() {
        enemyShake.className = 'shake-opacity shake-constant';
        setTimeout(stopEnemyShake, 500);
      }
      function stopEnemyShake() {
        enemyShake.className = '';
      }

      // stab css animations below
      var heroStab = $('#heroimg');
      var enemyStab = $('#enemyimg');

      function heroAtkStab() {
        heroStab.className = 'herostabby';
        setTimeout(stopHeroStab, 600);
      }

      function enemyAtkStab() {
        enemyStab.className = 'enemystabby';
        setTimeout(stopEnemyStab, 300);
      }

      function stopHeroStab() {
        heroStab.className = 'blob';
      }

      function stopEnemyStab() {
        enemyStab.className = 'blob';
      }

      // Stats for Chart
      function heroToLS() {
        ourStats = [testHero.swings, testHero.hits, testHero.misses, 11, 45];
        localStorage.setItem('heroData', JSON.stringify(ourStats));
      }

      // Event Handlers
      function closeNav() {
        console.log(fade.style.animation);
        fade.style.animation = 'splash 1s forwards';
      }

      function handleStart(){
        var audio = new Audio('audio/prelude.mp3');
        audio.loop = true;
        audio.play();
        begin();
        closeNav();
      }

      function handleBegin(){
        beginGame.style.visibility = 'hidden';
        dispEnemy();
        heroButtonsGame.style.visibility = 'visible';
      }

      function handleAttack() {
        heroSwing();
        heroAtkStab();
        randomHit();
        setTimeout(dispHero, 1000);
        // this calls stab CSS animation
      }

      function gameOver() {
        heroButtonsGame.style.visibility = 'hidden';
        story.textContent = 'GAME OVER MAN!';
        endFade.style.visibility = 'visible';
        testHero.calcSwings();
        heroToLS();
      }

      function victory() {
        var audio = new Audio('audio/fanfare.mp3');
        audio.play();
        heroButtonsGame.style.visibility = 'hidden';
        story.style.visibility = 'visible';
        story.textContent = 'YOU WON! GREAT JOB! Now enjoy that sandwich pal, you\'ve terned.... um.. EARNED it!';
        testHero.calcSwings();
        heroToLS();
      }

      function miss() {
        var audio = new Audio('audio/woosh.mp3');
        audio.play();
        if (heroTurn) {
          testText2.textContent = 'miss';
        } else {
          testText.textContent = 'miss';
        }
        setTimeout(clearText, 2000);
      }

      function heroHeal() {
        if(testHero.hitPoints === 100){
          testHero.hitPoints += 0;
          turnSwap();
        } else {
          testHero.hitPoints += 15;
          heroHP.textContent = testHero.hitPoints;
          dispHero();
          turnSwap();

          function handleHeal() {
            heroHeal();
          }

          clearText();
          var testHero = new Hero();
          titleScreen();

          flavor.style.visibility = 'hidden';
          heroButtonsGame.style.visibility = 'hidden';

          // Event Listeners
          startButton.addEventListener('click', handleStart);
          beginGame.addEventListener('click', handleBegin);
          attack.addEventListener('click', handleAttack);
          heal.addEventListener('click', handleHeal);

          // })(window);
