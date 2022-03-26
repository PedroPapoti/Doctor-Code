# Doctor-Code

<p aling="center">
    <img width="300" src="img/doctor5.png">
</p>
 This is a project that aims to show "creative programming" through p5.js.

# Introduction 
Create an HTML file at the root of your project, `index.html` and insert this inside the file:

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/p5@1.4.1/lib/p5.js"></script>
    <script src="script.js"></script>
    <link rel="stylesheet" href="style.css">
    <title>Doctor</title>
</head>
<body>
</body>
</html>
```
Note that within the html file three more files were inserted: `style.css`, `script.js ` and the p5.js library.

 ## P5.js
 
 p5.js is a JavaScript library for creative coding, with a focus on making coding accessible and inclusive for artists, designers, educators, beginners, and anyone else.

 You can use the p5.js library in your project in two ways:

 - Download the [p5.js](https://p5js.org/download/) library directly from the website.

 - Using a hosted version of the [p5.js](https://cdn.jsdelivr.net/npm/p5/lib/) library.

In this case I chose to use the file hosted online:

```javascript
<script src="https://cdn.jsdelivr.net/npm/p5@1.4.1/lib/p5.js"></script>
```
Inside the `script.js` file we will create the logic of our project. First, let's define the two main functions:

```javascript
function setup(){
  // código da função setup
}

function draw(){
  // código da função draw
}
```
>The [setup()](https://p5js.org/reference/#/p5/setup) function is called once when the program starts. 

>Called directly after setup(), the [draw()](https://p5js.org/reference/#/p5/draw) function continuously executes the lines of code contained in its block until the program is interrupted.

Now that you know the definition of the two main functions, include the code below inside the script.js file:

```javascript
let doctor = [];
let size = 20;
let counter = 60;
let number;
let second;
let p5Canvas

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

        if(frameCount === counter){
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

```
- Create a part inside the project called **"img"** where the images were stored.

- Some functionality (loading external files) may show a "cross-source" error in the console. Thus, I recommend, clicking on the link how to configure a [local server on Mac OSX, Windows or Linux.](https://github.com/processing/p5.js/wiki/Local-server)

Well, after we configure and open our project on the local server you will see lake equivalent to this:

![gif](gif/doctor-gif3.gif)

## CCapture.js

Now how can we turn this code running in the browser into a video??

In p5.js there is a function called [saveFrames()](https://p5js.org/reference/#/p5/saveFrames) that captures the frames of an animation, but only saves the first 15 frames of an animation.

To solve this problem we will use the [CCapiture.js](https://github.com/spite/ccapture.js/) library.

1- Click the link to learn more about the [CCapiture library](https://github.com/spite/ccapture.js/).

2- Copy [three files](https://github.com/spite/ccapture.js/tree/master/src) referring to CCapiture.js, download.js and webm-writer-0.2.0.js into a folder called "src". and store the scripts in the header of the html file.

The result is:

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/p5@1.4.1/lib/p5.js"></script>
    <script src="src/CCapture.js"></script>
    <script src="src/webm-writer-0.2.0.js"></script>
    <script src="src/download.js"></script>
    <script src="script.js"></script>
    <link rel="stylesheet" href="style.css">
    <title>Doctor</title>
</head>
<body>
</body>
</html>
```
Finally, the script.js file will look like this:

```javascript
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
    if (frameCount === 1) {
        capturer.start();
      } 
    background(random(40,150));
    rotateZ(frameCount * 0.012);
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.03);
    
    if(number <= 12){
        texture(doctor[number]);
        box(displayWidth/1);

        if(frameCount == counter) {
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
```
- The video will be saved in "webm" format with a time of 4 minutes, but you are free to edit and modify the entire project.

If you have any doubts, please contact me by email pedropapoti@gmail.com.
