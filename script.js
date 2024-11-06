
/*Funkcia na popup v index.html*/  
function validateForm() {
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('submitBtn');
    const errorMessageDiv = document.getElementById('error-message');

    // Regex pre overenie e-mailu
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Overenie e-mailu a správy
    if (emailPattern.test(emailInput.value) && messageInput.value.trim() !== "") {
        submitBtn.disabled = false; // Aktivovanie tlačidla
        errorMessageDiv.style.display = 'none'; // Skrytie chybovej správy
    } else {
        submitBtn.disabled = true; // Deaktivovanie tlačidla
        errorMessageDiv.textContent = "Prosím, skontrolujte váš e-mail a uistite sa, že správa nie je prázdna.";
        errorMessageDiv.style.display = 'block'; // Zobrazenie chybovej správy
    }
}

function handleSubmit(event) {
    event.preventDefault(); // Zabraňuje predvolenému správaniu formulára

    // Získanie hodnôt z formulára
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;


    // Zobrazenie alertu
    alert(`Vaša správa bola odoslaná:\nEmail: ${email}\nSpráva: "${message}"`);

    // Resetovanie formulára po odoslaní
    document.getElementById('contactForm').reset();
    validateForm(); // Znovu skontroluje validitu formulára

    const errorMessageDiv = document.getElementById('error-message');
    errorMessageDiv.style.display = 'none'; // Zatvorí chybovú správu
}

/*Koniec funkcie*/ 


// Existujúca aktualizácia podkategórií
const subcategories = {
    matematika: ["Aplikovaná matematika", "Diskrétna matematika", "Finančná matematika"],
    anglictina: ["Konverzácia", "Obchodná angličtina", "Akademická angličtina"],
    programovanie: ["Java", "Python", "C++", "JavaScript"],
    "webovy-vyvoj": ["HTML a CSS", "React", "Node.js", "Full-stack vývoj"]
};

// Aktualizácia možností podkategórií
function updateSubcategories() {
    const courseSelect = document.getElementById("course");
    const subcategorySelect = document.getElementById("subcategory");
    subcategorySelect.innerHTML = '<option value="">-- Vyberte podkategóriu --</option>';

    const selectedCourse = courseSelect.value;
    if (subcategories[selectedCourse]) {
        subcategories[selectedCourse].forEach(subcat => {
            const option = document.createElement("option");
            option.value = subcat.toLowerCase().replace(" ", "-");
            option.textContent = subcat;
            subcategorySelect.appendChild(option);
        });
    }
}

// Overenie počtu znakov hesla
function overenie_hesla() {
    const pw = document.getElementById("heslo1").value;
    const m = document.getElementById("meno").value;
    const p = document.getElementById("priezvisko").value;
    const vystraha1 = document.getElementById("vystraha1");
    const heslo2 = document.getElementById("heslo2");

    if (pw.length >= 6) {
        vystraha1.innerHTML = `${m} ${p}, tvoje heslo je OK.`;
        vystraha1.style = "color:green;font-size:12px";
        heslo2.disabled = false;
    } else {
        vystraha1.innerHTML = `${m} ${p}, heslo musí obsahovať najmenej 6 znakov.`;
        vystraha1.style = "color:red;font-size:12px";
        heslo2.disabled = true;
    }
    validateRegistrationForm();
}

// Zistenie zhody hesla
function zhoda_hesla() {
    const m = document.getElementById("meno").value;
    const p = document.getElementById("priezvisko").value;
    const heslo1 = document.getElementById("heslo1").value;
    const heslo2 = document.getElementById("heslo2").value;
    const zhoda = document.getElementById("zhoda");

    if (heslo1 === heslo2) {
        zhoda.innerHTML = `${m} ${p}, heslá sa zhodujú.`;
        zhoda.style = "color:green;font-size:12px";
    } else {
        zhoda.innerHTML = `${m} ${p}, heslá sa nezhodujú.`;
        zhoda.style = "color:red;font-size:12px";
    }
    validateRegistrationForm();
}

