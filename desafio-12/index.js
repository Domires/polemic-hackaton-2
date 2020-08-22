const readline = require('readline')

function hackerSpeak(input) {
    return input.replace(/a/gi, '4').replace(/e/gi, '3').replace(/o/gi, '0').replace(/i/gi, '1')
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question('Digite sua string:', (input) => {
    const strCodificada = hackerSpeak(input)
    console.log(`${strCodificada}`)
    rl.close()
})
