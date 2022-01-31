var pokeApi = "https://pokeapi.co/api/v2/pokemon"
var arrayDePokemones = []
var pokes = []
var data =[] 
var footer = new Vue({
  el: '#footer',
  data: {
    message: 'Pokédex 2022 | Lucas Jara ©'
  }
})

let links = document.getElementById("links");

async function traerDatosDePokemon(url) {
  let response = await fetch(url, {
    method: "GET",
  })

  let data = await response.json();

  return data;
}

async function funcionNueva(url) {
  pokemonsList.innerHTML = "";
  
  arrayDePokemones = await traerDatosDePokemon(url);
  console.log(arrayDePokemones)
  for(let i = 0; i < arrayDePokemones.results.length; i++){
    let aux = await traerDatosDePokemon(arrayDePokemones.results[i].url);
    mostrarPokemones(aux)
  }
  console.log(arrayDePokemones)
  links.innerHTML = (arrayDePokemones.previous) ? `<button onclick="funcionNueva('`+ arrayDePokemones.previous +`')">Atrás</button>` : "";
  //Botón hacia adelante
  links.innerHTML += (arrayDePokemones.next) ? `<button onclick="funcionNueva('`+ arrayDePokemones.next +`')">Siguiente</button>` : "";  

}

funcionNueva(pokeApi)

function mostrarPokemones (pokemon) {
      pokemonsList.innerHTML += `<div class="card">
                    <div class="cardp"> 
                    <img class="ima" src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                    <p><h3>${pokemon.name}</h3></p>
                    <P>ID: ${pokemon.id}</p>
                    <p>Tipo: ${pokemon.types[0].type.name}</p>

                    </div>
                </div>`;
}

async function filtrarPorPokemones() {
  var pokemonGuardado = (document.getElementById("BusquedaPokemon").value)
  var pokesNuevos = await traerDatosDePokemon('https://pokeapi.co/api/v2/pokemon?limit=1118') 
  
  for (var i = 0; i < pokesNuevos.results.length; i++) {
      if (pokemonGuardado == pokesNuevos.results[i].name) { 
      var pokemonEncontrado = await traerDatosDePokemon(pokesNuevos.results[i].url)
      pokemonsList.innerHTML = ""; 
      mostrarPokemones(pokemonEncontrado) 
      return 
    }
  }

  alert("No se encontró el pokemon ingresado") 
  funcionNueva(pokeApi) 
  
}

