const numero = document.querySelector(".numero-pokemon");
const nomePokemon = document.querySelector(".nomee-pokemon");
const imagem = document.querySelector(".pokemon");
const input = document.querySelector("form .inputt");
const form = document.querySelector("form");
const btnBack = document.querySelector(".btn-back");
const btnNext = document.querySelector(".btn-next");

let i = 1;

async function escolherPokemon(nome) {
  const link = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`);
  if (link.status === 200) {
    const linkJson = await link.json();
    return linkJson;
  }
}

async function mudarImagem(item) {
  const data = await escolherPokemon(item);
  numero.innerHTML = "";
  i = data.id;
  nomePokemon.innerHTML = "Loading...";
  if (data) {
    imagem.style.display = "block";
    numero.innerHTML = data.id + " -";
    nomePokemon.innerHTML = data.name;
    imagem.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
  } else {
    imagem.style.display = "none";
    numero.innerHTML = "";
    nomePokemon.innerHTML = "Not Found :(";
  }
}

function valorInput(event) {
  event.preventDefault();
  mudarImagem(input.value.toLowerCase());
}

function clickBack() {
  if (i > 1) {
    i = i - 1;
    mudarImagem(i);
  }
}

function clickNext() {
  i = i + 1;
  mudarImagem(i);
}

btnBack.addEventListener("click", clickBack);
btnNext.addEventListener("click", clickNext);
form.addEventListener("submit", valorInput);

mudarImagem(i);
