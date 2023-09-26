function closeModal() {
    const modal = document.getElementById("confirm-problem");
    const form = document.getElementsByClassName("mobile-hidden");
    if (form[0] !== undefined && form[0] !== null) {
        form[0].classList.remove('mobile-hidden');
    }
    modal.style.display = 'none';
}