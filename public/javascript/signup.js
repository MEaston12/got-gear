async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && email && password) {
       const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        
        // Check the response status
        if (response.ok){
            console.log('Success');
            document.location.replace('/gearbag');
        }else{
            alert(response.statusText);
        }
    }

}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);