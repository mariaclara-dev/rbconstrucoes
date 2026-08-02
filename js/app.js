/*==================================================
RB CONSTRUÇÕES
==================================================*/


/*=========================
HEADER
=========================*/

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 60) {

        header.classList.add("ativo");

    } else {

        header.classList.remove("ativo");

    }

});


/*=========================
BARRA DE PROGRESSO
=========================*/

const progresso = document.getElementById("progresso");

window.addEventListener("scroll", () => {

    const altura =
        document.documentElement.scrollHeight - window.innerHeight;

    const porcentagem =
        (window.scrollY / altura) * 100;

    progresso.style.width = porcentagem + "%";

});


/*=========================
BOTÃO TOPO
=========================*/

const topo = document.getElementById("topo");

if (topo) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            topo.classList.add("mostrar");

        } else {

            topo.classList.remove("mostrar");

        }

    });


    topo.addEventListener("click", () => {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

}


/*=========================
MENU MOBILE
=========================*/

const menuBtn = document.getElementById("menu-btn");

const menu = document.getElementById("menu");

if (menuBtn && menu) {

    menuBtn.addEventListener("click", () => {

        menu.classList.toggle("ativo");

    });

}

document.querySelectorAll("#menu a").forEach(link => {

    link.addEventListener("click", () => {

        menu.classList.remove("ativo");

    });

});


/*=========================
CARROSSEL
=========================*/

/*=========================
CARROSSEL
=========================*/

const slides = document.querySelectorAll(".slide");
const indicadores = document.querySelectorAll(".indicador");

let slideAtual = 0;
let timer;

function mostrarSlide(indice) {

    // Remove o slide ativo
    slides.forEach(slide => {
        slide.classList.remove("ativo");
    });

    // Remove o indicador ativo
    indicadores.forEach(indicador => {
        indicador.classList.remove("ativo");
    });

    // Ativa o slide e a bolinha correspondente
    slides[indice].classList.add("ativo");
    indicadores[indice].classList.add("ativo");

}

function proximoSlide() {

    slideAtual++;

    if (slideAtual >= slides.length) {
        slideAtual = 0;
    }

    mostrarSlide(slideAtual);

}

function slideAnterior() {

    slideAtual--;

    if (slideAtual < 0) {
        slideAtual = slides.length - 1;
    }

    mostrarSlide(slideAtual);

}

function iniciarTimer() {

    clearInterval(timer);

    timer = setInterval(proximoSlide, 3500);

}

iniciarTimer();

// Clique nas bolinhas
indicadores.forEach((item, indice) => {

    item.addEventListener("click", () => {

        slideAtual = indice;

        mostrarSlide(slideAtual);

        iniciarTimer();

    });

});

// Seta direita
const direita = document.querySelector(".direita");

if (direita) {

    direita.addEventListener("click", () => {

        proximoSlide();

        iniciarTimer();

    });

}

// Seta esquerda
const esquerda = document.querySelector(".esquerda");

if (esquerda) {

    esquerda.addEventListener("click", () => {

        slideAnterior();

        iniciarTimer();

    });

}

// Pausar ao passar o mouse
const slider = document.querySelector(".slider");

if (slider) {

    slider.addEventListener("mouseenter", () => {

        clearInterval(timer);

    });

    slider.addEventListener("mouseleave", () => {

        iniciarTimer();

    });

}
/*=========================
LIGHTBOX GALERIA
=========================*/

const imagens =
    document.querySelectorAll(".galeria img");

imagens.forEach(imagem => {

    imagem.addEventListener("click", () => {

        const fundo =
            document.createElement("div");

        fundo.className = "lightbox";

        const foto =
            document.createElement("img");

        foto.src = imagem.src;

        fundo.appendChild(foto);

        document.body.appendChild(fundo);
        document.body.style.overflow = "hidden";

        fundo.addEventListener("click", () => {

            fundo.remove();
            document.body.style.overflow = "auto";

        });

        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {

                fundo.remove();
                document.body.style.overflow = "auto";

            }

        });

    });

});


