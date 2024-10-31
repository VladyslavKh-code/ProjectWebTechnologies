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

// Funkcia na zobrazenie záujmov v modálnom okne
function showInterests(id) {
    console.log(`showInterests called with id: ${id}`);
    const interestsText = document.getElementById(`interests-${id}`).innerHTML;
    document.getElementById("modalContent").innerHTML = interestsText;

    const modal = new bootstrap.Modal(document.getElementById('interestModal'));
    modal.show();

    // Získanie divu pre hodnotenie a vytvorenie hviezdičiek
    const ratingDiv = document.querySelector(`#modalContent .rating`);
    if (ratingDiv) {
        ratingDiv.innerHTML = ''; 
        createStarRating(ratingDiv, id);
    }
}

// Funkcia na vytvorenie hodnotenia hviezdičkami
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

// Spracovanie kliknutia na hviezdičku
function handleStarClick(event) {
    const rating = event.target.dataset.rating;
    const id = event.target.dataset.id;
    console.log(`Star clicked - id: ${id}, rating: ${rating}`);
    rateInterest(id, rating);
}

// Funkcia na zobrazenie hodnotenia
function rateInterest(id, rating) {
    // Zmena farby hviezdičiek na žltú do vybratého hodnotenia
    const stars = document.querySelectorAll(`.rating[data-id="${id}"] .fa-star`);
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('checked');
        } else {
            star.classList.remove('checked');
        }
    });

    // Zobrazenie jedinečnej správy pre každé hodnotenie
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
function revealOnScroll() {
    const cards = document.querySelectorAll('.course-card');
    const windowHeight = window.innerHeight;
    
    cards.forEach(card => {
        const revealTop = card.getBoundingClientRect().top;
        
        if (revealTop < windowHeight - 100) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);
document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll("a");

    links.forEach(link => {
        link.addEventListener("click", function(event) {
            if (this.getAttribute("href") !== "#") {
                event.preventDefault();
                const href = this.getAttribute("href");

                document.body.classList.add("fade-out");

                setTimeout(() => {
                    window.location.href = href;
                }, 500); 
            }
        });
    });
});