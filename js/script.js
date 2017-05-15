// Get the modal
var theModal = document.getElementById('myModal');
// Get the button that opens the modal
var modalButton = document.getElementById("vidButton");
modalButton.addEventListener("click", openModel, false);
function openModel() {
    theModal.style.display = "block";
}
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    theModal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == theModal) {
        theModal.style.display = "none";
    }
}

//Variables For The Game
var numberButtonList = [];
var level = 1;
if (localStorage.getItem('level')==null) {
    level = parseInt(document.getElementById('levelNumber').innerHTML);
} else {
    level = localStorage.getItem('level');
    document.getElementById('levelNumber').innerHTML = level.toString();
}
var numberButtons = document.getElementsByClassName('numberButton');
var isCovered = false;
var currentRoundNumber = 0;
var fail = new Audio('audio/fail.wav');
var win = new Audio('audio/win.wav');
var click = new Audio('audio/click.wav');
//fail.play();

//Open Test Interface
document.getElementById('testButton').addEventListener('click', testFunction);

//Start A New Level
document.getElementById('beginButton').addEventListener('click', beginFunction);

document.getElementById('quitButton').addEventListener('click', quitFunction);

document.getElementById('reset').addEventListener('click', resetFunction);

function testFunction() {
    document.getElementById('testSection').style.display= "block";
    document.getElementById('details').className = "animated fadeOutUp clearSection hide";
}

function quitFunction() {
    document.getElementById('testSection').style.display= "none";
    document.getElementById('details').className = "animated fadeInDown clearSection";
}

function resetFunction() {
    document.getElementById('levelNumber').innerHTML=1;
    clearButtons();
}

function clearButtons() {
    fail.play();
    for (var i = 0; i<numberButtons.length; i++) {
        numberButtons[i].style.backgroundColor= "transparent";
        numberButtons[i].number=null;
        numberButtons[i].innerHTML="";
        numberButtons[i].style.cursor = "auto";
        numberButtons[i].removeEventListener('click', numberButtonClickFunction);
        numberButtonList.splice(0,1);
    }
}

function coverNumbers(roundNumber) {
    if (!isCovered && roundNumber==currentRoundNumber) {
        isCovered = true;
        for (var j = 0; j<numberButtonList.length; j++) {
            //console.log(numberButtonList);
            //console.log(numberButtonList[j]);
            numberButtonList[j].style.backgroundColor= "white";
            numberButtonList[j].innerHTML="";
        }
    }
}

function beginFunction(){
    currentRoundNumber++;
    isCovered = false;
    level = parseInt(document.getElementById('levelNumber').innerHTML);
    //number of numbers
    var startingNumberOfNumbers = 4;
    var numberOfNumbers = startingNumberOfNumbers + Math.floor(level/2);
    numberButtonList = [];
    document.getElementById('peanut').style.opacity=0;
    
    //clear starting page
    for (var i = 0; i<numberButtons.length; i++) {
        numberButtons[i].style.backgroundColor= "transparent";
        numberButtons[i].number=null;
        numberButtons[i].innerHTML="";
    }
    
    //create list of places
    var buttonPlaces = [];//list of 2 element arrays
    for (var i = 1; i<6; i++) {
        for (var j = 1; j<9; j++) {
            buttonPlaces.push([i,j]);
        }
    }
    
    //pick places for numbers
    //console.log(buttonPlaces);
    for (var i = 0; i<numberOfNumbers; i++) {
        //pick button order
        var index = Math.floor(Math.random()*(40-i));
        var buttonPosition = buttonPlaces[index];
        var nextButton = document.getElementsByClassName("row"+buttonPosition[0]+" column"+buttonPosition[1])[0];
        numberButtonList.push(nextButton);
        nextButton.number=i+1;
        //console.log(nextButton.number);
        
        nextButton.innerHTML=(i+1);
        
        //add onclick functions
        nextButton.addEventListener('click', numberButtonClickFunction);
        nextButton.style.cursor = "pointer";
        
        //remove button from list
        buttonPlaces.splice(index, 1);
/*        console.log(buttonPosition);
        console.log(buttonPlaces);*/
    }
    
    //hide numbers on timer
    setTimeout(coverNumbers, 1000*(11-level), JSON.parse(JSON.stringify(currentRoundNumber)));
    
}

function numberButtonClickFunction(ev) {
    var button = ev.target;
    var buttonNum = ev.target.number;
    var nextNum = numberButtonList[0].number;
    //if it's the correct number
    if (buttonNum==nextNum) {
        //for all correct numbers
        click.play();
        //if it's the first number
        if (buttonNum==1) {
            coverNumbers(currentRoundNumber);
        }
        //if it's the last number
        if (numberButtonList.length==1) {
            level = Math.min(level+1, 10);
            localStorage.setItem('level', level.toString());
            document.getElementById('levelNumber').innerHTML = level;
            document.getElementById('peanut').className = "animated fadeIn";
            setTimeout(function() {
                document.getElementById('peanut').className = "animated fadeOut";
            }, 3000);
            setTimeout(function() {
                win.play();
            },100);
        }
        
        button.style.backgroundColor= "transparent";
        button.removeEventListener('click', numberButtonClickFunction);
        numberButtonList.splice(0,1);
    } else {
        //for incorrect picks
        clearButtons();
    }
}
/* function firstNumberFunction(ev) {
    console.log(ev.target.number);
    coverNumbers();
    //if it's the next number
        console.log(ev.target);
    console.log(numberButtonList[0]);
    if (ev.target.number==numberButtonList[0].number) {
        ev.target.style.backgroundColor= "transparent";
        ev.target.number=null;
        ev.target.innerHTML="";
        ev.target.removeEventListener('click', firstNumberFunction);
        numberButtonList.splice(0,1);
    } else {
        //if it's the wrong number

        //clear starting page
        clearButtons();

    }
}*/

/////////////////////////
/*//set onlick actions
if (i==0) {
    nextButton.addEventListener('click', firstNumberFunction);
} else if (i==(numberOfNumbers-1)){
    //add action on the final button
    nextButton.addEventListener('click', function(ev) {
        console.log(ev.target.number);
        clearButtons();
        level++;
        document.getElementById('levelNumber').innerHTML=level;
        document.getElementById('peanut').style.opacity=1;
    });
} else {
    nextButton.addEventListener('click', function(ev) {
        console.log(ev.target.number);
        //if it's the next number
        if (ev.target.number==numberButtonList[0].number) {
            ev.target.style.backgroundColor= "transparent";
            ev.target.number=null;
            ev.target.innerHTML="";
            ev.target.removeEventListener('click');
            numberButtonList.splice(0,1);
        } else {
            //if it's the wrong number

            //clear starting page
            clearButtons();

        }
    });
}*/