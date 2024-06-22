let altezza_tastiera;
let lunghezza_tastiera;
let nomi_note = ["DO", "RE", "MI", "FA", "SOL", "LA", "SI","DO", "RE", "MI", "FA", "SOL", "LA", "SI", "DO"];

let x_tasto = [];
let y_tasto = [];
let w_tasto = [];
let h_tasto = [];
let tasto_premuto = [];
let tasto_premuto_pre = [];

let distanza_tasti =   [0, 0, 1, 1, 2, 3, 3, 4, 4, 5, 5, 6, 7, 7, 8, 8, 9, 10, 10, 11, 11, 12, 12, 13, 14];

let synth;
let interazione = [];
let interazione_pre = [];
let audio_attivo = false;

let gui;

let r = 1;
let armoniche = [];
let angolo = [];

let moltiplica_pi = 1;

let nota_midi = 60;
let frequenza = 262;



function setup() {
  
  cnv = createCanvas(windowWidth,windowHeight);
  
  cnv.mouseClicked(attiva_audio);
  
  altezza_tastiera = height * 0.5;
  lunghezza_tastiera = width * 0.9;
    
    
  synth_interazione = new p5.MonoSynth();
  synth = new p5.MonoSynth();
 // synth.setADSR(0.005, 0.001, 1, 20);
 
}

