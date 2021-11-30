const clock = document.querySelector("h2#clock")




function GetClock() {
    const date = new Date()
    let hour = date.getHours().toString().padStart(2,"0")
    let minute = date.getMinutes().toString().padStart(2,"0")
    let second = date.getSeconds().toString().padStart(2,"0")

    // if (hour.toString().length==1) hour = "0" + hour;

	// if (minute.toString().length==1) minute = "0" + minute;

	// if (second.toString().length==1) second = "0" + second;



    clock.innerText = `${hour}:${minute}:${second}`
}


GetClock()
setInterval(GetClock, 1000)





