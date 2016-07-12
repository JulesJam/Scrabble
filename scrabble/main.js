//Constructor to draw board
// if ('speechSynthesis' in window) {
//     alert('I can talk'); 
// }
//NEED TO STOP ACCESS TO OTHER  PLAYERS TRAY - use current player and rack player id
//Jobs to do - commit word and score - basic
//letter refil
//floating letter
var fullLetterStack = ['e','e','e','e','e','e','e','e','e','e','e','e','a','a','a','a','a','a','a','a','a','i','i','i','i','i','i','i','i','i','i','o','o','o','o','o','o','o','o','n','n','n','n','n','n','n','r','r','r','r','r','r','t','t','t','t','t','t','t','l','l','l','l','s','s','s','s','u','u','u','u','d','d','d','d','g','g','g','b','b','c','c','m','m','p','p','f','f','h','h','v','v','w','w','y','y','k','j','x','q','z','blank','blank'];

var boardMap = [[1,1,'3w'],[1,4,'2l'],[1,8,'3w'],[1,12,'2l'],[1,15,'3w'],[2,2 ,'2w'],[2,6 ,'3l'],[2,10,'3l'],[2,14,'2w'],[3,3,'2w'],[3,7,'2l'],[3,9,'2l'],[3,13,'2w'],[4,4,'2w'],[4,8,'2l'],[4,12,'2w'],[5,5,'2w'],[5,11,'2w'],[6,6,'3l'],[6,10,'3l'],[7,7,'2l'],[7,9,'2l'],[8,8,''],[9,7,'2l'],[9,9,'2l'],[10,6,'3l'],[10,10,'3l'],[11,5,'2w'],[11,11,'2w'],[12,4,'2w'],[12,8,'2l'],[12,12,'2w'],[13,3,'2w'],[13,7,'2l'],[13,9,'2l'],[13,13,'2w'],[14,2,'2w'],[14,6,'3l'],[14,10,'3l'],[14,14,'2w'],[15,1,'3w'],[15,4,'2l'],[15,8,'3w'],[15,12,'2l'],[15,15,'3w']]

var lettersInPlay = ['e','e','e','e','e','e','e','e','e','e','e','e','a','a','a','a','a','a','a','a','a','i','i','i','i','i','i','i','i','i','i','o','o','o','o','o','o','o','o','n','n','n','n','n','n','n','r','r','r','r','r','r','t','t','t','t','t','t','t','l','l','l','l','s','s','s','s','u','u','u','u','d','d','d','d','g','g','g','b','b','c','c','m','m','p','p','f','f','h','h','v','v','w','w','y','y','k','j','x','q','z','blank','blank'];

var letterValues=new Object()
  letterValues.blank=0
  letterValues.e=1;
  letterValues.a=1;
  letterValues.i=1;
  letterValues.o=1;
  letterValues.n=1;
  letterValues.r=1;
  letterValues.t=1;
  letterValues.l=1;
  letterValues.s=1;
  letterValues.u=1;
  letterValues.d=2;
  letterValues.g=2;
  letterValues.b=3;
  letterValues.c=3;
  letterValues.m=3;
  letterValues.p=3;
  letterValues.f=4;
  letterValues.h=4;
  letterValues.v=4;
  letterValues.w=4;
  letterValues.y=4;
  letterValues.k=5;
  letterValues.j=8;
  letterValues.x=8;
  letterValues.q=10;
  letterValues.z=10;


console.log (letterValues.z)

var lettersRemainingInStack=100;
var letterRack="";
var thisLetterValue=0;

var roundNumber=0;
var tileInPlayText="";
var tileInPlayHTML='';
var locationInPlayId=""
var thisAction ="pickUp";
var tileDrop =0;
var lastMove=[];

var pickUpParameters=new Object();

var putDownParameters=new Object();

var archiveMove=[];
var playDirection="";
var iDToCheck="";
//var rightSquareContent="";
var roundNumber=1;
var numberPlayers=2;//max is 4
var currentPlayerId=1;///need to set on toss
var wordRef=1;
var wordPlayed="";
var wordInPlay ="";
var wordScore =0;
var currentWordRef=0;
var phraseToSay="";
var tileLocked="no";
var tileRacks=[[],[],[],[]];
var rackContent=[];
var rackLetter="";
var locationsPlayed = [];
var scoresByLetter=[];
var letterMultiplyers=[];
var wordMultiplyers=[];
var currentRnd = 1;
var scoreBoard=[0,0];
var playHistory = new Object();
    playHistory.roundNumber=0;
    playHistory.playerId=1
    playHistory.wordRef=0
    playHistory.firstLetterInWord="";
    playHistory.firstLocationInWord=0;
    playHistory.locationsPlayed=[];
    playHistory.lettersPlayed=[];
    playHistory.scoresByLetter=[];
    playHistory.multiplyers=[];
    playHistory.direction="";
    playHistory.totalLetterScore=0;
    playHistory.totalMultiplyerScore=0;

var roundHistory=[[],[],[],[]];

var gameHistory=[];

var locationData = new Object();
    location.Id
    location.letter
    location.wordIdVertical
    location.wordIdHorizontal
    location.wordVertical
    location.wordHorizontal
    location.firstLetterVertical
    location.firstLetterHorizontal
    location.scoreVertical
    location.scoreHorizontal
    location.playerVertical
    location.playerHorizontal
    location.multiplyer

var speachSwitch = false;
var lettersInThisRound=0;
var firstRowPlayed=0;
var firstColumnPlayed=0;
var firstLetterInWord="";
var validWord= false;


