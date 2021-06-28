const enableFormButton = function(){
    var formElements = document.getElementsByClassName("disabled-button")
    for (var i = 0; i < formElements.length; i++) {
        formElements[i].addEventListener("click", function() {
            if (document.getElementById("username").value === "" && document.getElementById("password_sign_in").value === "") {
                formElements[i].disabled = true
            } else {
                formElements[i].disabled = false
            }
        })
    }
}()

