document.addEventListener('DOMContentLoaded', function () {
    let workDuration = 5;
    let breakDuration = 5 * 60;
    let timerDuration = workDuration;
    let timerInterval;
    let cycleCounter = 0;

    const timerDisplay = document.getElementById('timer');
    const startButton = document.getElementById('start');
    const pauseButton = document.getElementById('pause');
    const h1 = document.querySelector('h1');

    function updateTimerDisplay() {
        const minutes = Math.floor(timerDuration / 60);
        const seconds = timerDuration % 60;
        const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        timerDisplay.textContent = formattedTime;
    }

    function startTimer() {
        timerInterval = setInterval(function () {
            if (timerDuration > 0) {
                timerDuration--;
                updateTimerDisplay();
            } else {
                clearInterval(timerInterval);

                if (timerDuration === 0) {
                    // Check if it's the end of a work session or break
                    if (cycleCounter % 2 === 0) {
                        // If it's the end of a work session, switch to break
                        h1.textContent = "Break!";
                        timerDuration = breakDuration;
                    } else {
                        // If it's the end of a break, switch to work session
                        h1.textContent = "Pomodoro Clock";
                        timerDuration = workDuration;
                    }
                    cycleCounter++;
                    startTimer(); // Start the timer automatically
                }

                // Flash effect during the break
                if (cycleCounter % 2 !== 0) {
                    flashBackground('#2ecc71', '#fff'); // Flash to green and then turn blue
                }

                updateTimerDisplay();
            }
        }, 1000);
    }

    function flashBackground(color1, color2) {
        let flashCount = 0;
        const flashInterval = setInterval(function () {
            if (flashCount % 2 === 0) {
                document.body.style.backgroundColor = color1;
            } else {
                document.body.style.backgroundColor = color2;
            }

            flashCount++;
        }, 500);

        // Resets the background after 5 seconds
        setTimeout(function () {
            clearInterval(flashInterval);
            document.body.style.backgroundColor = ''; // Set the final color
        }, 5000);
    }

    function pauseTimer() {
        clearInterval(timerInterval);
    }

    // Event listeners for buttons
    startButton.addEventListener('click', startTimer);
    pauseButton.addEventListener('click', pauseTimer);

    // Initial display
    updateTimerDisplay();

    function updateClock() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        // Convert to 12-hour format
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;

        document.getElementById('hour').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minute').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('second').textContent = seconds.toString().padStart(2, '0') + ' ' + ampm;
    }

    // Update the clock every second
    setInterval(updateClock, 1000);

    // Initial update
    updateClock();
});

