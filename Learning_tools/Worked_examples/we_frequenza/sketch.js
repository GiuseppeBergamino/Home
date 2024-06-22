let gui; //https://github.com/L05/p5.touchgui

let r = 1;
let armoniche = [];
let angolo = [];

let slider_amp;
let amp_armonica = [];

let slider_freq = 120;
let freq_armonica;
let frequenza = 100;

let sinusoide;

let cnv;
let audio_attivo = false;

let toggle_start;


function setup() {
  
  cnv = createCanvas(windowWidth, windowHeight);
  
 // cnv.mouseClicked(attiva_audio);
  
  gui = createGui();

  
  slider_amp = createSlider("Amp ", 50, height -50, width - width/5.5, 40, 0.00, 1.00);
  
  slider_amp.setStyle("fillBg", color(0, 188, 188));
  slider_amp.setStyle("fillBgHover", color(0, 188, 238));
  slider_amp.setStyle("fillBgActive", color(0, 188, 188));
  slider_amp.setStyle("fillTrack", color(0, 128, 120));
  slider_amp.setStyle("fillTrackHover", color(0, 128, 120));
  slider_amp.setStyle("fillTrackActive", color(0, 128, 120));
  slider_amp.setStyle("fillHandle", color(0, 188, 238));
  

     slider_amp.val = 0.5;
 
      
     amp_armonica = slider_amp.val;
     sinusoide = new p5.Oscillator('sine');
     sinusoide.amp(amp_armonica);
     sinusoide.freq(frequenza);
     sinusoide.start();
  
  
  slider_freq = createSlider("Frequenza Fondamentale", 50, height - 100, width - width/5.5, 40, 100, 880);
  slider_freq.setStyle("fillBg", color(0, 88, 188));
  slider_freq.setStyle("fillBgHover", color(0, 88, 238));
  slider_freq.setStyle("fillBgActive", color(0, 88, 188));
  slider_freq.setStyle("fillTrack", color(0, 28, 120));
  slider_freq.setStyle("fillTrackHover", color(0, 28, 120));
  slider_freq.setStyle("fillTrackActive", color(0, 28, 120));
  slider_freq.setStyle("fillHandle", color(0, 188, 238));
  
  slider_freq.val = 100;
  
   toggle_start = createToggle("Start", 5, 5, 100, 50);
   toggle_start.setStyle("fillBgOn", color(0, 88, 188));
   toggle_start.setStyle("fillBgOff", color(188, 188, 188));
   toggle_start.labelOff = "Start";
   toggle_start.labelOn = "Stop";
  
  
   let stileButton = {
      fillBg: color(60, 128, 188),
      fillBgHover: color(0, 188, 188),
    };
  


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
      

     sinusoide.freq(frequenza);
       
     if (slider_amp.isChanged) {
     amp_armonica = slider_amp.val;
      sinusoide.amp(amp_armonica);    
     }         
                
   

 let total = floor(width / (r * 2));

  noFill();
  stroke(0, 188, 238);
  strokeWeight(2);
  beginShape();
  
  for (let i = 0; i < total + 1; i++) {
    
    angolo[i] = map(i, 0, total, 0, TWO_PI * 2);
    armoniche[i] = sin(angolo[i] * frequenza * 0.01) * amp_armonica;
                   
    
    let y = map(armoniche[i], 1, -1, height * 0.25, height * 0.75);
    let x = map(i, 0, total + 1, 50, width - width/13 ) ;
    vertex(x, y);
  }
  
  endShape();  
  

  textAlign(CENTER)
  fill(255, 255, 255);
  textSize(height * 0.025);
  text('Frequenza: ' + int(frequenza) + 'Hz', width * 0.5, height - 75);
  text('Ampiezza: ' + amp_armonica, width * 0.5, height - 25);

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