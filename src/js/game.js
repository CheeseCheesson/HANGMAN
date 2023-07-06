import { WORDS, KEYBOARD_LETTERS } from './const'

const gameDiv = document.getElementById('game')
const logoH1 = document.getElementById('logo')
let triesLeft
let winCounter

const getWordFromSessionStorage = () =>
  sessionStorage.getItem('word').toLocaleLowerCase()

const creatPlaceholdersHTML = () => {
  const word = getWordFromSessionStorage()

  let palceholdersHTML = Array.from('_'.repeat(word.length)).reduce(
    (acc, cur, i) => {
      return acc + `<h1 id="letter-${i}" class="letter"> ${cur} </h1>`
    },
    ''
  )

  return `<div id="placeholders" class="placeholders-wrapper">${palceholdersHTML}</div>`
}

const createKeyboard = () => {
  const keyboard = document.createElement('div')
  keyboard.classList.add('keyboard')
  keyboard.id = 'keyboard'

  const keyboardHTML = KEYBOARD_LETTERS.reduce((acc, cur) => {
    return (
      acc +
      `<button id="${cur}" class="buttonPrimary keyboardButton">${cur}</button>`
    )
  }, '')

  keyboard.innerHTML = keyboardHTML

  return keyboard
}

const createHangmanImg = () => {
  const img = document.createElement('img')
  img.alt = 'hangman img'
  img.classList.add('hangmanImg')
  img.id = 'hangmanImg'
  img.src = 'imges/hg-0.png'

  return img
}

const checkLetter = (letter) => {
  const wordFromSess = getWordFromSessionStorage()
  const inputLatter = letter.toLowerCase()

  if (!wordFromSess.includes(inputLatter)) {
    const triesCounnter = document.getElementById('tries-left')
    triesLeft -= 1
    triesCounnter.textContent = triesLeft

    const hangmanImg = document.getElementById('hangmanImg')
    hangmanImg.src = `imges/hg-${10 - triesLeft}.png`
    if (triesLeft === 0) {
      stopGame('lose')
      return
    }
  } else {
    // есть угаданная буква

    wordFromSess.split('').forEach((currentLetter, index) => {
      if (currentLetter === inputLatter) {
        winCounter += 1
        if (winCounter === wordFromSess.length) {
          stopGame('win')
          return
        }
        document.getElementById(`letter-${index}`).textContent =
          currentLetter.toLocaleUpperCase()
      }
    })
  }
}

const stopGame = (status) => {
  document.getElementById('placeholders').remove()
  document.getElementById('tries').remove()
  document.getElementById('keyboard').remove()
  document.getElementById('quit').remove()

  const wordFromSess = getWordFromSessionStorage().toUpperCase()

  if (status === 'win') {
    document.getElementById('hangmanImg').src = 'imges/hg-win.png'
    document.getElementById(
      'game'
    ).innerHTML += `<h1 class="result-header win">You won.</h1>`
  } else if (status === 'lose') {
    document.getElementById(
      'game'
    ).innerHTML += `<h1 class="result-header lose">You lose.</h1>`
  } else if (status === 'quit') {
    document.getElementById('hangmanImg').src = 'imges/hg-0.png'
    logoH1.classList.remove('text-sm')
  }
  document.getElementById(
    'game'
  ).innerHTML += `<p>The word was: <span class="result-word">${wordFromSess}</span></p>
  <button id="playAgain" class="buttonPrimary mt-4">Play again</button>
  `
  document.getElementById('playAgain').onclick = startGame
}

export const startGame = () => {
  triesLeft = 10
  winCounter = 0
  logoH1.classList.add('text-sm')

  // загадываем слово
  const randomIndex = Math.floor(Math.random() * WORDS.length)
  const wordToGuess = WORDS[randomIndex]
  sessionStorage.setItem('word', wordToGuess)

  gameDiv.innerHTML = creatPlaceholdersHTML()

  gameDiv.innerHTML += `<p id="tries" class="mt-2">TRIES LEFT <span id="tries-left" class="font-medium text-red-600">10</span></p>`

  const hangmanImg = createHangmanImg()

  const keyboardDiv = createKeyboard()
  gameDiv.prepend(hangmanImg)
  gameDiv.appendChild(keyboardDiv)

  keyboardDiv.addEventListener('click', ({ target }) => {
    if (target.tagName !== 'BUTTON') return

    target.disabled = true

    checkLetter(target.id)
  })
  gameDiv.insertAdjacentHTML('beforeend',  `
  <button id='quit' class='buttonSecondary px-2 py-1 mt-12'>Quit</button>
  `)
  document.getElementById('quit').onclick = () => {
    // sessionStorage.clear()
    // location.reload()
    const isSure = confirm('Are you sure you want to quit and lose all your progress?')
    if (isSure) stopGame('quit')
  }
}

