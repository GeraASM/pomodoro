const saveOptions = {
    option: 'pomodoro' || 'short' || 'long',
    font: "Kumbh Sans" || "Roboto Slab" || "Space Mono",
    color: "#F87070" || "#70F3F8" || "#D881F8",
    time: 0
}
const options = document.querySelectorAll(".pomodoro__option");
function selectOption(e) {
    optionsRemoveClass(options, "pomodoro__option--active");
    const optionClick = e.currentTarget;
    saveOptions.option = optionClick.dataset.option;
    console.log(saveOptions.option);
    optionClick.classList.add("pomodoro__option--active");
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


// Add all styles, colors and times
const circleBorder = document.getElementById("circle");
const body = document.querySelector("body");
const minutesShow = document.getElementById("timeMinutes");
const secondsShow = document.getElementById("timeSeconds");
function applyConfiguration(e) {
    e.preventDefault();
    resetValueInput();
    setTimeout(() => {
        reloj.style.display = 'block'; 
        settingsWindow.style.display = 'none';
    }, 1000);
    body.style.fontFamily = saveOptions.font;
    circleBorder.style.borderColor = saveOptions.color;
    options.forEach(o => {
        if (o.classList.contains("pomodoro__option--active")) {
            o.style.backgroundColor = saveOptions.color;
        }
        
    })
}

btnApply.addEventListener("click", applyConfiguration);
function resetValueInput() {
    saveOptions.time = 0;
    inputs.forEach(input => input.value = '');
}

window.addEventListener("DOMContentLoaded", resetValueInput);
