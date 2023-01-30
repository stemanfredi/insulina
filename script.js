'use strict'

const glycemiaCurrEdges = [
  85, 101, 121, 141, 161, 176, 201, 226, 251, 276, 301, 326, 351, 376, 401, 451,
]

const glycemiaPrevEdges = [
  [120, 151, 201],
  [100, 121, 141, 181, 226, 251, 276],
  [100, 141, 161, 181, 201, 226, 276, 301, 326],
  [100, 141, 161, 181, 201, 226, 276, 301, 326],
  [100, 141, 176, 201, 226, 251, 276, 301, 351],
  [100, 201, 251, 276, 301, 326, 351],
  [100, 151, 201, 251, 276, 301, 326, 351],
  [100, 151, 226, 276, 301, 326, 351, 401],
  [100, 151, 201, 276, 301, 326, 351, 401],
  [100, 201, 251, 301, 326, 376, 401],
  [100, 176, 251, 301, 326, 351, 401],
  [100, 251, 276, 326, 351, 376],
  [100, 201, 276, 326, 351, 376],
  [100, 251, 326, 351, 376],
  [100, 201, 276, 351, 376],
]

const coefficients = [
  [0.6, 0.5, 0.3, 0.1],
  [1.0, 0.9, 0.7, 0.6, 0.5, 0.4, 0.3, 0.1],
  [1.1, 1.0, 0.9, 0.8, 0.7, 0.5, 0.4, 0.3, 0.2, 0.1],
  [1.2, 1.1, 1.0, 0.9, 0.7, 0.6, 0.5, 0.4, 0.2, 0.1],
  [1.4, 1.2, 1.1, 1.0, 0.9, 0.7, 0.5, 0.4, 0.2, 0.1],
  [1.5, 1.2, 1.0, 0.7, 0.5, 0.4, 0.3, 0.2],
  [1.5, 1.4, 1.3, 1.2, 1.0, 0.8, 0.5, 0.3, 0.2],
  [1.8, 1.6, 1.4, 1.2, 1.0, 0.8, 0.5, 0.4, 0.2],
  [2, 1.8, 1.6, 1.4, 1.2, 1.0, 0.8, 0.5, 0.4],
  [2.2, 1.8, 1.6, 1.4, 1.2, 1.0, 0.5, 0.4],
  [2.4, 2, 1.8, 1.6, 1.4, 1.2, 1.0, 0.5],
  [2.6, 2, 1.8, 1.6, 1.4, 1.2, 1],
  [2.8, 2.2, 2, 1.8, 1.6, 1.4, 1.2],
  [3, 2.2, 2, 1.8, 1.6, 1.4],
  [3.2, 2.4, 2.2, 2, 1.8, 1.6],
]

const glycemiaPrevInput = document.querySelector('#glycemia-prev')
const glycemiaCurrInput = document.querySelector('#glycemia-curr')
const ratePrevInput = document.querySelector('#rate-prev')
const calculateBtn = document.querySelector('#calculate')
const rateCurrResult = document.querySelector('#rate-curr')

const findInterval = (num, edges) => {
  for (let i = 0; i < edges.length; i++) {
    if (num < edges[i]) return i
  }
  return edges.length
}

const calculateRate = () => {
  const glycemiaPrev = parseInt(glycemiaPrevInput.value)
  const ratePrev = parseInt(ratePrevInput.value)
  const glycemiaCurr = parseInt(glycemiaCurrInput.value)

  if (!glycemiaPrev || !glycemiaCurr || !ratePrev) {
    alert('Inserire tutti i valori')
    return
  }

  let result
  let i = findInterval(glycemiaCurr, glycemiaCurrEdges)

  switch (i) {
    case 0:
      result = 'Stop infusione, avvisa medico'
      break
    case glycemiaCurrEdges.length:
      result = 'Avvisa medico'
      break
    default:
      i--
      const j = findInterval(glycemiaPrev, glycemiaPrevEdges[i])
      result = coefficients[i][j].toFixed(1)
  }

  rateCurrResult.innerText = result
}

calculateBtn.onclick = calculateRate
