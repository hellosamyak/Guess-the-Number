function generateRandomNonMultipleOf5() {
  let n;
  do {
    n = Math.floor(Math.random() * 100) + 1
  } while (n % 5 === 0)
  return n
}

let randomNumber = generateRandomNonMultipleOf5()

const submit = document.querySelector('#submit') // submit button
const userInput = document.querySelector('#guess-input') // input placeholder
const prevGuesses = document.querySelector('#previous-guesses') // displays previous guesses made by the user
const remainingAttempts = document.querySelector('#attempts-text') // remaining attempts out of 10
const hint = document.querySelector('#hint') // low or high

let userGuesses = []
let numOfAttempts = 1

let playGame = true
if (playGame) {
  submit.addEventListener('click', function (e) {
    e.preventDefault()
    const guess = parseInt(userInput.value)
    validateGuess(guess)
  })

}

// initialize attempts display
// remainingAttempts.innerHTML = `${11 - numOfAttempts}`

function validateGuess(guess) { // validates the inputs lie b/w 1 to 100 & number of attempts
  if (isNaN(guess)) {
    alert('Please enter a valid number!')
  } else if (guess < 1) {
    alert('Please enter a number greater than 1!')
  } else if (guess > 100) {
    alert('Please enter a number smaller than 100!')
  } else {
    userGuesses.push(guess)
    if (numOfAttempts === 10) {
      displayGuesses(guess)
      displayMessage(`Game over. The number was ${randomNumber}`)
      endGame()
    } else {
      displayGuesses(guess)
      compareGuess(guess)
    }
  }
}

function compareGuess(guess) { // compares the input with the random number, tells equal, low or high
  if (guess === randomNumber) {
    displayMessage(`You guessed it right! YOU WONNNN!!!`)
    userInput.setAttribute('disabled', '')
  } else if (guess < randomNumber) {
    displayMessage(`The number is too lowww`)
  } else if (guess > randomNumber) {
    displayMessage(`The number is too highhh`)
  }
}

function displayGuesses(guess) { // cleans the input, updates the status panel
  userInput.value = ''
  prevGuesses.innerText += `${guess}, `
  numOfAttempts++
  remainingAttempts.innerHTML = `${11 - numOfAttempts}`
}

function displayMessage(message) { // passes a message, i.e., low or high
  hint.innerHTML = `<h2>${message}</h2>`
}

function endGame() { // ends the game when guesses are over
  userInput.value = ''
  userInput.setAttribute('disabled', '')
  playGame = false
  StartNewGame()
}

function StartNewGame() { // starts a new game
  const newGameBtn = document.querySelector('#new-game')
  newGameBtn.addEventListener('click', function (e) {
    randomNumber = generateRandomNonMultipleOf5()
    userGuesses = []
    numOfAttempts = 1
    prevGuesses.innerHTML = ''
    remainingAttempts.innerHTML = `${11 - numOfAttempts}`
    userInput.removeAttribute('disabled')
    userInput.value = ''
    hint.innerHTML = ''
    playGame = true
  })
}

// attach new-game listener on load so button works anytime
StartNewGame()