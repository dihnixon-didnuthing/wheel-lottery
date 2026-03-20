var ribbonShape = confetti.shapeFromPath({
  path: 'M0 0 L4 0 L4 20 L0 20 Z',
  matrix: [1, 0, 0, 1, -2, -10]
});

var mShape = confetti.shapeFromPath({
  path: 'm -86.902848,115.22298 h 22.446994 l -37.554806,-85.495445 -18.85546,8.728592 13.11684,29.766737 -6.08996,13.83892 -23.50104,-53.714412 -19.05066,8.318275 15.30299,34.317541 -0.0781,0.149206 c -9.44728,21.672269 -21.00261,27.603238 -22.13471,28.013555 -2.69364,1.044451 -5.58247,1.641281 -8.62745,1.641281 -0.93693,0 -1.83481,-0.0373 -2.73268,-0.14921 l -9.21304,18.87465 c 3.04499,1.67858 6.48035,2.64842 10.11091,2.64842 4.60652,0 8.82265,-1.52937 12.33609,-4.06588 l -0.0391,0.0746 c 0,0 8.70553,-4.21509 18.03567,-27.304824 0,-0.0373 3.43537,-7.385732 5.27018,-12.085744 l 0.19519,-0.522223 16.39605,37.003261 h 22.407962 l -11.555302,-26.036569 6.12899,-13.83892 z',
   matrix: [0.09,0,0,0.09,11.34,-10.08]
});

function launchConfetti() {
  stopConfetti();

  var rect = document.getElementById('numbers2').getBoundingClientRect();
  var originX = (rect.left + rect.width / 2) / window.innerWidth;
  var originY = (rect.top + rect.height / 2) / window.innerHeight;
  var origin = { x: originX, y: originY };

  var colors = ['#F5DB79', '#f7b93c', '#44aaff'];

  var shared = {
    spread        : 55,
    startVelocity : 24,
    decay         : 0.94,
    gravity       : 0.5,
    ticks         : 600,
    colors        : colors,
    zIndex        : 10
  };

  var ribbonShared = Object.assign({}, shared, {
    scalar : 1.2,
    shapes : [ribbonShape],
    colors : ['#F5DB79', '#f7b93c']
  });

  var mShared = Object.assign({}, shared, {
    scalar  : 2.8,
    shapes  : [mShape],
    colors  : ['#000000', '#ffffff'],
    gravity : 0.43
  });

  var delays = [0, 600];

  delays.forEach(function (delay) {
    var t = setTimeout(function () {

      confetti(Object.assign({}, shared, { particleCount: 80, angle: 60, origin: origin }));
      confetti(Object.assign({}, shared, { particleCount: 40, angle: 120, origin: origin }));

      confetti(Object.assign({}, mShared, { particleCount: 10, angle: 60, origin: origin }));
      confetti(Object.assign({}, mShared, { particleCount: 10, angle: 120, origin: origin }));

      confetti(Object.assign({}, ribbonShared, { particleCount: 20, angle: 60, origin: origin }));
      confetti(Object.assign({}, ribbonShared, { particleCount: 20, angle: 120, origin: origin }));

    }, delay);

    CONFETTI_TIMEOUT.push(t);
  });
}

function stopConfetti() {
  if (CONFETTI_TIMEOUT) {
    CONFETTI_TIMEOUT.forEach(function (t) { clearTimeout(t); });
  }
  CONFETTI_TIMEOUT = [];
  confetti.reset();
}