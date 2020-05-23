"use strict";

window.addEventListener("DOMContentLoaded", setupStopwatch);


let accuracyIndex = "1";

function setupStopwatch() {
    const clock = document.getElementById("clock");
    const startStop = document.getElementById("start-stop");
    const midStart = document.getElementById("mid-start");
    const reset = document.getElementById("reset");
    const table = document.getElementById("table-result");

    let arrTime = [];
    let startTime = 0;
    let stopTime = 0;
    let intervalID = 0;
    let midStartTime = 0;
    let j = 0;

    midStart.addEventListener("click", function () {
        midStartTime = Date.now();
        arrTime.push(midStartTime);
        fillTable(arrTime);
    });

    startStop.addEventListener("click", function () {
        if (intervalID) {
            stopTime = Date.now();

            clearInterval(intervalID);
            intervalID = 0;

            startStop.textContent = "Старт";
            return;
        }

        if (startTime > 0) {
            const pauseTime = Date.now() - stopTime;
            startTime = startTime + pauseTime;
        } else {
            startTime = Date.now();
        }

        intervalID = setInterval(function () {
            const elapsedTime = Date.now() - startTime;
            clock.textContent = formatTime(elapsedTime);
        }, 100);

        startStop.textContent = "Стоп";
    });

    reset.addEventListener("click", function () {
        location.reload();
    });

    function formatTime(timestamp) {
        const d = new Date(timestamp);
        if (accuracyIndex === "1") {
            let minutes = d.getMinutes();
            if (minutes < 10) {
                minutes = "0" + minutes;
            }

            let seconds = d.getSeconds();
            if (seconds < 10) {
                seconds = "0" + seconds;
            }

            return minutes + ":" + seconds;
        }

        if (accuracyIndex === "0.001") {
            let minutes = d.getMinutes();
            if (minutes < 10) {
                minutes = "0" + minutes;
            }

            let seconds = d.getSeconds();
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            let milliSeconds = d.getMilliseconds();
            if (milliSeconds < 10) {
                milliSeconds = "0" + milliSeconds;
            }
            return minutes + ":" + seconds + ":" + milliSeconds;
        }

    }

    function fillTable(arrTime) {
        for (j; j < arrTime.length; j++) {
            if (startStop.innerText === 'Стоп') {
                var tr = document.createElement('tr');
                var td1 = document.createElement('td');
                var td2 = document.createElement('td');

                td1.innerHTML = j + 1;
                td2.innerHTML = formatTime(arrTime[j] - startTime);

                tr.appendChild(td1);
                tr.appendChild(td2);
                table.appendChild(tr);
            }
        }
    }
}
