let cnv;

let numero_cerchi = 8;
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
   campione[i] = loadSound('Chit_js.mp3');
   coord_y[i] = random(height - diametro[i]) + diametro[i];
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
    
    fill(255, 0, 0, alfa[i]);
    ellipse(coord_x[i], coord_y[i], diametro[i], diametro[i]);
 
 }
  
  
}


  function attiva_audio() {
     if (getAudioContext().state !== 'running') {
          userStartAudio();
     }
    
  }

