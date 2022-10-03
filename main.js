music_1 = "";
music_2 = "";
music_1_status="";
music_2_status="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreRightWrist=0;
scoreLeftWrist=0;

function preload(){
    music_1 = loadSound("butter_bts.mp3");
    music_2 = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

    
}

function modelLoaded(){
    console.log('PoseNet Is Initialized');
}

function gotPoses(results){
    if(results.length > 0){
console.log(results);
scoreRightWrist = results[0].pose.keypoints[10].score;
scoreLeftWrist = results[0].pose.keypoints[9].score;
console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);

leftWristX = results[0].pose.leftWrist.x;
leftWristY = results[0].pose.leftWrist.y;
console.log("leftWristX = " + leftWristX + "leftWristY" + leftWristY);

rightWristX = results[0].pose.rightWrist.x;
rightWristY = results[0].pose.rightWrist.y;
console.log("rightWristX = " + rightWristX + "rightWristY" + rightWristY);
    }
}

function draw(){
    image(video, 0, 0, 600, 500);

    music_1_status= music_1.isPlaying();
    music_2_status= music_2.isPlaying();

    fill('#0000FF');
    stroke('#0000FF');

    if(scoreRightWrist > 0.2){

        circle(rightWristX,rightWristY,20);

        music_2.stop();

        if(music_1_status ==false)
        {
            music_1.play();
            document.getElementById("music").innerHTML = "Playing - HarryPotter Theme Song"
        }
    }

    if(scoreRightWrist > 0.2){

        circle(leftWristX,leftWristY,20);

        music_1.stop();

        if(music_1_status ==false)
        {
            music_2.play();
            document.getElementById("music").innerHTML = "Playing - BTS Butter Song"
        }
    }
}

function play(){
    music.play();
    music.setVolume(1);
    music.rate(1);
}