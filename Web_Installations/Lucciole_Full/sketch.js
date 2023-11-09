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

let vel_spostamento = [];
let vel_spostamento_random = [];
let vel_spostamento_nota = [];

let numero_zone_note = 6;
let distanza_zone_x;
let distanza_zone_y;
let zone_note_x = [];
let zone_note_y = [];

let target_x_nota;
let target_y_nota;

let bordo;
let sample = [];
let indice_sample = 0;
let sample_play = 0;

let suona = false;



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
    

}


function setup() { 
  
  frameRate(18);

  
createCanvas(windowWidth, windowHeight);
  //size(600, 400);
       
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
  }
  
  dist_link = lung * 0.06; //distanza entro la quale le lucciole si collegano

 //------ calcolo coordinate centrali zone note------//
 
 distanza_zone_x = width / (6);
 distanza_zone_y = height / (4);
   
 zone_note_x[0] = distanza_zone_x ; 
 zone_note_y[0] = distanza_zone_y ;
 zone_note_x[1] = distanza_zone_x ; 
 zone_note_y[1] = 3 * distanza_zone_y;
 
 zone_note_x[2] = 3 * distanza_zone_x ; 
 zone_note_y[2] = distanza_zone_y ;
 zone_note_x[3] = 3 * distanza_zone_x ; 
 zone_note_y[3] = 3 * distanza_zone_y;
 
 zone_note_x[4] = 5 * distanza_zone_x ; 
 zone_note_y[4] = distanza_zone_y ;
 zone_note_x[5] = 5 * distanza_zone_x ; 
 zone_note_y[5] = 3 * distanza_zone_y;
  
indice_sample = floor(random(43));

  
} //fine setup

function draw() { 
  
  background(0);


//------- gestione note in ingresso -------//
/*   
   for (int i = 0; i < numero_zone_note; i++) {
    
   fill(100, 50);
   ellipse(zone_note_x[i], zone_note_y[i], distanza_zone_x * 2, distanza_zone_x * 2);

  } */
  noStroke();
 /* 
  if (nota_in == true) {
    
    if (valore_nota < 30) {
      fill(100, 100, 0, 50);
      ellipse(zone_note_x[1], zone_note_y[1], distanza_zone_x * 2, distanza_zone_x * 2);
      target_x_nota = zone_note_x[1];
      target_y_nota = zone_note_y[1];
    }
    
     if (valore_nota >= 30 && valore_nota < 45) {
      fill(100, 100, 0, 50);
      ellipse(zone_note_x[0], zone_note_y[0], distanza_zone_x * 2, distanza_zone_x * 2);
      target_x_nota = zone_note_x[0];
      target_y_nota = zone_note_y[0];
    }
    
     if (valore_nota >= 45 && valore_nota < 60) {
      fill(100, 100, 0, 50);
      ellipse(zone_note_x[3], zone_note_y[3], distanza_zone_x * 2, distanza_zone_x * 2);
      target_x_nota = zone_note_x[3];
      target_y_nota = zone_note_y[3];
    }
    
     if (valore_nota >= 60 && valore_nota < 75) {
      fill(100, 100, 0, 50);
      ellipse(zone_note_x[2], zone_note_y[2], distanza_zone_x * 2, distanza_zone_x * 2);
      target_x_nota = zone_note_x[2];
      target_y_nota = zone_note_y[2];
    }
    
     if (valore_nota >= 75 && valore_nota < 90) {
      fill(100, 100, 0, 50);
      ellipse(zone_note_x[5], zone_note_y[5], distanza_zone_x * 2, distanza_zone_x * 2);
      target_x_nota = zone_note_x[5];
      target_y_nota = zone_note_y[5];
    }
    
     if (valore_nota >= 90) {
      fill(100, 100, 0, 50);
      ellipse(zone_note_x[4], zone_note_y[4], distanza_zone_x * 2, distanza_zone_x * 2);
      target_x_nota = zone_note_x[4];
      target_y_nota = zone_note_y[4];
    }   
  }
  */
//--------- gestione movimento lucciole ------//

  for (let i = 0; i < numero_punti; i++) {
    
  
      target_x[i] = target_x_random[i];
      target_y[i] = target_y_random[i];
      vel_spostamento[i] = vel_spostamento_random[i];
    

   if (abs(punti[i].x - target_x_random[i]) < vel_spostamento[i] ) { //se x arriva al target entro un margine
        
       target_x_random[i] = floor(random(width)); //aggiorno a un nuovo target randomico x
       vel_spostamento_random[i] = random(2) + 0.15; //modifico velocità
     
     }
    
    if (punti[i].x > target_x[i]) { 
       
      punti[i].x =  punti[i].x - vel_spostamento[i];
      
    }
    
    if (punti[i].x < target_x[i]) {
       
        punti[i].x = punti[i].x + vel_spostamento[i];
    }
    
    if (abs(punti[i].y - target_y_random[i]) < vel_spostamento[i] ) {//se x arriva al target entro un margine
        
       target_y_random[i] = floor(random(height));//aggiorno a un nuovo target randomico y
     
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
   
  strokeWeight(1);
  stroke(255);
  noFill();

  fill(255);
  
    
// --------sintesi audio--------//

  
  if (bordo.isPlaying() == false) {
     bordo.loop();
     bordo.amp(0.7);
  }
  
  if (numero_collegamenti > 80) {
    
      if (suona == false) {
          sample[indice_sample].play();
          }
    
      if (sample[indice_sample].isPlaying() == true) { 
          suona = true;
        }
      else { 
        suona = false;
        indice_sample = floor(random(43));   
       }
      
  }

  
} // fine del draw


