 //Wenn der ganze Content des HTML Dokumentes geladen ist, wird diese Funktion ausgeführt.
  document.addEventListener('DOMContentLoaded', () => {

    //Hier definiere ich Variablen, Const vs Let
  //Greife auf Score Element (Zähler) über ID 
  const scoreDisplay = document.getElementById('score')
  //28 * 28 = 784 Quadratsumme
  const width = 28
  let score = 0
  //Greife auf Spiel-Feld über den Klassennamen.
  const grid = document.querySelector('.feld')

  //Layout wurde mit Hilfe eines Canvas-Layout-Generators erstellt.
  /*
  0 - pac-punkte
  1 - wande
  2 - geist
  3 - energie
  4 - leer
  0
  */
  
  const layout = [
  
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 3, 0, 0, 0, 0, 0, 0, 3, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1,
    1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1,
    1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1,
    1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1,
    1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1,
    1, 3, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 3, 1,
    1, 1, 1, 1, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 0, 1, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 1, 0, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 0, 1, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 1, 0, 1, 1, 1, 1, 1,
    4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 1, 1, 0, 0, 0, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 0, 0, 0, 1, 1, 0, 0, 0, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1,
    1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1,
    1, 3, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 3, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  ]
  
// Definiere Squares Variable als Array
  const squares = []

  //Erstelle das Spielboard
  function SpielboardErstellen() {
    for (let i = 0; i < layout.length; i++) {
      const square = document.createElement('div')
      grid.appendChild(square)
      squares.push(square)

      //Füge ein Layout dem Board zu.
      if(layout[i] === 0) {
        squares[i].classList.add('pac-punkt')
      } else if (layout[i] === 1) {
        squares[i].classList.add('wand')
      } else if (layout[i] === 2) {
        squares[i].classList.add('geist')
      } else if (layout[i] === 3) {
        squares[i].classList.add('energie')
      }
    }
  }
  SpielboardErstellen()


  //Spielmitglieder erstellen
  //Pacman ersteleln
  let pacmanCurrentIndex = 490
  squares[pacmanCurrentIndex].classList.add('pacman-spieler')

  //Bekommen die Koordinaten von Packman auf das Grid mit X und Y Achse.
  //Pacman auf dem Board bewegen
  function movePacman(e) {
    squares[pacmanCurrentIndex].classList.remove('pacman-spieler')
    switch(e.keyCode) {
      case 37:
        if(
          pacmanCurrentIndex % width !== 0 &&
          !squares[pacmanCurrentIndex -1].classList.contains('wand') &&
          !squares[pacmanCurrentIndex -1].classList.contains('geist')
          )
        pacmanCurrentIndex -= 1
        if (squares[pacmanCurrentIndex -1] === squares[363]) {
          pacmanCurrentIndex = 391
        }
        break
      case 38:
        if(
          pacmanCurrentIndex - width >= 0 &&
          !squares[pacmanCurrentIndex -width].classList.contains('wand') &&
          !squares[pacmanCurrentIndex -width].classList.contains('geist')
          ) 
        pacmanCurrentIndex -= width
        break
      case 39:
        if(
          pacmanCurrentIndex % width < width - 1 &&
          !squares[pacmanCurrentIndex +1].classList.contains('wand') &&
          !squares[pacmanCurrentIndex +1].classList.contains('geist')
        )
        pacmanCurrentIndex += 1
        if (squares[pacmanCurrentIndex +1] === squares[392]) {
          pacmanCurrentIndex = 364
        }
        break
      case 40:
        if (
          pacmanCurrentIndex + width < width * width &&
          !squares[pacmanCurrentIndex +width].classList.contains('wand') &&
          !squares[pacmanCurrentIndex +width].classList.contains('geist')
        )
        pacmanCurrentIndex += width
        break
    }
    squares[pacmanCurrentIndex].classList.add('pacman-spieler')
    pacmanPunktGegessen()
    pacmanEnergieGegessen()
    gameOverCheck()
    gameWinCheck()
  }
  document.addEventListener('keyup', movePacman)

  // Was passiert wenn Packman einen Punkt isst.
  function pacmanPunktGegessen() {
    if (squares[pacmanCurrentIndex].classList.contains('pac-punkt')) {
      score++
      scoreDisplay.innerHTML = score
      squares[pacmanCurrentIndex].classList.remove('pac-punkt')
    }
  }

  //Was passiert wenn Packman einen Energie-Punkt isst.
  function  pacmanEnergieGegessen() {
    if (squares[pacmanCurrentIndex].classList.contains('energie')) {
      score +=10
      geiste.forEach(geist => geist.isScared = true)
      setTimeout(unScaregeiste, 10000)
      squares[pacmanCurrentIndex].classList.remove('energie')
    }
  }

  //Geiste hören auf zu blinken
  function unScaregeiste() {
    geiste.forEach(geist => geist.isScared = false)
  }

  //Geiste erstellen mit consturctor Funktion.
  class Geist {
    constructor(className, startIndex, speed) {
      this.className = className
      this.startIndex = startIndex
      this.speed = speed
      this.currentIndex = startIndex
      this.isScared = false
      this.timerId = NaN
    }
  }

  //Alle Geiste
  geiste = [
    new Geist('blinky', 348, 250),
    new Geist('pinky', 376, 400),
    new Geist('inky', 351, 300),
    new Geist('clyde', 379, 500)
    ]

  //Geiste auf dem Grid zeichen
  geiste.forEach(geist => {
    squares[geist.currentIndex].classList.add(geist.className)
    squares[geist.currentIndex].classList.add('geist-css')
    })

  //Geiste nach dem Zufallprinzip bewegen
  geiste.forEach(geist => moveGeist(geist))

  function moveGeist(geist) {
    const richtungs =  [-1, +1, width, -width]
    let = richtung = richtungs[Math.floor(Math.random() * richtungs.length)]

    geist.timerId = setInterval(function() {

     //Wenn der nächste Punkt (Quadrat), in der Richtung von dem man sich bewegt, keine Geiste hat und da keine Wand steht
      if  (!squares[geist.currentIndex + richtung].classList.contains('geist-css') &&
        !squares[geist.currentIndex + richtung].classList.contains('wand') ) {
          //CSS Klassen entfernen
          squares[geist.currentIndex].classList.remove(geist.className)
          squares[geist.currentIndex].classList.remove('geist-css', 'scared-geist')
          //In diese Richtung eine Bewegung machen
          geist.currentIndex += richtung
          squares[geist.currentIndex].classList.add(geist.className, 'geist-css')
      //wenn eine neue zufällige Bewegungsrichtung erkant wird
      } else richtung = richtungs[Math.floor(Math.random() * richtungs.length)]

      //wenn der Geist gerade Angst hat
      if (geist.isScared) {
        squares[geist.currentIndex].classList.add('scared-geist')
      }

      //wenn der geist gerade angst hat und pacman drauf ist
      if(geist.isScared && squares[geist.currentIndex].classList.contains('pacman-spieler')) {
        squares[geist.currentIndex].classList.remove(geist.className, 'geist-css', 'scared-geist')
        geist.currentIndex = geist.startIndex
        score +=100
        squares[geist.currentIndex].classList.add(geist.className, 'geist-css')
      }
      gameOverCheck()
    }, geist.speed)
  }

  //Prüft ob es "Gameover" ist
  function gameOverCheck() {
    if (squares[pacmanCurrentIndex].classList.contains('geist-css') &&
      !squares[pacmanCurrentIndex].classList.contains('scared-geist')) {
      geiste.forEach(geist => clearInterval(geist.timerId))
      document.removeEventListener('keyup', movePacman)
      setTimeout(function(){ alert("Sie haben verloren"); }, 500)
    }
  }

  //Prüft ob der Spieler gewonnen hat
  function gameWinCheck() {
    if (score === 274) {
      geiste.forEach(geist => clearInterval(geist.timerId))
      document.removeEventListener('keyup', movePacman)
      setTimeout(function(){ alert("Sie haben gewonnen"); }, 500)
    }
  }
})

//Taste klciken um das neue Spiel zu starten, diese Funktion 
function resetGame () {
  window.location.reload();
}




