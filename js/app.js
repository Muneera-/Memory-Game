/*
 * Create a list that holds all of your cards
 */
const cardList = ['diamond', 'diamond', 'paper-plane-o', 'paper-plane-o', 'anchor', 'anchor', 'bolt', 'bolt', 'cube', 'cube', 'leaf', 'leaf', 'bicycle', 'bicycle', 'bomb', 'bomb'];
let openedCard = []; 
let moves = 0;    
let movesCounter = document.querySelector('.moves'); 
let timer = document.querySelector('.timer'); 
let starRating = document.querySelectorAll('.fa-star'); 
let deck = document.querySelector('.deck'); 
let restart = document.querySelector('.restart');
let second;
let time;
let match;
let start;
let stars;

/*
 *  @description  Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/**
* @description Shuffle function from http://stackoverflow.com/a/2450976
* @param {Array} array - description
*/
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/***  Memory Game Logic   ***/ 
/**
* @description function to start a new game 
*/
function startGame() {
	let shuffledCards= shuffle(cardList);
	deck.innerHTML = '';
    //loop to display all shuffled cards
    for(let i = 0; i < shuffledCards.length; i++) {
        let card = deck.appendChild(document.createElement('li'));
        card.classList.add('card');
        card.innerHTML = '<i class="fa fa-'+shuffledCards[i]+'"></i>';
    }
    openedCard = [];
    match = 0; 
    moves = 0; 
    movesCounter.innerHTML = ('0');// set moves in index.html page to 0 

    starRating[0].classList.remove('fa-star-o');
    starRating[1].classList.remove('fa-star-o');
    starRating[2].classList.remove('fa-star-o');

    start = false;
    let cards = deck.querySelectorAll('.card');
    cards.forEach(processClick);
    clearInterval(time);
    second = 0;
    timer.innerHTML = "0";
}


/**
* @description function to display time in seconds 
*/
function startTimer() {
        time = setInterval(function() {
            timer.innerHTML = second;
            second++;
        }, 1000);
}

/**
* @description the main function for the game logic 
* process cards clicks and check if clicked cards are matched by calling isMatched() function, 
* and count the number of moves based on the number of pairs clicked 
* and call starsRating() when 8pairs of cards is matched 
*/
function processClick(card) {
    card.addEventListener('click', function () {
        if (start === false) {
          startTimer();
          start = true;
        }  
        let cardClicked = this.innerHTML;        
        if(this.classList.contains('show') || this.classList.contains('match')) {
            return true;
        }
        
        this.classList.add('open', 'show');
        openedCard.push(cardClicked);
        /* if two card are open then isMatched() */
        if(openedCard.length ===2) { 
            isMatched();
            moves++;
            starsRating();
            movesCounter.innerHTML = moves;
            openedCard = [];
        }
        if (match === 8) { 
            starsRating();
            setTimeout(function () {
                CongratulationsPopup();
                clearInterval(time);
            }, 300);
        }
    });
}

 /**
* @description function to check if the clicked cards are matched or not
*/
function isMatched() {

	if(openedCard[0] === openedCard[1]) {
	    let cardsOpen = deck.querySelectorAll('.open');
	    cardsOpen[0].classList.add('match');
	    cardsOpen[1].classList.add('match');

	    setTimeout(function() {
		      let cardsMatch = deck.querySelectorAll('.match');
		      cardsMatch.forEach(function(card) {
		        card.classList.remove('open', 'show');
		      }); 
		  }
		  , 300 );
	    match++;
 	} 
	else {
	    let cardsOpen = deck.querySelectorAll('.open');
	    cardsOpen[0].classList.add('nomatch');
	    cardsOpen[1].classList.add('nomatch');

	    cardsOpen.forEach(function(card) {       
	      setTimeout( function() {
	        card.classList.remove('nomatch','open', 'show');
	      }
	      , 300);
	    });
	  }
}



/**
* @description function to process Star Rating based on number of moves 
*/
function starsRating() {
    if(moves < 15){
        stars = 3;
    } else if(moves >= 15 && moves < 22) {
        starRating[2].classList.add('fa-star-o');
        stars = 2;
    } else if(moves >= 22) {
        starRating[2].classList.add('fa-star-o');
        starRating[1].classList.add('fa-star-o');
        stars = 1;
    }
}

/**
* @description Congratulations Popup  
**/
function CongratulationsPopup() {
let popUp = ("\tCongratulations...!! \n\tYou made "+moves+" moves \n\tYour score is "+stars+" out of 3\n\t"+ 
        "Time it took you to finish the game is "+--second+" seconds \n\tDo you wanna play again?");
    swal({
        
  title: popUp,
  confirmButtonText:  'Yes',
  cancelButtonText:  'No',
  showCancelButton: true,
  showCloseButton: true,
  //target: document.getElementById('rtl-container')
}).then((result) => {
  if (result.value) {
    startGame();
  }
  else {
    swal('\tThank you for trying my memory game.. \n\tGood Bye =)')
  }
})

}

/**
* @description Restart Button  
**/
restart.addEventListener('click', startGame());







/* Resources that helped me during the development of this project
- JavaScript and JQuery: Interactive Front-End Web Development. Jon Duckett
- https://www.w3schools.com/jsref/met_win_clearinterval.asp
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
- Learning Web Design by Jennifer Nierderst Robbins 
- http://stackoverflow.com
*/


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
