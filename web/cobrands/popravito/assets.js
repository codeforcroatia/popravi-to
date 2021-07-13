// This shows the reporting form
function enable_report_form() {
    $(".js-hide-if-invalid-category").show();
    $(".js-hide-if-invalid-category_extras").show();
}

// This hides the reporting form, apart from the category selection
// And perhaps the category_extras unless asked not to
function disable_report_form(keep_category_extras) {
    $(".js-hide-if-invalid-category").hide();
    if (!keep_category_extras) {
        $(".js-hide-if-invalid-category_extras").hide();
    }
}
