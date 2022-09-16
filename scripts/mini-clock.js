class MiniClock {
    initialize() {
        var div = document.createElement('div');
        div.id = 'timer';
        this.displayTime(div);
        setInterval(() => {
            this.displayTime(div)
        }, 1000)
        document.body.appendChild(div);
    }

    displayTime(div) {
        var date = new Date, hour = date.getHours().toLocaleString().length == 1 ? `0${date.getHours()}` : date.getHours().toLocaleString(), minutes = date.getMinutes().toLocaleString().length == 1 ? `0${date.getMinutes()}` : date.getMinutes().toLocaleString(), seconds = date.getSeconds().toLocaleString().length == 1 ? `0${date.getSeconds()}` : date.getSeconds().toLocaleString();
        div.innerText = `${hour}:${minutes}:${seconds}`;
    }
}
var miniClock = new MiniClock;
miniClock.initialize();