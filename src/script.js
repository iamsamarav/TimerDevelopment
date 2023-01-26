window.onload=function(){
    const btnStart = document.querySelector(".btn-start")

btnStart.addEventListener('click', () => {
    const hours = document.querySelector("#hour")
    const minutes = document.querySelector("#minute")
    const seconds = document.querySelector("#second")

    let duration = (parseInt(hours.value) * 60 * 60) +
    (parseInt(minutes.value) * 60) + (parseInt(seconds.value))

    let display = document.querySelector("#timer")
    timer(duration, display)
})

const timer = (duration, display) => {
    let timer = duration
    let hours, minutes, seconds

    setInterval(() => {
        hours = Math.floor((timer / 60) / 60)
        minutes = Math.floor(timer/60)
        seconds = Math.floor(timer % 60)

        hours = hours < 10 ? '0' + hours : hours
        minutes = minutes < 10 ? '0' + minutes : minutes
        seconds = seconds < 10? '0' + seconds : seconds

        display.innerHTML = `${hours}:${minutes}:${seconds}`

        timer -= 1

        if (timer < 0) {
            display.innerHTML = 'Acabou'
        }
    }, 1000)
}}