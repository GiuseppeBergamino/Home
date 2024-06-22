let gui; //https://github.com/L05/p5.touchgui


let altezza_muro;
let altezza_metri;
let lambda;
let frequenza;
let v_suono = 340;
let d_sorgente1 = 0, d_sorgente2 = 0, d_sorgente3 = 0, d_sorgente4 = 0;

let sinusoide, triangolare, quadra, sega, rumore;
let filtro, frequenza_taglio;
let frequenza_osc;

function setup() {
cnv = createCanvas(windowWidth, windowHeight);

altezza_muro = height - height * 0.2;
altezza_metri = round(map(altezza_muro, height - height * 0.1, 20, 0, 8.5), 2);
  
  gui = createGui();
  
     let stileButton = {
      fillBg: color(60, 128, 188),
      fillBgHover: color(0, 188, 188),
    };
  
   button_sin =  createButton("Sinusoide", 5, height * 0.18 + 5, 110, 30);
   button_tri = createButton("Triangolare", 5, height * 0.18 + 35, 110, 30);
   button_quad = createButton("Quadra", 5, height * 0.18 + 65, 110, 30);
   button_saw = createButton("Sega", 5, height * 0.18 + 95, 110, 30);
   button_rumore = createButton("Rumore", 5, height * 0.18 + 125, 110, 30);
  
  button_sin.setStyle(stileButton);
  button_tri.setStyle(stileButton);
  button_quad.setStyle(stileButton);
  button_saw.setStyle(stileButton);
  button_rumore.setStyle("fillBg", color(0, 188, 188));
  button_rumore.setStyle("fillBgHover", color(0, 188, 188));
  
  slider_freq = createSliderV("Frequenza", 120, height * 0.18 + 5, 50, height * 0.18 + 55, 80, 440);
  slider_freq.setStyle("fillBg", color(0, 88, 188));
  slider_freq.setStyle("fillBgHover", color(0, 88, 238));
  slider_freq.setStyle("fillBgActive", color(0, 88, 188));
  slider_freq.setStyle("fillTrack", color(0, 28, 120));
  slider_freq.setStyle("fillTrackHover", color(0, 28, 120));
  slider_freq.setStyle("fillTrackActive", color(0, 28, 120));
  slider_freq.setStyle("fillHandle", color(0, 188, 238));
  
  slider_freq.val = 220;
   
  sinusoide = new p5.Oscillator('sine');
  sinusoide.amp(0);
  sinusoide.start();
  triangolare = new p5.Oscillator('triangle');
  triangolare.amp(0);
  triangolare.start();
  quadra = new p5.Oscillator('square');
  quadra.amp(0);
  quadra.start();
  sega = new p5.Oscillator('sawtooth');
  sega.amp(0);
  sega.start();
  rumore = new p5.Noise('pink');
  rumore.amp(0);
  rumore.start();
  
   frequenza_osc = 220;
    sinusoide.freq(frequenza_osc);
    triangolare.freq(frequenza_osc);
    quadra.freq(frequenza_osc);
    sega.freq(frequenza_osc);

  
  rumore.disconnect();
  sega.disconnect();
  quadra.disconnect();
  triangolare.disconnect();
  sinusoide.disconnect();
  
  filtro = new p5.LowPass();
  
  rumore.connect(filtro);
  sega.connect(filtro);
  quadra.connect(filtro);
  triangolare.connect(filtro);
  sinusoide.connect(filtro);
 
  
}

