window.onload = function () {

    const btnStart = document.querySelector("#start")
    const btnPause = document.getElementById('pause')
    const btnResume = document.getElementById('resume')
    const btnAdd = document.getElementById('add')
    const btnSaved = document.getElementById('saved')
    const sidebar = document.getElementById('sidebar')
    const align = document.getElementById('align')

    btnStart.addEventListener('click', () => {
        const hours = document.querySelector("#hour")
        const minutes = document.querySelector("#minute")
        const seconds = document.querySelector("#second")

        let duration = (parseInt(hours.value) * 60 * 60) +(parseInt(minutes.value) * 60) + (parseInt(seconds.value))

        btnStart.style.display = "none"
        btnPause.style.display = "block";

        cycle = new timer(duration)
        cycle.cycleTimer()
    })

    btnPause.addEventListener('click', () => {
        let interval = cycle.getInterval()
        clearInterval(interval)
        const timerNow = cycle.getTimer()
        console.log(timerNow)
        let displayHour = document.querySelector("#display-hour")
        let displayMinute = document.querySelector("#display-minute")
        let displaySecond = document.querySelector("#display-second")
        hours = Math.floor((timerNow / 60) / 60)
        minutes = Math.floor(timerNow / 60 - (hours * 60))
        seconds = Math.floor(timerNow % 60)

        hours = hours < 10 ? '0' + hours : hours
        minutes = minutes < 10 ? '0' + minutes : minutes
        seconds = seconds < 10 ? '0' + seconds : seconds

        displayHour.innerHTML = `${hours}`
        displayMinute.innerHTML = `${minutes}`
        displaySecond.innerHTML = `${seconds}`

        btnPause.style.display = "none"
        btnResume.style.display = "flex"

    })

    btnResume.addEventListener('click', () => {
        duration = cycle.getInterval()
        btnResume.style.display = "none"
        btnPause.style.display = "flex"
        cycle.cycleTimer(duration)
    })

    btnAdd.addEventListener('click', () => {
        let i = 0
        const hours = document.querySelector("#hour")
        const minutes = document.querySelector("#minute")
        const seconds = document.querySelector("#second")

        let duration = (parseInt(hours.value) * 60 * 60) +(parseInt(minutes.value) * 60) + (parseInt(seconds.value))

        let displayhours = Math.floor((duration / 60) / 60)
        let displayminutes = Math.floor( duration/ 60 - (displayhours * 60))
        let displayseconds = Math.floor( duration % 60)

        const elementSaved = document.createElement('button')
        elementSaved.style.backgroundColor = "#34344e";
        elementSaved.style.display = "block";
        elementSaved.style.marginTop = "0.4rem";
        elementSaved.style.marginBottom = "0.4rem"
        elementSaved.style.backgroundColor = 'white'
        elementSaved.style.border = 'none'
        elementSaved.innerHTML = `${displayhours} : ${displayminutes} : ${displayseconds}`
        sidebar.insertBefore(elementSaved, sidebar.childNodes[i])
        i++

        if (elem)
        align.style.display = 'flex';
        align.style.justifyContent = 'center';
        btnSaved.style.display = "block";
    })

    btnSaved.addEventListener('click', () =>{
        sidebar.style.display = "flex"
        sidebar.style.flexDirection = "column"
        sidebar.style.alignItems = "center"
        sidebar.style.justifyContent = "flex-start"
        
    })

    class timer {
        constructor(duration) {
            this.timer = duration
        }

        getTimer() {
            return this.timer
        }

        getInterval(){
            return this.interval
        }
        cycleTimer() {
            let displayHour = document.querySelector("#display-hour")
            let displayMinute = document.querySelector("#display-minute")
            let displaySecond = document.querySelector("#display-second")
            let hours, minutes, seconds
            this.interval = setInterval(() => {
                hours = Math.floor((this.timer / 60) / 60)
                minutes = Math.floor(this.timer / 60 - (hours * 60))
                seconds = Math.floor(this.timer % 60)

                hours = hours < 10 ? '0' + hours : hours
                minutes = minutes < 10 ? '0' + minutes : minutes
                seconds = seconds < 10 ? '0' + seconds : seconds

                displayHour.innerHTML = `${hours}`
                displayMinute.innerHTML = `${minutes}`
                displaySecond.innerHTML = `${seconds}`

                this.timer -= 1

                if (this.timer < 0) {
                    clearInterval(this.interval)
                    btnResume.style.display = "none";
                    btnPause.style.display = "none";
                    btnStart.style.display = "flex";
                }
            }, 1000)
        }
    }
}