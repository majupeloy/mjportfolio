const portfolioMedia = [
    { type: 'image', src: 'img-carrosel/CAT.png', title: 'CAT' },
    { type: 'image', src: 'img-carrosel/COMO.gif', title: 'COMO' },
    { type: 'image', src: 'img-carrosel/DURABILIDADE.gif', title: 'DURABILIDADE' },
    { type: 'image', src: 'img-carrosel/ECONOMIA.gif', title: 'ECONOMIA' },
    { type: 'image', src: 'img-carrosel/PELE.png', title: 'PELE' },
    { type: 'image', src: 'img-carrosel/PHOTOS.png', title: 'PHOTOS' },
    { type: 'image', src: 'img-carrosel/PROGRAMADOR.png', title: 'PROGRAMADOR' },
    { type: 'image', src: 'img-carrosel/SENHORA.gif', title: 'SENHORA' },
    { type: 'image', src: 'img-carrosel/SOBRANCELHA.gif', title: 'SOBRANCELHA' },
    { type: 'video', src: 'videos-carrosel/WhatsApp Video 2026-08-15 at 12.44.17.mp4', title: 'Vídeo 01' },
    { type: 'video', src: 'videos-carrosel/WhatsApp Video 2026-08-15 at 12.44.18.mp4', title: 'Vídeo 02' },
    { type: 'video', src: 'videos-carrosel/WhatsApp Video 2026-08-15 at 12.45.23.mp4', title: 'Vídeo 03' },
    { type: 'video', src: 'videos-carrosel/WhatsApp Video 2026-08-15 at 12.45.24 (1).mp4', title: 'Vídeo 04' },
    { type: 'video', src: 'videos-carrosel/WhatsApp Video 2026-08-15 at 12.45.24.mp4', title: 'Vídeo 05' },
    { type: 'video', src: 'videos-carrosel/WhatsApp Video 2026-08-15 at 12.45.25 (1).mp4', title: 'Vídeo 06' },
    { type: 'video', src: 'videos-carrosel/WhatsApp Video 2026-08-15 at 12.45.25 (2).mp4', title: 'Vídeo 07' },
    { type: 'video', src: 'videos-carrosel/WhatsApp Video 2026-08-15 at 12.45.25.mp4', title: 'Vídeo 08' }
];

const gallery = document.querySelector('#gallery');
const lightbox = document.querySelector('#lightbox');
const mediaContainer = document.querySelector('#lightbox-media');
const lightboxTitle = document.querySelector('#lightbox-title');
let currentIndex = 0;

portfolioMedia.forEach((item, index) => {
    const button = document.createElement('button');
    button.className = 'gallery-card';
    button.type = 'button';
    button.setAttribute('aria-label', `Abrir ${item.title}`);
    const preview = document.createElement(item.type === 'video' ? 'video' : 'img');
    preview.src = item.src;
    preview.alt = item.title;
    if (item.type === 'video') { preview.muted = true; preview.preload = 'metadata'; }
    button.append(preview);
    if (item.type === 'video') button.insertAdjacentHTML('beforeend', '<span class="play-icon">▶</span>');
    button.insertAdjacentHTML('beforeend', `<span>${item.title}</span>`);
    button.addEventListener('click', () => { showMedia(index); lightbox.showModal(); });
    gallery.append(button);
});

function showMedia(index) {
    currentIndex = (index + portfolioMedia.length) % portfolioMedia.length;
    const item = portfolioMedia[currentIndex];
    lightboxTitle.textContent = item.title;
    mediaContainer.replaceChildren();
    const element = document.createElement(item.type === 'video' ? 'video' : 'img');
    element.src = item.src;
    element.alt = item.title;
    if (item.type === 'video') { element.controls = true; element.autoplay = true; }
    mediaContainer.append(element);
}

const scrollPrevious = document.querySelector('.scroll-prev');
const scrollNext = document.querySelector('.scroll-next');

function updateCarouselControls() {
    scrollPrevious.hidden = gallery.scrollLeft <= 1;
}

scrollNext.addEventListener('click', () => gallery.scrollBy({ left: gallery.clientWidth * .8, behavior: 'smooth' }));
scrollPrevious.addEventListener('click', () => gallery.scrollBy({ left: -gallery.clientWidth * .8, behavior: 'smooth' }));
gallery.addEventListener('scroll', updateCarouselControls);
updateCarouselControls();
document.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
document.querySelector('.previous').addEventListener('click', () => showMedia(currentIndex - 1));
document.querySelector('.next').addEventListener('click', () => showMedia(currentIndex + 1));
document.addEventListener('keydown', (event) => {
    if (!lightbox.open) return;
    if (event.key === 'ArrowLeft') showMedia(currentIndex - 1);
    if (event.key === 'ArrowRight') showMedia(currentIndex + 1);
});
