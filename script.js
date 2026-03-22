// DOM Selectors
const container = document.querySelector('.container');
const input = document.querySelector('#gridSize');
const clearBtn = document.querySelector('#clear');
const colorPicker = document.querySelector('.color');
const randomBtn = document.querySelector('#random');

// State
let pointerPressed = false;
let isRandomMode = false;

// Pointer state for desktop + mobile
window.addEventListener('pointerdown', () => {
    pointerPressed = true;
});

window.addEventListener('pointerup', () => {
    pointerPressed = false;
});

window.addEventListener('pointercancel', () => {
    pointerPressed = false;
});

// Random color generator
function randomColor() {
    const characters = '0123456789abcdef';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += characters[Math.floor(Math.random() * 16)];
    }

    return color;
}

// Draw on a square
function paintSquare(square) {
    if (!square.classList.contains('divSize')) return;

    if (isRandomMode) {
        square.style.backgroundColor = randomColor();
    } else {
        square.style.backgroundColor = colorPicker.value;
    }
}

// Create drawing grid
function createBox() {
    const size = Number(input.value);

    if (size < 2 || size > 100) {
        alert('Please choose a number between 2 and 100');
        return;
    }

    container.innerHTML = '';
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const div = document.createElement('div');
        div.classList.add('divSize');
        container.appendChild(div);
    }
}

// Create grid when Enter is pressed
function createBoxOnKeyPress(event) {
    if (event.key === 'Enter') {
        createBox();
    }
}

// Clear grid colors only
function clearGrid() {
    const squares = document.querySelectorAll('.divSize');
    squares.forEach(square => {
        square.style.backgroundColor = '';
    });
}

// Toggle random mode on
randomBtn.addEventListener('click', () => {
    isRandomMode = true;
});

// Turn random mode off when choosing a color
colorPicker.addEventListener('input', () => {
    isRandomMode = false;
});

// Draw when pressing directly on a square
container.addEventListener('pointerdown', (event) => {
    if (event.target.classList.contains('divSize')) {
        paintSquare(event.target);
    }
});

// Draw while dragging across squares
container.addEventListener('pointerover', (event) => {
    if (!pointerPressed) return;

    if (event.target.classList.contains('divSize')) {
        paintSquare(event.target);
    }
});

// Mobile drag support
container.addEventListener('pointermove', (event) => {
    if (!pointerPressed) return;

    const elementUnderPointer = document.elementFromPoint(event.clientX, event.clientY);

    if (elementUnderPointer && elementUnderPointer.classList.contains('divSize')) {
        paintSquare(elementUnderPointer);
    }
});

// Event listeners
clearBtn.addEventListener('click', clearGrid);
input.addEventListener('keypress', createBoxOnKeyPress);