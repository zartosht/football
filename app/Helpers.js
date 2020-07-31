"use strict"

function randomBetween(min = 0, max = 4) {
    return Math.random() * (max - min) + min
}

module.exports = {
    randomBetween
}