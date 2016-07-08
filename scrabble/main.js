
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

  var tileInPlayText="";
  var currentAction ="pickUp";
  var tileDrop =0
  var lastMove=[];
  var currentMove=[];
  var playDirection="";
  var iDToCheck="";
  var rightSquareContent="";
  var wordInPlay =""

   $(".tile").click(function() {
    

    console.log($(this).attr('id'));
    console.log("tileDrop "+tileDrop);
    console.log("currentAction"+currentAction);
    console.log("CurrentWord"+wordInPlay);

    currentMove[0]=($(this).attr('id')).charAt(0);
    currentMove[1]=($(this).attr('id')).charAt(1);
    currentMove[2]=($(this).attr('id')).charAt(3);




    if (currentAction==="pickUp"){
        if($(this).text()!=""){
          tileInPlayText = $(this).text();
          console.log(tileInPlayText);
          $(this).text("");
          currentAction="putDown"
          } 
    }
    else{
            if($(this).text()===""&&tileDrop===0){
                $(this).text(tileInPlayText);
                currentAction="pickUp";
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
                currentAction="pickUp";
               
              

                       
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


          
            else if(($(this).text()===""&&tileDrop>1)||($(this).text()==="" && tileDrop>1 &&currentMove[0]==="r"))
                {   $(this).text(tileInPlayText);
                    currentAction="pickUp";
                    console.log('case >1-------------------');

                    if (currentMove[0]!="r"){
                    tileDrop++;
                    wordInPlay=wordInPlay+tileInPlayText;
                       


                    if(playDirection==='horizontal'&&((+currentMove[2]=== +lastMove[2]+1)&&(+currentMove[1]===+lastMove[1]))){
                    $(this).text(tileInPlayText);
                    currentAction="pickUp";
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
                    else if(playDirection==='vertical'&&(+currentMove[1]=== +lastMove[1]+1)&&(+currentMove[2]===+lastMove[2]))
                    {
                    $(this).text(tileInPlayText);
                    currentAction="pickUp";
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
            else{
             console.log("square occupied/can't be played")
             console.log(" currentMove "+currentMove+" lastMove "+lastMove)
             console.log("tileDrop"+tileDrop);
             console.log(lastMove[0]+1)
            }
    }  

console.log(wordInPlay);

});

$("#submitWord").click(function(){
    
    checkDefinition(wordInPlay);
});


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
            var firstDefinition = definitions[0].definition;


            if(!!numberOfDefinitions){
            alert('There are '+numberOfDefinitions+'defintions of '+wordToCheck+' the first is '+firstDefinition);
            }
            else{
                alert(wordToCheck+" is not a word");
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