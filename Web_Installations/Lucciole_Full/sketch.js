let numero_punti_max = 50;
let punti = [];
let target_x = [];
let target_y = [];
let target_x_random = [];
let target_y_random = [];

let spazio;
let dens = 10; //cambiare questo valore per avere più o meno punti in funzione dello schermo
let numero_punti;

let pulsazione = [];
let fase_pulsazione = [];
let amp_puls = [];
let pulsazione_pre = [];

let dist_link;
let collegato = [];

let vel_spostamento = [];
let vel_spostamento_random = [];
let vel_spostamento_nota = [];

let bordo;
let sample = [];
let indice_sample = 0;
let sample_play = 0;

let suona = false;
let audio_attivo = false;
let cnv;
let trigger_lucciola;
let lastRandom = 0;

let fs = false;
let mouse_pre = false, mouse_ora = false;



function preload() {
      
  soundFormats('ogg', 'mp3');
  bordo = loadSound('Bordo.mp3');
  
  sample[0] = loadSound('coro_crisi.mp3');
  
  sample[1] = loadSound('anna1.mp3');
  sample[2] = loadSound('anna2.mp3');
  sample[3] = loadSound('anna3.mp3');
  sample[4] = loadSound('anna4.mp3');
  sample[5] = loadSound('anna5.mp3');
  sample[6] = loadSound('anna6.mp3');
  sample[7] = loadSound('anna7.mp3');
  sample[8] = loadSound('anna8.mp3');
  sample[9] = loadSound('anna9.mp3');
  
  sample[10] = loadSound('metro1.mp3');
  sample[11] = loadSound('metro2.mp3');
  sample[12] = loadSound('metro3.mp3');
  sample[13] = loadSound('metro4.mp3');
  sample[14] = loadSound('metro5.mp3');
  sample[15] = loadSound('metro6.mp3');
  sample[16] = loadSound('metro7.mp3');
  sample[17] = loadSound('metro8.mp3');
  sample[18] = loadSound('metro9.mp3');
  sample[19] = loadSound('metro10.mp3');
  
  sample[20] = loadSound('praga1.mp3');
  sample[21] = loadSound('praga2.mp3');
  sample[22] = loadSound('praga3.mp3');
  sample[23] = loadSound('praga4.mp3');
  sample[24] = loadSound('praga5.mp3');
  sample[25] = loadSound('praga6.mp3');
  sample[26] = loadSound('praga7.mp3');
  sample[27] = loadSound('praga8.mp3');
  sample[28] = loadSound('praga9.mp3');
  sample[29] = loadSound('praga10.mp3');
  sample[30] = loadSound('praga11.mp3');
  sample[31] = loadSound('praga12.mp3');
  sample[32] = loadSound('praga13.mp3');
  sample[33] = loadSound('praga14.mp3');
  sample[34] = loadSound('praga15.mp3');
  sample[35] = loadSound('praga16.mp3');
  sample[36] = loadSound('praga17.mp3');
  sample[37] = loadSound('praga18.mp3');
  sample[38] = loadSound('praga19.mp3');
  sample[39] = loadSound('praga20.mp3');
  sample[40] = loadSound('praga21.mp3');
  sample[41] = loadSound('praga22.mp3');
  sample[42] = loadSound('praga23.mp3');
  
  sample[43] = loadSound('no_tav1.mp3');
  sample[44] = loadSound('no_tav2.mp3');
  sample[45] = loadSound('no_tav3.mp3');
  sample[46] = loadSound('no_tav4.mp3');
  sample[47] = loadSound('no_tav5.mp3');
  sample[48] = loadSound('no_tav6.mp3');
  sample[49] = loadSound('no_tav7.mp3');
  sample[50] = loadSound('no_tav8.mp3');
  sample[51] = loadSound('no_tav9.mp3');
  sample[52] = loadSound('no_tav10.mp3');
  sample[53] = loadSound('no_tav11.mp3');
  sample[54] = loadSound('no_tav12.mp3');
  sample[55] = loadSound('no_tav13.mp3');
  sample[56] = loadSound('no_tav14.mp3');
  sample[57] = loadSound('no_tav15.mp3');
  sample[58] = loadSound('no_tav16.mp3');
  sample[59] = loadSound('no_tav17.mp3');
  sample[60] = loadSound('no_tav18.mp3');    

}


