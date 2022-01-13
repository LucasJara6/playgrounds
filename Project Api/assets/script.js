const url = `https://pokeapi.co/api/v2/pokemon/` 

let pokemonsList = document.getElementById("pokemons-list");
let links = document.getElementById("links");



function updatePokemons(url) {
  if (url) {
    pokemonsList.innerHTML = "";
    fetch(url)
      .then(res => res.json())
      .then(res => {
        for (let i of res.results) {
          fetch(i.url)
            .then(x => x.json())
            .then(x => {
               pokemonsList.innerHTML += `<div class="card">
                  <img src="${x.sprites.front_default}" alt="">
                    <p><h3>${x.name}</h3></p>
                    <P>ID: ${x.id}</p>
                    <p>Tipo: ${x.types[0].type.name}</p>
                 </div>`;
            });
        };
         links.innerHTML = (res.previous) ? `<button onclick="updatePokemons('${res.previous}')">Atrás</button>` : "";
         links.innerHTML += (res.next) ? `<button onclick="updatePokemons('${res.next}')">Siguiente</button>` : "";

      });
  }

}

updatePokemons("https://pokeapi.co/api/v2/pokemon");