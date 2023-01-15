// form selector
const selector = document.getElementById("operator");
const form = document.querySelector("form");
const clipboardBtn = document.getElementById("clipboard");
const formElements = [...form.elements];
const results = [];

// prevent form default event
clipboardBtn.onclick = e => e.preventDefault();

const validateForm = () => {
    let isValid = true;
    formElements.forEach(item => {
        if (item.type !== "number") return;
        if (item.value.trim() === "") {
            item.classList.add('error');
            isValid = false;
        }
        if (isValid) {
            item.classList.remove('error');
            results.push(+item.value);
        }
    })
    return isValid;
}

const calculate = (isValid) => {
    console.log(isValid)
    const text = document.querySelector("#result p");

    if (!isValid) {
        text.innerHTML = "Preencha todos os campos.";
        return;
    }

    const [num1, num2] = results;
    let result, operation;
    const percentage = (num1 / 100) * num2;
    let value = selector.options[selector.selectedIndex].value;

    // verifier
    switch (value){
        case "1": //sum
            operation = " somado a ";
            result = ((num1 * 100) + (num2 * 100)) / 100;
            break;

        case "2": // subtraction
            operation = " subtraído por ";
            result = num1-num2;
            break;

        case "3": // multiplication
            operation = " multiplicado por ";
            result = num1*num2;
            break;
        case "4": // division
            operation = " dividido por ";
            result = num1/num2;
            if (isNaN(result))
                result = "indefinido, pois não é possível realizar esta operação";
            break;
        case "5": // percentage
            operation = "% de "
            result = percentage;
            break;
        case "6": // increase
            result = ((num2 * 100) + (percentage * 100)) / 100;
            operation = "% de acréscimo sobre ";
            break;
        case "7": // discount
            result = num2-percentage;
            operation = "% de desconto sobre ";
    }

    results.length = 0;
    text.innerHTML = `${num1}${operation}${num2} é igual a ${result}.`;
    clipboardBtn.onclick = () => 
    navigator.clipboard.writeText(num1 + operation + num2 + " é igual a " + result);
}

// operation result
form.onsubmit = e => {
    results.length = 0;
    e.preventDefault();
    let isValid = validateForm();
    console.log(results)
    calculate(isValid);
}

// removes the error borders on focus event
formElements.forEach(item => item.onfocus = () => {
    if (item.classList.contains('error'))
        item.classList.remove('error');
})