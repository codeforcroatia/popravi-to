const enableFormButton = function(){
    const formElements = document.querySelectorAll(".credentials-input")

    for (let i = 0; i < formElements.length; i++) {
        formElements[i].addEventListener("input", function() {
            if (document.getElementById("username").value == "" && document.getElementById("password_sign_in").value == "") {
                document.getElementById('signInButton').disabled = true
            } else {
                document.getElementById('signInButton').disabled = false
            }
        })
    }
}()

