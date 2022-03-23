let doctor = [];
let size = 20;
let counter = 60;
let number;
let second;
let p5Canvas

let capturer = new CCapture({
    format: "webm",
    framerate: 5,
    verbose: true
  });

function preload() {
    for(let i=0; i <13; i++){
        doctor[i] = loadImage('img/doctor'+i+'.png');
    }
}

function setup() {
    p5Canvas = createCanvas(displayWidth,displayHeight, WEBGL);
    frameRate(10);
    counter += frameCount;
    number = 0;
    second = 60;
}

function draw() {
    if (frameCount === 1){
        capturer.start();
      } 
    background(random(40,150));
    rotateZ(frameCount * 0.012);
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.03);
    
    if(number <= 12){
        texture(doctor[number]);
        box(displayWidth/1);

        if(frameCount == counter){
            texture(doctor[number]);
            box(displayWidth/size);
            size -= 3;
            counter = frameCount + 60;
        }
        texture(doctor[number]);
        box(displayWidth/size);
        number++;

        if(number === 12){
            number = 0;
        }
    }

    if(frameCount < 60 * 20) { 
        capturer.capture(p5Canvas.canvas);
    }else if(frameCount === 60 * 20) { 
        noLoop();
        capturer.stop();
        capturer.save();
    }
}


