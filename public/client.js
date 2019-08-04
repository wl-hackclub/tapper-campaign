const socket = io()

//localStorage.tap_count = 0
      
if (typeof(Storage) !== 'undefined') {
  if (!localStorage.tap_count) localStorage.tap_count = 0
}
      
socket.on('updateCounts', (globalCount) => {
  updateCounts(globalCount)
})

function incrementCount() {
  socket.emit('incrementGlobalCount')
        
  localStorage.tap_count++
  document.getElementById('local_count').innerHTML = 'Current local count: ' + localStorage.tap_count
}
      
function updateCounts(globalCount) {
  document.getElementById('local_count').innerHTML = 'Current local count: ' + localStorage.tap_count
  document.getElementById('global_count').innerHTML = 'Current global count: ' + globalCount
}