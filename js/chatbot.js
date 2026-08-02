// ELEMENTOS DA PÁGINA

const chatBody = document.getElementById("chatBody");
const options = document.getElementById("options");
// DADOS DO ATENDIMENTO

const atendimento = {
    tipoCliente: "",
    setor: "",
    nome: "",
    etapa: "inicio",
    processando: false
};
// FUNÇÕES UTILITÁRIAS

function resetarAtendimento() {

    atendimento.tipoCliente = "";
    atendimento.setor = "";
    atendimento.nome = "";
    atendimento.etapa = "inicio";
    atendimento.processando = false;

}

function obterHorario() {

    const agora = new Date();

    return agora.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

}

function rolarChatAutomaticamente() {

    setTimeout(() => {

        chatBody.scrollTo({
            top: chatBody.scrollHeight,
            behavior: "smooth"
        });

    }, 300);

}
// ===============================
// MENSAGENS
// ===============================

// Mensagem do robô
function mensagemBot(texto) {

    chatBody.innerHTML += `

        <div class="message bot">

            <div class="avatar">
                🤖
            </div>

            <div class="message-content">

                <div class="bubble">

                    <p>${texto}</p>

                    <span class="time">
                        ${obterHorario()}
                    </span>

                </div>

            </div>

        </div>

    `;

    rolarChatAutomaticamente();

}

// Mensagem do cliente
function mensagemCliente(texto) {

    chatBody.innerHTML += `

        <div class="message user">

            <div class="message-content">

                <div class="bubble userBubble">

                    <p>${texto}</p>

                    <span class="time">
                        ${obterHorario()}
                    </span>

                </div>

            </div>

        </div>

    `;

    rolarChatAutomaticamente();

}

// Mensagem de resumo
function mensagemResumo(texto) {

    chatBody.innerHTML += `

        <div class="message bot">

            <div class="avatar">
                🤖
            </div>

            <div class="bubble summary">

                <p>${texto}</p>

            </div>

        </div>

    `;

    rolarChatAutomaticamente();

}

// Mostra animação de digitação
function mostrarDigitando() {

    const digitando = document.createElement("div");

    digitando.id = "digitando";
    digitando.className = "message bot typing-animation";

    digitando.innerHTML = `

        <div class="avatar">
            🤖
        </div>

        <div class="bubble typing">

            <span></span>
            <span></span>
            <span></span>

        </div>

    `;

    chatBody.appendChild(digitando);

    rolarChatAutomaticamente();

}

// Remove animação de digitação
function esconderDigitando() {

    const digitando = document.getElementById("digitando");

    if (digitando) {

        digitando.remove();

    }

}
// ===============================
// INTERFACE
// ===============================

// Bloqueia os botões enquanto o chatbot responde
function bloquearOpcoes() {

    atendimento.processando = true;

    options.style.pointerEvents = "none";
    options.style.opacity = "0.6";

}

// Libera novamente os botões
function liberarOpcoes() {

    atendimento.processando = false;

    options.style.pointerEvents = "auto";
    options.style.opacity = "1";

}

// Limpa a área das opções
function limparOpcoes() {

    options.innerHTML = "";
    options.style.opacity = "1";

}

// Mostra os setores
function mostrarSetores() {

    options.innerHTML = `

        <button id="btnAtendimento">
            🏗 Atendimento ao Cliente
        </button>

        <button id="btnEngenharia">
            👷 Engenharia
        </button>

        <button id="btnFinanceiro">
            💰 Financeiro
        </button>

        <button id="btnRH">
            👥 Recursos Humanos
        </button>

    `;

    document
        .getElementById("btnAtendimento")
        .addEventListener("click", () => selecionarSetor("Atendimento ao Cliente"));

    document
        .getElementById("btnEngenharia")
        .addEventListener("click", () => selecionarSetor("Engenharia"));

    document
        .getElementById("btnFinanceiro")
        .addEventListener("click", () => selecionarSetor("Financeiro"));

    document
        .getElementById("btnRH")
        .addEventListener("click", () => selecionarSetor("RH"));

}

// Solicita o nome do cliente
function solicitarNome() {

    liberarOpcoes();

    options.innerHTML = `

        <div class="input-area">

            <input
                type="text"
                id="nomeCliente"
                placeholder="Digite seu nome">

            <button id="btnEnviarNome">
                Enviar
            </button>

        </div>

    `;

    document
        .getElementById("btnEnviarNome")
        .addEventListener("click", enviarNome);

    document.getElementById("nomeCliente").focus();

}

// Mostra o botão do WhatsApp
function mostrarBotaoWhatsApp() {

    options.innerHTML = `

        <button id="btnWhatsapp">
            💬 Falar no WhatsApp
        </button>

    `;

    document
        .getElementById("btnWhatsapp")
        .addEventListener("click", abrirWhatsApp);

}
// ===============================
// FLUXO DO ATENDIMENTO
// ===============================

