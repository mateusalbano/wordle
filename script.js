let inputText = document.getElementById("inputText");
let tbody = document.getElementById("table").children[0];
let tentativa = 0;
let vitoria = false;
let palavras = [
      "amigo",
      "banco",
      "canto",
      "dardo",
      "estar",
      "falar",
      "gosto",
      "haste",
      "ideia",
      "jogar",
      "lugar",
      "mundo",
      "nuvem",
      "olhar",
      "pular",
      "quase",
      "risco",
      "saber",
      "tocar",
      "ultra",
      "vazio",
      "zumbi",
      "abrir",
      "bater",
      "casar",
      "dizer",
      "etapa",
      "festa",
      "girar",
      "hotel",
      "igual",
      "jovem",
      "lento",
      "mover",
      "nobre",
      "ousar",
      "ponto",
      "queda",
      "rival",
      "sinal",
      "tigre",
      "unido",
      "viver",
      "zebra",
      "achar",
      "bicho",
      "corte",
      "doido",
      "ecoar",
      "fugir",
      "golpe",
      "humor",
      "ideal",
      "junto",
      "lutar",
      "macho",
      "ninho",
      "obter",
      "pista",
      "quilo",
      "rosto",
      "sabor",
      "tenso",
      "urgir",
      "vasto",
      "zanga",
      "acaso",
      "bater",
      "cesto",
      "dorso",
      "exato",
      "fosso",
      "grito",
      "harpa",
      "imune",
      "jirau",
      "lousa",
      "manga",
      "nuvem",
      "opaco",
      "pomar",
      "quota",
      "redor",
      "sutil",
      "trufa",
      "usura",
      "vulgo",
      "xerox",
      "zunir",
      "agudo",
      "besta",
      "cacto",
      "dengo",
      "ebrio",
      "fenda",
      "giria",
      "hífen",
      "ícone",
      "júlia",
      "lápis",
      "mútuo"
    ];
let palavra = "";
let verde = 2;
let amarelo = 1;
let vermelho = 0;
let ajuda = `
<p>
    Wordle é um jogo em que se deve adivinhar uma palavra de cinco letras em 7 tentativas
</p>
<p>
    O que as cores representam?
</p>
<ul>
    <li><Strong>Verde:</Strong> Letra na posição correta</li>
    <li><Strong>Amarelo:</Strong> Letra presente na palavra porém na posição errada</li>
    <li><Strong>Vermelho:</Strong> Letra não presente na palavra</li>
</ul>`

function reiniciar() {
    tentativa = 0;
    vitoria = false;
    palavra = palavras[random(0, palavras.length)].toUpperCase();
    clear();
}

function clear() {
    trs = tbody.children;
    for (let i = 0; i < trs.length; i++) {
        tds = trs[i].children;
        for (let j = 0; j < tds.length; j++) {
            tds[j].style = "background-color: transparent;";
            tds[j].innerHTML = "";
        }
        
    }
}

function random(min, max) {
    return min + Math.floor((Math.random() * (max - min + 1)));
}

function removerAcentos(palavra) {
    return palavra.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function temLetra(letra, palavra) {
    for (let i = 0; i < palavra.length; i++) {
        if (letra == palavra.charAt(i)) {
            return true;
        }
    }
    return false;
}

function mostrarPopup(texto) {
    popup = document.getElementById("popup");
    div = document.getElementById("popup_text");
    div.innerHTML = texto;
    popup.style = "visibility: visible;";
}

function fecharPopup(element) {
    element.style = "visibility: hidden;";
}

function numeroParaString(numero) {
    switch (numero) {
        case verde:
            return "rgb(110, 235, 110)";
        case amarelo:
            return "rgb(235, 235, 110)";
        case vermelho:
            return "rgb(235, 110, 110)";
        default:
            break;
    }
}

function input(palavraIn) {
    
    if (vitoria || tentativa == 7) {
        return;
    }
    palavraIn = palavraIn.replaceAll(" ", "");
    if (palavraIn.length != 5) {
        return;
    }

    palavraIn = palavraIn.toUpperCase();
    output = [vermelho, vermelho, vermelho, vermelho, vermelho];
    vitoria = true;
    for (let i = 0; i < 5; i++) {
        letraIn = palavraIn.charAt(i);
        letra = palavra.charAt(i);
        if (letraIn == removerAcentos(letra)) {
            output[i] = verde;
        } else if (temLetra(letraIn, palavra)) {
            output[i] = amarelo;
            vitoria = false;
        } else {
            vitoria = false;
        }
        celula = tbody.children[tentativa].children[i];
        celula.innerHTML = letraIn;
        celula.style = "background-color: " + numeroParaString(output[i]);
    }
    tentativa++;
    if (!vitoria && tentativa == 7) {
        //Mostrar palavra.
        mostrarPopup("A palavra era " + palavra + ".");
    }
}

palavra = palavras[random(0, palavras.length)].toUpperCase();