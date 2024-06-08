// client.js
document.addEventListener("DOMContentLoaded", function () {
    let timer;
    let timeLeft = 600;
    let prompts = ["Un Panqueque Volador"];
    let isRedBackground = false;

    const timerDisplay = document.getElementById("timer");
    const promptDisplay = document.getElementById("prompt");
    const titleDisplay = document.getElementById("title");
    const promptInput = document.getElementById("promptInput");
    const skipButton = document.getElementById("skipButton");
    const body = document.body;

    function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        const timerText = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
        timerDisplay.textContent = timerText;

        // Agrega o quita la clase de animación dependiendo del tiempo restante
        if (timeLeft <= 60) {
            timerDisplay.classList.add("timer-animation");
        } else {
            timerDisplay.classList.remove("timer-animation");
        }
    }

    function updatePrompt(newPrompt) {
        promptDisplay.textContent = newPrompt;
    }

    function showNextPrompt() {
        if (prompts.length > 0) {
            const nextPrompt = prompts.shift();
            updatePrompt(nextPrompt);
        } else {
            updatePrompt("¡Estoy Libre! Dame algo para Dibujar");
        }
    }

    function startTimer() {
        timer = setInterval(function () {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimer();
                if (timeLeft === 60 && !isRedBackground) {
                    body.style.backgroundColor = "red";
                    isRedBackground = true;
                    timerDisplay.classList.add("timer-animation");
                }
            } else {
                clearInterval(timer);
                if (isRedBackground) {
                    body.style.backgroundColor = "black";
                    promptDisplay.style.color = "white";
                    titleDisplay.style.color = "white";
                    timerDisplay.style.color = "white";
                    timerDisplay.classList.remove("timer-animation");
                    setTimeout(() => {
                        body.style.backgroundColor = "rgb(250, 203, 73)";
                        promptDisplay.style.color = "rgb(0, 0, 0)";
                        titleDisplay.style.color = "black";
                        timerDisplay.style.color = "#000";
                        isRedBackground = false;
                        timeLeft = 600;
                        updateTimer();
                        showNextPrompt();
                        startTimer();
                    }, 30000);
                } else {
                    timeLeft = 600;
                    updateTimer();
                    showNextPrompt();
                    startTimer();
                }
            }
        }, 1000);
    }

    function showSkipButton() {
        skipButton.style.display = "block";
    }

    function hideSkipButton() {
        skipButton.style.display = "none";
    }

    skipButton.addEventListener("click", function () {
        // Adelanta el temporizador a 01:00
        timeLeft = 60;
        updateTimer();

        // Realiza las acciones adicionales cuando el temporizador llega a 01:00
        if (timeLeft === 60 && !isRedBackground) {
            body.style.backgroundColor = "red";
            isRedBackground = true;
            timerDisplay.classList.add("timer-animation");

            // Agrega cualquier otra acción que desees realizar aquí
        }
    });

    // Agrega el evento para la tecla "|"
    document.addEventListener("keypress", function (event) {
        if (event.key === "|") {
            // Adelanta el temporizador a 01:00
            timeLeft = 60;
            updateTimer();

            // Realiza las acciones adicionales cuando el temporizador llega a 01:00
            if (timeLeft === 60 && !isRedBackground) {
                body.style.backgroundColor = "red";
                isRedBackground = true;
                timerDisplay.classList.add("timer-animation");

                // Agrega cualquier otra acción que desees realizar aquí
            }
        }
    });

    updateTimer();
    showNextPrompt();

    startTimer();

    promptInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            const newPrompt = promptInput.value;
            if (newPrompt.trim() !== "") {
                if (promptDisplay.textContent === "¡Estoy Libre! Dame algo para Dibujar") {
                    // Solo actualiza el h2 si está mostrando el mensaje predeterminado
                    updatePrompt(newPrompt);
                } else {
                    prompts.push(newPrompt);
                }
                promptInput.value = "";
            } else if (prompts.length === 0) {
                showNextPrompt(); // Muestra el nuevo prompt si la lista está vacía
            }
        }
    });

    // Muestra la lista de prompts en la consola cada 5 segundos
    setInterval(function () {
        console.log("Lista de Prompts:", prompts);
    }, 5000);
});
