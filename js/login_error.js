const urlParams = new URLSearchParams(window.location.search);
const error = urlParams.get('error');
if (error) {
    const errorMessage = document.getElementById('error-message');
    if (error === 'user_not_found') {
        errorMessage.innerText = 'User does not exist.';
    } else if (error === 'invalid_password') {
        errorMessage.innerText = 'Invalid password';
    }
    errorMessage.style.color = 'red';
}
