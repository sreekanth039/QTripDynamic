import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it

  let param = new URLSearchParams(search);
  let city = param.get("city");

  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let fetchApi = await fetch(
      `${config.backendEndpoint}/adventures?city=${city}`
    );
    let finalData = await fetchApi.json();
    return finalData;
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM

  let container = document.getElementById("data");

  adventures.forEach((adventure) => {
    let col = document.createElement("div");
    col.className = "col-6 col-lg-3 mt-3";

    col.innerHTML = `
    <a href="detail/?adventure=${adventure.id}" id="${adventure.id}">
    <div class = "activity-card">
    <div class="category-banner">${adventure.category}</div>
    <img src="${adventure.image}" alt="${adventure.name}" class="img-fluid">
    <div class="activity-card-text text-md-center w-100 mt-3">
        <div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3">
            <h5 class="text-left">${adventure.name}</h5>
            <p>₹${adventure.costPerHead}</p>
        </div>
        <div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3">
            <h6 class="text-left">Duration</h6>
            <p>${adventure.duration} Hours</p>
        </div>
    </div>
    </div>
    </a>
    `;
    container.append(col);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filteredDuration = list.filter((key)=>
  key.duration>low && key.duration<=high);

  return filteredDuration;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredCategory = list.filter((key)=>
  categoryList.includes(key.category));

  return filteredCategory;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
let filteredFunction = [];

if(filters["duration"].length >0 && filters["category"].length>0){
  let choice = filters["duration"].split("-");
  filteredFunction = filterByDuration(list,parseInt(choice[0]),parseInt(choice[1]));
  filteredFunction = filterByCategory(filteredFunction,filters["category"]);
}else if(filters["duration"].length >0){
  let choice = filters["duration"].split("-");
  filteredFunction = filterByDuration(list,parseInt(choice[0]),parseInt(choice[1]));
}else if(filters["category"].length>0){
  filteredFunction = filterByCategory(filteredFunction,filters["category"]);
}else{
  filteredFunction = list;

}

  // Place holder for functionality to work in the Stubs
  return filteredFunction;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage

  localStorage.setItem("filters",JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  // Place holder for functionality to work in the Stubs
  return JSON.parse(localStorage.getItem("filters"));
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  const durationSelect = document.getElementById("duration-select");
  if (filters.duration) {
    durationSelect.value = filters.duration;
  }

  const categoryList = document.getElementById("category-list");
  categoryList.innerHTML = "";

  if (filters.category && filters.category.length > 0) {
    filters.category.forEach(category => {
      const pill = document.createElement("div");
      pill.className = "category-filter";
      pill.textContent = category;
      categoryList.appendChild(pill);
    });
  }

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
