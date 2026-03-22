//Dom Selectors

let container = document.querySelector('.container');
let input = document.querySelector('#gridSize');
let divSize = document.querySelector('.divSize');
let clear = document.querySelector('#clear');
let color = document.querySelector('.color');
let random = document.querySelector('#random');

//Event Listener Used To Draw While Mouse Is Held Down

let mousePressed = false;

window.addEventListener("mousedown", function() {
        mousePressed = true;
});

window.addEventListener("mouseup", function() {
        mousePressed = false;
});


//Function To Create Boxes For Drawing Grid
function createBox ()  {
    if (input.value <= 100) {
    container.innerHTML = "";
    //Takes the value from the input box to determine how many boxes in each column and row of the container.
    container.style.gridTemplateColumns = "repeat("+ input.value + ",1fr)";
    container.style.gridTemplateRows = "repeat("+ input.value + ",1fr)";
    //For loop that takes the value from the input box to create the required boxes to draw on.
    for (let i = 0; i < input.value; i++) {
        for (let j = 0; j < input.value; j++) {
        //Boxes getting created.
        let div = document.createElement('div');
        container.appendChild(div);
        div.classList.add('divSize');
        //Boxes change color based off the .color input box when mouse is pressed down.
        function changeColor() {
            if (mousePressed){
            div.style.backgroundColor = color.value;
            }
        }
        function randomColor() {
	        var characters = '0123456789abcdef';
	        let colors = '#';
	        for (let i = 0; i < 6; i++) {
		    colors += characters[Math.floor(Math.random() * 16)];
	        }
	        return colors;
            }

            function randomColorChoice () {
                color.value = randomColor();
                //This is a recursive function to ensure this event listener only gets triggered after the random color button gets pressed.
                div.addEventListener('mouseover', randomColorChoice);
        }
            function removeRandom () {
                div.removeEventListener('mouseover', randomColorChoice);
            }
        //Activates the changeColor function when the mouseover event is triggered and then only changes color when mouse is pressed down.
        div.addEventListener('mouseover', changeColor);
        //Activates the random color function on the created divs
        random.addEventListener('click', randomColorChoice);  
        //Removes the randomColorChoice event listener on the created divs when selecting a color, so you can choose a plain color without clearing the grid.
        color.addEventListener('click', removeRandom);
    }
}
    } else {
        alert("Please choose a number between 2-100");
    }
}

//Takes value from the #gridSize input box and activates this function when enter is press.
function createBoxOnKeyPress (event) {
    if (event.keyCode === 13) {
        createBox();
    }
}

//Clears the container of all boxes that were created.
function clearGrid() {
    container.innerHTML = "";
}

//Event listeners used to create and clear draw boxes.
clear.addEventListener('click', clearGrid);
input.addEventListener('keypress', createBoxOnKeyPress);

