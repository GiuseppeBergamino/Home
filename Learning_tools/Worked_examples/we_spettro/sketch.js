let gui; //https://github.com/L05/p5.touchgui

let r = 1;
let armoniche = [];
let angolo = [];

let slider_amp = [];
let amp_armonica = [];

let slider_freq = 120;
let freq_armonica = [];
let frequenza = 80;

let sinusoide = [];

let cnv;
let audio_attivo = false;

let toggle_start;
let button_sin;
let button_tri;
let button_quad;
let button_saw;
let button_formula;

function setup() {
  
  cnv = createCanvas(windowWidth, windowHeight);
  
 // cnv.mouseClicked(attiva_audio);
  
  gui = createGui();

for (let i = 0; i <  12; i++) {
  
  slider_amp[i] = createSliderV("Amp " + i + 1, 50 + width/14 * i, height * 0.5, 40, height * 0.45, 0.00, 1.00);
  
  slider_amp[i].setStyle("fillBg", color(0, 188, 188));
  slider_amp[i].setStyle("fillBgHover", color(0, 188, 238));
  slider_amp[i].setStyle("fillBgActive", color(0, 188, 188));
  slider_amp[i].setStyle("fillTrack", color(0, 128, 120));
  slider_amp[i].setStyle("fillTrackHover", color(0, 128, 120));
  slider_amp[i].setStyle("fillTrackActive", color(0, 128, 120));
  slider_amp[i].setStyle("fillHandle", color(0, 188, 238));
  
  if (i > 0) {
     slider_amp[i].val = 0;
   }
  else {
     slider_amp[i].val = 1;
   }
      
     amp_armonica[i] = slider_amp[i].val;
     sinusoide[i] = new p5.Oscillator('sine');
     sinusoide[i].amp(amp_armonica[i]);
     sinusoide[i].freq(frequenza * (i + 1));
     sinusoide[i].start();
  }
  
  slider_freq = createSlider("Frequenza Fondamentale", 50, height * 0.45 - 20, width - width/5.5  , 40, 80, 320);
  slider_freq.setStyle("fillBg", color(0, 88, 188));
  slider_freq.setStyle("fillBgHover", color(0, 88, 238));
  slider_freq.setStyle("fillBgActive", color(0, 88, 188));
  slider_freq.setStyle("fillTrack", color(0, 28, 120));
  slider_freq.setStyle("fillTrackHover", color(0, 28, 120));
  slider_freq.setStyle("fillTrackActive", color(0, 28, 120));
  slider_freq.setStyle("fillHandle", color(0, 188, 238));
  
  slider_freq.val = 80;
  
   toggle_start = createToggle("Start", 5, 5, 100, 50);
   toggle_start.setStyle("fillBgOn", color(0, 88, 188));
   toggle_start.setStyle("fillBgOff", color(188, 188, 188));
   toggle_start.labelOff = "Start";
   toggle_start.labelOn = "Stop";
  


   button_sin =  createButton("Sinusoide", 205, 5, 110, 50);
   button_tri = createButton("Triangolare", 315, 5, 110, 50);
   button_quad = createButton("Quadra", 425, 5, 110, 50);
   button_saw = createButton("Sega", 535, 5, 110, 50);
   button_formula = createButton("Nessuna armonica", 700, 5, 500, 50);
  
   let stileButton = {
      fillBg: color(60, 128, 188),
      fillBgHover: color(0, 188, 188),
    };
  
  button_sin.setStyle(stileButton);
  button_tri.setStyle(stileButton);
  button_quad.setStyle(stileButton);
  button_saw.setStyle(stileButton);
  button_formula.setStyle("fillBg", color(0, 188, 188));
  button_formula.setStyle("fillBgHover", color(0, 188, 188));

  getAudioContext().suspend();

}

