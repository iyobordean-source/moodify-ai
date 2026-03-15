const form = document.querySelector('.auth-form');

function validateForm(e) {
    e.preventDefault(); // STOP form refresh

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === '' || password === '') {
        alert('Please fill in all fields');
        return;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }
    window.location.href = "moodify.html";

}
form.addEventListener('submit', validateForm);
