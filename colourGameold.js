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

start();
//gives new colours
newGame.addEventListener("click", function(){
	restart();
});
//alert about hex
hex.addEventListener("click", function(){
	alert("hex version will be available soon");
});

function start() {
//controls selected button; calls restart to generate colours accordingly
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
//grab colour of clicked square, compare colour to picked colour
	for(var i=0; i<squares.length; i++){
		squares[i].addEventListener ("click", function(){
		var clickedColour = this.style.backgroundColor;
		if (pickedColour===clickedColour){
			changeColours(clickedColour);
			message.textContent = "Correct!";
			newGame.textContent = "Play Again?";
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
	colourDisplay.textContent = pickedColour;
	h1.style.backgroundColor="#74d600";
	message.textContent = "";
	newGame.textContent = "New colours"
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
//setting up the new colours button
function changeColours(colour) {
	for (var i=0; i<squares.length; i++) {
		squares[i].style.backgroundColor = colour;
	}
}

function pickColour(){
	var random = Math.floor(Math.random()*colours.length);
	return colours[random];
}

function generateRandomcolours(num) {
	var arr =[];
	for (var i=0; i<num; i++) {
		//anonymous function generates rgb values and is stored in arr[i]
		arr[i]=	(function() {
			var r = Math.floor(Math.random()*256);
			var g = Math.floor(Math.random()*256);
			var b = Math.floor(Math.random()*256);
			//adding spaces, otherwise it does not match clicked colour (coming from css background colour - dom or smth else adds spaces)
			return "rgb(" + r + ", " + g + ", " + b + ")"; 
			})();
	};
	return arr;
}