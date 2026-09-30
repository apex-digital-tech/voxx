// Configuration globale
let currentSlide = 0;
const totalSlides = 3; // Nombre total d'images dans le slider
const sliderElement = document.getElementById('slider');
const thumbs = document.querySelectorAll('.gallery-thumbs .thumb');

// Fonction pour déplacer le slider avec les boutons Précédent / Suivant
function moveSlider(direction) {
    currentSlide += direction;
    
    // Boucle infinie du slider
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    
    updateSliderPosition();
}

// Fonction pour sauter directement à une slide via la miniature
function jumpToSlide(index) {
    currentSlide = index;
    updateSliderPosition();
}

// Met à jour l'affichage mécanique du slider et des miniatures
function updateSliderPosition() {
    // Déplacement horizontal basé sur l'index (0%, -33.33%, -66.66%)
    const offset = -(currentSlide * (100 / totalSlides));
    sliderElement.style.transform = `translateX(${offset}%)`;
    
    // Mise à jour de la classe active sur les miniatures
    thumbs.forEach((thumb, idx) => {
        if (idx === currentSlide) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}

// Fonctions d'ouverture et fermeture de la Lightbox (Zoom)
function openLightbox(slideIndex) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    
    // Récupère la source de l'image cliquée
    const activeSlideImg = document.querySelectorAll('.slide img')[slideIndex].src;
    
    lightboxImg.src = activeSlideImg;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

// Traitement et envoi du formulaire vers WhatsApp
function sendToWhatsApp(event) {
    event.preventDefault(); // Empêche le rechargement de la page
    
    // Récupération des valeurs du formulaire
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const city = document.getElementById('city').value;
    const color = document.getElementById('color').value;
    
    // Message textuel propre et structuré pour le e-commerce
    const message = `🔥 *NOUVELLE COMMANDE - VOXX SHOP* 🔥\n\n` +
                    `📝 *Nom :* ${name}\n` +
                    `📞 *Téléphone :* ${phone}\n` +
                    `📍 *Ville :* ${city}\n` +
                    `📦 *Produit :* Durag VOXX "Y2K" Edition\n` +
                    `🎨 *Couleur :* ${color}\n` +
                    `💰 *Prix :* 99 DH\n\n` +
                    `🚚 _Livraison gratuite et paiement à la livraison confirmés._`;
    
    // Encodage des caractères spéciaux pour l'URL
    const encodedMessage = encodeURIComponent(message);
 
    // Détection du support (Mobile ou Ordinateur)
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    
    // Numéro au format international sans le "+" ou "00" (Exemple pour 0656041696 -> 212656041696)
    const phoneNumber = "212614787767";
    let whatsAppUrl = "";

    if (isMobile) {
        // Lien standard wa.me
        whatsAppUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.location.href = whatsAppUrl;
    } else {
        // Lien WhatsApp Web pour ordinateur
        whatsAppUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
        window.open(whatsAppUrl, '_blank');
    }
}
