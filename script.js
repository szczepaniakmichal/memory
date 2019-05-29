// array with cards color
const cardsColor = ['deeppink', 'deeppink', 'blue', 'blue', 'yellow', 'yellow', 
                    'green', 'green', 'aqua', 'aqua', 'gray', 'gray', 
                    'gold', 'gold', 'greenyellow', 'greenyellow', 
                    'crimson', 'crimson' ];

 let cards = document.querySelectorAll('div');
 cards = [...cards]; 

 const startTime = new Date().getTime();
 let activeCard = '';
 const activeCards = [];
 const gamePairs = cards.length/2;
 let gameResult = 0;

// not work with arrow function. How to make it?
//  const clickCard = () => {
//     activeCard = this;
//     console.log(activeCard);
//     activeCard.classList.remove('hidden');
//  };

 const clickCard = function() {
    activeCard = this;
    if(activeCard == activeCards[0]) return;
    console.log(activeCard);
    activeCard.classList.remove('hidden');
    if(activeCards.length === 0){
        activeCards[0] = activeCard;
        return;
    } else {
        cards.forEach(card => {
            card.removeEventListener('click', clickCard)
        })
        activeCards[1] = activeCard;
        console.log(activeCards.length);
        setTimeout(() => {
            if(activeCards[0].className === activeCards[1].className) {
                activeCards.forEach((card) => {
                    card.classList.add('off')
                })
            console.log('wygrana');
            gameResult++;
            cards = cards.filter(card => !card.classList.contains('off'));
            //this not work
            // cards = cards.filter((card) => {!card.classList.contains('off')});
            console.log(gameResult);
            if(gameResult == gamePairs){
                const endTime = new Date().getTime();
                const gameTime = (endTime - startTime)/1000;
                alert(`Wygrałeś w czasie ${gameTime} sekund`);
                location.reload();
            }
        } else {
                activeCards.forEach((card) => {
                    card.classList.add('hidden');
                })
            console.log('przegrana');
        }
        activeCard = '';
        activeCards.length = 0;
        console.log(activeCards.length);
        cards.forEach(card => {
            card.addEventListener('click', clickCard)
            console.log(card)
        })
        }, 1000);
        
    
    }

 };

 const init = () => {
    cards.forEach((card) => {
        const position = Math.floor(Math.random()*cardsColor.length);
        card.classList.add(cardsColor[position]);
        cardsColor.splice(position, 1);
    })

    setTimeout( () => {
        cards.forEach((card) => {
            card.classList.add('hidden')
            card.addEventListener('click', clickCard)
        })
    }, 1000)

 }

 init();