function draw() {

    background(0);
    drawGui();
 
  if (toggle_start.val == 1) {
     attiva_audio();
  }
  else {
     disattiva_audio();
  }
  
  if (slider_freq.isChanged) {
  frequenza = slider_freq.val;
  }
  
   for (let i = 0; i < 12; i++) {
     
     amp_armonica[i] = slider_amp[i].val;
     sinusoide[i].freq(frequenza * (i + 1));
       
     if (slider_amp[i].isChanged) {

     //slider_amp[i].label =  "val" + slider_amp[i].val;
      sinusoide[i].amp(amp_armonica[i] * 0.8);    
     }         
                
   }

 let total = floor(width / (r * 2));

  noFill();
  stroke(0, 188, 238);
  strokeWeight(2);
  beginShape();
  
  for (let i = 0; i < total + 1; i++) {
    
    angolo[i] = map(i, 0, total, 0, TWO_PI * 2);
    armoniche[i] = sin(angolo[i])     * amp_armonica[0]  + 
                   sin(angolo[i] * 2) * amp_armonica[1]  + 
                   sin(angolo[i] * 3) * amp_armonica[2]  +
                   sin(angolo[i] * 4) * amp_armonica[3]  +
                   sin(angolo[i] * 5) * amp_armonica[4]  +
                   sin(angolo[i] * 6) * amp_armonica[5]  +
                   sin(angolo[i] * 7) * amp_armonica[6]  + 
                   sin(angolo[i] * 8) * amp_armonica[7]  +
                   sin(angolo[i] * 9) * amp_armonica[8]  +
                   sin(angolo[i] * 10) * amp_armonica[9] +
                   sin(angolo[i] * 11) * amp_armonica[10] +
                   sin(angolo[i] * 12) * amp_armonica[11];
    
    let y = map(armoniche[i], -2.5, 2.5, height * 0.35, 50);
    let x = map(i, 0, total + 1, 50, width - width/13 ) ;
    vertex(x, y);
  }
  
  endShape();  
  
 if (button_sin.isPressed) {
    
   button_formula.label = "Nessuna armonica";
       for (let i = 1; i < 12; i++) {
     
      slider_amp[i].val = 0;  
      sinusoide[i].amp(0);
    }  
   
      slider_amp[0].val = 1;  
      sinusoide[0].amp(1);  
  }
  
 if (button_tri.isPressed) {

   button_formula.label = "Armoniche dispari, ampiezze = 1/(ordine armonica ^ 2)";
   slider_amp[0].val = 1;  
   sinusoide[0].amp(1); 
  for (let i = 1; i < 12; i++) {
    
     if ((i + 1) % 2 == 1) { 
      //slider_amp[i].val = 1/(pow((i + 1), 2.00));  
     // sinusoide[i].amp(1/(pow((i + 1), 2.00)));
       slider_amp[i].val = 1.00/(pow(i + 1, 2));  
       sinusoide[i].amp(1.00/(pow(i + 1, 2)));
     }
    
    else {
       slider_amp[i].val = 0;  
      sinusoide[i].amp(0);
     }
   }    
  }
  
 if (button_quad.isPressed) {
    button_formula.label = "Armoniche dispari, ampiezze = 1/ordine armonica";
   
   slider_amp[0].val = 1;  
   sinusoide[0].amp(1); 
   
  for (let i = 1; i < 12; i++) {
     
    if ((i + 1) % 2 == 1) {
      slider_amp[i].val = 1/(i + 1);  
      sinusoide[i].amp(1/(i + 1, 2));
     }
    else {
       slider_amp[i].val = 0;  
      sinusoide[i].amp(0);
     }
   }    
 }
  
  if (button_saw.isPressed) {
  button_formula.label = "Tutte le armoniche, ampiezze = 1/ordine armonica";
  
    slider_amp[0].val = 1;  
    sinusoide[0].amp(1); 
  for (let i = 1; i < 12; i++) {
     
      slider_amp[i].val = 1/(i + 1);  
      sinusoide[i].amp(1/(i + 1));
     
    }    
  }
  
  textAlign(CENTER)
  fill(255, 255, 255);
  textSize(height * 0.025);
  text('Frequenza Fondamentale: ' + int(frequenza) + 'Hz', width * 0.5, height * 0.45 + 5);
  for (let i = 0; i <  12; i++) {
  
  text("n=" + (i + 1), 70 + width/14 * i, height * 0.5); //40, height * 0.45, 0.00, 1.00);
  }
}//fine draw

function attiva_audio() {
   
 if (audio_attivo == false) {
   audio_attivo = true;
     if (getAudioContext().state !== 'running') {
          userStartAudio();
     }   
   }
 }

function disattiva_audio() {
   
 if (audio_attivo == true) {
   audio_attivo = false;
     if (getAudioContext().state == 'running') {
     getAudioContext().suspend();
     }   
   }
 }