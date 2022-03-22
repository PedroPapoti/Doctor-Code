
let doctor = [];
let size = 20;
let counter = 60;
let number;
let second;

function preload() {
    for(let i=0; i <13; i++){
        doctor[i] = loadImage('imagens/doctor'+i+'.png');
    }
}

function setup() {
    createCanvas(displayWidth,displayHeight, WEBGL);
    frameRate(10);
    counter += frameCount;
    number = 0;
    second = 60;
}

function draw() {
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
}


