const express = require('express');
const app = express();

app.get('/lotto', (req, res) => {
    const {numbers} = req.query
    var numbersInt = numbers.map(function (x) { 
        return parseInt(x); 
      });
    const mainNumbers = Array(20).fill(1).map((_, i) => i + 1);
    const rightNumbers = []
    for(let i = 0; i < 6; i++) {
        const randomNumber = Math.floor(Math.random() * mainNumbers.length)
        rightNumbers.push(mainNumbers[randomNumber])
        mainNumbers.splice(randomNumber, 1)
    }
    let diff = rightNumbers.filter(n => numbersInt.includes(n))
    let response = "Sorry, you lose!"
    if( diff.length === 0) {
        response = "Wow! Unbelievable! You could have won the mega millions!"
    }
    if(diff.length === 1) {
       response = "Congratulations! You win $100!"
    }
    if(diff.length === 2) {
       response = "Congratulations, you win a free ticket!"
    }
    
    res.send(response)
})

app.get('/cipher', (req, res) => {
    const {text, shift} = req.query
    const cipherText = text.split('').map(character => {
        const characterCode = parseInt(character.charCodeAt(0))
        const isUpper = characterCode >= 65 && characterCode <= 90
        const isLower = characterCode >= 97 && characterCode <= 122
        const isLetter = isUpper || isLower
        if(isLetter) {
            let shiftedLetter = characterCode + parseInt(shift)
            if(isUpper && shiftedLetter > 90) {
                shiftedLetter -= 65
            }
            if(isLower && shiftedLetter > 122) {
                shiftedLetter -= 97
            } 
            return String.fromCharCode(shiftedLetter)
        }
        return character
    })
    .join('')
    res.send(cipherText)
})

app.get('/sum', (req, res) => {
    const {a ,b} = req.query
    const sum = parseInt(a) + parseInt(b) 
    res.send(`The sum of ${a} and ${b} is ${sum}`)
})
const port = 5000
app.listen(port, () => {
    console.log(`The server is started on port ${port}`)
})

