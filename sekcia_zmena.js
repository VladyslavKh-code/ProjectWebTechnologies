let currentSize = 2;

function updateFontSize(value) {
    currentSize = parseInt(value);
    applyFontSize();
}

function increaseFontSize() {
    if (currentSize < 3) {
        currentSize++;
        document.getElementById('sizeSlider').value = currentSize;
        applyFontSize();
    }
}

function decreaseFontSize() {
    if (currentSize > 1) {
        currentSize--;
        document.getElementById('sizeSlider').value = currentSize;
        applyFontSize();
    }
}

function resetFontSize() {
    currentSize = 2;
    document.getElementById('sizeSlider').value = currentSize;
    applyFontSize();
}

function applyFontSize() {
    const section = document.getElementById('sekcia_zmena');
    const image = document.getElementById('dynamicImage');
    let fontSize;

    if (currentSize === 1) {
        fontSize = '14px';
        section.className = 'small';
    } else if (currentSize === 2) {
        fontSize = '18px';
        section.className = 'medium';
    } else if (currentSize === 3) {
        fontSize = '22px';
        section.className = 'large';
    }

    section.style.fontSize = fontSize;
}

// Nové funkcie na zmenu veľkosti textu
function changeFontSize(size) {
    if (size === 'large') {
        currentSize = 3;
    } else if (size === 'medium') {
        currentSize = 2;
    } else if (size === 'small') {
        currentSize = 1;
    }
    document.getElementById('sizeSlider').value = currentSize;
    applyFontSize();
}

// Funkcia na spracovanie klávesových skratiek
document.addEventListener('keydown', function (event) {
    if (event.altKey && event.key === 'ArrowUp') {
        event.preventDefault();
        increaseFontSize();
    }
    if (event.altKey && event.key === 'ArrowDown') {
        event.preventDefault();
        decreaseFontSize();
    }
    if (event.altKey && event.key === '0') {
        event.preventDefault();
        resetFontSize();
    }
});