function draw() {
   background(0, 200, 250);
  
   drawGui();
  
  
   // box informazioni
  fill(230, 230, 230);
  rect(5, 5, width * 0.4, height * 0.18);
  fill(0, 0, 0);
  textAlign(LEFT);
  textSize(14);
  text('Dati:', 10, 20);
  text('Velocità del suono: ' + v_suono + ' metri al secondo',  10, 35);
  text('Altezza muro: ' + altezza_metri + ' metri', 10, 47);
  text('Formula frequenza massima che salta il muro: ', 10, 66);
  text('Velocità suono / Altezza muro  = Frequenza massima', 10, 80);
  fill(255, 0, 0);
  text( v_suono + ' m/s ' + ' / ' + altezza_metri + ' metri = ' + round((v_suono/altezza_metri), 2) + ' Hz' , 10, 98); 

 frequenza_taglio = map(altezza_metri, 0, 9, 20000, 4);
// prato 
   fill (100, 150, 0);
   rect(0, height - height * 0.4, width, height * 0.4);
  
// sole 
  fill (255, 240, 102);
  ellipse (width - 150, 60, 100, 100);
  
// sorgente sonora 
  fill (255, 10, 12, 50);
  ellipse (width * 0.3, height - height * 0.15 , d_sorgente1, d_sorgente1);
  ellipse (width * 0.3, height - height * 0.15 , d_sorgente2, d_sorgente2);
  ellipse (width * 0.3, height - height * 0.15 , d_sorgente3 , d_sorgente3);
  ellipse (width * 0.3, height - height * 0.15 , d_sorgente4 , d_sorgente4);
  ellipse (width * 0.3, height - height * 0.15 , 125, 125);
  ellipse (width * 0.3, height - height * 0.15 , 125, 125);
  ellipse (width * 0.3, height - height * 0.15 , 100, 100);
  ellipse (width * 0.3, height - height * 0.15 , 75, 75);
  ellipse (width * 0.3, height - height * 0.15 , 50, 50);
  ellipse (width * 0.3, height - height * 0.15 , 25, 25);
  ellipse (width * 0.3, height - height * 0.15 , 12, 12);
  d_sorgente1++;
  d_sorgente2++;
  d_sorgente3++;
  d_sorgente4++;
  
  if (d_sorgente1 > 125) {
     d_sorgente1 = 0;
  }
    if (d_sorgente2 > 150) {
     d_sorgente2 = 0;
  }
    if (d_sorgente3 > 200) {
     d_sorgente3 = 0;
  }
    if (d_sorgente4 > 225) {
     d_sorgente4 = 0;
  }

// didascalie 
  fill(0, 0, 0);
  textAlign(CENTER);
  text('FONTE SONORA', width * 0.3, height - height * 0.3);  
  text('MURO', width * 0.525, height - height * 0.05);
  text('ASCOLTATORE', width - 55, height - height * 0.1);



  
  
// muro
  
  if (mouseIsPressed === true) {
    
   if (mouseX > width * 0.45 && mouseX < width * 0.55)
    altezza_muro = mouseY;
    if (altezza_muro > height - height * 0.1) {
       altezza_muro = height - height * 0.1;
    } 
    if (altezza_muro < 20) {
       altezza_muro = 20;
    }
    
  }
  fill (200, 80, 10);
  rectMode(CORNERS);
  rect(width * 0.5, height - height * 0.1, width * 0.55, altezza_muro);
  altezza_metri = round(map(altezza_muro, height - height * 0.1, 20, 0.01, 8.5) * 100) / 100;
  
  rectMode(CORNER);
// omino
  fill (color('pink'));
  // disegno corpo e testa
  translate(width - 55, height - height * 0.3);  
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
  
 //--------sintesi audio--------//
  
    if (slider_freq.isChanged) {
  frequenza_osc = slider_freq.val;
  }
  
    sinusoide.freq(frequenza_osc);
    triangolare.freq(frequenza_osc);
    quadra.freq(frequenza_osc);
    sega.freq(frequenza_osc);
  
  if (button_sin.isPressed) {
    
    sinusoide.amp(1);
    triangolare.amp(0);
    quadra.amp(0);
    sega.amp(0);
    rumore.amp(0);
  }
  
 if (button_tri.isPressed) {

    sinusoide.amp(0.00);
    triangolare.amp(1.00);
    quadra.amp(0.00);
    sega.amp(0.00);
    rumore.amp(0.00);
  }
  
 if (button_quad.isPressed) {
    
    sinusoide.amp(0.00);
    triangolare.amp(0.00);
    quadra.amp(1.00);
    sega.amp(0.00);
    rumore.amp(0.00);
 }
  
  if (button_saw.isPressed) {
    sinusoide.amp(0.00);
    triangolare.amp(0.00);
    quadra.amp(0.00);
    sega.amp(1.00);
    rumore.amp(0.00);
  }
  
    if (button_rumore.isPressed) {
    sinusoide.amp(0.00);
    triangolare.amp(0.00);
    quadra.amp(0.00);
    sega.amp(0.00);
    rumore.amp(1.00);
  }
  
  filtro.freq(frequenza_taglio);

}