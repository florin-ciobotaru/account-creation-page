const months = ["January","February","March","April","May","June","July", "August","September","October","November","December"];
const countries = ["Afghanistan", "Albania", "Algeria","Costa Rica", "Croatia", "Cuba", "Cyprus", "Romania", "Russia", "Tunisia", "Turkey", "Zambia", "Zimbabwe"];

const monthsDropdown = document.querySelector('#month');
const countriesDropdown = document.querySelector('#country');

const passwordSpans = document.querySelector(".password-spans");

const specialChars = "~!@#$%^&*()_+`-=[]\;',./{}|:\"<>?";
const checkSign = "✓";
const notSign = "✗";

// populate months dropdown
populateDropdown(monthsDropdown, months);
populateDropdown(countriesDropdown, countries);

// email field
const emailInput = document.querySelector("#email");
emailInput.addEventListener('input', function() {
    updateStyleAndValidate(verifyEmailAddress(this.value), this);  
    removeAttribute(this);
});

// first name field
const firstNameInput = document.querySelector("#firstName");
firstNameInput.addEventListener('input', function() {
    updateStyleAndValidate(verifyName(this.value), this);    
    removeAttribute(this);
});


// last name field
const lastNameInput = document.querySelector("#lastName");
lastNameInput.addEventListener('input', function() {
    updateStyleAndValidate(verifyName(this.value), this);    
    removeAttribute(this);
});

// day field
const dayInput = document.querySelector("#day");
dayInput.addEventListener('input', function() {
    updateStyleAndValidate(verifyDate(this.value), this);    
    removeAttribute(this);
});

// year field
const yearInput = document.querySelector("#year");
yearInput.addEventListener('input', function() {
    updateStyleAndValidate(verifyYear(this.value), this);
    removeAttribute(this);
});

const passwordInput = document.querySelector("#password");
passwordInput.addEventListener('input', function() {

    passwordSpans.classList.remove('hide');
    passwordSpans.classList.add('show');

    let passLength = verifyPasswordLength(passwordInput.value);
    let passLetters = verifyLowerAndUpperCaseLetters(passwordInput.value);
    let passNumbers = verifyNumberOrSymbol(passwordInput.value);
    let passNameOrEmail = verifyIfNameOrEmailIsContained(passwordInput.value);
    let passwordIsValid = passLength && passLetters && passNumbers && passNameOrEmail;
    if(passwordIsValid) {
        passwordInput.setAttribute("valid", "valid");
    } else {
        passwordInput.setAttribute("valid", "invalid");
    };    
    removeAttribute(passwordInput);
});


// getting all password spans for showing validation
const eightCharsSpan = document.querySelector(".eigth-chars");
const lowerAndUppercaseSpan = document.querySelector(".lower-upper-case-chars");
const numberCharSpan = document.querySelector(".number-chars");
const yourDataSpan = document.querySelector(".your-data-chars");

// updating the border around the fields
function updateStyleAndValidate(isValid, context) {
        if(isValid) {
            context.setAttribute("valid", "valid");
        } else {
            context.setAttribute("valid", "invalid");
        }
}

// removing attribute when 0 length detected
function removeAttribute(context) {
    if(context.value.length === 0) {
        context.removeAttribute("valid");
        if(context == passwordInput) {
            passwordSpans.classList.remove('show');
            passwordSpans.classList.add('hide');
        }
    }
}

// function to populate dropdowns
function populateDropdown(dropdownElement, dataArray) {
    dataArray.forEach(dataItem => {
        let element = document.createElement("option")
        element.textContent = dataItem;
        element.value = dataItem;
        dropdownElement.appendChild(element);
    });
}

