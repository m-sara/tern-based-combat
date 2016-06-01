var heroStats = ['Swings', 'Hits', 'Misses', 'Charisma', 'Volatility'];

var testHero = [];

if (localStorage) {
  testHero = JSON.parse(localStorage.getItem('heroData'));
}

var heroStatChart = {
  labels : heroStats,
  datasets : [
    {
      label : 'Hero Stats',
      backgroundColor : 'white',
      borderColor : 'blue',
      pointBackgroundColor : 'red',
      pointBorderColor : 'black',
      data : testHero
    }
  ]
};

function drawChart() {
  var ctx = document.getElementById('theherostats').getContext('2d');
  heroChart = new Chart (ctx, {
    type: 'radar',
    data: heroStatChart,
    options: {
      responsive : false
    }
  });
};

drawChart();