function boardMaker(){
  var j=0;
  var row=0;
  var column=0;
  var boardArrayIndex = 0;
  var wordLetterScore ="";
  var locationColor='rgba(255, 254, 231, .9)';
  var backGroundImg=""

  for(var i=0; i<225; i++){
    locationColor='rgba(255, 254, 231, .9)';
    if(i>112){j=250-i}else{j=i};

    column=((i%15)+1);
    row=(Math.floor(i/15))+1;
    
    backGroundImg=""

    playTrack = new Audio("audio/theme.m4a");
    playTrack.play();

    if(boardMap[boardArrayIndex][0]===row&&boardMap[boardArrayIndex][1]===column ){
      wordLetterScore=boardMap[boardArrayIndex][2];

      switch(true){
        case (boardMap[boardArrayIndex][2].charAt(0)==='3' && boardMap[boardArrayIndex][2].charAt(1)==='w'):
        locationColor = 'rgba(252, 13, 27, 1.0)';
        break;
        case (boardMap[boardArrayIndex][2].charAt(0)==='2' &&boardMap[boardArrayIndex][2].charAt(1)==='w'):
        locationColor = 'rgba(249, 154, 249, 1.0)';
        break;
        case (boardMap[boardArrayIndex][2].charAt(0)==='3' &&boardMap[boardArrayIndex][2].charAt(1)==='l'):
        locationColor = 'rgba(13, 63, 251, 1.0)';
        break;
        case (boardMap[boardArrayIndex][2].charAt(0)==='2' &&boardMap[boardArrayIndex][2].charAt(1)==='l'):
        locationColor = 'rgba(107, 205, 253, 1.0)';
        break;
        case (boardMap[boardArrayIndex][2].charAt(1)===''):
        locationColor = 'rgba(249, 154, 249, .9)'; backGroundImg = '; background-image: url(images/star.png); background-size:cover; background-repeat:   no-repeat; color:rgba(255,255,255,1)';  playHistory.currentPlayerId=2;
      //background-position: center center; '
        break;
        default: locationColor='rgba(255, 254, 231, 1.0)';backGroundImg="";

      }
      boardArrayIndex++;
    }
    else
      {wordLetterScore=""};
      if(row<10&&column<10){
      var location = '<div class = "location" id=b0'+row+'0'+column+'_u style = "background:'+locationColor+backGroundImg+'",><div class = "tileValue">'+wordLetterScore+'</div></div>';
      }
      else if(row<10 && column>9){
        var location = '<div class = "location" id=b0'+row+column+'_u style = "background:'+locationColor+backGroundImg+'",><div class = "tileValue">'+wordLetterScore+'</div></div>';
      }
      else if(row>9 && column<10){
        var location = '<div class = "location" id=b'+row+'0'+column+'_u style = "background:'+locationColor+backGroundImg+'",><div class = "tileValue">'+wordLetterScore+'</div></div>';
      }
      else {
        var location = '<div class = "location" id=b'+row+'_'+column+'_u style = "background:'+locationColor+backGroundImg+'",><div class = "tileValue">'+wordLetterScore+'</div></div>';
      }
    $( "#gameBoard" ).append($(location) );

  };

};

//make letter racks
function rackMaker(){

  var rackBaseLocationTop= 0;
  var rackBaseLocationLeft =0;
  var rackItemId="";
  var rackLocation="";
  var i=0;
  var r=0;

 

//build a rack to hold letters for each player
  for( i = 0; i<numberPlayers; i++){

    //set rack position depending on number of players - may need adjusting

    if((i+1)%2 !=0){
      rackBaseLocationTop=$(document).height()*(1/numberPlayers);
      rackBaseLocationLeft=18;
    }
    else{
      rackBaseLocationTop=($(document).height()*(1/numberPlayers)-(i*44));
      rackBaseLocationLeft=($(document).width()-328);
    };

    var rack = '<div class= "rack" id = player'+(i+1)+' style =></div>';
    //add the racks to the board
    $('#game').append($(rack));
    //position rack
    $("#player"+(i+1)).offset({top: rackBaseLocationTop, left: rackBaseLocationLeft});
    //create an array for each rack in play

   
    //create the tiles on each rack

    for(r=0; r<7; r++){
      rackItemId = "r010"+(r+1)+"_u_p"+(i+1);
      //pickletter for tile
      pickLetter();
      //add the letter and the letter value to the tileHTML
      rackLocation = '<div class = "location" id = '+rackItemId+'><div class = "tileValue">'+rackLetter.toUpperCase()+'</div><div class="score">'+letterValues[rackLetter]+'</div></div>'
      $('#player'+(i+1)).append($(rackLocation));
      $('#'+rackItemId).css({width:'42px',height:'31px', color:'rgba(137, 185, 226, 1.0)',fontName:'lato,sansSerif', fontSize:'16px' , fontWeight:'700', paddingTop:'10px', background:'rgba(255, 254, 231, 1.0)', borderRadius:'1px'});
      //putLetter In Rack Array
      tileRacks[i][r]=rackLetter.toUpperCase();
    };
  
  };
  $('.rack').css({border:'1px', width:'308px',height:'44px', background:'rgba(255,0,0,.5)'})
  

};

