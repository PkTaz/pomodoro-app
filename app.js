document.addEventListener('DOMContentLoaded', function () {
    let timerDuration = 25 * 60; // Initial value set to 25 minutes
    let timerInterval;

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
                // Timer reached 0:00, change background to light blue
                document.body.style.backgroundColor = '#ADD8E6'; // Light Blue

                // Check if it's a work session or break
                if (timerDuration === 0) {
                    // If it's a break, set the timer to 5 minutes and start it automatically
                    timerDuration = 5 * 60;
                    h1.textContent = "Break!";
                    startTimer();
                } else {
                    // If it's the end of a break, reset to work session
                    h1.textContent = "Pomodoro Clock";
                    timerDuration = 25 * 60;
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
        timerDuration = 25 * 60; // Reset to the initial duration for testing
        document.body.style.backgroundColor = '#f0f0f0'; // Reset background color
        h1.textContent = "Pomodoro Clock"; // Reset heading text
        updateTimerDisplay();
    }

    // Event listeners for buttons
    startButton.addEventListener('click', startTimer);
    pauseButton.addEventListener('click', pauseTimer);
    resetButton.addEventListener('click', resetTimer);

    // Initial display
    updateTimerDisplay();
});