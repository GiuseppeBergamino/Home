let cnv;
let montagna_x = 0;
let distanza_metri = 500;
let tempo_eco = 0;

let mic_in;
let eco1;
let eco2;


function setup() {
  
cnv = createCanvas(windowWidth, windowHeight);
  
tempo_eco = round((distanza_metri * 2) / 340, 2);
  
// creo input audio
  mic_in = new p5.AudioIn();
// attivo input audio.
// di default, non si .connect() alle casse dello speaker
  mic_in.start();
  
  eco1 = new p5.Delay();
  eco2 = new p5.Delay();
  
  // delay.process() accepts 4 parameters:
  // source, delayTime (in seconds), feedback, filter frequency
  eco1.process(mic_in, 0.99, 0.2, 6000);
  eco1.disconnect();
  eco2.process(eco1, 0.99, 0.2, 6000);


}

function draw() {
  background(0, 200, 250);
  
 //line(155, height * 0.2, montagna_x, height * 0.2);

  
    //eco.process(mic_in, tempo_eco, 0.2, 6000);

// box informazioni
  fill(230, 230, 230);
  rect(5, 5, width * 0.4, height * 0.18);
  fill(0, 0, 0);
  textAlign(LEFT);
  textSize(14);
  text('Dati:', 10, 20);
  text('Velocità del suono: 340 metri al secondo',  10, 35);
  text('Distanza montagne: ' + distanza_metri + ' metri', 10, 47);
  text('Formula tempo di eco: ', 10, 66);
  text('(Distanza montagne * 2) / Velocità del suono  = tempo eco', 10, 80);
  fill(255, 0, 0);
  text('(' + distanza_metri + ' m' + ' * 2) / 340 m/s = ' + tempo_eco + " secondi", 10, 100);
  fill(0, 0, 0);
//Montagne
//montagna mobile
 if (mouseIsPressed === true) {
   montagna_x = map(mouseX, 0, width, -width * 0.1, width * 0.75);
   distanza_metri = floor(map(montagna_x, -width * 0.1, width * 0.75, 85, 3400));
   tempo_eco = round((distanza_metri * 2) / 340, 2);
 }
  
  fill(0, 210, 110);
  strokeWeight(2);
  translate(montagna_x, 0);
  triangle(360, 130, 760, 500, -40, 500);  
 fill(231, 241, 255);
  strokeWeight(1);
	
    beginShape();
		vertex(360, 130);
		vertex(485, 246);
		vertex(390, 200);
		vertex(360, 250);
  	vertex(320, 217);
  	vertex(225, 255);
	endShape(CLOSE);
  
  
//montagna ferma
  translate(-montagna_x, 0);
  fill(120, 210, 150);
  strokeWeight(2);
  triangle(100, 180, 500, 500, -260, 500);
  
  fill(231, 241, 255);
  strokeWeight(1);
	
    beginShape();
		vertex(100, 180);
		vertex(225, 280);
		vertex(145, 250);
		vertex(120, 290);
  	vertex(70, 260);
  	vertex(-20, 286);
	endShape(CLOSE);


//colline
  fill(60, 145, 57);
  ellipse(50, 580, width * 0.8, 300);
  
  fill(60, 145, 57);
  ellipse(width - 50, 580, width * 0.8, 300);
  
  fill(69, 168, 66);
  ellipse(440, 600, width * 1.8, 300);
  
// sole 
  fill (255, 240, 102);
  ellipse (width - 100, 60, 100, 100);
  
// omino
  fill (color('pink'));
  // disegno corpo e testa
  translate(155, 150);
  strokeWeight(2);
  line(0, 25, 0, 60);
  ellipse(0, 15, 20, 20);

  // disegno braccia
  push();
  translate(0, 30);
  rotate(radians(60));
  line(0, 0, 30, 0);
  rotate(radians(60));
  line(0, 0, 30, 0);
  pop();

  // disegno gambe
  translate(0, 60);
  rotate(radians(70));
  line(0, 0, 40, 0);
  rotate(radians(40));
  line(0, 0, 40, 0);
  
  
} //fine draw