$(function(){
  boardMaker();
  rackMaker();

  //Submit word to check validation with dictionary
  $(".soundControls").click(function(){

      $( ".soundControls").toggle();
      speachSwitch = !speachSwitch
    


  });


  $('#player1Skip').click(function(){
    switchPlayer();
    $('#currentPlayer'+currentPlayerId).text("")
    currentPlayerId=2;
    playHistory.currentPlayerId=2;
    $('#currentPlayer'+currentPlayerId).text("Round "+currentRnd+" Current Player "+currentPlayerId);
  });

  $('#player2Skip').click(function(){
    switchPlayer();
    $('#currentPlayer'+currentPlayerId).text("")
    currentRnd++;
    currentPlayerId=1;
    playHistory.currentPlayerId=1;
    $('#currentPlayer'+currentPlayerId).text("Round "+currentRnd+" Current Player "+currentPlayerId);
  });


  $(".submitWord").click(function(){
    console.log+('word checking');
    validWord = true;
    wordInPlay="";
    var endOfPlay=playHistory.locationsPlayed.length-1
    var startCheckId = playHistory.locationsPlayed[1];
   

    console.log("checking locations played"+startCheckId);

    var endCheckId=playHistory.locationsPlayed[playHistory.locationsPlayed.length-1];
    console.log("checking locations played"+endCheckId);

    var startCheckColumn=(startCheckId).charAt(3)+(startCheckId).charAt(4);

    var startCheckRow=(startCheckId).charAt(1)+(startCheckId).charAt(2);

    //new code 127
    if(playHistory.direction==="vertical"){
      console.log('<<<<<<<<<<<<<Checking character above>>>>>>>>>>>>>>.');
      aboveCheck=(+(startCheckRow))-1;
      console.log("aboveCheck   "+aboveCheck);
      if(aboveCheck<10){
        aboveCheck="0"+aboveCheck;
      };
      aboveId="#b"+aboveCheck+startCheckColumn+"_u";
      console.log("above.id "+aboveId);
      if($(aboveId).text()!= ""/*&&($(aboveId).text().charAt(0)!=="2"||aboveId).text().charAt(0)!=="3"*/){
        startCheckRow=((+startCheckRow)-1)
        console.log('startCheckColumn Now '+startCheckRow);
      }
      else{
        console.log('above check failed start check column'+startCheckRow);
      }
    };


    var endCheckColumn=(endCheckId).charAt(3)+(endCheckId).charAt(4);
    var lengthToCheckColumn = ((+endCheckColumn)-(+startCheckColumn))+1;

    var endCheckRow=(endCheckId).charAt(1)+(endCheckId).charAt(2);
    var lengthToCheckRow = ((+endCheckRow)-(+startCheckRow))+1

    console.log("length to check row"+ lengthToCheckRow)
    console.log("startCheck row"+startCheckRow);
    console.log("endCheck row"+endCheckRow);

    if(playHistory.direction==='vertical'){
      console.log("direction vertical");
      console.log("startCheckColumn"+startCheckColumn);

      /*do {
          
       while (letterValidation!="");
*/
      for (i=0; i<lengthToCheckRow; i++){
          if(i+(+startCheckRow)<10){
            var rowValue="0"+(i+(+startCheckRow)).toString();
            console.log("rowValues vertical"+rowValue+"i is "+i);
          }else{
            var rowValue=(i+(+startCheckRow)).toString();
            console.log("rowValues vertical"+rowValue);
          }
        
        var iDToCheck="#b"+rowValue+startCheckColumn+"_u";
       
        letterValidation=(($(iDToCheck).text()).charAt(0));
        console.log ("VALIDATING LETTER"+letterValidation);
        if(letterValidation==="" || letterValidation===null){
          validWord=false;}
          else{
            wordInPlay=wordInPlay+letterValidation;
          }
        console.log("columnValue")+columnValue;
        console.log("idToCheck v"+iDToCheck);
      }
      }

      else{
    
        for (i=0; i<lengthToCheckColumn; i++){
            if(i+(+startCheckColumn)<10){
              var columnValue="0"+(i+(+startCheckColumn)).toString();
            }else{
              var columnValue=(i+(+startCheckColumn)).toString();
            }
          console.log("Horizontal row check rowValue"+columnValue);
          console.log("StartCheckColumn"+startCheckColumn+"row value"+columnValue);
          var iDToCheck="#b"+startCheckRow+columnValue+"_u";
          console.log("idToCheck"+iDToCheck);
          letterValidation=(($(iDToCheck).text()).charAt(0));
          if(letterValidation==="" || letterValidation===null)validWord=false;
          console.log ("VALIDATING LETTER"+letterValidation);
        }
      }


    // if (playHistory.direction==='horizontal'){
     
    //   var firstColumnInWord= +(playHistory.locationsPlayed[1]).charAt(3)+playHistory.locationsPlayed[1].charAt(4);
    //   var lastColumnInWord= +(playHistory.locationsPlayed[endOfPlay]).charAt(3)+playHistory.locationsPlayed[endOfPlay].charAt(4);
    //   var lengthOfPlay= lastColumnInWord-firstColumnInWord;
    //   var expectedLength=+playHistory.lettersPlayed.length-1;
    //   lengthOfPlay=+lengthOfPlay+1;
    //   console.log("lengthOfPlay"+lengthOfPlay);
    //   console.log("expectedlength"+expectedLength);
    //   if(lengthOfPlay!=expectedLength){
    //     validWord=false;
    //     console.log("horizontal fail");
    //   }
    // }

    // if (playHistory.direction==='vertical'){
    
    //   var firstColumnInWord= +(playHistory.locationsPlayed[1]).charAt(1)+playHistory.locationsPlayed[1].charAt(2);
    //   var lastColumnInWord= +(playHistory.locationsPlayed[endOfPlay]).charAt(1)+playHistory.locationsPlayed[endOfPlay].charAt(2);
    //   var lengthOfPlay= lastColumnInWord-firstColumnInWord;
    //   var expectedLength=+playHistory.lettersPlayed.length-1
    //   lengthOfPlay=+lengthOfPlay+1;
    //   console.log("lengthOfPlayVertical"+lengthOfPlay);
     
    //   console.log("expectedlength"+(+playHistory.lettersPlayed.length-1))
    //   console.log("lengthOfPlay"+lengthOfPlay);

    //   if(lengthOfPlay!= expectedLength){
    //     validWord=false;
    //     console.log("vertical fail");
    //   }
   
    // }

    // var hasABlank=$.inArray( " ", playHistory.lettersPlayed );
    // console.log("has a blank"+hasABlank);
    // if(hasABlank>0) validWord=false;


    if (!validWord){
      console.log("round "+playHistory.roundNumber);
      console.log("player "+playHistory.playerId);
      console.log("wordRef "+playHistory.wordRef);
      console.log("locationsPlayed "+playHistory.locationsPlayed);
      console.log("Letters in word "+playHistory.lettersPlayed);
      console.log("scoresByLetter "+playHistory.scoresByLetter);
      console.log("Multiplyers"+playHistory.multiplyers);
      console.log("direction-->"+playHistory.direction);
      console.log("Not a valid play missing letters");
    } else {
      console.log("word ok");
    }

    // if(wordRef>1){
    //   ??tobedone when player 2 initiated check there is one crossover unless word 1

    //check for all other cross words and score
    // }
    //

    if(validWord){

      if(!wordInPlay){

      var startCheckId = playHistory.locationsPlayed[1];
      console.log("checking locations played"+startCheckId);

      var endCheckId=playHistory.locationsPlayed[playHistory.locationsPlayed.length-1];
      console.log("checking locations played"+endCheckId);

      var startCheckColumn=(startCheckId).charAt(3)+(startCheckId).charAt(4);
      var endCheckColumn=(endCheckId).charAt(3)+(endCheckId).charAt(4);
      var lengthToCheckColumn = ((+endCheckColumn)-(+startCheckColumn))+1;

      var startCheckRow=(startCheckId).charAt(1)+(startCheckId).charAt(2);
      var endCheckRow=(endCheckId).charAt(1)+(endCheckId).charAt(2);
      var lengthToCheckRow = ((+endCheckRow)-(+startCheckRow))+1

      console.log("length to check row"+ lengthToCheckRow)
      console.log("startCheck row"+startCheckRow);
      console.log("endCheck row"+endCheckRow);

      if(playHistory.direction==='vertical'){
        console.log("direction vertical");
        console.log("startCheckColumn"+startCheckColumn);


        for (i=0; i<lengthToCheckRow; i++){
            if(i+(+startCheckRow)<10){
              var rowValue="0"+(i+(+startCheckRow)).toString();
              console.log("rowValues vertical"+rowValue+"i is "+i);
            }else{
              var rowValue=(i+(+startCheckRow)).toString();
              console.log("rowValues vertical"+rowValue);
            }
          
          var iDToCheck="#b"+rowValue+startCheckColumn+"_u";
         
          wordInPlay=wordInPlay+(($(iDToCheck).text()).charAt(0));
          console.log("columnValue")+columnValue;
          console.log("idToCheck v"+iDToCheck);
        }
        }

        else{
     
          for (i=0; i<lengthToCheckColumn; i++){
              if(i+(+startCheckColumn)<10){
                var columnValue="0"+(i+(+startCheckColumn)).toString();
              }else{
                var columnValue=(i+(+startCheckColumn)).toString();
              }
              console.log("Horizontal row check rowValue"+columnValue);
              console.log("StartCheckColumn"+startCheckColumn+"row value"+columnValue);
            var iDToCheck="#b"+startCheckRow+columnValue+"_u";
            console.log("idToCheck"+iDToCheck);
            wordInPlay=wordInPlay+(($(iDToCheck).text()).charAt(0));
          }
        }

      

      console.log("wordInPlay = "+wordInPlay);
    }
      checkDefinition(wordInPlay, function() {
        var currentWordMultiplyer=1;//multiplies total word value by one unless a word multiplyer is detected
        if(validWord){
          console.log('valid word from dictionary' + validWord)
          playHistory.totalLetterScore = 0;
          for(i=0; i<playHistory.scoresByLetter.length-1; i++){
            console.log("playHistor score length ="+playHistory.scoresByLetter.length+"array "+playHistory.scoresByLetter);
            playHistory.totalLetterScore+= +playHistory.scoresByLetter[i+1];

            console.log("Total Letter Score = "+playHistory.totalLetterScore);

              if(playHistory.multiplyers[i+1]!=""&&playHistory.multiplyers[i+1].charAt(1)==="l"){
                playHistory.totalMultiplyerScore+= +playHistory.scoresByLetter[i+1]*(+playHistory.multiplyers[i+1].charAt(0))
                }
              else{
                playHistory.totalMultiplyerScore+= +playHistory.scoresByLetter[i+1];
                }

              if(playHistory.multiplyers[i+1]!="" &&playHistory.multiplyers[i+1].charAt(1)==="w"){
                currentWordMultiplyer=currentWordMultiplyer*(+playHistory.multiplyers[i+1].charAt(0));
               }
            }
            playHistory.totalMultiplyerScore=playHistory.totalMultiplyerScore*currentWordMultiplyer

          var remainingLetterCount = tileRacks[currentPlayerId-1].reduce(function(sum, elem) {
            if(!!elem) {
              return sum + 1;
            } else {
              return sum;
            }
          }, 0);

          console.log(remainingLetterCount + " remaining");

          if (lettersRemainingInStack<1){
            alert('No letters left')
          }
          else{
            for(var i=0; i<7; i++){

              rackItemId = "r010"+(i+1)+"_u_p"+(currentPlayerId);

                if(tileRacks[currentPlayerId-1][i]===""){
                console.log("tile value before update = "+tileRacks[currentPlayerId-1][i]+" id "+rackItemId);
                //pickletter for tile
                rackLetter=pickLetter();
                console.log(rackLetter);
                $('#'+rackItemId).html('<div class = "tileValue">'+rackLetter.toUpperCase()+'</div><div class="score">'+letterValues[rackLetter]+'</div>');
                  //'<div class = "location" id = '+rackItemId+'></div>');
               
                //putLetter In Rack Array
                tileRacks[currentPlayerId-1][i]=rackLetter.toUpperCase();

               
                lettersRemainingInStack--;
                console.log("letters In Stack"+lettersRemainingInStack)
               
               
              

              
                }
              //add the letter and the letter value to the tileHTML
             
              };
            

          }
          wordRef++;
          lettersInThisRound=0;
          console.log("word ref" +wordRef);
          scoreBoard[currentPlayerId-1]=+scoreBoard[currentPlayerId-1]+(+playHistory.totalMultiplyerScore);
          console.log("scoreboard"+scoreBoard);
          var boardToUpdate='#scorePlayer'+(currentPlayerId).toString();
          console.log("board to update id"+boardToUpdate);
          $(boardToUpdate).text(scoreBoard[currentPlayerId-1]);
          if(currentPlayerId===1){
            switchPlayer();
            console.log("<<<<<Switch Player>>>>>>");
            $("#currentPlayer"+currentPlayerId).text("");
            currentPlayerId=2;
            playHistory.currentPlayerId=2;
            $("#currentPlayer"+currentPlayerId).text("Round "+currentRnd+" Current Player "+currentPlayerId);
            }
             else{
              console.log("<<<<<Switch Player>>>>>>");
              currentRnd++;
              switchPlayer();
              $("#currentPlayer"+currentPlayerId).text("");
              currentPlayerId=1;
              playHistory.currentPlayerId=1;
              $("#currentPlayer"+currentPlayerId).text("Round "+currentRnd+" Current Player "+currentPlayerId);
              
            }
          console.log("currentPlayer "+currentPlayerId);
          }

       
        });

    }


});    



    //Check for a win
    //Get More Letters to replace used
    //reset letttersInPlay
    //Increase Word count
    //Move Play History to round hisotry
      /*wordInPlay=wordInPlay.toLowerCase();
      checkDefinition(wordInPlay);*/

  







  $(".location").click(function() {
    
    if (thisAction==="pickUp"){
      pickUpParameters.rackOrBoard =($(this).attr('id')).charAt(0);//location r rack g grid
      pickUpParameters.row = ($(this).attr('id')).charAt(1)+($(this).attr('id')).charAt(2);//row identifier
      pickUpParameters.column =($(this).attr('id')).charAt(3)+($(this).attr('id')).charAt(4);//column identifier
      pickUpParameters.lockStatus=($(this).attr('id')).charAt(6);//lock status
      pickUpParameters.playerId=($(this).attr('id')).charAt(9);//playerIdentifier
      pickUpParameters.html = ($(this).html());//html from clicked tile
      pickUpParameters.letter = ($(this).text()).charAt(0);//Letter Value
      pickUpParameters.score = ($(this).text()).charAt(1);//Letter Value
      pickUpParameters.fullId=($(this).attr('id'));
      pickUpParameters.topCoOrd=$(this).offset().top;
      pickUpParameters.leftCoOrd=$(this).offset().left;
      if($(this).text().charAt(0)==="2" || $(this).text().charAt(0)==="3"){
      pickUpParameters.boardMarkerCheck=true}else{pickUpParameters.boardMarkerCheck=false};


      console.log(">>>>>>>>>>>>>>>>>Pick Up<<<<<<<<<<<<<<<<<<<<<<");
      console.log("rack or grid="+ pickUpParameters.rackOrBoard);
      console.log("current player ="+currentPlayerId);
      console.log("row = "+ pickUpParameters.row);
      console.log("column = "+ pickUpParameters.column);
      console.log("lock Status = "+ pickUpParameters.lockStatus);
      console.log("player ID ="+ pickUpParameters.playerId);
      console.log("html = "+ pickUpParameters.html);
      console.log("Letter = "+ pickUpParameters.letter);
      console.log("Score = "+ pickUpParameters.score);
      console.log("FullId = "+ pickUpParameters.fullId);
      console.log("Board Marker= "+ pickUpParameters.boardMarkerCheck);
      console.log("RoundNumber "+roundNumber);
      console.log("                                               ");

    }
    else {
      putDownParameters.rackOrBoard =($(this).attr('id')).charAt(0);//location r rack g grid
      putDownParameters.row = ($(this).attr('id')).charAt(1)+($(this).attr('id')).charAt(2);//row identifier
      putDownParameters.column =($(this).attr('id')).charAt(3)+($(this).attr('id')).charAt(4);//column identifier
      putDownParameters.lockStatus=($(this).attr('id')).charAt(6);//lock status
      putDownParameters.playerId=($(this).attr('id')).charAt(9);//playerIdentifier
      putDownParameters.html = ($(this).html());//html from clicked tile
      putDownParameters.letter = ($(this).text()).charAt(0);//Letter Value
      putDownParameters.score = ($(this).text()).charAt(1);//Letter Value
      putDownParameters.fullId=($(this).attr('id'));
      putDownParameters.topCoOrd=$(this).offset().top;
      putDownParameters.leftCoOrd=$(this).offset().left;

      if($(this).text().charAt(0)==="2" || $(this).text().charAt(0)==="3") {
        putDownParameters.boardMarkerCheck=true
      }
      else{
        putDownParameters.boardMarkerCheck=false
      };


        console.log(">>>>>>>>>>>>>>>>>Put Down<<<<<<<<<<<<<<<<<<<<<<");
        console.log("rack or grid="+ putDownParameters.rackOrBoard);
        console.log("current player ="+currentPlayerId);
        console.log("row = "+ putDownParameters.row);
        console.log("column = "+ putDownParameters.column);
        console.log("lock Status = "+ putDownParameters.lockStatus);
        console.log("player ID ="+ putDownParameters.playerId);
        console.log("html = "+ putDownParameters.html);
        console.log("Letter = "+ putDownParameters.letter);
        console.log("Score = "+ putDownParameters.score);
        console.log("FullId = "+ putDownParameters.fullId);
        console.log("boardMarkerCheck = "+ putDownParameters.boardMarkerCheck);
        console.log("RoundNumber "+roundNumber);
        console.log("letters in this round"+lettersInThisRound);

        console.log("                                               ");

    }

  //PICK UPS
      //Check if tile can be played.
      //if the tile being picked up is locked ie a committed word letter or it is not a tile ie a board or rack empty sq or it is sq on the baord with //a word or letter score none of these can be picked up
    if(thisAction === "pickUp"&&(pickUpParameters.lockStatus==="l"||pickUpParameters.letter===""||pickUpParameters.boardMarkerCheck===true/*||+pickUpParameters.playerId!==+currentPlayerId*/)){
        tileToWobble ='#'+ pickUpParameters.fullId;
        wobble(tileToWobble);
        wobble(tileToWobble);

        speak("Not a valid selection");
        console.log("next action = "+thisAction);

        return;
    }
      //knowing tha the tile can be picked up check if it is the grid or rack it is being picked up from this process is for the rack as it update the //rack array so when replenishemnet happens system knows where empties are and can check if none left


    else if (thisAction==="pickUp" && pickUpParameters.rackOrBoard==="r"&&+pickUpParameters.playerId===+currentPlayerId){
      //,,,,,,,need an iftstament to check if picking up from grid what the fill should be i.e. 3l 2l 3w 2w etc
      //speak("You have selected "+pickUpParameters.letter) - turned of manuall as too 
      //annoying
      var playerIndex=(+pickUpParameters.playerId-1);
      var tileIndex=((+pickUpParameters.column-1));
      console.log("rack array "+tileRacks[playerIndex]+" "+playerIndex+' tileIndex '+tileIndex);
      thisAction="putDown";

      /////clear text from picked up cell and remove from rack array

      $(this).text("");
      tileRacks[playerIndex][tileIndex]="";
      console.log('tile rack 0 now'+ tileRacks[0]+" rack 1"+tileRacks[1]);
      return;
    }


    //Pick up a tile from the board and move it 
    else if(thisAction==="pickUp" && pickUpParameters.rackOrBoard==="b"/*&&+pickUpParameters.playerId===+currentPlayerId*/){
      //,,,,,,,need an iftstament to check if picking up from grid what the fill should be i.e. 3l 2l 3w 2w etc
      speak("You have selected "+pickUpParameters.letter)

      thisAction="putDown";
      lettersInThisRound--;
      var indexOfPlay =$.inArray(pickUpParameters.fullId,playHistory.locationsPlayed);
      console.log("Index of play was "+indexOfPlay);
      var boardText=playHistory.multiplyers[indexOfPlay]
      if(boardText.length>0){$(this).text(boardText)}else{$(this).text("")};
      playHistory.locationsPlayed[indexOfPlay]="";
      playHistory.scoresByLetter[indexOfPlay]="0";
      playHistory.multiplyers[indexOfPlay]="";
      playHistory.lettersPlayed[indexOfPlay]=" ";

      console.log(playHistory);
      console.log("letters in Play after pick up from board"+lettersInThisRound);



      return;


    }



        
      
    // PUT DOWNS


    if(thisAction==="putDown"&&putDownParameters.rackOrBoard==="r"&&putDownParameters.letter===""){
      //move square from rack to grid
      var playerIndex=(+putDownParameters.playerId-1);
      var tileIndex=((+putDownParameters.column-1));
      speak("PutDown "+pickUpParameters.letter);
      $(this).html(pickUpParameters.html);
      tileRacks[playerIndex][tileIndex]=pickUpParameters.letter;
      console.log('tile rack 0 now'+ tileRacks[0]+" rack 1"+tileRacks[1]);

      thisAction="pickUp";

    }

    //Special case first letter in a round
    else if (lettersInThisRound===0&&thisAction==="putDown"&&putDownParameters.rackOrBoard==="b"&&(putDownParameters.letter===""||putDownParameters.boardMarkerCheck===true)){
      $(this).html(pickUpParameters.html);
      // var newLocationId="'b"+pickUpParameters.row+pickUpParameters.column+"_u_p"+currentPlayerId+"'";
      // $(this).attr('id',newLocationId);//line to copy
      console.log('tile rack 0 now'+ tileRacks[0]+" rack 1"+tileRacks[1]);
      console.log('first letter of game put down')
      lettersInThisRound++
      playHistory.roundNumber=roundNumber;
      playHistory.playerId=pickUpParameters.playerId;
      playHistory.wordRef=currentWordRef;
      playHistory.locationsPlayed[lettersInThisRound]=putDownParameters.fullId;
      playHistory.scoresByLetter[lettersInThisRound]=pickUpParameters.score;
      playHistory.multiplyers[lettersInThisRound]=putDownParameters.letter+putDownParameters.score;
      firstRowPlayed=playHistory.locationsPlayed[1].charAt(1)+playHistory.locationsPlayed[1].charAt(2);
      firstColumnPlayed=playHistory.locationsPlayed[1].charAt(3)+playHistory.locationsPlayed[1].charAt(4)
      playHistory.firstLetterInWord=pickUpParameters.letter;
      playHistory.firstLocationInWord=calculateLocationId(putDownParameters.row,putDownParameters.column);
      playHistory.lettersPlayed[lettersInThisRound]=pickUpParameters.letter;
      playHistory.totalLetterScore=playHistory.score + pickUpParameters.score;

      //update location data for square on boardText


      console.log("round "+playHistory.roundNumber);
      console.log("player "+playHistory.playerId);
      console.log("wordRef "+playHistory.wordRef);
      console.log("locationsPlayed "+playHistory.locationsPlayed);
      console.log("firstLocationInWord "+playHistory.firstLocationInWord);
      console.log("firstLetterInWord "+playHistory.firstLetterInWord);
      console.log("Letters in word "+playHistory.lettersPlayed);
      console.log("scoresByLetter "+playHistory.scoresByLetter);
      console.log("Multiplyers"+playHistory.multiplyers);
      console.log("First Row Played on putdown first tile"+firstRowPlayed);
      console.log("First columnPlayed on putdown first tile"+firstColumnPlayed);

      thisAction="pickUp"
    }

    ////special Case for second letter in round check whether play is horizontal or vertical
    else if(lettersInThisRound === 1 &&
      thisAction === "putDown" &&
      putDownParameters.rackOrBoard === "b" &&
      (putDownParameters.letter==="" || putDownParameters.boardMarkerCheck===true) &&
        (
          (
            firstRowPlayed === putDownParameters.row &&
            (+firstColumnPlayed)<+(putDownParameters.column)
          ) ||
          (
            firstColumnPlayed===putDownParameters.column &&
            (+firstRowPlayed) < (+putDownParameters.row)
          )
        )
      ){
        $(this).html(pickUpParameters.html);
        // var newLocationId="'b"+pickUpParameters.row+pickUpParameters.column+"_u_p"+currentPlayerId+"'";
        //$(this).attr('id',newLocationId);//line to copy
        console.log('tile rack 0 now'+ tileRacks[0]+" rack 1"+tileRacks[1]);
        console.log('secondletter of game put down')
        lettersInThisRound++
        
        console.log('first row played'+firstRowPlayed);
      
        console.log('first column played'+firstColumnPlayed);
        var thisRow=putDownParameters.row;
        var thisColumn=putDownParameters.column;
        console.log('this row'+thisRow);
        console.log('this column'+thisColumn);

        if(firstRowPlayed === thisRow){
          playHistory.direction = "horizontal";
        }
        else {
          playHistory.direction="vertical";
        }



        playHistory.roundNumber=roundNumber;
        playHistory.playerId=pickUpParameters.playerId;
        playHistory.wordRef=currentWordRef;
        playHistory.locationsPlayed[lettersInThisRound]=putDownParameters.fullId;
        playHistory.scoresByLetter[lettersInThisRound]=pickUpParameters.score;
        playHistory.multiplyers[lettersInThisRound]=putDownParameters.letter+putDownParameters.score;
        playHistory.lettersPlayed[lettersInThisRound]=pickUpParameters.letter;


        console.log("round "+playHistory.roundNumber);
        console.log("player "+playHistory.playerId);
        console.log("wordRef "+playHistory.wordRef);
        console.log("locationsPlayed "+playHistory.locationsPlayed);
        console.log("Letters in word "+playHistory.lettersPlayed);
        console.log("scoresByLetter "+playHistory.scoresByLetter);
        console.log("Multiplyers"+playHistory.multiplyers);
        console.log("direction-->"+playHistory.direction);
        thisAction="pickUp"
    }

    else if (lettersInThisRound > 1 &&
      thisAction==="putDown" && putDownParameters.rackOrBoard==="b" &&
      (putDownParameters.letter===""||putDownParameters.boardMarkerCheck===true)&&
      (
        (playHistory.direction=== "horizontal" &&
         +putDownParameters.row=== +firstRowPlayed &&
         +firstColumnPlayed<=+putDownParameters.column)||

        (playHistory.direction=== "vertical"&&
          +firstColumnPlayed=== +putDownParameters.column&&
          +putDownParameters.row>= +firstRowPlayed)))

      {$(this).html(pickUpParameters.html);
        // var newLocationId="'b"+pickUpParameters.row+pickUpParameters.column+"_u_p"+currentPlayerId+"'";
        // $(this).attr('id',newLocationId);//line to copy
        console.log('tile rack 0 now'+ tileRacks[0]+" rack 1"+tileRacks[1]);
        console.log('secondletter of game put down')
        lettersInThisRound++
        
        console.log('first row played'+firstRowPlayed);
      
        console.log('first column played'+firstColumnPlayed);
        var thisRow=putDownParameters.row;
        var thisColumn=putDownParameters.column;
        console.log('this row'+thisRow);
        console.log('this column'+thisColumn);
        if(firstRowPlayed===thisRow){playHistory.direction="horizontal"}
          else{ playHistory.direction="vertical"}



        playHistory.roundNumber=roundNumber;
        playHistory.playerId=pickUpParameters.playerId;
        playHistory.wordRef=currentWordRef;
        playHistory.locationsPlayed[lettersInThisRound]=putDownParameters.fullId;
        playHistory.scoresByLetter[lettersInThisRound]=pickUpParameters.score;
        playHistory.multiplyers[lettersInThisRound]=putDownParameters.letter+putDownParameters.score;
        playHistory.lettersPlayed[lettersInThisRound]=pickUpParameters.letter;


        console.log("round "+playHistory.roundNumber);
        console.log("player "+playHistory.playerId);
        console.log("wordRef "+playHistory.wordRef);
        console.log("locationsPlayed "+playHistory.locationsPlayed);
        console.log("Letters in word "+playHistory.lettersPlayed);
        console.log("scoresByLetter "+playHistory.scoresByLetter);
        console.log("Multiplyers"+playHistory.multiplyers);
        console.log("direction-->"+playHistory.direction);
        thisAction="pickUp"
      }
    ///Case for further letter


    else {
      tileToWobble ='#'+ putDownParameters.fullId;
      wobble(tileToWobble);
      wobble(tileToWobble);
      speak("You cannot place a tile here, sorry");
      console.log("next action = "+thisAction);
      return///????remove this

      }
  });
});

