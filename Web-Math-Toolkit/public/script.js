window.addEventListener("DOMContentLoaded", () => {
    handleOperationChange();
    document.getElementById("operation").addEventListener("change", handleOperationChange);
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

async function calculate() {
    const operation = document.getElementById("operation").value;
    const num1 = document.getElementById("num1").value.trim();
    const num2 = document.getElementById("num2").value.trim();

    const isValidNumber = (n) => /^-?\d+(\.\d+)?$/.test(n);

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
}