function setup() { 
  
  frameRate(24);
  
  cnv = createCanvas(windowWidth, windowHeight);
  //size(600, 400);
  cnv.mouseClicked(attiva_audio);
  getAudioContext().suspend();     
  
  let lung_x = width;
  let lung_y = height;
  let lung;
// definisco lunghezza maggiore rispetto al formato dello schermo 
  if (lung_x >= lung_y) {
     lung = lung_x;
   } 
  else {
  lung = lung_y;
  }
  
  numero_punti = lung/100 * dens; //parametrizzo il numero dei punti
  
  if (numero_punti > numero_punti_max) { //limito il numero di punti rispetto al massimo dell'array
    numero_punti = numero_punti_max;
  }
   
  for (let i = 0; i < numero_punti; i++) { //calcolo posizioni iniziali e target iniziali lucciole
    
    punti[i] = createVector(floor(random(width)), floor(random(height))); 

    target_x[i] = floor(random(width));
    target_y[i] = floor(random(height));
    
    target_x_random[i] = target_x[i];
    target_y_random[i] = target_y[i];
       
    fase_pulsazione[i] = random(-2 * PI, 2 * PI);  //gestione matematica alone delle lucciole
    amp_puls[i] = random(8) + 30;
    pulsazione[i] = 10 + amp_puls[i] * abs(sin(fase_pulsazione[i]));
    pulsazione_pre[i] = pulsazione[i];
    
    vel_spostamento_random[i] = random(2) + 0.1;
    collegato[i] = 0;
  }
  
  dist_link = lung * 0.065; //distanza entro la quale le lucciole si collegano

  trigger_lucciola = int(numero_punti * 0.65 + 1);
indice_sample = int(random(sample.length));

  bordo.loop();
  bordo.amp(1);
  
} //fine setup

