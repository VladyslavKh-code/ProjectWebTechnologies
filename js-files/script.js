
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


    // Функція для показу інтересів у модальному вікні
    function showInterests(id) {
        console.log(`showInterests called with id: ${id}`);
        const interestsText = document.getElementById(`interests-${id}`).innerHTML;
        document.getElementById("modalContent").innerHTML = interestsText;

        const modal = new bootstrap.Modal(document.getElementById('interestModal'));
        modal.show();

        
        const ratingDiv = document.querySelector(`#modalContent .rating`);
        if (ratingDiv) {
            ratingDiv.innerHTML = ''; 
            createStarRating(ratingDiv, id);
        }
    }

    // Функція для створення зірочок
    function createStarRating(element, id) {
        console.log(`createStarRating called for id: ${id}`);
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('i');
            star.classList.add('fa', 'fa-star');
            star.dataset.rating = i;
            star.dataset.id = id;
            star.addEventListener('click', handleStarClick);
            element.appendChild(star);
        }
    }

    // Обробник кліку на зірочку
    function handleStarClick(event) {
        const rating = event.target.dataset.rating;
        const id = event.target.dataset.id;
        console.log(`Star clicked - id: ${id}, rating: ${rating}`);
        rateInterest(id, rating);
    }

    // Функція для виставлення рейтингу
    function rateInterest(id, rating) {
        // Змінюємо колір зірочок на жовтий до вибраного рейтингу
        const stars = document.querySelectorAll(`.rating[data-id="${id}"] .fa-star`);
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('checked');
            } else {
                star.classList.remove('checked');
            }
        });

        // Відображаємо унікальне повідомлення для кожного рейтингу
        const ratingMessage = document.getElementById(`rating-message-${id}`);
        let message = '';
        switch (parseInt(rating)) {
            case 1:
                message = 'Nízke hodnotenie – dúfame v zlepšenie!';
                break;
            case 2:
                message = 'Priemerné hodnotenie, môže byť lepšie!';
                break;
            case 3:
                message = 'Stredné hodnotenie – je nad čím pracovať!';
                break;
            case 4:
                message = 'Veľmi dobré! Skoro ste spokojní!';
                break;
            case 5:
                message = 'Výborne! Ste úplne spokojní!';
                break;
            default:
                message = 'Vyberte hodnotenie.';
        }
        ratingMessage.textContent = message;
    }

    