
$(function(){




// if ('speechSynthesis' in window) {
//     alert('I can talk'); // Synthesis support. Make your web apps talk!
// }
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
var playerID=0;
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
var playerId=0;
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
var playHistory = new Object();
  playHistory.roundNumber=0;
  playHistory.playerId=1
  playHistory.wordRef=0
  playHistory.locationsPlayed=[];
  playHistory.scoresByLetter=[];
  playHistory.multiplyers=[];
  playHistory.direction="";
var roundHistory=[[],[],[],[]];
var speachSwitch ="off";
var lettersInThisRound=0;
var firstRowPlayed=0;
var firstColumnPlayed=0;


boardMaker();
rackMaker();

//Constructor to draw board
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
        locationColor = 'rgba(249, 154, 249, .9)'; backGroundImg = '; background-image: url(images/star.png); background-size:cover; background-repeat:   no-repeat;'
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
      $('#'+rackItemId).css({width:'42px',height:'31px', color:'rgba(137, 185, 226, 1.0)',fontName:'lato,sansSerif', fontSize:'16px' , fontWeight:'700', paddingTop:'10px', background:'rgba(255, 254, 231, 1.0'});
      //putLetter In Rack Array
      tileRacks[i][r]=rackLetter.toUpperCase();
    };
  
  };
  $('.rack').css({border:'1px', width:'308px',height:'44px', background:'rgba(255,0,0,.5)'})
  

};







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
    if($(this).text().charAt(0)==="2" || $(this).text().charAt(0)==="3"){
    pickUpParameters.boardMarkerCheck=true}else{pickUpParameters.boardMarkerCheck=false};


    console.log(">>>>>>>>>>>>>>>>>Pick Up<<<<<<<<<<<<<<<<<<<<<<");
    console.log("rack or grid="+ pickUpParameters.rackOrBoard);
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

    }else
    {
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
      if($(this).text().charAt(0)==="2" || $(this).text().charAt(0)==="3"){
      putDownParameters.boardMarkerCheck=true}else{putDownParameters.boardMarkerCheck=false};


    console.log(">>>>>>>>>>>>>>>>>Put Down<<<<<<<<<<<<<<<<<<<<<<");
    console.log("rack or grid="+ putDownParameters.rackOrBoard);
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

    };

