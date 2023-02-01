const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');


populateUI();


let ticketPrice = +movieSelect.value;
//Save selected movie index and price

function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}


//Update total and count
function updateSelectedCount(){
const selectedSeats = document.querySelectorAll('.row .seat.selected');

//Copy selected seats into an array
//Map through array
//return a new array of indexes

const seatsIndex= [...selectedSeats].map(function(seat) {
   return [...seats].indexOf(seat) 
})

localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

console.log(seatsIndex);

//gets the length of only the selected seats
const selectedSeatsCount = selectedSeats.length;


//gets the innertext and updates the price
count.innerText = selectedSeatsCount;
total.innerText = selectedSeatsCount * ticketPrice;
}

//Get data from localstorage and populate UI

function populateUI() {
const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

if(selectedSeats !== null && selectedSeats.length >0) {
seats.forEach((seat, index)=> {
    if(selectedSeats.indexOf(index) > -1){
        seat.classList.add('selected');
    }
});
}
const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

if(selectedMovieIndex != null) {
    movieSelect.selectedIndex = selectedMovieIndex;
}

}

//Movie Select Event

movieSelect.addEventListener('change', function(e){
    ticketPrice = +e.target.value
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})


//Seat click event
container.addEventListener('click', function(e) {
    //checks to make sure it has a class of seat but not occupied
    if(e.target.classList.contains('seat') && 
    !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
});

// Initial Count and total set

updateSelectedCount();