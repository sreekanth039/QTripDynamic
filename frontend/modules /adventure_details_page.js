import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let adventureIds = new URLSearchParams(search);

  let adventureId = adventureIds.get("adventure");

  return adventureId;
  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
try{
  let result = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`);
  let finalData = await result.json();
  return finalData;
}catch(err){
  return null;
}


  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM

  document.getElementById("adventure-name").textContent= adventure.name;
  document.getElementById("adventure-subtitle").textContent= adventure.subtitle;
  document.getElementById("adventure-content").textContent= adventure.content;

  adventure.images.map((image)=>{
  let divElement = document.createElement("div");
  divElement.className = `col-lg-12`;
  divElement.innerHTML = `
  <img src=${image} alt=" " class= "activity-card-image pb-3"/>`
  document.getElementById("photo-gallery").append(divElement);
})

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  document.getElementById("photo-gallery").innerHTML = `
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id="carousel-inner">
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  `;

 images.map((image,index)=>{
  let element = document.createElement("div");
  element.className = `carousel-item ${index === 0 ? "active" : ""}`;
  element.innerHTML = `
  <img src=${image} alt=" " class= "activity-card-image pb-3"/>`;

  document.getElementById("carousel-inner").appendChild(element);
 })

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  let reservationSoldOut = document.getElementById("reservation-panel-sold-out");
  let reservationAva = document.getElementById("reservation-panel-available");

  if(adventure.available){
   reservationSoldOut.style.display = "none";
   reservationAva.style.display ="block";

   document.getElementById("reservation-person-cost").textContent = adventure.costPerHead;
     
  }else{
    reservationSoldOut.style.display = "block";
   reservationAva.style.display ="none";
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

  document.getElementById("reservation-cost").textContent = persons * adventure.costPerHead;


}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const form = document.getElementById("myForm");

  // Attach submit event listener
  form.addEventListener("submit", async function (event) {
    event.preventDefault(); // prevent default page reload

    // Extract form data
    const formData = new FormData(form);
    const name = formData.get("name");
    const date = formData.get("date");
    const person = formData.get("person");

    // Prepare data for POST
    const postData = {
      name: name,
      date: date,
      person: Number(person),
      adventure: adventure.id // from current adventure details
    };

    try {
      // Make POST request
      const response = await fetch(`${config.backendEndpoint}/reservations/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
      });

      if (response.ok) {
        alert("Success!");
        window.location.reload(); // refresh page
      } else {
        alert("Failed!");
      }
    } catch (error) {
      console.error("Error making reservation:", error);
      alert("Failed!");
    }
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't

  if(adventure.reserved){
    document.getElementById("reserved-banner").style.display = "block";
  }else{
    document.getElementById("reserved-banner").style.display = "none";
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
