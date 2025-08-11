window.addEventListener("DOMContentLoaded", () => {
    handleOperationChange();
    document.getElementById("operation").addEventListener("change", handleOperationChange);
    loadHistory();
})

function handleOperationChange() {
    const operation = document.getElementById("operation").value;
    const num2Group = document.getElementById("num2-group");

    if (operation === "square") {
        num2Group.style.display = "none";
    } else {
        num2Group.style.display = "block";
    }
}

function formatCalculation(entry) {
    const { operation, num1, num2, result } = entry;
    const opMap = {
        add: "+",
        subtract: "−",
        multiply: "×",
        divide: "÷",
        square: "^2"
    };

    if (operation === "square") {
        return `square(${num1}) = ${result}`;
    } else {
        const symbol = opMap[operation] || operation;
        return `${num1} ${symbol} ${num2} = ${result}`;
    }
}

async function calculate() {
    const operation = document.getElementById("operation").value;
    const num1 = document.getElementById("num1").value.trim();
    const num2 = document.getElementById("num2").value.trim();

    const isValidNumber = (n) => /^-?(?:\d+\.?\d*|\.\d+)$/.test(n);

    if (!isValidNumber(num1)){
        document.getElementById("result").innerText = "Please enter a valid first number.";
        return;
    }

    if (operation !== "square" && !isValidNumber(num2)) {
        document.getElementById("result").innerText = "Please enter a valid second number.";
        return;
    }

    const body = {
        "operation": operation,
        "num1": num1
    }

    if (operation !== "square") {
        body.num2 = num2;
    }

    const res = await fetch("/calculate", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    });

    const data = await res.json();
    document.getElementById("result").innerText = data.result !== undefined ? `Result: ${data.result}` : `Error: ${data.error}`;

    if (data.result !== undefined) {
        loadHistory();
    }

}

async function loadHistory() {
    const res = await fetch("/history");
    const data = await res.json();

    const historyList = document.getElementById("history");
    historyList.innerHTML = "";

    data.forEach(entry => {
        const item = document.createElement("li");
        item.textContent = formatCalculation(entry);
        historyList.appendChild(item);
    });
}