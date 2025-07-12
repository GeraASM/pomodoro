const saveOptions = {
    option: 'pomodoro',
    font: "Kumbh Sans",
    color: "#F87070",
    time: 0
}
const options = document.querySelectorAll(".pomodoro__option");
window.addEventListener("DOMContentLoaded", () => {
    addColorOption();
})
function addColorOption() {
    options.forEach(o => {
        if (o.classList.contains('pomodoro__option--active')) {
            o.style.backgroundColor = saveOptions.color;
        }
    });
}


function removeColorOption() {
    options.forEach(o => {
        if (o.classList.contains('pomodoro__option--active')) {
            o.style.backgroundColor = 'transparent';
        }
    });
}



function selectOption(e) {
    removeColorOption();
    optionsRemoveClass(options, "pomodoro__option--active");
    const optionClick = e.currentTarget;
    saveOptions.option = optionClick.dataset.option;
    console.log(saveOptions.option);
    optionClick.classList.add("pomodoro__option--active");
    optionClick.style.backgroundColor = saveOptions.color;
    
}

options.forEach(o => o.addEventListener("click", selectOption));
// Fonts
const optionsFonts = document.querySelectorAll(".pomodoro__font");  
function addFont(e) {
    optionsRemoveClass(optionsFonts, "pomodoro__font--active");
    const fontSelect = e.currentTarget;
    saveOptions.font = fontSelect.dataset.font;
    console.log(saveOptions.font);
    fontSelect.classList.add("pomodoro__font--active");
}
optionsFonts.forEach(o => o.addEventListener("click", addFont))

// Colors
const optionsColor = document.querySelectorAll(".pomodoro__color");
function addColor(e) {
    optionsRemoveClass(optionsColor, "pomodoro__color--active");
    const colorSelect = e.currentTarget;
    saveOptions.color = colorSelect.dataset.color;
    console.log(saveOptions.color);
    colorSelect.classList.add("pomodoro__color--active"); 
}
optionsColor.forEach(o => o.addEventListener("click", addColor))


function optionsRemoveClass(optionsClass, nameClass) {
    optionsClass.forEach(o => o.classList.remove(nameClass));
}

const btnSettings = document.getElementById("btnSettings");
const reloj = document.getElementById("reloj");
const settingsWindow = document.getElementById("settingsWindow");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const long = document.getElementById("long");
const btnApply = document.getElementById("apply");
const inputs = document.querySelectorAll(".pomodoro__input");
const inputLong = document.getElementById("long");
btnSettings.addEventListener("click", (e) => {
    setTimeout(() => {
        reloj.style.display = 'none'; settingsWindow.style.display = 'block';
    }, 200);
    inputs.forEach(input => input.disabled = true);
    if (saveOptions.option === 'pomodoro') minutes.disabled = false;
    if (saveOptions.option === 'short') seconds.disabled = false;
    if (saveOptions.option === 'long') long.disabled = false;    
    btnApply.disabled = true;
    console.log("Configuration initial in the form: ", saveOptions);
})

function btnApplyActive(e) {
    const input = e.currentTarget;
    const isCorrectNumber = validateInput(input.value, input);
    if (isCorrectNumber) {
        btnApply.disabled = false; return;
    }    
    return btnApply.disabled = true;
}

const numberCorrect = /\d{1,2}/;
function validateInput(number, inputOption) {
    if (number && numberCorrect.test(number)) {
        const numberInt = parseInt(number);
        if (numberInt > 0 && numberInt <= 60) {
            saveOptions.time = numberInt;
            console.log("Values when all is Correct!", saveOptions);
            // Here I will use localStorage.setItem() in the future;
            return true;
        } else {
            console.log("Remember input a number between 1 to 60!");
        }
    }
    return false;
}
inputs.forEach(i => i.addEventListener("input", btnApplyActive));
const valueCorrect = /^\d{1,2}:\d{1,2}$/;
let saveInput;
function validateLong(e) {
    console.log(e.currentTarget.value);
    let time = e.currentTarget.value;
    let timeModify = time.padStart(2, '0');
    console.log(timeModify);
    e.currentTarget.value = timeModify;
    if (timeModify.length == 2 && timeModify.slice(-1) !== ':' && numberCorrect.test(timeModify)) {
        timeModify += ':';
        e.currentTarget.value += ':';
    }
    if (valueCorrect.test(timeModify)) {
        saveInput = timeModify.split(':');
        console.log(saveInput);
        btnApply.disabled = false;
        return
    } else {
        btnApply.disabled = true;
    }
}
inputLong.addEventListener("input", validateLong);

// Add all styles, colors and times
const circleBorder = document.getElementById("circle");
const body = document.querySelector("body");
const minutesShow = document.getElementById("timeMinutes");
const secondsShow = document.getElementById("timeSeconds");


function applyConfiguration(e) {
    e.preventDefault();
    setTimeout(() => {
        reloj.style.display = 'block'; 
        settingsWindow.style.display = 'none';
    }, 50);
    body.style.fontFamily = saveOptions.font;
    circleBorder.style.borderColor = saveOptions.color;
    minutesShow.textContent = saveOptions.option === 'pomodoro' ? (saveOptions.time).toString().padStart(2, '0') : '00';
    secondsShow.textContent = saveOptions.option === 'short' ? (saveOptions.time).toString().padStart(2, '0') : '00';
    if (saveOptions.option === 'long') {
        let unionTime = '';
        const [partOne, partTwo] = saveInput;
        if (partOne && partTwo) {
            unionTime += partOne + ':';
            minutesShow.textContent = partOne;
            if (partTwo.length == 1) {
                const secondsLong = partTwo + '0';
                unionTime += secondsLong;
                secondsShow.textContent = secondsLong;

            } else {secondsShow.textContent = partTwo; unionTime += partTwo;}
        }
        saveOptions.time = unionTime || '00:00';
        console.log(saveOptions);
    }
    
    options.forEach(o => {
        if (o.classList.contains("pomodoro__option--active")) {
            o.style.backgroundColor = saveOptions.color;
        }
        
    })
    resetValueInput();
}
// let interval = null;

// function startTime(option) {
//     clearInterval(interval); // Para evitar múltiples intervalos activos

//     let totalSeconds;

//     if (option === 'pomodoro') {
//         totalSeconds = saveOptions.time * 60;  // para manejar en segundo debemos convertir a segundos en el podomoro
//     } else if (option === 'short') {
//         totalSeconds = saveOptions.time;
//     } else if (option === 'long') {
//         const [min, sec] = saveOptions.time.split(":");
//         totalSeconds = parseInt(min) * 60 + parseInt(sec);
//     }

//     updateDisplay(totalSeconds); // Mostrar valores iniciales

//     interval = setInterval(() => {
//         totalSeconds--;

//         if (!totalSeconds || totalSeconds <= 0) {
//             clearInterval(interval);
//             console.log("¡Tiempo terminado!");
//             return;
//         }

//         updateDisplay(totalSeconds);
//     }, 1000);
// }

// function updateDisplay(sec) {
//     let mins = Math.floor(sec / 60);
//     let secs = sec % 60;
//     minutesShow.textContent = mins.toString().padStart(2, '0');
//     secondsShow.textContent = secs.toString().padStart(2, '0');
// }


function resetValueInput() {
    saveOptions.time = 0;
    inputs.forEach(input => input.value = '');
    inputLong.value = '';
}

window.addEventListener("DOMContentLoaded", resetValueInput);