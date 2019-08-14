const socket = io()

//localStorage.tap_count = 0

if (typeof Storage !== 'undefined') {
  if (!localStorage.tap_count) localStorage.tap_count = 0
}

socket.on('updateCounts', globalCount => {
  updateCounts(globalCount)
})

socket.on('winner', prize => {
  document.getElementById('winnerModal').style.display = 'block'

  var prizeText = document.getElementById('prize')
  prizeText.innerHTML = ` ${prize}`

  makeItRain()
})

function incrementCount() {
  socket.emit('incrementGlobalCount')

  localStorage.tap_count++
  document.getElementById('localCount').innerHTML = `Personal tap count: ${
    localStorage.tap_count
  }`
}

function updateCounts(globalCount) {
  document.getElementById('localCount').innerHTML = `Personal tap count: ${
    localStorage.tap_count
  }`
  document.getElementById(
    'globalCount'
  ).innerHTML = `Taps: <span>${globalCount}</span>`
}

function checkEmpty() {
  if (document.getElementById('email').value === '') return false
}
