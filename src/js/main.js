const informationConfiguration = {
    option: 'pomodoro',
    color: '#F87070',
    time: ''
}


// This is the part POMODORO select option
const nameClassActive = 'pomodoro__option--active';
const pomodoroOptions = document.querySelectorAll(".pomodoro__option");

// reset values
const inputs = document.querySelectorAll(".pomodoro__input");
const btnApply = document.getElementById("apply");
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
    resetConfig(); /// aqui le voy agregar algo
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
const numberLong = /^\d{1,2}:\d{1,2}$/;
function saveInputLong(e) {
    let inputLong = e.currentTarget.value;
    if (inputLong.length == 2 && inputLong.slice(-1) !== ':') {
        inputLong += ":";
        e.currentTarget.value += ":";
    } 
    if (numberLong.test(inputLong)) {
        const [partOne, partTwo]  = inputLong.split(":");
        if (parseInt(partOne) > 0 && parseInt(partOne) < 61 && parseInt(partTwo) > 0 && parseInt(partTwo) < 61) {
            informationConfiguration.time = partOne.length == 1 ? partOne.padStart(2, '0') + ':' : partOne + ":";
            informationConfiguration.time += partTwo.length == 1 ? partTwo + '0' : partTwo;
            btnApply.disabled  = false;
            console.log(informationConfiguration);
            return;
        }
    } else {
        btnApply.disabled = true;
    }
}

minutesInput.addEventListener("input", saveInputPomodoro);
secondsInput.addEventListener("input", saveInputShort);
longInput.addEventListener("input", saveInputLong);