/*=========================
ANIMAÇÃO AO ROLAR
=========================*/

const elementos =
    document.querySelectorAll(".animar");

function revelar() {

    const topoTela =
        window.innerHeight * 0.85;

    elementos.forEach(secao => {

        const distancia =
            secao.getBoundingClientRect().top;

        if (distancia < topoTela) {

            secao.classList.add("mostrar");

        }

    });

}

window.addEventListener("scroll", revelar);

revelar();


/*=========================
MENU ATIVO
=========================*/

const secoes =
    document.querySelectorAll("section");

const links =
    document.querySelectorAll("#menu a");

window.addEventListener("scroll", () => {

    let atual = "";

    secoes.forEach(secao => {

        const topo = secao.offsetTop - 180;

        const altura = secao.offsetHeight;

        if (
            pageYOffset >= topo &&
            pageYOffset < topo + altura
        ) {

            atual = secao.getAttribute("id");

        }

    });

    links.forEach(link => {

        link.classList.remove("selecionado");

        if (link.getAttribute("href") == "#" + atual) {

            link.classList.add("selecionado");

        }

    });

});
/*Portfolio */
const botoes = document.querySelectorAll(".tab-btn");

const conteudos = document.querySelectorAll(".tab-content");

botoes.forEach(botao => {

    botao.addEventListener("click", () => {

        botoes.forEach(btn => btn.classList.remove("active"));

        conteudos.forEach(tab => tab.classList.remove("active"));

        botao.classList.add("active");

        document
            .getElementById(botao.dataset.tab)
            .classList.add("active");

    });

});
//================================
// MODAL COM NAVEGAÇÃO
//================================


const botoesModal = document.querySelectorAll(".abrir-modal");

const modal = document.querySelector(".modal-projeto");

const modalImg = document.querySelector(".modal-img");

const modalTitulo = document.querySelector(".modal-info h2");

const modalTipo = document.querySelector(".modal-tipo");

const modalLocal = document.querySelector(".modal-local");

const modalAno = document.querySelector(".modal-ano");

const modalDescricao = document.querySelector(".modal-descricao");

const fecharModal = document.querySelector(".fechar-modal");

const anterior = document.querySelector(".modal-anterior");

const proximo = document.querySelector(".modal-proximo");


let projetos = [];

let indiceAtual = 0;



function carregarProjeto(indice) {

    let projeto = projetos[indice];


    modalImg.src = projeto.img;

    modalTitulo.textContent = projeto.titulo;

    modalTipo.innerHTML =
        `<i class="fa-solid fa-building"></i> ${projeto.tipo}`;


    modalLocal.innerHTML =
        `<i class="fa-solid fa-location-dot"></i> ${projeto.local}`;


    modalAno.innerHTML =
        `<i class="fa-solid fa-calendar"></i> ${projeto.ano}`;


    modalDescricao.textContent =
        projeto.descricao;

}



botoesModal.forEach((botao) => {


    botao.addEventListener("click", () => {


        projetos = [...document.querySelectorAll(
            `.abrir-modal[data-galeria="${botao.dataset.galeria}"]`
        )]

            .map(item => ({


                img: item.dataset.img,

                titulo: item.dataset.titulo,

                tipo: item.dataset.tipo,

                local: item.dataset.local,

                ano: item.dataset.ano,

                descricao: item.dataset.descricao


            }));



        indiceAtual = projetos.indexOf(

            projetos.find(p => p.img === botao.dataset.img)

        );

        modal.classList.add("ativo");


        carregarProjeto(indiceAtual);


    });


});



//================================
// NAVEGAÇÃO DO MODAL
//================================

if (proximo) {

    proximo.addEventListener("click", () => {

        indiceAtual++;

        if (indiceAtual >= projetos.length) {

            indiceAtual = 0;

        }

        carregarProjeto(indiceAtual);

    });

}

