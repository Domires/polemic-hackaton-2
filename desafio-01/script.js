document.querySelector('form').onsubmit = e => e.preventDefault()

const input = _ => document.querySelector('input').value

document.querySelector('button').onclick = _ => verificarCartao(input())

const output = document.querySelector('p')

function verificarCartao(input) {

    const formatarInput = input.toString().replace(/\s+/g, '')

    const arrInvertido = formatarInput.split('').reverse().map(e => parseInt(e))

    const dobrarIndiceImpar = arrInvertido.map((e, i) => i % 2 !== 0 ? e * 2 : e)

    const somarNmrsComDoisDigitos = dobrarIndiceImpar.map(e => {
        if (e.toString().length === 2) {
            const numbers = e.toString().split('')
            return parseInt(numbers[0]) + parseInt(numbers[1])
        }
        return e
    })

    const somarTodos = somarNmrsComDoisDigitos.reduce((total, current) => total + current)

    if (somarTodos === 0) return

    const resultado = somarTodos % 10 === 0 ? true : false

    bandeira = pegarBandeira(formatarInput)

    if (resultado) {
        output.style.color = 'green'
        output.textContent = `cartão ${bandeira} válido`
    } else {
        output.style.color = 'red'
        output.textContent = `cartão ${bandeira} inválido`
    }


}

function pegarBandeira(formatarInput) {
    let bandeira = ''
    if (formatarInput[0] === '4') bandeira = 'visa'
    if (formatarInput[0] === '5') bandeira = 'mastercard'
    if (formatarInput.slice(0, 2) === '35') bandeira = 'jbc'
    if (formatarInput.slice(0, 2) === '50') bandeira = 'aura'
    const amex = ['34', '37']
    const hipercard = ['38', '60']
    const diners = ['301', '305', '36', '38']
    const discover = ['6011', '622', '64', '65']
    const elo = ['636368', '636369', '438935', '504175', '451416', '636297', '5067', '4576', '4011', '506699']
    amex.forEach(e => { if (e === formatarInput.slice(0, 2)) bandeira = 'amex' })
    hipercard.forEach(e => { if (e === formatarInput.slice(0, 2)) bandeira = 'hipercard' })
    diners.forEach(e => { if (e === formatarInput.slice(0, 3) || e === formatarInput.slice(0, 2)) bandeira = 'diners' })
    discover.forEach(e => { if (e === formatarInput.slice(0, 4) || e === formatarInput.slice(0, 3) || e === formatarInput.slice(0, 2)) bandeira = 'discover' })
    elo.forEach(e => { if (e === formatarInput.slice(0, 6) || e === formatarInput.slice(0, 4)) bandeira = 'elo' })
    return bandeira
}