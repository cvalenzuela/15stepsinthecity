/* Video */
var video;
var slider;

/* Sound */
var song;
var fft;
var button;
var w;

/*=== Play-Pause Song ===*/
function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

/* === Preload ===*/
function preload() {
  song = loadSound('assets/15steps.mp3');
}

var seriously;
var src;
var target;
var blur;


/*=== Setup ===*/
function setup() {
  canvas = createCanvas(640, 480, WEBGL);
  canvas.parent('p5sketch');
  canvas.id('p5canvas');

  // slider = createSlider(0, 1, 0, 0.01);
  // slider.id('blur-slider');

  colorMode(HSB);
  // button = createButton('toggle');
  // button.mousePressed(toggleSong);
  song.play();
  fft = new p5.FFT(0.9, 256);
  w = width ;
  seriously = new Seriously();

  blur = seriously.effect('blur');
  src = seriously.source('#video');
  target = seriously.target('#p5canvas');



}


function draw() {
  var spectrum = fft.analyze();

  var sum = 0;
  for( var i = 0; i < spectrum.length; i++ ){
      sum +=  spectrum[i];
  }

  var avg = sum/spectrum.length;
  var value = map(avg,0,1700,0,7);

  //blur.amount = '#blur-slider';
  blur.amount = value;

  blur.source = src;
  target.source = blur;
  seriously.go();

//   for (var i = 0; i < spectrum.length; i++) {
//     var amp = spectrum[i];
//     var y = map(amp, 0, 256, height, 0);
//     fill(i, 255, 255);
//     rect(i * w, y, w , height - y);
//
//   }

}
