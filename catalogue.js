// IMAGES AVEC CATÉGORIES DYNAMIQUES
const images = [
    { title: "Chien Royale", url: "images/img1.jpg", category: "mode" },
    { title: "Chien Naturel", url: "images/img2.jpg", category: "nature" },
    { title: "Desir Africain", url: "images/img3.jpg", category: "art" },
    { title: "Chien determiné", url: "images/img4.jpg", category: "art" },
    { title: "Chien gardien Urbain", url: "images/img5.jpg", category: "mode" }
];

// Génération CATÉGORIES DYNAMIQUES
const filtersDiv = document.getElementById("filters");
const uniqueCats = ["all", ...new Set(images.map(img => img.category))];

uniqueCats.forEach(cat => {
    const btn = document.createElement("button");
    btn.classList.add("filter-btn");
    if (cat === "all") btn.classList.add("active");
    btn.dataset.category = cat;
    btn.textContent = cat.toUpperCase();
    filtersDiv.appendChild(btn);
});

// Affichage catalogue
const catalogue = document.getElementById("catalogue");
function displayImages(filter = "all") {
    catalogue.innerHTML = "";

    images
        .filter(img => filter === "all" || img.category === filter)
        .forEach((img, index) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.style.animationDelay = (index * 0.1) + "s";

            card.innerHTML = `
                <img src="${img.url}" alt="${img.title}">
                <div class="card-title">${img.title}</div>
            `;

            card.addEventListener("click", () => openLightbox(index, filter));
            catalogue.appendChild(card);
        });
}

displayImages();

// FILTRES
filtersDiv.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        filtersDiv.querySelector(".active").classList.remove("active");
        btn.classList.add("active");
        displayImages(btn.dataset.category);
    });
});

// LIGHTBOX
let currentIndex = 0;
let currentFilter = "all";
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const downloadBtn = document.getElementById("downloadBtn");

function openLightbox(index, filter) {
    currentIndex = index;
    currentFilter = filter;
    const filtered = images.filter(img => filter === "all" || img.category === filter);

    lightbox.style.display = "flex";
    lightboxImage.src = filtered[index].url;
    downloadBtn.href = filtered[index].url;
    downloadBtn.download = filtered[index].title;
}

// Fermer
document.getElementById("closeLB").addEventListener("click", () => {
    lightbox.style.display = "none";
});

// Navigation Lightbox
function navigate(step) {
    const filtered = images.filter(img => currentFilter === "all" || img.category === currentFilter);
    currentIndex = (currentIndex + step + filtered.length) % filtered.length;
    lightboxImage.src = filtered[currentIndex].url;
    downloadBtn.href = filtered[currentIndex].url;
}

document.getElementById("lbPrev").onclick = () => navigate(-1);
document.getElementById("lbNext").onclick = () => navigate(1);