function draw() {
  
  
  background(0, 200, 155);

    
 //----- disegno tastiera----//
  
  fill(0, 250, 255);
  let x_tastiera = (width - lunghezza_tastiera) * 0.5;
  let y_tastiera = (height - altezza_tastiera - 30);
  rect(x_tastiera, y_tastiera , lunghezza_tastiera, altezza_tastiera);
  
  rect(x_tastiera, 10, lunghezza_tastiera, altezza_tastiera * 0.65);
  
  fill(200, 250, 255);
  rect(x_tastiera, altezza_tastiera * 0.7125, lunghezza_tastiera, altezza_tastiera * 0.15);

  let lung_tasto = lunghezza_tastiera / 15.8; 
  let alt_tasto = altezza_tastiera * 0.8;
  
    for (let a = 0; a < 15; a++) {
     
//---- nomi note-----//
// il testo può essere levato e messo
    fill(0, 0, 0);
    textSize(lung_tasto * 0.4);
    textAlign(LEFT);
    text(nomi_note[a], x_tastiera + 15 + a * lung_tasto, y_tastiera + alt_tasto + 2 * lung_tasto * 0.4);
    }
  
//------- testi GUI----------//

 textAlign(CENTER);
 let frequenza_txt = round(frequenza * 100) / 100;
 let periodo_txt = round(1 / frequenza_txt * 100000) / 100;
 let l_onda_txt = round (340 / frequenza * 100) / 100;
 text('Frequenza: ' + frequenza_txt + ' Hertz     ' +    
      'Periodo: ' + periodo_txt + ' millisecondi     '+
      'Nota MIDI: ' + nota_midi, width * 0.5,  height * 0.4); 
 
  text('Lunghezza onda: ' + l_onda_txt + ' metri', width * 0.5, height * 0.32);
   textAlign(LEFT);
  text('Periodo = 1 / Frequenza        Periodo = Velocità del suono / Frequenza', x_tastiera + 10, 40 );
  
  
for (let i = 0; i < 25; i++) {
    
//------tasti bianchi-----// 
  if (i == 0 || i == 2 || i == 4 || i == 5 || i == 7 || i == 9 || i == 11 || i == 12 || i == 14 || i == 16 || i == 17 || i == 19 || i == 21 || i == 23 || i == 24) {

     fill(255, 255, 255);
     x_tasto[i] = x_tastiera + 10 + distanza_tasti[i] * lung_tasto;
     y_tasto[i] = y_tastiera + 10;
     w_tasto[i] = lung_tasto;
     h_tasto[i] = alt_tasto;
     rect (x_tasto[i], y_tasto[i], w_tasto[i], h_tasto[i]);
    
    if (sul_tasto_bianco(x_tasto[i], y_tasto[i], w_tasto[i], h_tasto[i]) == true) {
      
      fill(255, 0, 0, 50);
      rect (x_tasto[i], y_tasto[i], w_tasto[i], h_tasto[i]);
      tasto_premuto[i] = true;  
      
      if (mouseIsPressed) {
       interazione[i] = true;
       }
  else {
     interazione[i] = false;
  }
          
    }
    else {
      tasto_premuto[i] = false; 
    }
   } //fine if tasti bianchi
  }
  
 for (i = 0; i < 25; i++) {   
  if (i == 1 || i == 3 || i == 6 || i == 8 || i == 10 || i == 13 || i == 15 || i == 18 || i == 20 || i == 22) {
  //----- tasti_neri
    fill(0, 0, 0);
    x_tasto[i] = lung_tasto * 0.5 + x_tastiera + 10 + distanza_tasti[i] * lung_tasto;
    y_tasto[i] = y_tastiera + 10;
    w_tasto[i] = lung_tasto * 0.8;
    h_tasto[i] = alt_tasto * 0.6;
      
    rect (x_tasto[i], y_tasto[i], w_tasto[i], h_tasto[i]);
  
    if (sul_tasto_nero(x_tasto[i], y_tasto[i], w_tasto[i], h_tasto[i]) == true) {
      
      fill(255, 0, 0, 100);
      rect (x_tasto[i], y_tasto[i], w_tasto[i], h_tasto[i]);
      tasto_premuto[i] = true;
      
      if (mouseIsPressed) {
       interazione[i] = true;
       }
  else {
     interazione[i] = false;
  }
      
    }
    else {
       tasto_premuto[i] = false;
    }


   } //fine else tasti neri

  } //fine for tasti
  

//--------sintesi audio-------//  
   for (i = 0; i < 25; i++) {
     
     if (interazione[i] == true && interazione_pre[i] == false) {
        
      nota_midi = 60 + i;
      frequenza = midiToFreq(nota_midi); 
     
     moltiplica_pi = map(nota_midi, 60, 74, 1, 3);
     synth_interazione.play(frequenza, 1.0, 0, 0.5);
     }
        tasto_premuto_pre[i] = tasto_premuto[i];
        interazione_pre[i] = interazione[i];
     
   // scrivo numero nota midi e frequenza
   }
  
//-------visualizzatore-----//
  
  let total = floor(width / (r * 2));

  noFill();
  stroke(255, 255, 255);
  strokeWeight(3);
  beginShape();
  
  for (let i = 0; i < total + 1; i++) {
    
    angolo[i] = map(i, 0, total, 0, TWO_PI * moltiplica_pi);
    armoniche[i] = sin(angolo[i]);
    
    let y = map(armoniche[i], -1.5, 1.5, height * 0.3, 50);
    let x = map(i, 0, total + 1, 50, width - width/13 ) ;
    vertex(x, y);
  }
  
  endShape();  
  stroke(0);
  strokeWeight(1);
 
} // fine draw




function sul_tasto_nero(x, y, w, h) {
  
  if (mouseX > x && mouseX < x+w && mouseY > y && mouseY < y+h) {
	  return true;	
	} 
      else {
	  return false;	
	}
}

function sul_tasto_bianco(x, y, w, h) {
  
  if (mouseX > x && mouseX < x+w && mouseY > y + 0.52 * y && mouseY < y+h) {
	  return true;	
	} 
      else {
	  return false;	
	}
}

function seleziona_tonica() {
  tonica=  int(sel_tonica.value()); 
}

function seleziona_scala() {
  scala =  sel_scala.value();
}

function attiva_audio() {
   
 if (audio_attivo == false) {
   audio_attivo = true;
     if (getAudioContext().state !== 'running') {
          userStartAudio();
     }   
   }
 }

/// Add these lines below sketch to prevent scrolling on mobile
function touchMoved() {
  // do some stuff
  return false;
}