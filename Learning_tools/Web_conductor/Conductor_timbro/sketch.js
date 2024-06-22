let cnv;

let numero_cerchi = 5;
let coord_y = [];
let coord_x = [];

let diametro_iniziale = 10;
let fattore_crescita = 0;
let fattore_riscalamento;

let diametro = [];
let raggio = [];

let alfa = [];

let campione = [];
let volume = [];
let freq = [];

function preload() {
  campione[0] = loadSound('triangolo.mp3');
  campione[1] = loadSound('quadrato.mp3');
  campione[2] = loadSound('cerchio.mp3');
  campione[3] = loadSound('rett_or.mp3');
  campione[4] = loadSound('rett_ver.mp3');
}

function setup() {
  
  cnv = createCanvas(windowWidth, windowHeight);
  
   cnv.mouseClicked(attiva_audio);
  

  
    // Calcola la somma dei diametri originali
  let diametro_totale = 0;
  
  for (let i = 0; i < numero_cerchi; i++) {
    diametro_totale += diametro_iniziale + i * fattore_crescita;
  }
  
   fattore_riscalamento = width / diametro_totale;
  
  coord_x[0] = 0; // Coordinata x iniziale
  let coord_x_pre = -diametro_iniziale * 3;
 
for (let i = 0; i < numero_cerchi; i++) {
    
    diametro[i] = (diametro_iniziale + i * fattore_crescita) * fattore_riscalamento; // Diametro scalato del cerchio
    raggio[i] = diametro[i] / 2; // Raggio scalato del cerchio
    coord_x[i] = coord_x_pre + diametro[i]; //  x per il cerchio corrente
    coord_x_pre = coord_x[i]; // Aggiorna la coordinata x per il prossimo cerchio (tangente)
   alfa[i] = 80;
   volume[i] = 1;
   coord_y[i] = height * 0.5;
   freq[i] = map(coord_y[i], 0, height, 2, 0.5);

  }

  
    getAudioContext().suspend();


}

function draw() {
  background(255); // Sfondo bianco
    
 for (let i = 0; i < numero_cerchi; i++) {
 
   
  if (mouseIsPressed) {
   if (abs(mouseX - coord_x[i]) <= raggio[i]  && 
       abs(mouseY - coord_y[i]) <= raggio[i]) {
        
       alfa[i] = 255;

     if (!campione[i].isPlaying())   {
       campione[i].setVolume(volume[i]);
       campione[i].rate(freq[i]);
       campione[i].play();
       
         }
    }
  }
   else {
      alfa[i] = 80;
   }
    
 
 }
  
    fill(255, 0, 0, alfa[0]);
    poligono(coord_x[0] - raggio[0] * 0.5, coord_y[0], raggio[0], 3, HALF_PI);
  
      fill(255, 0, 0, alfa[1]);
    poligono(coord_x[1] - raggio[1] * 0.5, coord_y[1] + raggio[1] * 0.25, raggio[1], 4, HALF_PI * 0.5);
  
       fill(255, 0, 0, alfa[2]);
    poligono(coord_x[2] - raggio[2] * 0.5, coord_y[2] + raggio[2] * 0.25, raggio[2] * 0.8, 30, 0);
  
  rectMode(CENTER)
  fill(255, 0, 0, alfa[3]);
rect(coord_x[3] - raggio[3] * 0.75, coord_y[3], raggio[3], raggio[3] * 2);
  
    fill(255, 0, 0, alfa[4]);
rect(coord_x[4] - raggio[4] * 0.75, coord_y[4] + raggio[4] * 0.25, raggio[4] * 2, raggio[4]);
  
}


  function attiva_audio() {
     if (getAudioContext().state !== 'running') {
          userStartAudio();
     }
    
  }

function poligono(x, y, raggio, numero_punti, ruota) {
  let angolo = TWO_PI / numero_punti;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angolo) {
    let sx = x + cos(a + ruota) * raggio;
    let sy = y + sin(a + ruota) * raggio;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

