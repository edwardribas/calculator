// form selector
const form = document.querySelector("form");
const clipboardBtn = document.getElementById("clipboard");
clipboardBtn.onclick = e => {
    e.preventDefault();
}

// form submit event
form.onsubmit = e => {
    e.preventDefault(); // prevent page refresh
    let num1, num2, isValid, results = []; // necessary variables
    isValid = true; // operation validator

    // form validator
    for(let i = 0; i < form.elements.length; i++){
        let item = form.elements[i];
        if(item.type == "number"){
            if(item.value == ""){
                isValid = false;
                item.classList.add("error");
            }else{
                item.classList.remove("error");
                results.push(Number(item.value));
            }
        }
    }

    // operation responsible
    const calculator = () => {
        const text = document.querySelector("#result p"); // result's output
        if (isValid === true){
            // variables declaration
            num1 = results[0], num2 = results[1];
            let result, operation;
            const percentage = (num1 / 100) * num2;
            let selector = document.getElementById("operator");
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

            // operation output
            text.innerHTML = `${num1}${operation}${num2} é igual a ${result}.`; // result output

            // result clipboard
            clipboardBtn.onclick = e => {
                navigator.clipboard.writeText(num1 + operation + num2 + " é igual a " + result)
            }
        }else{
            text.innerHTML = "Preencha todos os campos.";
        }
    }

    calculator();
}

// removes the error borders on focus event
for(let i = 0; i < form.elements.length; i++){
    let item = form.elements[i];
    item.onfocus = () => {
        if(item.classList.contains("error")){
            item.classList.remove("error")
        }
    }
}

// if there's some empty value, apply red borders on enter event - mobile
function verify(e){
    if (e.keyCode === "13"){
        for(let i = 0; i < this.elements.length; i++){
            let item = this.elements[i];
            if (item.type == "number"){
                if(item.value == ""){
                    isValid = false;
                    item.classList.add("error");
                }else{
                    item.classList.remove("error");
                    results.push(Number(item.value));
                }
            }
        }
    }
}