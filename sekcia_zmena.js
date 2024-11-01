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
    const slider = document.getElementById('sizeSlider');
    let fontSize, sizeText;

    if (currentSize === 1) {
        fontSize = '14px';
        sizeText = 'Malé';
    } else if (currentSize === 2) {
        fontSize = '18px';
        sizeText = 'Stredné';
    } else if (currentSize === 3) {
        fontSize = '22px';
        sizeText = 'Veľké';
    }

    section.style.fontSize = fontSize;
    slider.setAttribute('data-size', sizeText);
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