function verifyEmailAddress(emailAddress) {
    // florin@ymail.com
    let positionOfAt = emailAddress.indexOf("@");
    let positionOfPoint = emailAddress.indexOf(".");

    // veryfing if @ and . exists
    if(positionOfAt === -1 || positionOfPoint === -1) {
        return false;
    }
    // verifying if @ is before point
    if(positionOfAt > positionOfPoint) {
        return false;
    }
    // verifying if . is not the last character in email address
    if(positionOfPoint === emailAddress.length - 1) {    
        return false;
    }

    // verifying if @ is not near .
    if(positionOfPoint === positionOfAt + 1) {
        return false;
    }
    // otherwise, all good!
    return true;
}

function verifyName(name) {
    if(name.length > 1) {
        return true;
    }
    return false;
}

function verifyDate(date) {
    if(date >= 1 && date <= 31) {
        return true;
    }
    return false;
}

function verifyYear(year) {
    if(year >= 1920 && year <= new Date().getFullYear() - 18) {
        return true;
    }
    return false;
}

function verifyPasswordLength(password) {
    if(password.length >= 8) {
        console.log("8 charactere???");
        eightCharsSpan.textContent = "" + checkSign;
        eightCharsSpan.parentElement.classList.remove("red");
        eightCharsSpan.parentElement.classList.add("green");
        return true;
    } else {
        eightCharsSpan.textContent = "" + notSign;
        eightCharsSpan.parentElement.classList.add("red");
        eightCharsSpan.parentElement.classList.remove("green");
        return false;
    }    
    return true;
}

function verifyLowerAndUpperCaseLetters(password) {
    let lowerCaseLetters = false;
    let upperCaseLetters = false;
    for(let i in password) {
        if(password[i].charCodeAt(0) >= "a".charCodeAt(0) && password[i].charCodeAt(0) <= "z".charCodeAt(0) ) {
            lowerCaseLetters = true;
        }
        if(password[i].charCodeAt(0) >= "A".charCodeAt(0) && password[i].charCodeAt(0) <= "Z".charCodeAt(0) ) {
            upperCaseLetters = true;
        }
    }
    if (upperCaseLetters && lowerCaseLetters) {
        lowerAndUppercaseSpan.textContent = "" + checkSign;
        lowerAndUppercaseSpan.parentElement.classList.remove("red");
        lowerAndUppercaseSpan.parentElement.classList.add("green");
    } else {
        lowerAndUppercaseSpan.textContent = "" + notSign;
        lowerAndUppercaseSpan.parentElement.classList.remove("green");
        lowerAndUppercaseSpan.parentElement.classList.add("red");
    }
    return upperCaseLetters && lowerCaseLetters;
}

function verifyNumberOrSymbol(password) {
    let numberPresent = false;
    let symbolPresent = false;
    for(let i in password) {
        if(password[i].charCodeAt(0) >= "0".charCodeAt(0) && password[i].charCodeAt(0) <= "(9)".charCodeAt(0) ) {
            numberPresent = true;
        }
        if(specialChars.indexOf(password[i]) > -1) {
            symbolPresent = true;
        }
    }    
    if (numberPresent || symbolPresent) {
        numberCharSpan.textContent = "" + checkSign;
        numberCharSpan.parentElement.classList.remove("red");
        numberCharSpan.parentElement.classList.add("green");
    } else {
        numberCharSpan.textContent = "" + notSign;
        numberCharSpan.parentElement.classList.remove("green");
        numberCharSpan.parentElement.classList.add("red");
    }
    return numberPresent || symbolPresent;
}

function verifyIfNameOrEmailIsContained(password) {
    let pass = password.toLowerCase();
    let firstname = firstNameInput.value.toLowerCase();
    let lastName = lastNameInput.value.toLowerCase();
    let email = emailInput.value.toLowerCase();
    if (pass.includes(firstname) || pass.includes(lastName) || pass.includes(email)) {    
        yourDataSpan.textContent = "" + notSign;
        yourDataSpan.parentElement.classList.remove("green");
        yourDataSpan.parentElement.classList.add("red"); 
        return false;
    }
       
    yourDataSpan.textContent = "" + checkSign;
    yourDataSpan.parentElement.classList.remove("red");
    yourDataSpan.parentElement.classList.add("green");
    return true;
}
