const enableFormButton = function(){
    var formElements = document.querySelectorAll(".credentials-input")
    for (var i = 0; i < formElements.length; i++) {
        formElements[i].addEventListener("change", function() {
            if (document.getElementById("username").value === "" && document.getElementById("password_sign_in").value === "") {
                document.getElementById('signInButton').disabled = true
            } else {
                document.getElementById('signInButton').disabled = false
            }
        })
    }
}()

