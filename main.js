window.addEventListener("DOMContentLoaded", (e) => {
  const numbersButton = document.querySelectorAll("[data-number]");
  const operatorsButton = document.querySelectorAll("[data-operator]");
  const clearButton = document.querySelector("[data-clear]");
  const deleteButton = document.querySelector("[data-delete]");
  const equalsButton = document.querySelector("[data-equals]");
  const currOperandText = document.querySelector("[data-curr-operand]");
  const prevOperandText = document.querySelector("[data-prev-operand]");

  currOperandText.focus();

  class Calculator {
    constructor(currOperandClass, prevOperandClass) {
      this.prevOperandClass = prevOperandClass;
      this.currOperandClass = currOperandClass;
      this.clear();
    }

    clear() {
      this.currOperand = "";
      this.prevOperand = "";
      this.operation = undefined;
    }

    appendNumbers(numbers) {
      if (numbers === "," && this.currOperandClass.innerText.includes(","))
        return;

      this.currOperand = this.currOperand.toString() + numbers.toString();
    }

    chooseOperation(operator) {
      if (this.currOperand === "") return;
      if (this.prevOperand !== "") this.calculate();

      this.operation = operator;
      this.prevOperand = this.currOperand;
      this.currOperand = "";
    }

    delete() {
      this.currOperand = this.currOperand.toString().slice(0, -1);
    }

    calculate() {
      let result;
      const current = parseFloat(this.currOperand);
      const previous = parseFloat(this.prevOperand);

      if (this.currOperand === "") return;
      if (this.prevOperand === "") return;

      switch (this.operation) {
        case "+":
          result = previous + current;
          break;
        case "-":
          result = previous - current;
          break;
        case "×":
          result = previous * current;
          break;
        case "÷":
          result = previous / current;
          break;
        default:
      }

      if (previous === 90 && current === 6) {
        window.location.assign("https://youtu.be/nVcw_SzbV50?si=OVvNHaMuA0SZbr3n")
      } else if (previous === 19 && current === 11) {
        window.location.assign("https://youtu.be/4F2oOGDyWeY?si=yZdD1I2WakrvG7zo")
      }

      this.currOperand = result;
      this.prevOperand = "";
      this.operation = undefined;
    }

    // todo : bagian yang belum paham
    getNumbers(number) {
      const stringNumber = number.toString(); // konversi number ke string
      const integerDigits = parseFloat(stringNumber.split(".")[0]);
      const decimalDigits = stringNumber.split(".")[1];

      let integerDisplay;
      if (isNaN(integerDigits)) {
        integerDisplay = ""; // jika bukan angka, kosongkan
      } else {
        integerDisplay = integerDigits.toLocaleString("en-US", {
          maximumFractionDigits: 0,
        });
      }

      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`; // gabungkan integer dan desimal
      } else {
        return integerDisplay; // hanya tampilkan integer
      }
    }

    updateDisplay() {
      if (this.operation === undefined) {
        this.operation = "";
      }

      this.currOperandClass.innerText = this.getNumbers(this.currOperand);

      if (this.operation !== null) {
        this.prevOperandClass.innerText = `${this.getNumbers(
          this.prevOperand
        )} ${this.operation}`; // tampilkan previousValue dan operator
      }

      if (this.operation === undefined) {
        this.prevOperandClass.innerText = ""; // kosongkan jika operator tidak ada
      }

      if (this.currOperandClass.innerText.length >= 8) {
        currOperandText.classList.add("fsz-optimize");
      } else {
        currOperandText.classList.remove("fsz-optimize");
      }
    }
  }

  const calculator = new Calculator(currOperandText, prevOperandText);

  // currOperandText.addEventListener("input", () => {
  //   if (currOperandText.value.length === 10) {
  //     currOperandText.classList.toggle("fsz-optimize");
  //   }
  // });

  deleteButton.addEventListener("click", (e) => {
    e.preventDefault();

    calculator.delete();
    calculator.updateDisplay();
  });

  numbersButton.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      if (currOperandText.innerText.length <= 15) {
        calculator.appendNumbers(button.innerText);
        calculator.updateDisplay();
        return;
      }
    });
  });

  operatorsButton.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      calculator.chooseOperation(button.innerText);
      calculator.updateDisplay();
    });
  });

  equalsButton.addEventListener("click", () => {
    calculator.calculate();
    calculator.updateDisplay();
  });

  clearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
  });

  document.addEventListener("keydown", (e) => {
    if (/\d/.test(e.key) == true && currOperandText.innerText.length <= 15) {
      calculator.appendNumbers(e.key);
    }

    switch (e.key) {
      case "Backspace":
        calculator.delete();
        break;
      case "+":
        calculator.chooseOperation("+");
        break;
      case "-":
        calculator.chooseOperation("-");
        break;
      case "*":
        calculator.chooseOperation("×");
        break;
      case "/":
        calculator.chooseOperation("÷");
        break;
      case "=":
        calculator.calculate();
        break;
      default:
    }

    calculator.updateDisplay();
  });
});
