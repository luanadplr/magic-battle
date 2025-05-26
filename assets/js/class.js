// CREATE CHARACTER

class Character{
    _life = 1
    maxLife = 1
    attack = 0
    defense = 0
    constructor(name){
        this.name = name
    }
    get life(){
        return this._life
    }
    set life(newLife){
        return this._life = newLife < 0 ? 0 : newLife
    }
}

class Mage extends Character{
    constructor(){
        super('Mage')
        this._life = 100
        this.maxLife = this._life
        this.attack = 12
        this.defense = 10
    }
}

class Wanderer extends Character{
    constructor(){
        super('Wanderer')
        this._life = 80
        this.maxLife = this._life
        this.attack = 9
        this.defense = 16
    }
}

class Ursula extends Character{
    constructor(){
        super('Ursula')
        this._life = 112
        this.maxLife = this._life
        this.attack = 16
        this.defense = 9
    }
}

class Medea extends Character{
    constructor(){
        super('Medea')
        this._life = 100
        this.maxLife = this._life
        this.attack = 10
        this.defense = 12
    }
}

// CREATE STAGE

class Stage{
    constructor(magic, enemy, magicEl, enemyEl, log){
        this.magic = magic
        this.enemy = enemy
        this.magicEl = magicEl
        this.enemyEl = enemyEl
        this.log = log
    }

    // UPDATE ALL NAMES & SKILLS
    update(){

        const imgMagic = this.magicEl.querySelector('.character-img')
        const imgEnemy = this.enemyEl.querySelector('.character-img')

        //MAGIC
        this.magicEl.querySelector('.icon')
            .setAttribute('src', `./assets/imgs/icon/${this.magic.name}-icon.png`)
        this.magicEl.querySelector('.name').innerHTML = `${this.magic.name}`
        this.magicEl.querySelector('.attack').innerHTML = `${this.magic.attack}`
        this.magicEl.querySelector('.defense').innerHTML = `${this.magic.defense}`
        this.magicEl.querySelector('.max-life').innerHTML = `${this.magic.life}`
        this.magicEl.querySelector('.character-image')
            .setAttribute('src', `./assets/imgs/character/${this.magic.name}/${this.magic.name}-idle.gif`)
        this.magicEl.querySelector('.attack-button').addEventListener('click', ()=>{
            this.magicEl.querySelector('.character-image')
                .setAttribute('src', `./assets/imgs/character/${this.magic.name}/${this.magic.name}-attack.gif`)
            this.doAttack(
                this.enemy,
                this.magic,
                imgEnemy,
                imgMagic
            )
        })

        // ENEMY
        this.enemyEl.querySelector('.icon')
            .setAttribute('src', `./assets/imgs/icon/${this.enemy.name}-icon.png`)
        this.enemyEl.querySelector('.name').innerHTML = `${this.enemy.name}`
        this.enemyEl.querySelector('.attack').innerHTML = `${this.enemy.attack}`
        this.enemyEl.querySelector('.defense').innerHTML = `${this.enemy.defense}`
        this.enemyEl.querySelector('.max-life').innerHTML = `${this.enemy.life}`
        this.enemyEl.querySelector('.character-image')
            .setAttribute('src', `./assets/imgs/character/${this.enemy.name}/${this.enemy.name}-idle.gif`)
        this.enemyEl.querySelector('.attack-button').addEventListener('click', ()=>{
            this.enemyEl.querySelector('.character-image')
            .setAttribute('src', `./assets/imgs/character/${this.enemy.name}/${this.enemy.name}-attack.gif`)
            this.doAttack(
                this.magic,
                this.enemy,
                imgMagic,
                imgEnemy
            )
        })

        // KEY EVENTS
        window.addEventListener('keyup', (event)=>{
            event.preventDefault()
            if(event.key == 'Control'){
                this.magicEl.querySelector('.character-image')
                .setAttribute('src', `./assets/imgs/character/${this.magic.name}/${this.magic.name}-attack.gif`)
                this.doAttack(
                    this.enemy,
                    this.magic,
                    this.enemyEl.querySelector('.character-image')
                )
            } else if(event.key == 'Alt'){
                this.enemyEl.querySelector('.character-image')
                .setAttribute('src', `./assets/imgs/character/${this.enemy.name}/${this.enemy.name}-attack.gif`)
                this.doAttack(
                    this.magic,
                    this.enemy,
                    this.magicEl.querySelector('.character-image')
            )
            }
        })
    }

    changeLifebar(){
         //MAGIC
        let magicLife = (this.magic.life / this.magic.maxLife) * 100
        this.magicEl.querySelector('.bar').style.width = `${magicLife}%`

        //ENEMY
        let enemyLife = (this.enemy.life / this.enemy.maxLife)*100
        this.enemyEl.querySelector('.bar').style.width = `${enemyLife}%`
    }

    doAttack(attacked, attacking, imgAttacked, imgAttacking){

        const showWin = document.querySelector('#who-win')
        const winIcon = showWin.querySelector('#winnerIcon')
        const winName = showWin.querySelector('#winnerName')

        // VERIFY IF SOMEONE IS DEAD & SHOW WINNER MODAL
        if(attacked.life <= 0){
            this.log.addMessage(`💀 ${attacked.name} DIED`)
            imgAttacked.setAttribute('src', `./assets/imgs/character/${attacked.name}/${attacked.name}-death.gif`)
            winIcon
                .setAttribute('src', `./assets/imgs/icon/${attacking.name}-icon.png`)
            winName.innerHTML = `${attacking.name} WIN!`
            showWin.showModal()
            return
        } else if(attacking.life <= 0){
            this.log.addMessage(`💀 ${attacking.name} DIED`)
            imgAttacking.setAttribute('src', `./assets/imgs/character/${attacking.name}/${attacking.name}-death.gif`)
            winIcon
                .setAttribute('src', `./assets/imgs/icon/${attacked.name}-icon.png`)
            winName.innerHTML = `${attacked.name} WIN!`
            showWin.showModal()
            return
        }

        // ATTACK & DEFENSE FACTOR
        let attackFactor = (Math.random()*2).toFixed(2)
        let actualAttack = attacking.attack * attackFactor

        let defenseFactor = (Math.random()*2).toFixed(2)
        let actualDefense = attacked.defense * defenseFactor

        if(actualDefense < actualAttack){
            attacked.life -= actualAttack
            this.log.addMessage(`⚔️ ${attacked.name} took ${actualAttack} damage`)
        } else {
            this.log.addMessage(`🛡️ ${attacked.name} defended`)
        }

        // CHANGE IMAGE
        imgAttacked.setAttribute('src', `./assets/imgs/character/${attacked.name}/${attacked.name}-idle.gif`)

        this.changeLifebar()
    }

    // RESET ALL GAME
    
    reset(){
        window.location.reload(true)
    }
}

// CREATE LOG

class Log{
    list = []

    constructor(listEl){
        this.listEl = listEl
    }

    addMessage(message){
        this.list.unshift(message)
        this.render()
    }

    render(){
        this.listEl.innerHTML = ''
        for(let i in this.list){
            this.listEl.innerHTML += `<li>${this.list[i]}</li>`
        }
    }
}