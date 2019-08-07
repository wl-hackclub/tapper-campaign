const socket = io()

//localStorage.tap_count = 0

if (typeof (Storage) !== 'undefined') {
  if (!localStorage.tap_count) localStorage.tap_count = 0
}

socket.on('updateCounts', (globalCount) => {
  updateCounts(globalCount)
})

socket.on('winner', (prize) => {
  document.getElementById('winnerModal').style.display = "block"
  
  var prizeText = document.getElementById('prize')
  prizeText.innerHTML = ` ${prize}`
  
  makeItRain()
})

function incrementCount() {
  socket.emit('incrementGlobalCount')

  localStorage.tap_count++
  document.getElementById('local_count').innerHTML = `Personal tap count: ${localStorage.tap_count}`
}

function updateCounts(globalCount) {
  document.getElementById('local_count').innerHTML = `Personal tap count: ${localStorage.tap_count}`
  document.getElementById('global_count').innerHTML = `Schoolwide tap count: <span>${globalCount}</span>`
}

function checkEmpty() {
  if (document.getElementById('email').value === '')
    return false
}
