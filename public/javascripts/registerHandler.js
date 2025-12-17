async function registerUser(event) {
    event.preventDefault();

    const firstname = document.querySelector("#firstname").value;
    const lastname = document.querySelector("#lastname").value;
    const email = document.querySelector("#email").value;
    const phone = document.querySelector("#phone").value;
    const password = document.querySelector("#password1").value;
    const password2 = document.querySelector("#password2").value;

    if (password !== password2) {
        alert("Passordene matcher ikke.");
        return;
    }

    const response = await fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ firstname, lastname, email, phone, password})
        });

        const result = await response.json();
        if(response.ok) {
            alert(result.message);
            window.location.href = "/login";
        }
        else {
            alert(result.message);
        }
    }