if (anterior) {

    anterior.addEventListener("click", () => {

        indiceAtual--;

        if (indiceAtual < 0) {

            indiceAtual = projetos.length - 1;

        }

        carregarProjeto(indiceAtual);

    });

}

if (fecharModal && modal) {

    fecharModal.addEventListener("click", () => {

        modal.classList.remove("ativo");

    });

}

if (modal) {

    modal.addEventListener("click", (e) => {

        if (e.target === modal) {

            modal.classList.remove("ativo");

        }

    });

}
/*=====================================================
SLIDER DO EMPREENDIMENTO
=====================================================*/

const imagemPrincipal = document.getElementById("imagemPrincipal");

if (imagemPrincipal) {

    const imagens = [
        "../assets/empreendimento/fachada.jpeg",

        "../assets/empreendimento/sala.jpeg",

        "../assets/empreendimento/sala2.jpeg",

        "../assets/empreendimento/quarto.jpeg",

        "../assets/empreendimento/quarto2.jpeg",

        "../assets/empreendimento/quarto3.jpeg",

        "../assets/empreendimento/banheiro.jpeg",

        "../assets/empreendimento/espacogourmet.jpeg",

        "../assets/empreendimento/lazer.jpeg"
    ];

    const btnPrev = document.querySelector(".slider-btn.prev");
    const btnNext = document.querySelector(".slider-btn.next");

    const miniaturas = document.querySelectorAll(".miniatura");

    const indicadores = document.querySelectorAll(".slider-indicadores span");

    let indice = 0;

    function atualizarSlider() {

        imagemPrincipal.style.opacity = 0;

        setTimeout(() => {

            imagemPrincipal.src = imagens[indice];

            imagemPrincipal.style.opacity = 1;

        }, 180);

        miniaturas.forEach((img, i) => {

            img.classList.toggle("ativa", i === indice);

        });

        indicadores.forEach((item, i) => {

            item.classList.toggle("ativo", i === indice);

        });

    }

    btnNext.addEventListener("click", () => {

        indice++;

        if (indice >= imagens.length) {

            indice = 0;

        }

        atualizarSlider();

    });

    btnPrev.addEventListener("click", () => {

        indice--;

        if (indice < 0) {

            indice = imagens.length - 1;

        }

        atualizarSlider();

    });

    miniaturas.forEach((miniatura, i) => {

        miniatura.addEventListener("click", () => {

            indice = i;

            atualizarSlider();

        });

    });
    setInterval(() => {

        indice++;

        if (indice >= imagens.length) {

            indice = 0;

        }

        atualizarSlider();

    }, 5000);

}
document.addEventListener("keydown", (event) => {

    if (!imagemPrincipal) return;

    if (event.key === "ArrowRight") {

        btnNext.click();

    }

    if (event.key === "ArrowLeft") {

        btnPrev.click();

    }

});
/*==================================
    AJUSTE AUTOMÁTICO DOS VÍDEOS
==================================*/

document.addEventListener("DOMContentLoaded", () => {

    const videos = document.querySelectorAll(".video-box video");

    videos.forEach(video => {

        function definirOrientacao() {

            if (video.videoWidth > video.videoHeight) {

                video.classList.remove("video-vertical");
                video.classList.add("video-horizontal");

            } else {

                video.classList.remove("video-horizontal");
                video.classList.add("video-vertical");

            }

        }

        if (video.readyState >= 1) {

            definirOrientacao();

        } else {

            video.addEventListener("loadedmetadata", definirOrientacao);

        }

    });

});
const track = document.querySelector(".slider-track");

document.querySelector(".next").addEventListener("click", () => {

    const card = document.querySelector(".video-depoimento");

    track.scrollBy({
        left: card.offsetWidth + 25,
        behavior: "smooth"
    });

});

document.querySelector(".prev").addEventListener("click", () => {

    const card = document.querySelector(".video-depoimento");

    track.scrollBy({
        left: -(card.offsetWidth + 25),
        behavior: "smooth"
    });

});