// Inicia o atendimento
function iniciarAtendimento(tipo, textoMensagem) {

    if (atendimento.processando) return;

    bloquearOpcoes();

    limparOpcoes();

    atendimento.tipoCliente = tipo;
    atendimento.etapa = "setor";

    mensagemCliente(textoMensagem);

    mostrarDigitando();

    setTimeout(() => {

        esconderDigitando();

        mensagemResumo("Como podemos ajudar você hoje?");

        mostrarSetores();

        liberarOpcoes();

    }, 700);

}

// Seleciona o setor
function selecionarSetor(setor) {

    if (atendimento.processando) return;

    bloquearOpcoes();

    atendimento.setor = setor;
    atendimento.etapa = "nome";

    limparOpcoes();

    mensagemCliente(setor);

    mostrarDigitando();

    setTimeout(() => {

        esconderDigitando();

        mensagemResumo(`

            Perfeito!<br><br>

            Vou encaminhar você para o setor de
            <strong>${setor}</strong>.

            <br><br>

            Antes disso, preciso do seu nome.

        `);

        solicitarNome();

    }, 800);

}

// Recebe o nome
function enviarNome() {

    if (atendimento.processando) return;

    bloquearOpcoes();

    const input = document.getElementById("nomeCliente");
    const nome = input.value.trim();

    if (nome.length < 3) {

        mensagemResumo("Por favor, informe um nome válido.");

        liberarOpcoes();

        input.focus();

        return;

    }

    atendimento.nome = nome;
    atendimento.etapa = "final";

    mensagemCliente(nome);

    limparOpcoes();

    mostrarDigitando();

    setTimeout(() => {

        esconderDigitando();

        mostrarResumo();

    }, 700);

}

// Mostra o resumo final
function mostrarResumo() {

    limparOpcoes();

    mensagemResumo(`

        <strong>Atendimento registrado ✅</strong>

        <br><br>

        👤 Cliente:
        ${atendimento.nome}

        <br><br>

        📌 Tipo:
        ${atendimento.tipoCliente}

        <br><br>

        🏢 Setor:
        ${atendimento.setor}

        <br><br>

        Clique abaixo para continuar pelo WhatsApp.

    `);

    mostrarBotaoWhatsApp();

    liberarOpcoes();

}
// ===============================
// WHATSAPP
// ===============================

function abrirWhatsApp() {

    if (atendimento.processando) return;

    atendimento.processando = true;

    mensagemResumo(`
        <strong>Atendimento encaminhado ✅</strong>

        <br><br>

        Obrigado pelo contato, ${atendimento.nome}!

        <br><br>

        Nossa equipe da RB Construções continuará o atendimento pelo WhatsApp.

        <br><br>

        Você será direcionado agora.
    `);

    let numero = "";

    switch (atendimento.setor) {

        case "Atendimento ao Cliente":
        case "Engenharia":
            numero = "5584998921023";
            break;

        case "Financeiro":
        case "RH":
            numero = "558487193085";
            break;

    }

    let mensagem = "";

    if (atendimento.tipoCliente === "novo cliente") {

        mensagem = `Olá!

Sou NOVO CLIENTE da RB Construções.

Nome: ${atendimento.nome}

Gostaria de falar com o setor de ${atendimento.setor}.`;

    } else {

        mensagem = `Olá!

Já sou CLIENTE da RB Construções.

Nome: ${atendimento.nome}

Gostaria de falar com o setor de ${atendimento.setor}.`;

    }

    const link =
        `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

    setTimeout(() => {

        window.open(link, "_blank");

        atendimento.processando = false;

    }, 1800);

}

// ===============================
// EVENTOS DOS BOTÕES INICIAIS
// ===============================

function registrarEventosIniciais() {

    const btnNovo = document.getElementById("novoCliente");
    const btnCliente = document.getElementById("cliente");

    if (btnNovo) {

        btnNovo.addEventListener("click", () => {

            iniciarAtendimento(
                "novo cliente",
                "🆕 Sou novo cliente"
            );

        });

    }

    if (btnCliente) {

        btnCliente.addEventListener("click", () => {

            iniciarAtendimento(
                "cliente",
                "✅ Já sou cliente"
            );

        });

    }

}

// ===============================
// REINICIAR CHAT
// ===============================

const botaoReiniciar =
    document.getElementById("reiniciarChat");

botaoReiniciar.addEventListener("click", () => {

    chatBody.innerHTML = "";

    resetarAtendimento();

    mensagemBot(`

        Olá! 👋<br><br>

        Seja bem-vindo(a) à <strong>RB Construções</strong>.<br><br>

        Sou o assistente virtual de atendimento.<br><br>

        Vou encaminhar você ao setor correto.<br><br>

        <strong>Você já é nosso cliente?</strong>

    `);

    options.innerHTML = `

        <button id="novoCliente">

            🆕 Sou novo cliente

        </button>

        <button id="cliente">

            ✅ Já sou cliente

        </button>

    `;

    registrarEventosIniciais();

});

// ===============================
// TELA DE ABERTURA
// ===============================

window.addEventListener("load", () => {

    registrarEventosIniciais();

    const splash = document.getElementById("splash");

    setTimeout(() => {

        splash.style.opacity = "0";

        setTimeout(() => {

            splash.style.display = "none";

        }, 800);

    }, 1200);

});