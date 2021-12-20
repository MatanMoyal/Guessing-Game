const animals = ["cat.jpg", "dog.jpg", "elephant.jpg", "lion.jpg", "panda.jpg", "sheep.jpg", "snake.jpg", "tiger.jpg", "zebra.jpg"]

var Instructions = document.querySelector("#Instructions");
var square = document.querySelectorAll(".square");
var newgame = document.querySelector("#new_game");
const message = document.getElementById('message')
const allImgTag = document.querySelectorAll('img')
newgame.addEventListener("click", New_Game)

const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

let animalChosen;
let lose30Second;
let countChance = 0


//activate every time that you click on picture and check if you right or not

function onClickSquare(e) {
  clearTimeout(lose30Second)
  const img = e.target
  countChance++;
  if (animalChosen === img.id) {
    for (let i = 0; i < animals.length; i++)
      allImgTag[i].style.display = 'none';
    allImgTag[9].style.display = 'inline';
    message.setAttribute('style', 'white-space: pre;');
    setTimeout(() => {
      clearTimeout(lose30Second)
      message.textContent = `You Win!\n After: ${countChance} Times`
    }, 600)
  } else {
    img.src = img.id
    img.classList.add('square-flip')
    message.textContent = 'Try Again'
    setTimeout(() => {
      message.textContent = ""
      lose30Second = lose()
    }, 1000)
  }
}

//piciking animal random from the list
function pick_animal() {
  var random = Math.floor(Math.random() * animals.length)
  return animals[random];
}

//function that not allow you to click on the square
function disableSquares() {
  allImgTag.forEach(img => {
    img.removeEventListener('click', onClickSquare)
  })
}

//function that telling you,you lose after 30 sec
function lose() {
  return setTimeout(() => {
    message.textContent = 'You lose, Click New Game to try again.'
    disableSquares()
  }, 30000)
}


function New_Game() {
  countChance = 0
  shuffle(animals)
  initalSrcImage()
  clearTimeout(lose30Second)
  allImgTag.forEach(img => {
    img.classList.remove('square-flip')
  })

}

//this function show you the picture that you need to remember

function pickPictureShown() {
  for (let i = 0; i < animals.length; i++)
    allImgTag[i].style.display = 'none'

  allImgTag[9].style.display = 'inline'
  allImgTag[9].width = "350"
  allImgTag[9].height = "350"
  const anim = pick_animal()
  animalChosen = anim
  allImgTag[9].src = anim
  message.textContent = 'Remember your picture!'
}


//function that initial the game
function initalSrcImage() {
  pickPictureShown()
  setTimeout(() => {
    lose30Second = lose()
    allImgTag[9].style.display = 'none';
    message.textContent = ''
    countChance = 0
    for (let i = 0; i < animals.length; i++) {
      allImgTag[i].width = "150"
      allImgTag[i].height = "150"
      allImgTag[i].id = animals[i]
      allImgTag[i].src = "mark.webp"
      allImgTag[i].style.display = 'inline';
      allImgTag[i].addEventListener('click', onClickSquare)
    }
  }, 5000)
}

//function that shuffle the list of the animals

function shuffle(animals) {
  var currentIndex = animals.length,
    temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = animals[currentIndex];
    animals[currentIndex] = animals[randomIndex];
    animals[randomIndex] = temporaryValue;
  }

  return animals;
}




openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
  })
})

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
  })
})

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}