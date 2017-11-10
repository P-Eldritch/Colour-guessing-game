var message = document.querySelector(".message");
var h1 = document.querySelector("h1");
var hex = document.querySelector(".hex");
var newGame = document.querySelector(".new-game");
var easyhardButtons = document.querySelectorAll(".easyhard");
var squaresCount = 6;
var colours= generateRandomcolours(squaresCount);
var squares = document.querySelectorAll(".square");
var pickedColourDisplay=document.querySelector("#colourDisplay");
var pickedColour=pickColour();
var typeMarker = "rgb";


buttonsEvents();
squaresEvents();

//gives new rgb colours
newGame.addEventListener("click", function(){
	typeMarker = "rgb";
	this.classList.add("selected");
	hex.classList.remove("selected");
	restart();
});
//gives new hex colours
hex.addEventListener("click", function(){
	typeMarker = "hex";
	this.classList.add("selected");
	newGame.classList.remove("selected");
	restart();
	
});


function buttonsEvents() {
//controls selected button; calls restart to generate colours accordingly (3 or 6)
	for (var i=0; i<easyhardButtons.length; i++) {
	easyhardButtons[i].addEventListener("click", function(){
		easyhardButtons[0].classList.remove("selected");
		easyhardButtons[1].classList.remove("selected");
		this.classList.add("selected");
		if (this.textContent==="Easy"){
			squaresCount = 3;
		}
		else {
			squaresCount = 6;
		}
	restart();
	});
	}
}
//grab colour of the clicked square, compare the colour to a picked colour
function squaresEvents() {
	for(var i=0; i<squares.length; i++){
		squares[i].addEventListener ("click", function(){
		var clickedColour = this.style.backgroundColor;
		if (pickedColour===clickedColour){
			changeColours(clickedColour);
			message.textContent = "Correct!";
			if (typeMarker === "hex") {
				hex.textContent = "Play Again";
				newGame.textContent = "New rgb";
				}
			else {
				newGame.textContent = "Play Again";
				hex.textContent = "New hex"}
			h1.style.backgroundColor = clickedColour;
			}
		else{
			//change to background colour
			this.style.backgroundColor="#232323";
			message.textContent = "Try again";
			}
		});
	}
	restart();
}

function restart(){
	colours = generateRandomcolours(squaresCount);
	pickedColour =pickColour();
	h1.style.backgroundColor="#74d600";
	message.textContent = "";
	hex.textContent = "New hex"
	newGame.textContent = "New rgb"
	if (typeMarker === "hex") {
		colourDisplay.textContent = rgbToHex(pickedColour);
	}
	else {
		colourDisplay.textContent = pickedColour;
	}
	for (var i=0; i<squares.length;i++) {
		if (colours[i]) {
			squares[i].classList.remove("hidden");
			squares[i].style.backgroundColor =colours[i];
		}
		else {
			squares[i].classList.add("hidden");
		}
	}
}
function changeColours(colour) {
	for (var i=0; i<squares.length; i++) {
		squares[i].style.backgroundColor = colour;
	}
}
//generates as many random numbers as there are places in colours array; picks one colour for guessing
function pickColour(){
	var random = Math.floor(Math.random()*colours.length);
	return colours[random];
}

function generateRandomcolours(num) {
	var arr =[];
	//fill array with strings, containing rgb values
	for (var i=0; i<num; i++) {
		//anonymous function generates rgb values and values are stored in arr[i]
		arr[i]=	(function() {
			var r = Math.floor(Math.random()*256);
			var g = Math.floor(Math.random()*256);
			var b = Math.floor(Math.random()*256);
			//adding spaces, otherwise it does not match clicked colour (coming from css backgroundColor property)
			return "rgb(" + r + ", " + g + ", " + b + ")"; 
			})();
	};
	return arr;
}
function rgbToHex(num) {
	var hexNumArray = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
	var splitArr = num.replace('rgb(','').replace(')','').split(", ");
	var stringy = "hex #";
	for (var i = 0; i<splitArr.length; i++) {
		stringy = stringy + hexNumArray[(splitArr[i] - splitArr[i] % 16)/16] +  hexNumArray[splitArr[i] % 16]
	}
	return stringy;
}