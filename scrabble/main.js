
// var wordToCheck = prompt('Enter a word');
// var lookUpString = 'https://wordsapiv1.p.mashape.com/words/'+wordToCheck+'/definitions/'
// $(function(){
// function testCURL (){
//     console.log("runningcurl");
//     $.ajax({
//         url:lookUpString , // The URL to the API. You can get this in the API page of the API you intend to consume
//         type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
//         data: {}, // Additional parameters here
//         dataType: 'json',
//         success: function(data) { 
//         console.log(data);
//         var numberOfDefinitions=data.definitions.length;
//         var definitions=data.definitions;
//         var firstDefinition = definitions[0].definition;

//         alert('There are '+numberOfDefinitions+'defintions of '+wordToCheck+' the first is '+firstDefinition);

      
        
//         console.log(firstDefinition);
//          },
//         error: function(err) { alert(err); },
//         beforeSend: function(xhr) {
//         xhr.setRequestHeader("X-Mashape-Authorization", "oFx7QwJYYLmshulgS2YrWsln7ns3p11TOYzjsnrj9D0RUoNj9b"); // Enter here your Mashape key
//         }
//     });


// };
// testCURL();
// });


// curl --get --include 'https://wordsapiv1.p.mashape.com/words/bump/also' \
//   -H 'X-Mashape-Key: oFx7QwJYYLmshulgS2YrWsln7ns3p11TOYzjsnrj9D0RUoNj9b' \
//   -H 'Accept: application/json'

//curl -u "username:password" -H "Content-Type: application/json" -H "Accept: application/json" -d '{"foo":"bar"}' http://www.example.com/api
$(function(){




// if ('speechSynthesis' in window) {
//     alert('I can talk'); // Synthesis support. Make your web apps talk!
// }
var playerID=0;
var roundNumber=0;
var tileInPlayText="";
var tileInPlayHTML='';
var locationInPlayId=""
var thisAction ="pickUp";
var tileDrop =0;
var lastMove=[];
var currentMove=[];
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

              
              tileInPlayText = $(this).text().charAt(0);
              tileInPlayHTML= $(this).html();
              locationInPlayId = $(this).attr('id');
              $(this).text("");
              thisAction="putDown" 
              $(id).empty();//ask why this works
              console.log('next action is'+thisAction)
              console.log('after pickUp tile drop is '+tileDrop)
              console.log("Tile in Play"+tileInPlayText);
              console.log("pickUp");
              
              
               
        }
        //if thisaction is putDown...
      //Case first tile droppped: Check if put down location is empty and the tiledrop status if it is empty and this is the first tile make the location the tile value then change the next actio to a pickup. Also change the tile drop to 1. Record where this tile was dropped. Update the current word 

         if($(this).text()===""&&tileDrop===0){

            
         console.log ('putdown tile 1');
         $(this).html(tileInPlayHTML);
         thisAction="pickUp";
         tileDrop++;
         wordInPlay=wordInPlay+tileInPlayText;
         lastMove[0]=($(this).attr('id')).charAt(0);
         lastMove[1]=($(this).attr('id')).charAt(1);
         lastMove[2]=($(this).attr('id')).charAt(3);
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

                //CAse second tile tiledrop2 dropped can go horizontal or vertical only
                else if

                (($(this).text()==="" && tileDrop===1 &&

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
                             
                      if (currentMove[0]!="r"){
                          if(+currentMove[1]===+lastMove[1]+1){
                          playDirection = "vertical";
                          }
                          else {playDirection = "horizontal"
                          };
                          $(this).html(tileInPlayHTML);
                          thisAction="pickUp";
                          tileDrop++;
                          wordInPlay=wordInPlay+tileInPlayText;
                          lastMove[1]=($(this).attr('id')).charAt(1);
                          lastMove[2]=($(this).attr('id')).charAt(3);
                    }
                     //if the tile is put back on the rack the number of tiles droppped is reduced and the letter is removed from the word   
                else
                        {
                        console.log('deduction the word was..'+wordInPlay);

                        tileDrop-- 
                        wordInPlay=wordInPlay.replace(tileInPlayText,"");

                        console.log('the word is now...'+wordInPlay);
                        }
                        
        
                        console.log("tileDrop"+tileDrop);
                        console.log(" currentMove "+currentMove+" lastMove "+lastMove)
                       
                        console.log("dircetion of play"+playDirection);
                    }//end of case tiledrop = 1
    
    
                    // Case tile dropped is third or more tiledrop 2+and location to drop is blank

//                 
                    else
                    {   
                            console.log("square occupied/can't be played")
                            console.log(" currentMove "+currentMove+" lastMove "+lastMove)
                            console.log("tileDrop"+tileDrop);
                            console.log(lastMove[0]+1)
                            tileToWobble ='#'+ currentMove[0]+currentMove[1]+"_"+currentMove[2]+"_"+        currentMove[3];
                            wobble(tileToWobble);
                    } //>>>>end of case square is empty
        
        
//     //end check rack or baord statement 


console.log("word in play is "+wordInPlay);
console.log("next action is ..."+thisAction);
console.log("tileDrop"+tileDrop);
console.log("endOfMove------------->");

 });

//Submit word to check validation with dictionary

$("#submitWord").click(function(){
    wordInPlay=wordInPlay.toLowerCase();
    checkDefinition(wordInPlay);

});

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