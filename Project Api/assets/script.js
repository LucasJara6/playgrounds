const url = `https://pokeapi.co/api/v2/pokemon/` 

var footer = new Vue({
  el: '#footer',
  data: {
    message: 'Pokédex 2022 | Lucas Jara ©'
  }
})

var pokes = []
var data =[] 
let pokemonsList = document.getElementById("pokemons-list");
let links = document.getElementById("links");

function traerPokemones(url) {
  if (url) {

    //Reiniciamos pokemones actuales
    pokemonsList.innerHTML = "";
    // Llamamos a la API de pokemon con Fetch
    fetch(url)
      .then(res => res.json())
      .then(res => {
        // Obtenemos y recorremos a los primeros 20 pokemones obtenidos
        pokes=res.results
        console.log(pokes)
        for (let i of res.results) {
          // Realizamos otra solicitud Fetch con la URL especifica del pokemon actual recorrido, para obtener datos mas especficos como la imagen
          fetch(i.url)
          
            .then(x => x.json())
            .then(x => {
              // Vamos pintando o ingresando la imagen y nombre del pokemon actual que se esta evaluando 
              pokemonsList.innerHTML += `<div class="card">
                   <div class="cardp"> 
                                 <img class="ima" src="${x.sprites.front_default}" alt="">
                                 <p><h3>${x.name}</h3></p>
                                 <P>ID: ${x.id}</p>
                                 <p>Tipo: ${x.types[0].type.name}</p>
                                 <p>Tipo: ${x.types[1].type.name}</p>
                                 </div>
                             </div>`;
                            
            });
        };
       
        // Pintamos los enlaces de siguiente o anterior de la paginacion de los pokemones 
        //Boton hacia atrás
        links.innerHTML = (res.previous) ? `<button onclick="traerPokemones('${res.previous}')">Atrás</button>` : "";
        //Botón hacia adelante
        links.innerHTML += (res.next) ? `<button onclick="traerPokemones('${res.next}')">Siguiente</button>` : "";

      });
  }
  
}

traerPokemones("https://pokeapi.co/api/v2/pokemon");

//-------------------






fetch('https://pokeapi.co/api/v2/pokemon?limit=1118')
          
  .then(x => x.json())
  .then(x => {
    data=x.results 
    filTipos(data)
  })
  



//-----------------------------------------------------------------------------------------------------------

filtrotipo.addEventListener('change', filTipos)


async function filTipos(data){
  var TYPES = document.getElementById("filtrotipos2")
  var filtro=[];
  pokes= await data
  console.log(pokes)

  if(TYPES.value != "Todos"){ 
      pokes=filtro.filter(pokes => pokes.types == TYPES.value)
  } else {  
      pokes=filtro
  }

}



var array_types = []

pokes.forEach(results => {    
  array_types.push(results.types)
})

var array_typesArr= new Set(array_types);

array_types = [...array_typesArr];

filtro_tipos() 

function filtro_tipos (){ 
    
  array_types.forEach(types => {
     
          var option = document.createElement('option')
          option.innerText= types;
          option.value = types;
          
          document.getElementById("filtrotipos2").appendChild(option);
      
  })
}