//PICK UPS
    //Check if tile can be played.
    //if the tile being picked up is locked ie a committed word letter or it is not a tile ie a board or rack empty sq or it is sq on the baord with //a word or letter score none of these can be picked up
    if(thisAction === "pickUp"&&(pickUpParameters.lockStatus==="l"||pickUpParameters.letter===""||pickUpParameters.boardMarkerCheck===true)){
      tileToWobble ='#'+ pickUpParameters.fullId;
      wobble(tileToWobble);
      wobble(tileToWobble);
      speak("Not a valid selection");
      console.log("next action = "+thisAction);
      return
    }
    //knowing tha the tile can be picked up check if it is the grid or rack it is being picked up from this process is for the rack as it update the //rack array so when replenishemnet happens system knows where empties are and can check if none left


    else if (thisAction==="pickUp" && pickUpParameters.rackOrBoard==="r"){
      //,,,,,,,need an iftstament to check if picking up from grid what the fill should be i.e. 3l 2l 3w 2w etc
     speak("You have selected "+pickUpParameters.letter)
     var playerIndex=(+pickUpParameters.playerId-1);
     var tileIndex=((+pickUpParameters.column-1));
     console.log("rack array "+tileRacks[playerIndex]+" "+playerIndex+' tileIndex '+tileIndex);
     thisAction="putDown";

     /////clear text from picked up cell and remove from rack array

     $(this).text("");
     tileRacks[playerIndex][tileIndex]="";
     console.log('tile rack 0 now'+ tileRacks[0]+" rack 1"+tileRacks[1]);
     return
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

      console.log("round "+playHistory.roundNumber);
      console.log("player "+playHistory.playerId);
      console.log("wordRef "+playHistory.wordRef);
      console.log("locationsPlayed "+playHistory.locationsPlayed);
      console.log("scoresByLetter "+playHistory.scoresByLetter);
      console.log("Multiplyers"+playHistory.multiplyers);
      console.log("First Row Played on putdown first tile"+firstRowPlayed);
      console.log("First columnPlayed on putdown first tile"+firstColumnPlayed);
      thisAction="pickUp"
    }

    ////special Case for second letter in round check whether play is horizontal or vertical
    else if (lettersInThisRound===1&&thisAction==="putDown"&&putDownParameters.rackOrBoard==="b"&&(putDownParameters.letter===""||putDownParameters.boardMarkerCheck===true)
      &&((firstRowPlayed===putDownParameters.row && (+firstColumnPlayed)<+(putDownParameters.column))||(firstColumnPlayed===putDownParameters.column&&(+firstRowPlayed)<(+putDownParameters.row)))

      ){
      $(this).html(pickUpParameters.html);
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


      console.log("round "+playHistory.roundNumber);
      console.log("player "+playHistory.playerId);
      console.log("wordRef "+playHistory.wordRef);
      console.log("locationsPlayed "+playHistory.locationsPlayed);
      console.log("scoresByLetter "+playHistory.scoresByLetter);
      console.log("Multiplyers"+playHistory.multiplyers);
      console.log("direction-->"+playHistory.direction);
      thisAction="pickUp"
    }




    else{
      tileToWobble ='#'+ putDownParameters.fullId;
      wobble(tileToWobble);
      wobble(tileToWobble);
      speak("You cannot place a tile here, sorry");
      console.log("next action = "+thisAction);
      return///????remove this

    }
    
   /* console.log('<<<<<<<<<<<<<<<<NEXT MOVE>>>>>>>>>>>>>>>>>');
    console.log($(this).attr('id'));
    console.log("tileDrop "+tileDrop);
    console.log("thisAction"+thisAction);
    console.log("CurrentWord"+wordInPlay);
    console.log("pickUpParameters"+pickUpParameters);

    pickUpParameters[0]=($(this).attr('id')).charAt(0);//location r rack g grid
    pickUpParameters[1]=($(this).attr('id')).charAt(1);//row identifier
    pickUpParameters[2]=($(this).attr('id')).charAt(3);//column identifier
    pickUpParameters[3]=($(this).attr('id')).charAt(5);//lock status

    console.log('class = '+pickUpParameters[3])

    //check if the tile is locked i.e. cannot be played

    if(pickUpParameters[3]==="l"){
    //warn not available to play
    }
    //else{        //PickUp test if next actions is pickup check content}

        if (thisAction==="pickUp" && ($(this).text()!="")){

            //check if pick up location is a letter or an empty square if a letter get letter  next actio is put down

              console.log("pick up triggered");
              console.log("current move in pick up "+pickUpParameters);
              console.log("lastMove in pick up "+lastMove);
              console.log("pickUpParameters 0"+pickUpParameters[0]);
              tileInPlayText = $(this).text().charAt(0);
              tileInPlayHTML= $(this).html();
              locationInPlayId = $(this).attr('id');
              $(this).text("");
              thisAction="putDown";
              
             
              if(pickUpParameters[0]==="b"){
                tileDrop--;
                wordInPlay=wordInPlay.replace(tileInPlayText,"");
                currentRnd[0]=wordInPlay;


              console.log("pick up from board");
              console.log("pickUpParameters 0="+pickUpParameters[0]);
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
            if ($(this).text()===""&&thisAction==="putDown" &&(pickUpParameters[0]==="r"))
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
                console.log(" pickUpParameters "+pickUpParameters+" lastMove "+lastMove)
                         
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
                ((+pickUpParameters[1]=== +lastMove[1]+1)&&(+pickUpParameters[2]=== +lastMove[2]))
                ||
                ((+pickUpParameters[2]=== +lastMove[2]+1)&&(+pickUpParameters[1]=== +lastMove[1]))
                ||
                ($(this).text()==="" && tileDrop===1 &&pickUpParameters[0]==="r"))))
                        
                {
                console.log('case 1--------');
                console.log('vh check');
                console.log('Current Move 0'+pickUpParameters[0]);
                console.log(" pickUpParameters "+pickUpParameters+" lastMove "+lastMove)
                console.log("tile Drop"+tileDrop);
                //if the tile is place on the grid check if it is below or to the right and set the word direction as horizontal or vertical, this deteremines where futrther tiles may be placed
                                 
                   
                     if(+pickUpParameters[1]===+lastMove[1]+1){
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
                &&(playDirection==='horizontal'&&((+pickUpParameters[2]=== +lastMove[2]+1)&&(+   pickUpParameters[1]===+lastMove[1])))
                ||(playDirection==='vertical'&&(+pickUpParameters[1]=== +lastMove[1]+1)&&(  +pickUpParameters[2]===+lastMove[2])))
                        
                {
                    if($(this).text()==="" && thisAction === "putDown" && tileDrop>1 
                ){console.log('fist test is true' )};
                    if((playDirection === "vertical"&&((+pickUpParameters[1]===+lastMove[1]+1)&&(+pickUpParameters[2]===+lastMove[2])))){console.log('secondtest is true' )};
                    if((playDirection === "horizontal" && ((+pickUpParameters[2]===+lastMove[2]+1)&&(+pickUpParameters[1]===+pickUpParameters[1])))){
                        console.log('third test is true' )
                    };


                console.log('case 2--------');
                console.log('vh check');
                console.log('Current Move 0'+pickUpParameters[0]);
                console.log(" pickUpParameters "+pickUpParameters+" lastMove "+lastMove)
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
                     console.log(" pickUpParameters "+pickUpParameters+" lastMove "+lastMove)
                     console.log("tileDrop"+tileDrop);
                     console.log("directionOfPlay is on fail "+playDirection);
                     console.log(lastMove[0]+1)
                     tileToWobble ='#'+ pickUpParameters[0]+pickUpParameters[1]+"_"+pickUpParameters[2]+"_"+        pickUpParameters[3];
                     wobble(tileToWobble);
                } //>>>>end of case square is empty
            
                }
//     //end check rack or baord statement 


console.log("word in play is "+wordInPlay);
console.log("next action is ..."+thisAction);
console.log("tileDrop"+tileDrop);
console.log("archive move nnn"+archiveMove);
console.log("endOfMove------------->");*/

 });

