const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;

const setMovieData = (index, price) => {
	localStorage.setItem('selectedMovieIndex', index);
	localStorage.setItem('selectedMoviePrice', price);
};

const updateSelectedCnt = () => {
	const selectedSeats = document.querySelectorAll('.row .seat.selected');

	const seatsIndex = [...selectedSeats].map((i, k) => {
		return [...seats].indexOf(i);
	});

	localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

	const selectedSeatsCnt = selectedSeats.length;

	count.innerText = selectedSeatsCnt;
	total.innerText = `$${selectedSeatsCnt * ticketPrice}`;
};

const populateUi = () => {
	const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
	const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
	console.log(selectedSeats);

	if (selectedSeats !== null && selectedSeats.length > 0) {
		seats.forEach((seat, index) => {
			if (selectedSeats.indexOf(index) > -1) {
				seat.classList.add('selected');
			}
		});
	}

	if (selectedMovieIndex !== null) {
		movieSelect.selectedIndex = selectedMovieIndex;
	}
};

// Populates UI with local storage data
populateUi();

movieSelect.addEventListener('change', (e) => {
	ticketPrice = +e.target.value;
	setMovieData(e.target.selectedIndex, e.target.value);
	updateSelectedCnt();
});

container.addEventListener('click', (e) => {
	if (
		e.target.classList.contains('seat') &&
		!e.target.classList.contains('occupied')
	) {
		e.target.classList.toggle('selected');
		updateSelectedCnt();
	}
});

updateSelectedCnt();