function draw() { 
  
  background(0);

  noStroke();

//--------- gestione movimento lucciole ------//

  for (let i = 0; i < numero_punti; i++) {
    
  
      target_x[i] = target_x_random[i];
      target_y[i] = target_y_random[i];
      vel_spostamento[i] = vel_spostamento_random[i];
    

   if (abs(punti[i].x - target_x_random[i]) < vel_spostamento[i] ) { //se x arriva al target entro un margine
        
       target_x_random[i] = int(random(width)); //aggiorno a un nuovo target randomico x
       vel_spostamento_random[i] = random(2) + 0.15; //modifico velocità
     
     }
    
    if (punti[i].x > target_x[i]) { 
       
      punti[i].x =  punti[i].x - vel_spostamento[i];
      
    }
    
    if (punti[i].x < target_x[i]) {
       
        punti[i].x = punti[i].x + vel_spostamento[i];
    }
    
    if (abs(punti[i].y - target_y_random[i]) < vel_spostamento[i] ) {//se x arriva al target entro un margine
        
       target_y_random[i] = int(random(height));//aggiorno a un nuovo target randomico y
     
     }
    
    if (punti[i].y > target_y[i]) {
       
      punti[i].y = punti[i].y - vel_spostamento[i] ;
      
    }
    
    if (punti[i].y < target_y[i]) {
       
        punti[i].y = punti[i].y + vel_spostamento[i];
    }
// -------- disegno lucciola ---------//
    
    strokeWeight(random(3) + 1);
    //strokeWeight(1);
    stroke(255);
    fill(255, 255, 0, 255);
    point(punti[i].x, punti[i].y);
  
//---------- disegno alone ---------//
    
    noStroke();
    
    fill(255, 255, 0, 25);
    ellipse(punti[i].x, punti[i].y, pulsazione[i], pulsazione[i]);
    ellipse(punti[i].x, punti[i].y, pulsazione[i] - pulsazione[i] * 0.4, pulsazione[i] - pulsazione[i] * 0.4);
    fase_pulsazione[i] = fase_pulsazione[i] + 0.035;
    pulsazione[i] = 10 + amp_puls[i] * abs(sin(fase_pulsazione[i]));
    
  } // fine for lucciole
  
// ---------- calcolo distanze tra le lucciole e disegno collegamenti -------//
  
 let distanza;
 let numero_collegamenti = 0;
  
  for (let i = 0; i < numero_punti; i++) {
   for (let j = 0; j < numero_punti; j++) {
   
     if (i != j) { //se sono lucciole diverse
     distanza = dist(punti[i].x, punti[i].y, punti[j].x, punti[j].y );
       //dist_link = 150;
       if (distanza <= dist_link) { //se la distanza è giusta disegno il collegamento
       
          strokeWeight(2);
          stroke(255, 255, 0, 50);
          line(punti[i].x, punti[i].y, punti[j].x, punti[j].y);       
          strokeWeight(8);
          stroke(255, 255, 0, 30);
          line(punti[i].x, punti[i].y, punti[j].x, punti[j].y);
          strokeWeight(10 + pulsazione[i] * 0.25);
          stroke(255, 255, 0, 20);
          line(punti[i].x, punti[i].y, punti[j].x, punti[j].y); 
          
          numero_collegamenti++;
          
      }  //fine disegno collegamento 

     } //fine if lucciole diverse
     
    } //fine for lucciola j-esima
   } //fine for i-esima
   
   numero_collegamenti = numero_collegamenti * 0.5;
  
  strokeWeight(1);
  stroke(255);
  noFill();

  fill(255);
  
  
  
  if (audio_attivo == false) {
        
    fill(255, 255, 255, 200);
    strokeWeight(10);
    stroke(255, 255, 0, 150);
    rectMode(CENTER);
    rect(width * 0.5, height * 0.5 - 11, width * 0.5, height * 0.1,
        30, 30, 30, 30);
      
    fill(0);
    stroke(0);
    strokeWeight(1);
    textSize(22);
    textFont('Times');
    textAlign(CENTER);
      
    text("ATTIVA AUDIO", width * 0.5, height * 0.5 - 5);
    }
  
  else { 
  
  // --------sintesi audio--------//

  
  if (numero_collegamenti > (trigger_lucciola)) {
    
      if (suona == false) {
          sample[indice_sample].play();
          }
    
      if (sample[indice_sample].isPlaying() == true) { 
          suona = true;
        }
      else { 
        suona = false;
        indice_sample = getNonRepeatRand();   
       }
      
    }
  } //fine else audio attivo
 
 // text(numero_collegamenti, width * 0.5, height * 0.5);
 // text(trigger_lucciola, width * 0.5, height * 0.25);
  
  if (fs == false) {
    fill(255, 255, 255, 200);
    strokeWeight(10);
    stroke(255, 255, 0, 150);
    rectMode(CORNER);
    rect(10, 10, 120, 30, 15, 15, 15, 15);
    fill(0);
    stroke(0);
    strokeWeight(1);
    textSize(18);
    textFont('Times');
    textAlign(LEFT);
    text("Full Screen", 25, 30);
  }
  
  mouse_ora = mouseIsPressed;
  
  if (mouse_ora == true && mouse_pre == false) {
    if (mouseX > 10 && mouseX < 100 && mouseY > 10 && mouseY < 30) {
    fullscreen(!fs);
    fs = !fs;
   }
  }
  
  mouse_pre = mouse_ora;
   
} // fine del draw


function attiva_audio() {
  if (mouseX > 50 && mouseY > 50) {
 if (audio_attivo == false) {
   audio_attivo = true;
     if (getAudioContext().state !== 'running') {
          userStartAudio();
     }   
   }
  
  else {
    audio_attivo = false;
    getAudioContext().suspend();
   }
  }
 } 

function getNonRepeatRand(){
 while (true){
    let randomNum = int(random(sample.length));
    if (randomNum == lastRandom){
       //console.log ("found dupliacte!");
       continue;
     }
    else{
    lastRandom = randomNum
    return randomNum;
    }  
 }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

