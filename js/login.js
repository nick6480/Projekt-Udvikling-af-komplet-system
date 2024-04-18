// LOGIN
class LoginHandler {
    async login(e, username, password, form ) {
        const usernameValue = username.value;
        const passwordValue = password.value;


        if (this.validateInputs(usernameValue, passwordValue)){ // If valid inputs post login cred. to server
            const data = {
                username: username,
                password: password
            }

            fetch(URL, { // Fetch data from server
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                data: data,
            })
            }) .then(res => { // Response
            return res.json()
            })
            
            window.location.assign("/"); // Should redirect -- not sure if it works
        }
    }

    setError(messages) { // Display error messages
        const error = document.getElementById('error')
        error.innerText = messages.join(", ");
    }

    validateInputs(username, password) { // Validate username and login
        let errorMsg = []
        
        if (username === "" || username === null) { // Validate username
            errorMsg.push("Name is required")
        }
        if (password < 8) { // Validate password
            errorMsg.push("Password must contain atleats 8 characters")
        }


        if (errorMsg.length > 0) { // If error msg display them, if not continue with login process
            this.setError(errorMsg)
            return false;
        }
        else {
            return true
        }
            
        

    }
}







const username = document.getElementById('username')
const password = document.getElementById('password')
const form = document.getElementById('form')



const loginHandler = new LoginHandler 

form.addEventListener('submit', (e) => {
    e.preventDefault()

    loginHandler.login(e, username, password, form)
})