// Overenie e-mailu
function overenie_emailu() {
    const email = document.getElementById("email").value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errorMessage = document.getElementById("error-message");

    if (!emailPattern.test(email)) {
        errorMessage.textContent = "Prosím, zadajte platný e-mail.";
    } else {
        errorMessage.textContent = "";
    }
    validateRegistrationForm();
}

// Overenie úplnosti formulára
function validateRegistrationForm() {
    const meno = document.getElementById("meno").value;
    const priezvisko = document.getElementById("priezvisko").value;
    const year = document.getElementById("year").value;
    const email = document.getElementById("email").value;
    const course = document.getElementById("course").value;
    const subcategory = document.getElementById("subcategory").value;
    const heslo1 = document.getElementById("heslo1").value;
    const heslo2 = document.getElementById("heslo2").value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const button = document.getElementById("button");

    const allFieldsFilled = meno && priezvisko && year && email && course && subcategory && heslo1 && heslo2;
    const passwordMatch = heslo1 === heslo2;
    const passwordLengthValid = heslo1.length >= 6;
    const emailValid = emailPattern.test(email);

    button.disabled = !(allFieldsFilled && passwordMatch && passwordLengthValid && emailValid);
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
function submitForm() {
    const form = document.getElementById('registrationForm');
    const confirmationMessage = document.getElementById('confirmationMessage');
    form.style.display = 'none';
    confirmationMessage.style.display = 'block';
}
function loadResponsiveCSS() {
    const width = window.innerWidth;
    let cssFile;

    // Podmienky pre načítanie správneho CSS súboru podľa šírky okna
    if (width <= 700) {
        cssFile = 'style-700.css';
    } else if (width <= 900) {
        cssFile = 'style-900.css';
    } else if (width <= 1300) {
        cssFile = 'style-1300.css';
    } else {
        cssFile = 'style-1600.css';
    }

    // Odstráni existujúci CSS súbor, aby sa predišlo konfliktom
    const existingLink = document.getElementById('responsive-css');
    if (existingLink) {
        existingLink.remove();
    }

    // Vytvorí nový odkaz na CSS súbor a pridá ho do dokumentu
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssFile;
    link.id = 'responsive-css';
    document.head.appendChild(link);
}

// Pri načítaní stránky zavoláme funkciu
loadResponsiveCSS();

// Pri zmene veľkosti okna znovu zavoláme funkciu
window.addEventListener('resize', loadResponsiveCSS);

document.addEventListener("DOMContentLoaded", function () {
    const courses = document.querySelectorAll(".course-card");
    const nextButton = document.getElementById("next-course");
    const prevButton = document.getElementById("prev-course");
    const courseGrid = document.querySelector(".course-grid"); // Pridajte tento riadok
    let currentIndex = 0;

    function updateCourseView() {
        const offset = -currentIndex * 100; // Posunutie v percentách podľa šírky kurzu
        courseGrid.style.transform = `translateX(${offset}%)`; // Zmeňte tento riadok
    }

    nextButton.addEventListener("click", function () {
        if (currentIndex < courses.length - 1) {
            currentIndex++;
            updateCourseView();
        }
    });

    prevButton.addEventListener("click", function () {
        if (currentIndex > 0) {
            currentIndex--;
            updateCourseView();
        }
    });
});


const themeSwitch = document.getElementById('theme-switch');
const themeIcon = document.getElementById('theme-icon');

// Skontroluj miestne úložisko pre uložený režim
const currentTheme = localStorage.getItem('theme') || 'light';
document.body.classList.add(currentTheme + '-mode');
updateIcon(currentTheme);

themeSwitch.addEventListener('click', () => {
    if (document.body.classList.contains('light-mode')) {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark'); // uloženie režimu do miestneho úložiska
        updateIcon('dark');
    } else {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light'); // uloženie režimu do miestneho úložiska
        updateIcon('light');
    }
});

function updateIcon(theme) {
    if (theme === 'dark') {
        themeIcon.innerHTML = '<path d="M480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Z"/>';
    } else {
        themeIcon.innerHTML = '<path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Z"/>';
    }
}

function toggleAnswer(element) {
    const faqItem = element.parentElement;
    faqItem.classList.toggle('active');
  }
  

