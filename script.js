let inputText = document.getElementById("inputText");
let tbody = document.getElementById("table").children[0];
let tentativa = 0;
let vitoria = false;
let palavras = [];
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

document.addEventListener('keydown', function(e) {
    if(e.key == "Enter"){
      document.getElementById("inputButton").click();
    }
});

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


async function carregarJSON() {
    try {
      // Faz a requisição para o arquivo JSON
      const response = await fetch('palavras.json');
      
      // Verifica se a requisição foi bem-sucedida
      if (!response.ok) {
          throw new Error('Erro ao carregar o arquivo JSON');
        }
        
        // Converte a resposta para JSON
        const data = await response.json();
        palavras = data.palavras;
        palavra = palavras[random(0, palavras.length)].toUpperCase();
        console.log(palavra)
    } catch (error) {
        console.error('Erro:', error);
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
    palavraIn = palavraIn.toUpperCase();

    if (vitoria || tentativa == 7) {
        return;
    }
    palavraIn = palavraIn.replaceAll(" ", "");
    if (palavraIn.length != 5) {
        return;
    }
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

// Chama a função para carregar o JSON
carregarJSON();