async function calculate() {
    const operation = document.getElementById("operation").value;
    const num1 = document.getElementById("num1").value;
    const num2 = document.getElementById("num2").value;

    const res = await fetch("/calculate", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            "operation": operation,
            "num1": parseFloat(num1),
            "num2": parseFloat(num2)
        })
    });

    const data = await res.json();
    document.getElementById("result").innerText = data.result !== undefined ? `Result: ${data.result}` : `Error: ${data.error}`;
}