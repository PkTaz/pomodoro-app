document.addEventListener('DOMContentLoaded', function () {
    let workDuration = 25 * 60;
    let breakDuration = 5 * 60;
    let timerDuration = workDuration;
    let timerInterval;
    let cycleCounter = 0;

    const timerDisplay = document.getElementById('timer');
    const startButton = document.getElementById('start');
    const pauseButton = document.getElementById('pause');
    const resetButton = document.getElementById('reset');
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
                // Timer reached 00:00, change background to light blue
                document.body.style.backgroundColor = '#ADD8E6'; // Light Blue

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
                updateTimerDisplay();
            }
        }, 1000);
    }

    function pauseTimer() {
        clearInterval(timerInterval);
    }

    function resetTimer() {
        clearInterval(timerInterval);
        cycleCounter = 0; // Reset cycle counter
        timerDuration = workDuration;
        document.body.style.backgroundColor = '#f0f0f0'; // Reset background color
        h1.textContent = "Pomodoro Clock"; // Reset heading text
        startTimer(); // Start the timer automatically after resetting
        updateTimerDisplay();
    }

    // Event listeners for buttons
    startButton.addEventListener('click', startTimer);
    pauseButton.addEventListener('click', pauseTimer);
    resetButton.addEventListener('click', resetTimer);

    // Initial display
    updateTimerDisplay();
});
