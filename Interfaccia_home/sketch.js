let link_web_inst;
let link_multimodal_inst;
let link_musical_instruments;
let link_music;
let link_learning_tools;

let r = 0.5;
let armoniche = [];
let angolo = [];
let sinusoide = [];

let incremento = 25;
let incr_angolo = 0;

let val_r_x = 0;
let val_r_y = 0;
let val_r = 0;

let offsetX_multimodal;
let offsetX_web_inst;
let offsetX_mus_inst;
let offsetX_learning;
let offsetX_music;


function setup() {
  createCanvas(windowWidth, windowHeight);
  
 link_web_inst = createA('https://giuseppebergamino.github.io/Home/Web_Installations/', 'Web Installations', '_top'); //self interessante
   
  
  link_multimodal_inst = createA('https://giuseppebergamino.github.io/Home/Multimodal_Installations/', 'Multimodal Installations','_top'); 
  
  link_musical_instruments = createA('https://giuseppebergamino.github.io/Home/Musical_Instruments/', 'Musical Instruments','_top'); 
  
  link_music = createA('https://giuseppebergamino.github.io/Home/Music/', 'Music','_top'); 
  
  link_learning_tools = createA('https://giuseppebergamino.github.io/Home/Learning_tools/', 'Learning Tools','_top'); 
  
  
  
}

function draw() {
  background(0);
  
  fill(0);
  noStroke();
  rect(35, 20, 120, 20)
   
  noFill();
  
  link_multimodal_inst.position(10 + incremento, 20);
  link_musical_instruments.position(10 + incremento, 50);
  link_web_inst.position(10 + incremento, 80);
  link_learning_tools.position(10 + incremento, 110);
  link_music.position(10 + incremento, 140);

  
  strokeWeight(1.5);
  stroke(255);

  
   let rectLink1 = link_multimodal_inst.elt.getBoundingClientRect();
   offsetX_multimodal = rectLink1.x + rectLink1.width + 5;
  
   let rectLink2 = link_musical_instruments.elt.getBoundingClientRect();
   offsetX_mus_inst = rectLink2.x + rectLink2.width + 5;
    
   let rectLink3 = link_web_inst.elt.getBoundingClientRect();
   offsetX_web_inst = rectLink3.x + rectLink3.width + 5;
  
   let rectLink4 = link_learning_tools.elt.getBoundingClientRect();
   offsetX_learning = rectLink4.x + rectLink4.width + 5;
  
   let rectLink5 = link_music.elt.getBoundingClientRect();
   offsetX_music = rectLink5.x + rectLink5.width + 5;
  
   let total = floor(width / (r * 15));
  
   let num_div = 20;
 
if (pmouseX != mouseX ||
    pmouseY != mouseY) {
   val_r_x = map(mouseX, 0, windowWidth, 1, 0);
   val_r_y = map(mouseY, 0, windowHeight, 0, 1);
   val_r = val_r_x + val_r_y;
}
  beginShape();

  for (let i = 0; i < total + 1; i++) {
    
    angolo[i] = map(i, 0, total, 0, TWO_PI * 2);
    armoniche[i] = sin(0.5 * angolo[i] - incr_angolo) * 0.1;
    
    let y = map(armoniche[i] + random(0.5)*0.05 * val_r, -0.1, 0.1, 25 - val_r, 35 + val_r);
    let x = map(i, 0, total + 1, offsetX_multimodal, width - width/num_div) ;
    vertex(x, y);
  }
  
  endShape(); 
  
  beginShape();
  //rotate(PI * 0.2)
  //translate(100, -70);
  for (let i = 0; i < total + 1; i++) {
    
    angolo[i] = map(i, 0, total, 0, TWO_PI * 2);
    armoniche[i] = sin(1 * angolo[i] - incr_angolo) * 0.1;
    
    let y = map(armoniche[i] + random(1)*0.05 * val_r, -0.1, 0.1, 55 - val_r, 65 + val_r);
    let x = map(i, 0, total + 1, offsetX_mus_inst, width - width/num_div) ;
    vertex(x, y);
  }
  
  endShape(); 
  
  beginShape();
  //rotate(PI * 0.2)
  //translate(100, -70);
  for (let i = 0; i < total + 1; i++) {
    
    angolo[i] = map(i, 0, total, 0, TWO_PI * 2);
    armoniche[i] = sin(2 * angolo[i] - incr_angolo) * 0.1;
    
    let y = map(armoniche[i] + random(2)*0.05 * val_r, -0.1, 0.1, 85 - val_r, 95 + val_r);
    let x = map(i, 0, total + 1, offsetX_web_inst, width - width/num_div) ;
    vertex(x, y);
  }
  
  endShape(); 
  
  beginShape();
  //rotate(PI * 0.2)
  //translate(100, -70);
  for (let i = 0; i < total + 1; i++) {
    
    angolo[i] = map(i, 0, total, 0, TWO_PI * 2);
    armoniche[i] = sin(3 * angolo[i] - incr_angolo) * 0.1;
    
    let y = map(armoniche[i] + random(3)*0.05 * val_r, -0.1, 0.1, 115 - val_r, 125 + val_r);
    let x = map(i, 0, total + 1, offsetX_learning, width - width/num_div);
    vertex(x, y);
  }
  
  endShape(); 
  
beginShape();
  //rotate(PI * 0.2)
  //translate(100, -70);
  for (let i = 0; i < total + 1; i++) {
    
    angolo[i] = map(i, 0, total, 0, TWO_PI * 2);
    armoniche[i] = sin(4 * angolo[i] - incr_angolo) * 0.1;
    
    let y = map(armoniche[i] + random(4)*0.05 * val_r, -0.1, 0.1, 145 - val_r, 155 + val_r);
    let x = map(i, 0, total + 1, offsetX_music, width - width/num_div) ;
    vertex(x, y);
  }
  
  endShape();
  
  //incremento++;
  incr_angolo = incr_angolo + 0.03;
  
  if (incremento >= width) {
     incremento = 0;
  }
}