//Submit word to check validation with dictionary

$("#submitWord").click(function(){
    wordInPlay=wordInPlay.toLowerCase();
    checkDefinition(wordInPlay);

});


function pickLetter(){
    

        randomIndex= (Math.ceil(Math.random()*lettersRemainingInStack));
        rackLetter=lettersInPlay[randomIndex];
       lettersInPlay.splice(lettersInPlay.indexOf(randomIndex), 1);
       lettersRemainingInStack--;

    return rackLetter;
   
}

function dropTileOnSquare(){
    thisAction="pickUp";
    tileDrop++;
    wordInPlay=wordInPlay+tileInPlayText;
    console.log("case 0----------")
    console.log("last move was "+lastMove);
    console.log("tileDrop"+tileDrop);
    console.log(" pickUpParameters "+pickUpParameters+" lastMove "+lastMove)

};

    
 //speak 
    function speak(phraseToSay, callback) {
        //alert('speak is called');
        if(speachSwitch!="on"){
          return
        }
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
   wobbleCount--;
   break;
   case 2:
   $(tileToWobble).css({'marginLeft' : "-=10px",'marginRight' : "+=10px"}); //moves left
   wobbleCount--;
   break;
   case 3:
   $(tileToWobble).css({'marginLeft' : "+=10px", 'marginRight':"-=10px" });//moves right
   wobbleCount--;
   break;
   case 4:
   $(tileToWobble).css({'marginLeft' : "-=10px", 'marginRight':"+=10px"}); //moves left
   wobbleCount--;
   break;
   case 5:
   $(tileToWobble).css({'marginLeft' : "+=10px", 'marginRight':"-=10px" });//moves right
   wobbleCount--;
   break;
   case 6:
   $(tileToWobble).css({'marginLeft' : "-=5px", 'marginRight':"+=5px"}); //moves right
   wobbleCount--;
   break;
   default:

    }  
 
 
  if(wobbleCount ===0) {
    clearInterval(timerId);
  }
}, 100);//ms between wobbles
}