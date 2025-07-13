const informationConfiguration = {
    option: 'pomodoro',
    color: '#F87070',
    font: 'Kumbh Sans',
    time: ''
}


// This is the part POMODORO select option
const nameClassActive = 'pomodoro__option--active';
const pomodoroOptions = document.querySelectorAll(".pomodoro__option");

// reset values
const inputs = document.querySelectorAll(".pomodoro__input");
const longInput = document.getElementById("long");
window.addEventListener("DOMContentLoaded", () => {
    addStyles(pomodoroOptions, nameClassActive);
    inputs.forEach(input => input.value = '');
    btnApply.disabled = true;
    longInput.value = '';
})
function selectOption(e) {
    const thisOption = e.currentTarget;
    informationConfiguration.option = thisOption.dataset.option;
    removeClass(pomodoroOptions, nameClassActive);
    thisOption.classList.add(nameClassActive);
    addStyles(pomodoroOptions, nameClassActive);
   
}
pomodoroOptions.forEach(o => o.addEventListener("click", selectOption));


function removeClass(elements, nameClass) {
    elements.forEach(element => element.classList.remove(nameClass));
}

function addStyles(elements, nameClass) {
    elements.forEach(element => {
        if (element.classList.contains(nameClass)) {
            element.style.backgroundColor = informationConfiguration.color;
        } else {
             element.style.backgroundColor = 'transparent';
        }
    })
}

// Enabled the inputs

const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");

function activationInput() {
        inputs.forEach(input => input.disabled = true);
        longInput.disabled = true;
        if (informationConfiguration.option === 'pomodoro') minutesInput.disabled = false;
        if (informationConfiguration.option === 'short') secondsInput.disabled = false;
        if (informationConfiguration.option === 'long') longInput.disabled = false;    
}





// START the configuration with press the button and CLOSE settings
const btnSettings = document.getElementById('btnSettings');
const btnClose = document.getElementById("btnClose");
const relojWindow = document.getElementById("reloj");
const settingsWindow  = document.getElementById("settingsWindow");
function showSettings() {
    relojWindow.style.display = 'none';
    settingsWindow.style.display = 'block';
    console.log(informationConfiguration);
    activationInput();
}
function closeSettings() {
    relojWindow.style.display = 'block';
    settingsWindow.style.display = 'none';
}

btnSettings.addEventListener('click', showSettings);
btnClose.addEventListener('click', closeSettings);



// Activate de btnValidate

// Valide the inputs
const number = /^\d{1,2}$/;

function saveInputPomodoro(e) {
    if(validateInput(e)) {
        btnApply.disabled = false; return;
    } 
    btnApply.disabled = true; return;
}

function saveInputShort(e) {
    if(validateInput(e)) {
        btnApply.disabled = false; return;
    } 
    btnApply.disabled = true; return;
}

function validateInput(e) {
    let input = e.currentTarget.value;
    console.log(input);
    if (number.test(input)) {
        if (parseInt(input) > 0 && parseInt(input) <= 60) {
            informationConfiguration.time = input.padStart(2, '0');
            console.log(informationConfiguration);
            return true;
        } 
    }
    return false;
}

// Valide the long
const numberLong = /^\d{1,2}:\d{2}$/;
function saveInputLong(e) {
    let inputLong = e.currentTarget.value;
    if (inputLong.length == 2 && inputLong.slice(-1) !== ':') {
        inputLong += ":";
        e.currentTarget.value += ":";
    } 
    if (numberLong.test(inputLong)) {
        let [partOne, partTwo]  = inputLong.split(":");
        if (parseInt(partOne) > 0 && parseInt(partOne) < 61 && parseInt(partTwo) > 0 && parseInt(partTwo) < 61) {
            informationConfiguration.time = partOne.length == 1 ? partOne.padStart(2, '0') + ':' : partOne + ":";
            let partTwoModify = partTwo.length == 1 ? partTwo + '0' : partTwo;
            if (parseInt(partTwoModify) < 61) {
                informationConfiguration.time += partTwoModify;
                console.log(informationConfiguration);
                btnApply.disabled  = false;
            } else {
                btnApply.disabled = true;
                return;
            }
        }
    } else {
        btnApply.disabled = true;
    }
}

