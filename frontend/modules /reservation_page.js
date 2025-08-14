import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
try{
  let result = await fetch (`${config.backendEndpoint}/reservations/`);
  let data = await result.json();
  return data;

}catch(err){
  return null;
}


  // Place holder for functionality to work in the Stubs
  return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  const noReservationBanner = document.getElementById("no-reservation-banner");
  const reservationTableParent = document.getElementById("reservation-table-parent");
  const reservationTable = document.getElementById("reservation-table");

  if (reservations.length === 0) {
    noReservationBanner.style.display = "block";
    reservationTableParent.style.display = "none";
  }else{
    noReservationBanner.style.display = "none";
    reservationTableParent.style.display = "block";
  }

  reservations.map(reservation => {
    let formattedDate = new Date(reservation.date).toLocaleDateString("en-IN");
    let bookingTime = new Date(reservation.time).toLocaleString("en-IN", {
      dateStyle: "long",
      timeStyle: "medium"
    }).replace(" at", ",");

    // Create table row
    let ele = document.createElement("tr");

    // Add other cells
    ele.innerHTML = `
      <th scope="row">${reservation.id}</th>
      <td>${reservation.name}</td>
      <td>${reservation.adventureName}</td>
      <td>${reservation.person}</td>
      <td>${formattedDate}</td>
      <td>${reservation.price}</td>
      <td>${bookingTime}</td>
      <td><div class="reservation-visit-button" id = ${reservation.id}> <a href="../detail/?adventure=${reservation.adventure}">
      Visit Adventure </a>
      </div></td>
    `;

    reservationTable.appendChild(ele);
  });
}


export { fetchReservations, addReservationToTable };
