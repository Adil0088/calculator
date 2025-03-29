document.addEventListener("DOMContentLoaded", () => {
    const textBox = document.getElementById("text-box");
    const buttons = document.querySelectorAll("button");

    let currentInput = "";
    let previousInput = "";
    let operator = "";

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const value = button.textContent;

            if (value === "AC") {
                currentInput = "";
                previousInput = "";
                operator = "";
                textBox.value = "0";
            } else if (value === "DEL") {
                currentInput = currentInput.slice(0, -1);
                textBox.value = currentInput || "0";
            } else if (["+", "-", "x", "/", "%"].includes(value)) {
                if (currentInput) {
                    if (operator && previousInput) {
                        // Perform calculation if operator already exists
                        const num1 = parseFloat(previousInput);
                        const num2 = parseFloat(currentInput);
                        previousInput = calculate(num1, num2, operator).toString();
                    } else {
                        previousInput = currentInput;
                    }
                    currentInput = "";
                    operator = value;
                }
            } else if (value === "=") {
                if (previousInput && currentInput && operator) {
                    const num1 = parseFloat(previousInput);
                    const num2 = parseFloat(currentInput);
                    const result = calculate(num1, num2, operator);
                    textBox.value = result;
                    currentInput = result.toString();
                    previousInput = "";
                    operator = "";
                }
            } else {
                currentInput += value;
                textBox.value = currentInput;
            }
        });
    });

    function calculate(num1, num2, operator) {
        switch (operator) {
            case "+":
                return num1 + num2;
            case "-":
                return num1 - num2;
            case "x":
                return num1 * num2;
            case "/":
                return num2 !== 0 ? num1 / num2 : "Error";
            case "%":
                return num1 % num2;
            default:
                return num2;
        }
    }
});
var TxtType = function(el, toRotate, period) {
 this.toRotate = toRotate;
 this.el = el;
 this.loopNum = 0;
 this.period = parseInt(period, 10) || 2000;
 this.txt = '';
 this.tick();
 this.isDeleting = false;
};

TxtType.prototype.tick = function() {
 var i = this.loopNum % this.toRotate.length;
 var fullTxt = this.toRotate[i];

 if (this.isDeleting) {
 this.txt = fullTxt.substring(0, this.txt.length - 1);
 } else {
 this.txt = fullTxt.substring(0, this.txt.length + 1);
 }

 this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

 var that = this;
 var delta = 200 - Math.random() * 100;

 if (this.isDeleting) { delta /= 2; }

 if (!this.isDeleting && this.txt === fullTxt) {
 delta = this.period;
 this.isDeleting = true;
 } else if (this.isDeleting && this.txt === '') {
 this.isDeleting = false;
 this.loopNum++;
 delta = 500;
 }

 setTimeout(function() {
 that.tick();
 }, delta);
};

window.onload = function() {
 var elements = document.getElementsByClassName('typewrite');
 for (var i=0; i<elements.length; i++) {
     var toRotate = elements[i].getAttribute('data-type');
     var period = elements[i].getAttribute('data-period');
     if (toRotate) {
       new TxtType(elements[i], JSON.parse(toRotate), period);
     }
 }
 

};


