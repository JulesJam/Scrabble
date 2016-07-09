
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

var tileInPlayText="";
var nextAction ="pickUp";
var tileDrop =0
var lastMove=[];
var currentMove=[];
var playDirection="";
var iDToCheck="";
var rightSquareContent="";
var wordInPlay ="";
var phraseToSay="";
var tileLocked="no";

   $(".tile").click(function() {
    

    console.log($(this).attr('id'));
    console.log("tileDrop "+tileDrop);
    console.log("nextAction"+nextAction);
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
    else{        //PickUp test if next actions is pickup check content

        if (nextAction==="pickUp"){

            //check if pick up location is a letter or an empty square if a letter get letter  next actio is put down

            if($(this).text()!=""){
              tileInPlayText = $(this).text();
              console.log(tileInPlayText);
              $(this).text("");
              nextAction="putDown"
              } 
        }
        //if next action is putDown...
        else{
                //Check if put donw location is empty

                if($(this).text()===""&&tileDrop===0){
                    $(this).text(tileInPlayText);
                    nextAction="pickUp";
                    lastMove[0]=($(this).attr('id')).charAt(0);
                    lastMove[1]=($(this).attr('id')).charAt(1);
                    lastMove[2]=($(this).attr('id')).charAt(3);
                    tileDrop++;
                    wordInPlay=wordInPlay+tileInPlayText;
                    console.log("case 0----------")
                    console.log(lastMove);
                    console.log("tileDrop"+tileDrop);
                    console.log(" currentMove "+currentMove+" lastMove "+lastMove)
                    //test to check square to the right
                    // iDToCheck = "#"+lastMove[0]+lastMove[1]+"_"+(+lastMove[2]+1);
                    // alert(iDToCheck);
                    // rightSquareContent=$(iDToCheck).text();
                    // alert(rightSquareContent);
    
                }
                    else if(($(this).text()==="" && tileDrop===1 &&
    
                    (
                    ((+currentMove[1]=== +lastMove[1]+1)&&(+currentMove[2]=== +lastMove[2]))||
                    ((+currentMove[2]=== +lastMove[2]+1)&&(+currentMove[1]=== +lastMove[1])))||
                    ($(this).text()==="" && tileDrop===1 &&currentMove[0]==="r")))
                    {
                    console.log('case 1--------');
                    console.log('vh check');
                    console.log('Current Move 0'+currentMove[0]);
                    console.log(" currentMove "+currentMove+" lastMove "+lastMove)
                    console.log("tile Drop"+tileDrop);
    
                    $(this).text(tileInPlayText);
                    nextAction="pickUp";
                   
                  
    
                           
                    if (currentMove[0]!="r"){
                        tileDrop++;
                        wordInPlay=wordInPlay+tileInPlayText;
                        if(+currentMove[1]===+lastMove[1]+1){
                        playDirection = "vertical";
                        }
                        else {playDirection = "horizontal"
                        };
                        lastMove[1]=($(this).attr('id')).charAt(1);
                        lastMove[2]=($(this).attr('id')).charAt(3);
                        }
                    else
                    {
                        console.log('deduction');
                    tileDrop-- 
                    wordToCheck=wordToCheck.replace(tileInPlayText,"");
                    }
                    
    
                    console.log("tileDrop"+tileDrop);
                    console.log(" currentMove "+currentMove+" lastMove "+lastMove)
                   
                    console.log("dircetion of play"+playDirection);
                    }
    
    
              
                    else if(($(this).text()===""&&tileDrop>1)||($(this).text()==="" && tileDrop>1 &&    currentMove[0]==="r"))
                    {   $(this).text(tileInPlayText);
                        nextAction="pickUp";
                        console.log('case >1-------------------');
    
                        if (currentMove[0]!="r"){
                        tileDrop++;
                        wordInPlay=wordInPlay+tileInPlayText;
                           
    
    
                        if(playDirection==='horizontal'&&((+currentMove[2]=== +lastMove[2]+1)&&(+   currentMove[1]===+lastMove[1]))){
                            $(this).text(tileInPlayText);
                            nextAction="pickUp";
                        
                        if (currentMove[0]!="r"){
                            lastMove[1]=($(this).attr('id')).charAt(1);
                            lastMove[2]=($(this).attr('id')).charAt(3);
                            tileDrop++;
                            }
                        
                        else{
                            
                            console.log('deduction');
                            tileDrop-- 
                            wordToCheck=wordToCheck.replace(tileInPlayText,"");
                            
                        };
                        
                        }
                        else if(playDirection==='vertical'&&(+currentMove[1]=== +lastMove[1]+1)&&(  +currentMove[2]===+lastMove[2]))
                        {
                        $(this).text(tileInPlayText);
                        nextAction="pickUp";
                        if (currentMove[0]!="r"){
                        lastMove[1]=($(this).attr('id')).charAt(1);
                        lastMove[2]=($(this).attr('id')).charAt(3);
                        tileDrop++;
                       
                        }
                    }   
                        else{
                            console.log('deduction');
                            tileDrop-- 
                            wordToCheck=wordToCheck.replace(tileInPlayText,"");
                        }
                    }
    
                    }
                 //if putDown is not empty warn tile cannot be placed on top   
                else{
                 console.log("square occupied/can't be played")
                 console.log(" currentMove "+currentMove+" lastMove "+lastMove)
                 console.log("tileDrop"+tileDrop);
                 console.log(lastMove[0]+1)
                 tileToWobble ='#'+ currentMove[0]+currentMove[1]+"_"+currentMove[2]+"_"+currentMove[3];
                 wobble(tileToWobble);
                }
        }  
    }//end check rack or baord statement 


console.log(wordInPlay);

});

$("#submitWord").click(function(){
    wordInPlay=wordInPlay.toLowerCase();
    checkDefinition(wordInPlay);

});

    
 //speak 
    function speak(phraseToSay, callback) {
        alert('speak is called');
        var u = new SpeechSynthesisUtterance();
        u.text = phraseToSay;
        u.lang = 'en-GB';
        u.rate = 0.8;
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



function checkDefinition(wordToCheck){
    alert('word to check is '+wordToCheck);
    var lookUpString = 'https://wordsapiv1.p.mashape.com/words/'+wordToCheck+'/definitions/'
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
            var definitions=data.definitions;
            firstDefinition = definitions[0].definition;


            if(!!numberOfDefinitions){
            alert('There are '+numberOfDefinitions+'defintions of '+wordToCheck+' the first is '+firstDefinition);
                speak('There are '+numberOfDefinitions+'defintions of '+wordToCheck+' the first is '+firstDefinition);
            }
            else{
                alert(wordToCheck+" is not a word");
                phraseToSay=wordToCheck+" is not a word"
                speak(phraseToSay);
            }

          
            
            console.log(firstDefinition);
             },
            //error: function(err) { alert(err); },

            error:function (xhr, ajaxOptions, thrownError){
                if(xhr.status==404) {
                    alert(wordToCheck +" "+thrownError);
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