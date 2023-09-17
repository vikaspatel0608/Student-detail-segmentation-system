// password
const passWord = document.querySelector('[data-passwordDisplay]');

// copy button and copy message
const copyMessage = document.querySelector('.copyMsg');
const copyBtn = document.getElementById('copyBtn');

// slider and length
const slider = document.querySelector('.slider');
const lengthP = document.getElementById('lengthP');

// generate password and password indicator
const generateP = document.querySelector('.generatePassword');
const pIndicator = document.querySelector('#indicator');

// checkboxes
const upperCase = document.getElementById('uppercase');
const lowerCase = document.getElementById('lowercase');
const numberInP = document.getElementById('number');
const charactersInP = document.getElementById('characters');
const allCheckBox = document.querySelectorAll('input[type=checkbox');
const symbols = "!@#$%^&*()_-+={}?//~`";

let password = "";
let lengthOfPassword = 10;
let checkboxCount = 0;
sliderHandling();
setIndicator("#ccc");

// functions

// slider handle
function sliderHandling(){
    slider.value = lengthOfPassword;
    lengthP.innerText = lengthOfPassword;
    const min = slider.min;
    const max = slider.max;
    slider.style.backgroundSize = Math.trunc((lengthOfPassword - min)*100/(max - min)) + "% 100%";
}

// set indicator
function setIndicator(color){
    pIndicator.style.backgroundColor = color;
    pIndicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

// random integer
function getRandomInteger(min,max){
    return Math.floor(Math.random()*(max-min)) + min;
}

// random number
function generateNumber(){
    return getRandomInteger(0,9);
}

// random alphabet uppercase
function generateUpperCase(){
    return String.fromCharCode(getRandomInteger(65,91));
}

// random alphabet lowercase
function generateLowerCase(){
    return String.fromCharCode(getRandomInteger(97,123));
}

// random symbol character
function generateSymbol(){
    return symbols[getRandomInteger(0,symbols.length)];
}

// calculate strength
function calculateStrength(){
    let haveupper = false;
    let havelower = false;
    let havenum = false;
    let havesymbol = false;
    if(upperCase.checked == true) haveupper = true;
    if(lowerCase.checked == true) havelower = true;
    if(numberInP.checked == true) havenum = true;
    if(charactersInP.checked == true) havesymbol = true;

    if((haveupper && havelower) && (havenum && havesymbol) && lengthOfPassword >= 10){
        setIndicator('green');
    }else if((haveupper || havelower) && (havenum || havesymbol) && lengthOfPassword >= 8){
        setIndicator('yellow');
    }else{
        setIndicator('red');
    }
}

// copy password
async function copyContent(){
   try{
        await navigator.clipboard.writeText(passWord.value);
        copyMessage.innerText = "copied!";
   }
   catch(e){
        copyMessage.innerText = 'failed!';
   }
   copyMessage.classList.add('active');
   setTimeout( () => {
        copyMessage.classList.remove('active');
   },2000);
}

// shuffle password
function shufflePassword(array){
    for(let i=array.length-1;i>0;i--){
        const j = Math.floor(Math.random()*(i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((e) => (str+=e));
    return str;
}

//handle checkboxes
function checkboxStatus(){
    checkboxCount = 0;
    allCheckBox.forEach((checkbox) =>{
        if (checkbox.checked) checkboxCount += 1;
    });
    if(lengthOfPassword < checkboxCount){
        lengthOfPassword = checkboxCount;
        sliderHandling();
    }
}

// eventlistner to checkboxes
allCheckBox.forEach((checkbox) =>{
    checkbox.addEventListener('change',checkboxStatus);
})
// eventlistner to slider
slider.addEventListener('input',(e)=>{
    lengthOfPassword = e.target.value;
    sliderHandling();
});

// eventlistner to generate button
generateP.addEventListener('click',()=>{
    if(checkboxCount <= 0){
        return;
    }
    if(lengthOfPassword < checkboxCount){
        lengthOfPassword = checkboxCount;
        sliderHandling();
    }
    password = "";
    let funArr = [];
    if(upperCase.checked == true){
        funArr.push(generateUpperCase);
    }
    if(lowerCase.checked == true){
        funArr.push(generateLowerCase);
    }
    if(numberInP.checked == true){
        funArr.push(generateNumber);
    }
    if(charactersInP.checked == true){
        funArr.push(generateSymbol);
    }
    for(let i =0;i<funArr.length;i++){
        password += funArr[i]();
    }
    for(let i=0;i<lengthOfPassword-funArr.length;i++){
        let index = getRandomInteger(0,funArr.length);
        password += funArr[index]();
    }
    password = shufflePassword(Array.from(password));

    passWord.value = password;
    calculateStrength();
})

// eventlistner to copy button
copyBtn.addEventListener('click', ()=>{
    if(passWord.value){
        copyContent();
    }
});


