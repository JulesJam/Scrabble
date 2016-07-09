
$(function(){




// if ('speechSynthesis' in window) {
//     alert('I can talk'); // Synthesis support. Make your web apps talk!
// }
var fullLetterStack = ['e','e','e','e','e','e','e','e','e','e','e','e','a','a','a','a','a','a','a','a','a','i','i','i','i','i','i','i','i','i','i','o','o','o','o','o','o','o','o','n','n','n','n','n','n','n','r','r','r','r','r','r','t','t','t','t','t','t','t','l','l','l','l','s','s','s','s','u','u','u','u','d','d','d','d','g','g','g','b','b','c','c','m','m','p','p','f','f','h','h','v','v','w','w','y','y','k','j','x','q','z','@','@'];
var letterRack="";
var playerID=0;
var roundNumber=0;
var tileInPlayText="";
var tileInPlayHTML='';
var locationInPlayId=""
var thisAction ="pickUp";
var tileDrop =0;
var lastMove=[];
var currentMove=[];
var archiveMove=[];
var playDirection="";
var iDToCheck="";
var rightSquareContent="";
var wordInPlay ="";
var phraseToSay="";
var tileLocked="no";
var locationsPlayed = [];
var scoresByLetter=[];
var letterMultiplyersScored=[];
var wordMultiplyersScored=[];
var currentRnd = [wordInPlay,locationsPlayed,scoresByLetter,wordMultiplyersScored]
var playHistory = [playerID,roundNumber,wordInPlay,locationsPlayed,scoresByLetter,wordMultiplyersScored];


   $(".location").click(function() {
    
    console.log('<<<<<<<<<<<<<<<<NEXT MOVE>>>>>>>>>>>>>>>>>');
    console.log($(this).attr('id'));
    console.log("tileDrop "+tileDrop);
    console.log("thisAction"+thisAction);
    console.log("CurrentWord"+wordInPlay);
    console.log("currentMove"+currentMove);

    currentMove[0]=($(this).attr('id')).charAt(0);//location r rack g grid
    currentMove[1]=($(this).attr('id')).charAt(1);//row identifier
    currentMove[2]=($(this).attr('id')).charAt(3);//column identifier
    currentMove[3]=($(this).attr('id')).charAt(5);//lock status

    console.log('class = '+currentMove[3])

    //check if the tile is locked i.e. cannot be played

    if(currentMove[3]==="l"){
    //warn not available to play
    }
    //else{        //PickUp test if next actions is pickup check content}

        if (thisAction==="pickUp" && ($(this).text()!="")){

            //check if pick up location is a letter or an empty square if a letter get letter  next actio is put down

              console.log("pick up triggered");
              console.log("current move in pick up "+currentMove);
              console.log("lastMove in pick up "+lastMove);
              console.log("currentMove 0"+currentMove[0]);
              tileInPlayText = $(this).text().charAt(0);
              tileInPlayHTML= $(this).html();
              locationInPlayId = $(this).attr('id');
              $(this).text("");
              thisAction="putDown";
              
             
              if(currentMove[0]==="b"){
                tileDrop--;
                wordInPlay=wordInPlay.replace(tileInPlayText,"");
                currentRnd[0]=wordInPlay;


              console.log("pick up from board");
              console.log("currentMove 0="+currentMove[0]);
              console.log("next action is "+thisAction);
              console.log('next action is'+thisAction);
              console.log('after pickUp tile drop is '+tileDrop);
              console.log("Tile in Play"+tileInPlayText);
            
              console.location("board pick up archiveMove "+archiveMove+"lastMove "+lastMove);
            
              $(id).empty();//ask why this works
              }
              
               
        }
        else{
        //if thisaction is putDown...
      //Case first tile droppped: Check if put down location is empty and the tiledrop status if it is empty and this is the first tile make the location the tile value then change the next actio to a pickup. Also change the tile drop to 1. Record where this tile was dropped. Update the current word 
            if ($(this).text()===""&&thisAction==="putDown" &&(currentMove[0]==="r"))
                {
                console.log('Case---------------------->R');
                console.log('tileDrop was '+tileDrop);
              
                $(this).html(tileInPlayHTML);
                thisAction="pickUp";

                console.log("caseR next action"+thisAction)
                console.log('tileDrop is '+tileDrop);
                console.log('deduction the word was..'+wordInPlay);
                console.log('the word is now...'+wordInPlay);
               

                }

            else if ($(this).text()===""&&tileDrop===0 &&thisAction==="putDown")
                {

                console.log("Case ------------------0>")  
                console.log ('putdown tile 1');
                $(this).html(tileInPlayHTML);
                thisAction="pickUp";
                tileDrop++;
                wordInPlay=wordInPlay+tileInPlayText;
                currentRnd[0]=wordInPlay;

                archiveMove=[];
             
                lastMove[0]=($(this).attr('id')).charAt(0);
                lastMove[1]=($(this).attr('id')).charAt(1);
                lastMove[2]=($(this).attr('id')).charAt(3);
                currentRnd[1].push([lastMove[1],lastMove[2]]);
                console.log('round tracking array'+currentRnd);
                console.log("case 0----------")
                console.log("last move was "+lastMove);
                console.log("tileDrop"+tileDrop);
                console.log(" currentMove "+currentMove+" lastMove "+lastMove)
                         
    //              //test to check square to the right
    //              // iDToCheck = "#"+lastMove[0]+lastMove[1]+"_"+(+lastMove[2]+1);
    //              // alert(iDToCheck);
    //              // rightSquareContent=$(iDToCheck).text();
    //              // alert(rightSquareContent);
        
                 }

                    //Case second tile tiledrop 2 dropped can go horizontal or vertical only
            else if

                (($(this).text()==="" && thisAction === "putDown" && tileDrop===1 &&
                (
                ((+currentMove[1]=== +lastMove[1]+1)&&(+currentMove[2]=== +lastMove[2]))
                ||
                ((+currentMove[2]=== +lastMove[2]+1)&&(+currentMove[1]=== +lastMove[1]))
                ||
                ($(this).text()==="" && tileDrop===1 &&currentMove[0]==="r"))))
                        
                {
                console.log('case 1--------');
                console.log('vh check');
                console.log('Current Move 0'+currentMove[0]);
                console.log(" currentMove "+currentMove+" lastMove "+lastMove)
                console.log("tile Drop"+tileDrop);
                //if the tile is place on the grid check if it is below or to the right and set the word direction as horizontal or vertical, this deteremines where futrther tiles may be placed
                                 
                   
                     if(+currentMove[1]===+lastMove[1]+1){
                     playDirection = "vertical";
                     }
                     else {playDirection = "horizontal"
                       console.log("directionOfPlay"+playDirection)
                     };
                     console.log("directionOfPlay"+playDirection)
                     $(this).html(tileInPlayHTML);
                     thisAction="pickUp";
                     tileDrop++;
                     wordInPlay=wordInPlay+tileInPlayText;
                     currentRnd[0]=wordInPlay;
                     
                      
                     console.log("case 1 archive = "+archiveMove+"last move "+lastMove);
                     lastMove[1]=($(this).attr('id')).charAt(1);
                     lastMove[2]=($(this).attr('id')).charAt(3);
                     currentRnd[1].push([lastMove[1],lastMove[2]]);
                     console.log('round tracking array'+currentRnd);
                 
                } 
                //<>>>>><<<><><><>><><>><<><>
                    //Case second tile tiledrop 2 dropped can go horizontal or vertical only
            else if(
                ($(this).text()==="" && thisAction === "putDown" && tileDrop>1 
                )
                &&(playDirection==='horizontal'&&((+currentMove[2]=== +lastMove[2]+1)&&(+   currentMove[1]===+lastMove[1])))
                ||(playDirection==='vertical'&&(+currentMove[1]=== +lastMove[1]+1)&&(  +currentMove[2]===+lastMove[2])))
                        
                {
                    if($(this).text()==="" && thisAction === "putDown" && tileDrop>1 
                ){console.log('fist test is true' )};
                    if((playDirection === "vertical"&&((+currentMove[1]===+lastMove[1]+1)&&(+currentMove[2]===+lastMove[2])))){console.log('secondtest is true' )};
                    if((playDirection === "horizontal" && ((+currentMove[2]===+lastMove[2]+1)&&(+currentMove[1]===+currentMove[1])))){
                        console.log('third test is true' )
                    };


                console.log('case 2--------');
                console.log('vh check');
                console.log('Current Move 0'+currentMove[0]);
                console.log(" currentMove "+currentMove+" lastMove "+lastMove)
                console.log("tile Drop"+tileDrop);
                //if the tile is place on the grid check if it is below or to the right and set the word direction as horizontal or vertical, this deteremines where futrther tiles may be placed
                                 
                  
                     console.log("directionOfPlay"+playDirection)
                     $(this).html(tileInPlayHTML);
                     thisAction="pickUp";
                     tileDrop++;
                     wordInPlay=wordInPlay+tileInPlayText;
                     currentRnd[0]=wordInPlay;
                   // archiveMove=lastMove;
                     lastMove[1]=($(this).attr('id')).charAt(1);
                     lastMove[2]=($(this).attr('id')).charAt(3);
                     currentRnd[1].push([lastMove[1],lastMove[2]]);
                     console.log('round tracking array'+currentRnd);
                 
                } 

                //,.,,..,.,...,.,,.,.,.,.,.,..,.,.
             else
                {   
                     console.log("square occupied/can't be played")
                     console.log(" currentMove "+currentMove+" lastMove "+lastMove)
                     console.log("tileDrop"+tileDrop);
                     console.log("directionOfPlay is on fail "+playDirection);
                     console.log(lastMove[0]+1)
                     tileToWobble ='#'+ currentMove[0]+currentMove[1]+"_"+currentMove[2]+"_"+        currentMove[3];
                     wobble(tileToWobble);
                } //>>>>end of case square is empty
            
                }
//     //end check rack or baord statement 


console.log("word in play is "+wordInPlay);
console.log("next action is ..."+thisAction);
console.log("tileDrop"+tileDrop);
console.log("archive move nnn"+archiveMove);
console.log("endOfMove------------->");

 });

//Submit word to check validation with dictionary

$("#submitWord").click(function(){
    wordInPlay=wordInPlay.toLowerCase();
    checkDefinition(wordInPlay);

});
var $generateLetters= $("#generateLetters");
$generateLetters.on('click', pickLetters);

function pickLetters(){
    letterRack="";

   for(var i=0; i<7; i++)
    {
        randomIndex= (Math.ceil(Math.random()*100));
        letterRack=letterRack+fullLetterStack[randomIndex];
    };
    alert(letterRack);
}

function dropTileOnSquare(){
    thisAction="pickUp";
    tileDrop++;
    wordInPlay=wordInPlay+tileInPlayText;
    console.log("case 0----------")
    console.log("last move was "+lastMove);
    console.log("tileDrop"+tileDrop);
    console.log(" currentMove "+currentMove+" lastMove "+lastMove)

};

    
 //speak 
    function speak(phraseToSay, callback) {
        alert('speak is called');
        if(phraseToSay.length >100){
            phraseToSay="Sorry, your browser prevents me reading really long definitions,  please read it for your self"//,,,,,,,,,put in script to display full definitions
        }
        var u = new SpeechSynthesisUtterance();
        u.text = phraseToSay;
        u.lang = 'en-GB';
        u.rate = 0.9;
        u.pitc = 1;

     
        u.onend = function () {
            if (callback) {
                callback();
            }
        };
     
        u.onerror = function (e) {
            if (callback) {
                callback(e);
            }
        };
     
        speechSynthesis.speak(u);
    }



function checkDefinition(wordInPlay){
    alert('word to check is '+wordInPlay);
    var lookUpString = 'https://wordsapiv1.p.mashape.com/words/'+wordInPlay+'/definitions/'
    $(function(){
    function testCURL (){
        console.log("runningcurl");
        $.ajax({
            url:lookUpString , // The URL to the API. You can get this in the API page of the API you intend to consume
            type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
            data: {}, // Additional parameters here
            dataType: 'json',
            success: function(data) { 
           
            console.log(data);
           
            
            var numberOfDefinitions=data.definitions.length;
            


            if(!!numberOfDefinitions){
            var definitions=data.definitions;
            firstDefinition = definitions[0].definition;
            alert('There are '+numberOfDefinitions+'defintions of '+wordInPlay+' the first is '+firstDefinition);
                speak('There are '+numberOfDefinitions+'definitions of '+wordInPlay+'. The first is '+firstDefinition);
            }
            else{
                alert(wordInPlay+" is not a word");
                phraseToSay=wordInPlay+" is not a word"
                speak(phraseToSay);
            }
            
          
            
            console.log(firstDefinition);
             },
            //error: function(err) { alert(err); },

            error:function (xhr, ajaxOptions, thrownError){
                if(xhr.status==404) {
                    alert(wordInPlay +" "+thrownError);
                }
            },

            beforeSend: function(xhr) {
            xhr.setRequestHeader("X-Mashape-Authorization", "oFx7QwJYYLmshulgS2YrWsln7ns3p11TOYzjsnrj9D0RUoNj9b"); // Enter here your Mashape key
            }
        });


    };
    testCURL();
    });
}

   
});




