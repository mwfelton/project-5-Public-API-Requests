
const body = document.querySelector('body')
console.log(body)
// body.style.background = 'none'
// body.style.background = 'cover';
body.style.backgroundImage = "url('css/imgs/RukoSI.jpg')"
const header = document.querySelector('h1')
console.log(header)
header.style.color = 'white'



const searchContainer = document.querySelector('.search-container')
const galleryDiv = document.querySelector('.gallery')

// variable to track which card is clicked

let thisCard = 0

// pulling in the data

function fetchData(url){
    return fetch(url)
    .then(response => response.json())
}

fetchData('https://randomuser.me/api/?results=12&nat=us')
.then(data => {
    const userData = data.results
    generateCards(userData)
    searchBar(userData)
    cardClickHandler(userData)
    generateModal()
    nextPrevButtons(userData)
})

// Functions

//taking the information from the fetch and building 12 employee cards with it and inserting them to the page.

function generateCards(userData){
    
    userData.forEach(person => {
        
    const cardHTML = `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${person.picture.thumbnail}">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
                <p class="card-text">${person.email}</p>
                <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
            </div>
        </div>
        `
        galleryDiv.insertAdjacentHTML('beforeend', cardHTML)
    }); 
}

// building the click functionality onto the cards to display the modal window.

function cardClickHandler(userData){

const cards = document.querySelectorAll('.card')
console.log(cards)

cards.forEach((card, i) => {
    card.addEventListener('click', (e) => {
        document.querySelector(".modal-container").style.display = "block";
        thisCard = i;
        modalInput(userData[i])
        const nextBtn = document.querySelector('#modal-next')
        const prevBtn = document.querySelector('#modal-prev')
        if (thisCard == 0){
            prevBtn.style.display = 'none';
        }
        if (thisCard == 11){
            nextBtn.style.display = 'none';
        }
    })
})

}

// the initial part of generating the modal and then hiding it before the click handler is called on the card. Also creating the close button functionality.

function generateModal(){

    let modal = `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                </div>       
             </div>
        </div>
    `;

    gallery.insertAdjacentHTML('afterend', modal)

    const modalCloseButton = document.getElementById('modal-close-btn')
    const modalContainer = document.querySelector(".modal-container")

    modalContainer.style.display = "none";
    
    modalCloseButton.addEventListener('click', (e) => {
        modalContainer.style.display = "none";
    })
}

// creating the actual input for the modal with data from the fetch. the birthday day is reconfigured to display correctly. 

//it's also build to clear the innerHTML of the modal window so that the function can work with the next preview buttons also.

function modalInput(userData){

    const dob = new Date(`${userData.dob.date}`);
    const month = dob.getMonth(),
            day = dob.getDate(),
           year = dob.getFullYear();
    const formatedDOB = `${month}/${day}/${year}`

    const modalInfoContainer = document.querySelector('.modal-info-container');
    modalInfoContainer.innerHTML = ''
    modalInfoContainer.innerHTML = `
            <img class="modal-img" src="${userData.picture.medium}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${userData.name.first} ${userData.name.last}</h3>
            <p class="modal-text">${userData.email}</p>
            <p class="modal-text cap">${userData.location.city}</p>
            <hr>
            <p class="modal-text">${userData.cell}</p>
            <p class="modal-text">${userData.location.street.number} ${userData.location.street.name}, ${userData.location.city}, ${userData.location.state} ${userData.location.postcode}</p>
            <p class="modal-text">Birthday: ${formatedDOB}</p>
            `
}


//This function to insert and make the next/prev buttons work  users the 'thisCard' variable to track which card was clicked to open the modal and then to reference what the next and previous cards would be. And to hide the button when the end of the 12 users is reached.

function nextPrevButtons(userData){

    const modalInfoContainer = document.querySelector('.modal-info-container')
    console.log(modalInfoContainer)

    const buttons = `
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
        `

    modalInfoContainer.insertAdjacentHTML('afterend', buttons)

    const nextBtn = document.querySelector('#modal-next')
    const prevBtn = document.querySelector('#modal-prev')

        nextBtn.addEventListener('click', (e) => {
            console.log('hug')
            thisCard++;
            modalInput(userData[thisCard]);
            if (thisCard == 11) {
                nextBtn.style.display = 'none'
            } if (!thisCard == 0){
                prevBtn.style.display = 'block';
            
            }
        })

        prevBtn.addEventListener('click', (e) => {
            console.log('peach')
            thisCard--;
            modalInput(userData[thisCard]);
            if (thisCard == 0){
                prevBtn.style.display = 'none'
            } if (!thisCard == 0){
                nextBtn.style.display = 'block';
            }
            
        })
}

// search bar

function searchBar(userData){
    const searchHTML = `
        <form action="#" method="get">
            <input type="search" id="search-input" class="search-input" placeholder="Search...">
            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
        </form>
    `
    searchContainer.insertAdjacentHTML('beforeend', searchHTML)

    const input = document.querySelector('#search-input')
    const card = document.querySelectorAll('.card')
    const name = document.querySelectorAll('#name')

    input.addEventListener('keyup', (e) => {
        const searchString = e.target.value

        for (let i = 0; i < name.length; i++){
            if (!name[i].textContent.toLowerCase().includes(searchString)){
                card[i].style.display = 'none'
            } else {
                card[i].style.display = 'flex'
            }
        }
    })
}


                    
                        

                        