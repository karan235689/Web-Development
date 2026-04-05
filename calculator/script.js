let string = "";
let buttons = document.querySelectorAll('button');

Array.from(buttons).forEach((button) => {
    button.addEventListener('click', (e) => {
        const val = e.target.innerHTML;

        if (val == '=') {
            try {
                string = String(eval(string));
                document.querySelector('input').value = string;
            } catch {
                document.querySelector('input').value = "Error";
                string = "";
            }
        }

        else if (val == '%') {
            // Handle 200 + 10% = 220 case
            let match = string.match(/^(\d+\.?\d*)([\+\-])(\d+\.?\d*)$/);
            if (match) {
                let base = parseFloat(match[1]);
                let operator = match[2];
                let percent = parseFloat(match[3]);
                let percentVal = (base * percent) / 100;
                string = String(eval(base + operator + percentVal));
                document.getElementById('inpt').value = string;
            } else {
                // Standalone: just divide by 100
                try {
                    string = String(eval(string) / 100);
                    document.getElementById('inpt').value = string;
                } catch {
                    document.getElementById('inpt').value = "Error";
                    string = "";
                }
            }
        }

        else if (val == 'x²') {
            if (string !== "") {
                let num = parseFloat(string);
                string = String(num * num);
                document.getElementById('inpt').value = string;
            }
        }

        else if (val == 'AC') {
            string = "";
            document.getElementById('inpt').value = "0";
        }

        else if (val == 'DEL') {
            string = string.substring(0, string.length - 1);
            document.getElementById('inpt').value = string || "0";
        }

        else {
            string = string + val;
            document.querySelector('input').value = string;
        }

    });
});
