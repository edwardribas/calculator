const form = document.querySelector("form");

form.addEventListener("submit", function(e){
    let n1, n2, isValid, results = []; // necessary variables
    e.preventDefault(); // prevent page refresh
    isValid = true; // verify operation validity
    
    // verify if inputs are empty on submit event
    for(let i = 0; i < this.elements.length; i++){
        let item = this.elements[i];
        if (item.type == "number"){
            if(item.value == ""){
                isValid = false;
                item.classList.add("error");
            }else{
                item.classList.remove("error");
                results.push(parseFloat(item.value));
            }
        }
    }

    // operation responsible
    function operation(){
        const text = document.getElementById("result");
        if (isValid === true){
            n1 = results[0], n2 = results[1];
            let result, operator, percentage;
            let selector = document.getElementById("operator");
            let value = selector.options[selector.selectedIndex].value;

            // verifier
            switch (value){
                case "1": //sum
                    operator = " plus ";
                    result = n1+n2;
                    break;
                case "2": // subtraction
                    operator = " minus ";
                    result = n1-n2;
                    break
                case "3": // multiplication
                    operator = " times ";
                    result = n1*n2;
                    break;
                case "4": // division
                    operator = " divided by ";
                    result = n1/n2;
                    break;
                case "5": // percentage
                    operator = "% of "
                    result = (n1 * n2) / 100;
                    break;
                case "6": // increase
                    percentage = (n1 * n2) / 100;
                    result = n2+percentage;
                    operator = "% increase in ";
                    break;
                case "7": // discount
                    percentage = (n1 * n2) / 100;
                    result = n2-percentage;
                    operator = "% discount in ";
            }
            // operation output
            text.innerHTML = `${n1}${operator}${n2} is equals to ${result}.`;
        }else{
            text.innerHTML = "Don't let any field empty!";
        }
    }
    // calls our function
    operation();
})

// removes all error borders on click event
window.onclick = () => {
    for(let i = 0; i < form.elements.length; i++){
        let item = form.elements[i];
        if(item.classList.contains("error")){
            item.classList.remove("error")
        }    
    }
}

// dark and light mode
const sun = document.getElementById("sun");
const moon = document.getElementById("moon");
const togglebtn = document.getElementById("toggle-mode");
let localData = localStorage.getItem("theme");
if(localData == null){
    localStorage.setItem("theme", "light");
    sun.style.display = "none";
    moon.style.display = "block";
}

if(localData == "dark"){
    document.body.classList.add("dark-mode")
    sun.style.display = "block"
    moon.style.display = "none"
}else if (localData == "light"){
    document.body.classList.remove("dark-mode")
    sun.style.display = "none"
    moon.style.display = "block"
}

togglebtn.onclick = () => {
    document.body.classList.toggle("dark-mode");
    if(document.body.classList.contains("dark-mode")){
        localStorage.setItem("theme", "dark");
        sun.style.display = "block"
        moon.style.display = "none"
    }else{
        localStorage.setItem("theme", "light");
        sun.style.display = "none"
        moon.style.display = "block"
    }
}

// if there's some empty value, apply red borders on enter event
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
                    results.push(parseFloat (item.value));
                }
            }
        }
    }
}