const magics = document.querySelector('.magics-options')
const magicInputs = magics.getElementsByTagName('input')

const enemys = document.querySelector('.enemy-options')
const enemyInputs = enemys.getElementsByTagName('input')

const log = new Log(
    document.querySelector('#log')
)

let chooseMagic
let chooseEnemy

// MAGIC
getMagic = (input) => {

    for(let i in input){
        if(input[i].checked) { 
            chooseMagic = input[i].value
            break 
        }
    }

    if(chooseMagic === 'Wanderer'){
        chooseMagic = new Wanderer()
    } else {
        chooseMagic = new Mage()
    }

}
// ENEMY
getEnemy = (input) =>{
    for(let i in input){
        if(input[i].checked) { 
            chooseEnemy = input[i].value
            break 
        }
    }

    if(chooseEnemy === 'Ursula'){
        chooseEnemy = new Ursula()
    } else {
        chooseEnemy = new Medea()
    }
}

// START GAME

function startGame(){
    const telaInicial = document.querySelector('#choose-fighter')
    const telaJogo = document.querySelector('#display')
    telaInicial.style.display = 'none'
    telaJogo.style.display = 'block'
}

// ON KEYUP SPACE

window.addEventListener('keyup', (event)=>{
    event.preventDefault()
    if(event.key === ' '){
        getMagic(magicInputs)
        getEnemy(enemyInputs)

        const stage = new Stage(
            chooseMagic,
            chooseEnemy,
            document.querySelector('#magic'),
            document.querySelector('#enemy'),
            log
        )
        
        stage.update()
        startGame()
        
        // MODAL AREA
        const reset = document.querySelector('#closeWhoWin')
        reset.addEventListener('click', ()=>{
            stage.reset()
        })
    }
})

// ON PRESS START

const btnStart = document.querySelector('#start')
btnStart.addEventListener('click', ()=>{
    getMagic(magicInputs)
    getEnemy(enemyInputs)

    const stage = new Stage(
        chooseMagic,
        chooseEnemy,
        document.querySelector('#magic'),
        document.querySelector('#enemy'),
        log
    )
    
    stage.update()
    startGame()
    
    // MODAL AREA
    const reset = document.querySelector('#closeWhoWin')
    reset.addEventListener('click', ()=>{
        stage.reset()
    })
})