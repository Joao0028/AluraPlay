import { conectaAPI } from "./conectaAPI.js";
import constroiCard from "./mostrarVideos.js";

async function buscaVideo(evento){
    evento.preventDefault();
    const dadosDePesquisa = document.querySelector("[data-pesquisa]").value;
    const busca = await conectaAPI.buscaVideo(dadosDePesquisa);

    const lista = document.querySelector("[data-lista]")

    while(lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }

    busca.forEach(elemento => lista.appendChild(constroiCard(
        elemento.titulo, elemento.descricao, elemento.url, elemento.imagem)))

    if(busca.length == 0){
        lista.innerHTML = `<h2 class="mensagem__titulo"> Não existem vídeos com o termo "${dadosDePesquisa}", verifique e tente novamente!</h2>`
    }
}

const botao = document.querySelector("[data-botao-pesquisa]"); 
const input = document.querySelector("[data-pesquisa]");
botao.addEventListener("click", evento => buscaVideo(evento))
input.addEventListener("mouseout", evento => buscaVideo(evento))