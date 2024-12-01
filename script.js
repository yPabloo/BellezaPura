const hamburger = document.querySelector(".hamburger")
const nav = document.querySelector(".nav")
const carrossel = document.querySelector('.carrossel');
const items = document.querySelectorAll('.carrossel-item');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const modal = document.getElementById('produtoModal');
const modalImg = document.getElementById('modalImg');
const modalNome = document.getElementById('modalNome');
const modalDesc = document.getElementById('modalDesc');
const modalPreco = document.getElementById('modalPreco');
const whatsappLink = document.getElementById('whatsappLink');
const closeModal = document.querySelector('.close');

let currentIndex = 0;

hamburger.addEventListener("click", () => nav.classList.toggle("active"));

// Validação do formulário
document.getElementById('leadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = e.target.nome.value;
    const email = e.target.email.value;
    if (!nome || !email) {
        alert('Por favor, preencha todos os campos.');
    } else {
        alert('Obrigado por se cadastrar!');
        e.target.reset();
    }
});

// Scroll suave
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.getElementById('scrollButton').addEventListener('click', function (e) {
    e.preventDefault(); 
    const targetSection = document.querySelector('#contato');
    targetSection.scrollIntoView({ behavior: 'smooth' });
});

//Carrossel
function updateCarrossel() {
    const offset = currentIndex * -100; // Calcula o deslocamento com base no índice atual
    carrossel.style.transform = `translateX(${offset}%)`; // Move os itens
}

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length; // Navegação circular para trás
    updateCarrossel();
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % items.length; // Navegação circular para frente
    updateCarrossel();
});

// Configuração inicial
updateCarrossel();

// Evento no botão "Ver Mais"
document.querySelectorAll('.verMais').forEach(button => {
    button.addEventListener('click', () => {
        // Configurar modal com informações do produto
        const nome = button.getAttribute('data-nome');
        const desc = button.getAttribute('data-desc');
        const preco = button.getAttribute('data-preco');
        const imgSrc = button.getAttribute('data-img');
        
        modalNome.textContent = nome;
        modalDesc.innerHTML = desc;
        modalPreco.textContent = preco;
        modalImg.src = imgSrc;

        // Configurar link do WhatsApp
        const whatsappMessage = `Olá, gostaria de saber mais sobre o produto: ${nome}`;
        whatsappLink.href = `https://wa.me/5579988733725?text=${encodeURIComponent(whatsappMessage)}`;

        // Exibir modal
        modal.style.display = 'block';
    });
});

// Fechar modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', e => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});
