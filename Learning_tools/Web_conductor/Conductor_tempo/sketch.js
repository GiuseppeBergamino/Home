let diametro = 40;
let x = diametro * 0.5;
let y = 0;

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  y = random (height);
}

function draw() {
  background(255);
  
  //-------disegno rettangoli esecuzione ------//
  noStroke();
  let alfa_rett = 30;
  //rettangolo rosso ritardo
  fill(255, 0, 0, alfa_rett);
  rect(width - 50, 0, 50, height );
  //rettangolo arancio ritardo
  fill(255, 155, 0, alfa_rett);
  rect(width - 100, 0, 50, height);
  //rettangolo verde 
  fill(0, 255, 0, alfa_rett);
  rect(width - 200, 0, 100, height);
  //rettangolo arancio anticipo
  fill(255, 155, 0, alfa_rett);
  rect(width - 250, 0, 50, height);
  //rettangolo rosso anticipo
  fill(255, 0, 0, alfa_rett);
  rect(width - 300, 0, 50, height);
  
    textAlign(CENTER);
  stroke(0.5);
   fill(0, 0, 0); 
  text('ANTICIPO', width - 250, 20);
  text('SUONA', width - 150, 20);
  text('RITARDO', width - 50, 20);
  
  fill(0, 0, 255, 120);
  
  ellipse(x, y, diametro, diametro);
  x++;
  
  if (x  > (width + diametro * 0.5)) {
     x = - diametro * 0.5;
     y =  random(height);
  }
  
  
  
}