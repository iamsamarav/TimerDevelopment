window.onload = function () {

    const btnStart = document.querySelector("#start")
    const btnPause = document.getElementById('pause')
    const btnResume = document.getElementById('resume')
    const btnAdd = document.getElementById('add')
    const btnSaved = document.getElementById('saved')
    const sidebar = document.getElementById('sidebar')
    const align = document.getElementById('align')
    const btnCancel = document.getElementById('cancel')
    const btnRefresh = document.getElementById('refresh')
    let i = 1
    
    btnStart.addEventListener('click', () => {
        const durationStart = getSelectTime()
        btnStart.style.display = "none"
        btnPause.style.display = "flex"
        btnRefresh.style.display = "flex"
        
        cycle = new timer(durationStart)
        cycle.cycleTimer()
    })

    btnRefresh.addEventListener('click', () =>{
        let intervalRefresh = cycle.getInterval()
        clearInterval(intervalRefresh)

        let displayHour = document.querySelector("#display-hour")
        let displayMinute = document.querySelector("#display-minute")
        let displaySecond = document.querySelector("#display-second")

        displayHour.innerHTML = "00"
        displayMinute.innerHTML = "00"
        displaySecond.innerHTML = "00"

        btnPause.style.display = "none"
        btnRefresh.style.display = "none"
        btnStart.style.display = "flex"
    })

    btnPause.addEventListener('click', () => {
        let interval = cycle.getInterval()
        clearInterval(interval)
        const timerNow = cycle.getTimer()
        let displayHour = document.querySelector("#display-hour")
        let displayMinute = document.querySelector("#display-minute")
        let displaySecond = document.querySelector("#display-second")
        const Hours = getHours(timerNow)
        const Minutes = getMinutes(timerNow)
        const Seconds = getSeconds(timerNow)
        displayHour.innerHTML = `${Hours}`
        displayMinute.innerHTML = `${Minutes}`
        displaySecond.innerHTML = `${Seconds}`
        btnPause.style.display = "none"
        btnResume.style.display = "flex"
    })

    btnResume.addEventListener('click', () => {
        durationResume = cycle.getInterval()
        btnResume.style.display = "none"
        btnPause.style.display = "flex"
        cycle.cycleTimer(durationResume)
    })

    btnAdd.addEventListener('click', () => {
        const durationAdd = getSelectTime()
        const displayHours = getHours(durationAdd)
        const displayMinutes = getMinutes(durationAdd)
        const displaySeconds = getSeconds(durationAdd)
        const elementSaved = document.createElement('button')
        elementSaved.style.backgroundColor = "#34344e";
        elementSaved.style.display = "block";
        elementSaved.style.marginTop = "0.4rem";
        elementSaved.style.marginBottom = "0.4rem"
        elementSaved.style.backgroundColor = 'white'
        elementSaved.style.height = '2rem'
        elementSaved.style.width = '100%'
        elementSaved.style.border = 'none'
        elementSaved.innerHTML = `${displayHours} : ${displayMinutes} : ${displaySeconds}`
        sidebar.insertBefore(elementSaved, sidebar.childNodes[i])
        elementSaved.setAttribute("id", i.valueOf())
        i++
        let listChild = Array.from(sidebar.childNodes)
        const result = listChild.filter(element => element.textContent == elementSaved.textContent)
        listChild = listChild.filter((n) => {
            return !result.includes(n)
        })
        sidebar.childNodes.forEach((element) => {
            let ind = 0
            if(element.textContent==result[ind].textContent) {
                sidebar.removeChild(element)
                ind++
            } else {
                ind = ind
            }
        })
        sidebar.insertBefore(elementSaved, sidebar.childNodes[i])
        listChild.push(elementSaved)
        listChild.forEach((element) => console.log(element))
       
        align.style.display = 'flex';
        align.style.justifyContent = 'center';
        btnSaved.style.display = "block";
    })

    btnSaved.addEventListener('click', () => {
        if (sidebar.style.display == 'none') {
            sidebar.style.display = "flex"
            sidebar.style.flexDirection = "column"
            sidebar.style.alignItems = "center"
            sidebar.style.justifyContent = "flex-start"
        } else {
            sidebar.style.display = 'none'
        }
    })

    sidebar.addEventListener('click', (e) => {
        let element = e.target
        let id = element.id
        console.log(id)
        let hours = sidebar.childNodes[id].textContent.substring(0, 2)
        let minutes = sidebar.childNodes[id].textContent.substring(5, 7)
        let seconds = sidebar.childNodes[id].textContent.substring(10, 13)
        hours = parseInt(hours)
        minutes = parseInt(minutes)
        seconds = parseInt(seconds)

        let displayHour = document.getElementById("hour")
        let displayMinute = document.getElementById("minute")
        let displaySecond = document.getElementById("second")

        displayHour.value = hours
        displayMinute.value = minutes
        displaySecond.value = seconds
    })

    function getHours(time) {
        hours = Math.floor((time / 60) / 60)
        hours = hours < 10 ? '0' + hours : hours
        return hours
    }

    function getMinutes(time) {
        minutes = Math.floor(time / 60 - (hours * 60))
        minutes = minutes < 10 ? '0' + minutes : minutes
        return minutes
    }

    function getSeconds(time) {
        seconds = Math.floor(time % 60)
        seconds = seconds < 10 ? '0' + seconds : seconds
        return seconds
    }

    function getSelectTime() {
        const hours = document.querySelector("#hour")
        const minutes = document.querySelector("#minute")
        const seconds = document.querySelector("#second")

        let duration = (parseInt(hours.value) * 60 * 60) + (parseInt(minutes.value) * 60) + (parseInt(seconds.value))
        return duration
    }

    class timer {
        constructor(duration) {
            this.timer = duration
        }

        getTimer() {
            return this.timer
        }

        getInterval() {
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
                    var audio = new Audio('assets/audio.mpeg')
                    audio.addEventListener('canplay', function() {
                        audio.play();
                    });
                    btnCancel.addEventListener('click', function(){
                        audio.pause();
                        btnStart.style.display = "flex"
                        btnCancel.style.display = "none"
                    })
                    clearInterval(this.interval)
                    btnCancel.style.display = "flex"
                    btnResume.style.display = "none";
                    btnPause.style.display = "none";
                    btnRefresh.style.display = "none"
                }
            }, 1000)
        }
    }
}