function wobble(tileToWobble){
var wobbleCount = 6; //number of wobbles

// $('#textbox').animate({'marginLeft' : "-=30px" //moves left});
var timerId = setInterval(function() {
    console.log('tile to wobble ='+tileToWobble)
  switch(wobbleCount){
   case 1:
   $(tileToWobble).css({'marginLeft' : "+=5px", 'marginRight':"-=5px"});//moves right
   console.log('right');
   wobbleCount--;
   break;
   case 2:
   $(tileToWobble).css({'marginLeft' : "-=10px",'marginRight' : "+=10px"}); //moves left
   console.log('left');
   wobbleCount--;
   break;
   case 3:
   $(tileToWobble).css({'marginLeft' : "+=10px", 'marginRight':"-=10px" });//moves right
   console.log('left');
   wobbleCount--;
   break;
   case 4:
   $(tileToWobble).css({'marginLeft' : "-=10px", 'marginRight':"+=10px"}); //moves left
   console.log('right');
   wobbleCount--;
   break;
   case 5:
   $(tileToWobble).css({'marginLeft' : "+=10px", 'marginRight':"-=10px" });//moves right
   console.log('right');
   wobbleCount--;
   break;
   case 6:
   $(tileToWobble).css({'marginLeft' : "-=5px", 'marginRight':"+=5px"}); //moves right
   console.log('left');
   wobbleCount--;
   break;
   default:

    }  
 
 
  console.log(wobbleCount);
  if(wobbleCount ===0) {
    clearInterval(timerId);
  }
}, 50);//ms between wobbles
}