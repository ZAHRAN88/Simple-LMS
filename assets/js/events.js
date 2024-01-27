 // Fetch data from external JSON file
 fetch('../events.json')
 .then(response => response.json())
 .then(data => {
   // Get container element
   var eventsRow = document.getElementById('eventsRow');

   // Generate event items dynamically
   data.events.forEach(event => {
     eventsRow.innerHTML += generateEventItem(event);
   });
 })
 .catch(error => console.error('Error fetching data:', error));

// Function to generate event item HTML
function generateEventItem(event) {
 return `
   <div class="col-md-6 d-flex align-items-stretch">
     <div class="card">
       <div class="card-img">
         <img src="${event.image}" alt="...">
       </div>
       <div class="card-body">
         <h5 class="card-title"><a href="">${event.title}</a></h5>
         <p class="fst-italic text-center">${event.date}</p>
         <p class="card-text">${event.description}</p>
       </div>
     </div>
   </div>
 `;
}