var ball;
var hypnoticBall, database, position;

function setup(){
    createCanvas(500,500);

    //Create a firebase database and store in variable
    database = firebase.database();
    console.log(database);

    hypnoticBall = createSprite(250,250,10,10);
    hypnoticBall.shapeColor = "red";

    //ref() -> used to refer to the location of the database value that we want
    var hypnoticBallPosition = database.ref('ball/position');  

    //on() -> create a listener which keeps listening  to the changes that is happening in the database
    hypnoticBallPosition.on ("value", readPosition, showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}

function readPosition (data){
    position = data.val();
    console.log(position);
    hypnoticBall.x = position.x;
    hypnoticBall.y = position.y;
}

function writePosition(x, y){
    database.ref('ball/position').set({
        'x': position.x + x,
        'y': position.y + y
    })
}

function showError(){
    console.log("Error in writing to the database");
}