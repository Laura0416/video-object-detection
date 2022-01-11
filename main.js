img="";
status=" ";
objects = [];

function preload(){
    img = loadImage("city_street.jpeg");
}

function setup(){
    canvas = createCanvas(500,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(500,500);
    objectDetector = ml5.objectDetector("cocossd", ModelLoaded);
    document.getElementById("statusButton").innerHTML = "Status: Detecting Objects";
}

function ModelLoaded(){
    console.log("model loaded");
    status=true
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}

function draw(){
    image(video, 0, 0, 500, 500);

    if(status != " "){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult)
        for(i=0; i<objects.length; i++){
            document.getElementById("statusButton").innerHTML = "Status: Object Detected";
            document.getElementById("number_of_objects").innerHTML = "The model has detected " + objects.length + " objects."

            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);

            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y -40, objects[i].width, objects[i].height);
        }
    }

   
}