function switchPlayer(){
  console.log("player switched")
  roundHistory[currentPlayerId][currentRnd]=playHistory;
  playHistory.roundNumber=0;
  playHistory.playerId=0;
  playHistory.wordRef=0;
  playHistory.firstLetterInWord="";
  playHistory.firstLocationInWord=0;
  playHistory.locationsPlayed=[];
  playHistory.lettersPlayed=[];
  playHistory.scoresByLetter=[];
  playHistory.multiplyers=[];
  playHistory.direction="";
  playHistory.totalLetterScore=0;
  playHistory.totalMultiplyerScore=0;
  console.log(playHistory);


}



function pickLetter(){

  randomIndex= (Math.ceil(Math.random()*lettersRemainingInStack));
  rackLetter=lettersInPlay[randomIndex];
  lettersInPlay.splice(lettersInPlay.indexOf(randomIndex), 1);
  lettersRemainingInStack--;

  return rackLetter;
   
}

//to be done on scoring for each letter in scored word
function updateLocationData(){
  location.Id;
  location.letter=pickUpParameters.letters;
  if (playHistory.direction = "vertical"){
    location.wordIdVertical = 1;
    location.wordVertical=1;
    location.firstLetterVertical=1;
    location.scoreVertical=1;
    location.playerVertical=1;
  }
  else if (playHistory.direction = "horizontal"){
    location.wordIdHorizontal=1;
    location.wordHorizontal=1;
    location.scoreHorizontal=1;
    location.playerHorizontal=1;
  }
  location.multiplyer=1;
}

