let partida = 0
let inputIndice = 0
let letra = ''
let btnIndice = 2

function inputAtual() {
    let input = ['.input-1', '.input-2', '.input-3', '.input-4', '.input-5'][inputIndice]
    inputIndice += 1
    return input
}

function gerarLetra() {
    const letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

    const rdn = Math.floor(Math.random() * 26)

    return letras[rdn]
}

function imprimirLetra(letra) {
    const letrasContainer = document.querySelector('.letras-container')

    let div = document.createElement('div')

    div.innerText = letra

    letrasContainer.appendChild(div)
}

function validarInput(indice, inputs, letra) {
    const input = inputs[indice]
    const str = input.value.toLowerCase()
    if (str[0] !== letra) {
        input.style.backgroundColor = 'tomato'
        input.style.value = ''
        input.setAttribute('resultado', '0')
        return
    }
    input.style.backgroundColor = '#00aaaa'
    input.setAttribute('resultado', '10')
}

function habilitarInput() {
    const input = inputAtual()
    const inputs = document.querySelectorAll(input)
    inputs.forEach((e, indice) => {
        e.removeAttribute('disabled')
        e.style.backgroundColor = '#fff'
        e.onchange = _ => validarInput(indice, inputs, letra)
    })
}

function desabilitarInput(nmr) {
    const input = `.input-${nmr}`
    const inputs = document.querySelectorAll(input)
    inputs.forEach(e => {
        e.setAttribute('disabled', 'disabled')
    })
}

function desabilitarBtn(nmr) {
    const btn = document.querySelector(`.btn-${nmr}`);

    btn.setAttribute('disabled', 'disabled');
}

function imprimirPontos(nmr) {
    const btn = document.querySelector(`.btn-${nmr}`)

    let result = 0

    document.querySelectorAll(`.input-${nmr}`).forEach(e => {
        if (e.getAttribute('resultado')) result += parseInt(e.getAttribute('resultado'))
    })

    if(result === NaN) result = 0

    btn.innerText = result
}

function verificarPartida() {
    const quantidadeDeLetras = document.querySelector('.letras-container').childElementCount

    if (partida >= 0 && partida <= 1 && quantidadeDeLetras < 1) return true
    if (partida === 2 && partida === quantidadeDeLetras + 1) return true
    if (partida === 3 && partida === quantidadeDeLetras + 1) return true
    if (partida === 4 && partida === quantidadeDeLetras + 1) return true
    if (partida === 5 && partida === quantidadeDeLetras + 1) return true
    return false
}

document.querySelector('#btn-g').onclick = _ => {
    const iniciar = verificarPartida()

    if (!iniciar) return alert('Você só pode gerar uma letra por partida')

    letra = gerarLetra()

    imprimirLetra(letra)

    const letrasContainer = document.querySelector('.letras-container')
    const quantidadeDeFilhos = letrasContainer.childNodes.length
    const quantidadeDeLetras = letrasContainer.childElementCount

    if (quantidadeDeLetras > 1) letrasContainer.childNodes[quantidadeDeFilhos - 2].style.backgroundColor = '#4b967d55'
    if (quantidadeDeLetras > 1) letrasContainer.childNodes[quantidadeDeFilhos - 2].style.border = '#29524455'
    if (quantidadeDeLetras > 1) letrasContainer.childNodes[quantidadeDeFilhos - 2].style.color = '#00000055'
}


document.querySelectorAll('.start').forEach(e => {
    e.onclick = _ => {
        const quantidadeDeLetras = document.querySelector('.letras-container').childElementCount

        if (quantidadeDeLetras < partida) return alert('Você deve gerar uma letra!')
        if (partida === 0) { e.innerText = 'STOP!' }
        if (partida === 1) { desabilitarInput(1); desabilitarBtn(1); imprimirPontos(1) }
        if (partida === 2) { desabilitarInput(2); desabilitarBtn(2); imprimirPontos(2) }
        if (partida === 3) { desabilitarInput(3); desabilitarBtn(3); imprimirPontos(3) }
        if (partida === 4) { desabilitarInput(4); desabilitarBtn(4); imprimirPontos(4) }
        if (partida === 5) { desabilitarInput(5); desabilitarBtn(5); imprimirPontos(5) }
        habilitarInput()

        if (btnIndice <= 5) document.querySelector(`.btn-${btnIndice}`).removeAttribute('disabled')

        partida++
        btnIndice++
    }
})