minutesInput.addEventListener("input", saveInputPomodoro);
secondsInput.addEventListener("input", saveInputShort);
longInput.addEventListener("input", saveInputLong);


// Select fonts
const btnsFont = document.querySelectorAll(".pomodoro__font");
function addFont(e) {
    removeClass(btnsFont, 'pomodoro__font--active');
    const btnFont =  e.currentTarget;
    btnFont.classList.add("pomodoro__font--active");
    informationConfiguration.font = btnFont.dataset.font;
    console.log(informationConfiguration);
}

btnsFont.forEach(btn => btn.addEventListener("click", addFont));


// Select color
const btnsColor = document.querySelectorAll(".pomodoro__color");
function addColor(e) {
    removeClass(btnsColor, 'pomodoro__color--active');
    const btnColor = e.currentTarget;
    btnColor.classList.add("pomodoro__color--active");
    informationConfiguration.color = btnColor.dataset.color;
    console.log(informationConfiguration);
}

btnsColor.forEach(btn => btn.addEventListener("click", addColor));


let secondsPomodoro = 0;

// Apply all styles
const btnApply = document.getElementById("apply");
const body = document.querySelector("body");
const circle = document.getElementById("circle");
const timeMinutesShow = document.getElementById("timeMinutes");
const timeSecondsShow = document.getElementById("timeSeconds");
function putAllDetails(e) {
    e.preventDefault();
    goPomodoro();
    console.log(informationConfiguration);
    body.style.fontFamily = informationConfiguration.font;
    circle.style.borderColor = informationConfiguration.color;
    if (informationConfiguration.option === 'pomodoro') {
        timeMinutesShow.textContent = informationConfiguration.time;
        secondsPomodoro = parseInt(informationConfiguration.time) * 60;
    } 
    if (informationConfiguration.option === 'short') {
        timeSecondsShow.textContent = informationConfiguration.time;
        secondsPomodoro = parseInt(informationConfiguration.time);
    } 
    if (informationConfiguration.option === 'long') {
        const [minutes, seconds] = informationConfiguration.time.split(":");
        timeMinutesShow.textContent = minutes;
        timeSecondsShow.textContent = seconds;
        secondsPomodoro = parseInt(minutes) * 60 + parseInt(seconds);
    }
    addStyles(pomodoroOptions, nameClassActive);

    startPomodoro(secondsPomodoro);
}
function goPomodoro() {
    relojWindow.style.display = 'block';
    settingsWindow.style.display = 'none';
}



btnApply.addEventListener("click", putAllDetails);


// Start POMODORO
let interval = null;
let isPaused = false;
let currentSeconds = 0; 

function startPomodoro(seconds) {
    if (interval) return;
    currentSeconds = seconds;
    updateDisplay(currentSeconds);

    interval = setInterval(() => {
        currentSeconds--;

        if (currentSeconds <= 0) {
            clearInterval(interval);
            interval = null;
            updateDisplay(0);
            onPomodoroEnd();
            return;
        }

        updateDisplay(currentSeconds);
    }, 1000);
}

function tougglePauseResume() {
    const pomodoroPause = document.querySelector(".pomodoro__pause");
    if (interval) {
        // if Active interval, Paused
        clearInterval(interval);
        interval = null;
        isPaused = true;
        pomodoroPause.textContent = 'RESUME';
    } else if (isPaused) {
        // If pause, resume and deactivate isPaused
        pomodoroPause.textContent = 'PAUSE';
        interval ??= setInterval(() => {
            currentSeconds--;

            if (currentSeconds <= 0) {
                clearInterval(interval);
                interval = null;
                updateDisplay(0);
                onPomodoroEnd();
                return;
            }

            updateDisplay(currentSeconds);
        }, 1000);

        isPaused = false;
    }
}

function pause() {
    clearInterval(interval);
    interval = null;
}

function reset() {
    pause();
    currentSeconds = 0;
    updateDisplay(currentSeconds);
}

function updateDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    timeMinutesShow.textContent = String(minutes).padStart(2, '0');
    timeSecondsShow.textContent = String(secs).padStart(2, '0');
}

function onPomodoroEnd() {
    alert("¡Pomodoro completo! 🎉");
}