function calculateLocationId(row, column){
  locationId=(((+row-1)*15))+(+column);
  return locationId
}



    
//speak 
function speak(phraseToSay, callbackspeak) {

  console.log("speach switch is "+speachSwitch);
  if(!speachSwitch){
    console.log("didn't speak");
    return
  }
  if(phraseToSay.length >100){
    phraseToSay="Sorry, the definition I have found is far too long,  please read it for your self"//,,,,,,,,,put in script to display full definitions
  }
  console.log("Tried to speak")
  var voice = new SpeechSynthesisUtterance();
  voice.text = phraseToSay;
  voice.lang = 'en-GB';
  voice.rate = 0.9;
  voice.pitc = 1;


  voice.onend = function () {
    if (callbackspeak) callbackspeak();
  };

  voice.onerror = function (e) {
    if (callbackspeak) callbackspeak(e);
  };

  speechSynthesis.speak(voice);
}



function checkDefinition(wordInPlay, callback){
  alert('word to check is '+wordInPlay);
  var lookUpString = 'https://wordsapiv1.p.mashape.com/words/'+wordInPlay+'/definitions/'

  console.log("runningcurl");
  $.ajax({
    url:lookUpString , // The URL to the API. You can get this in the API page of the API you intend to consume
    type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
    data: {}, // Additional parameters here
    dataType: 'json',
    success: function(data) { 
   
      console.log(data);
     
      
      var numberOfDefinitions=data.definitions.length;
      


      if(numberOfDefinitions>0){
      var definitions=data.definitions;
      firstDefinition = definitions[0].definition;
      alert('There are '+numberOfDefinitions+'defintions of ' + wordInPlay + ' the first is '+firstDefinition);
        speak('There are '+numberOfDefinitions+'definitions of ' + wordInPlay + '. The first is '+firstDefinition);
        validWord = true;
      }
      else{
        alert(wordInPlay+" is not a word");
        phraseToSay=wordInPlay+" is not a word"
        validWord = false;
        speak(phraseToSay);
      }
      
      callback();
      
      console.log(firstDefinition);
    },
    //error: function(err) { alert(err); },

    error:function (xhr, ajaxOptions, thrownError){
      if(xhr.status===404) {
          alert(wordInPlay +" "+thrownError);
          alert(wordInPlay+" is not a word");
          phraseToSay=wordInPlay+" is not a word"
          validWord = false;
          speak(phraseToSay);
          if(currentPlayerId===1){
            currentPlayerId=2;}
          else{
            currentPlayerId=1;
          }
      }
    },

    beforeSend: function(xhr) {
      xhr.setRequestHeader("X-Mashape-Authorization", "oFx7QwJYYLmshulgS2YrWsln7ns3p11TOYzjsnrj9D0RUoNj9b"); // Enter here your Mashape key
    }
  });
  // console.log(validWord);
  // return validWord;
};




function wobble(tileToWobble){
  var wobbleCount = 6; //number of wobbles

  // $('#textbox').animate({'marginLeft' : "-=30px" //moves left});
  var timerId = setInterval(function() {
    console.log('tile to wobble =' + tileToWobble);

    switch(wobbleCount){
      case 1:
        $(tileToWobble).css({'marginLeft' : "+=5px", 'marginRight':"-=5px"});//moves right
        break;
      case 2:
        $(tileToWobble).css({'marginLeft' : "-=10px",'marginRight' : "+=10px"}); //moves left
        break;
      case 3:
        $(tileToWobble).css({'marginLeft' : "+=10px", 'marginRight':"-=10px" });//moves right
        break;
      case 4:
        $(tileToWobble).css({'marginLeft' : "-=10px", 'marginRight':"+=10px"}); //moves left
        break;
      case 5:
        $(tileToWobble).css({'marginLeft' : "+=10px", 'marginRight':"-=10px" });//moves right
        break;
      case 6:
        $(tileToWobble).css({'marginLeft' : "-=5px", 'marginRight':"+=5px"}); //moves right
        break;
    }

    wobbleCount--;
    if(wobbleCount ===0) {
      clearInterval(timerId);
    }
  }, 100);//ms between wobbles
}