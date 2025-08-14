import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    let fetchApi = await fetch(`${config.backendEndpoint}/cities`);
    let finalData = await fetchApi.json();
  
    return finalData;

  }catch(err){
   return null;
  }

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM

  let container = document.getElementById("data");
  
  let div = document.createElement("div");
  div.className = "col-lg-3 col-6 mt-3";

  div.innerHTML = `
  <a href="pages/adventures/?city=${id}" id="${id}">
  <div class= "tile ">
  <img src="${image}" alt="${city}" class="img-fluid" />
  <div class = "tile-text text-center">
  <h5> ${city}</h5>
  <h5> ${description}</h5>
  </div>
  </div>
  </a>
  `
  container.append(div);
 
}

export { init, fetchCities, addCityToDOM };
