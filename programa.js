const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let lembretes = []
executar()

function executar() {
    console.log("-*- -*- -*- Lembretes -*- -*- -*-")
    console.log(`
1. Adicionar lembrete
2. Listar lembretes
3. Editar lembrete
4. Marcar lembrete como concluído
5. Sair
`)
    rl.question("Escolha uma opção: ", opcao => {
        switch (opcao) {
            case '1':
                adicionar()
                break
            case '2':
                listar()
                executar()
                break
            case '3':
                editar()
                break
            case '4':
                marcarConcluido()
                break
            case '5':
                rl.close()
                break
            default:
                console.log("Opção inválida")
                break
        }
    })
}

function adicionar() {
    rl.question("Digite o que você ser lembrado: ", (lembrete) => {
        rl.question("Qual é o prazo para fazer isso? ", (prazo) => {
            lembretes.push({
                lembrete,
                prazo,
                concluido: false
            })
            console.log("Lembrete adicionado!")
            executar()
        })
    })
}

function listar() {
    if (lembretes.length == 0) {
        console.log("Nenhum lembrete cadastrado.")
    } else {
    console.log("Lembretes:")
    lembretes.forEach((lembrete, index) => {
        console.log(`${index + 1}. ${lembrete.lembrete} - ${lembrete.prazo} - ${lembrete.concluido ? "Concluído" : "Pendente"}`)
    })
    }
}

function editar() {
    listar()
    rl.question("Qual lembrete você deseja editar? ", (numeroDoLembrete) => {
        if (lembretes.length >= numeroDoLembrete && numeroDoLembrete > 0) {
            rl.question("Digite o novo lembrete: ", (lembrete) => {
                rl.question("Qual é o prazo para fazer isso? ", (prazo) => {
                    lembretes[numeroDoLembrete - 1] = {
                        lembrete,
                        prazo,
                        concluido: false
                    }
                    console.log("Lembrete editado!")
                    executar()
                })
            })
        } else {
            console.log("Lembrete não encontrado")
            executar()
        }
    })
}

function marcarConcluido() {
    listar()
    rl.question("Qual lembrete você deseja marcar como concluído? ", (numeroDoLembrete) => {
        if (lembretes.length >= numeroDoLembrete && numeroDoLembrete > 0) {
            lembretes[numeroDoLembrete - 1].concluido = true
            console.log("Lembrete marcado como concluído!")
            executar()
        } else {
            console.log("Lembrete não encontrado")
            executar()
        }
    })
}
