$(document).initialize();

$(window).on('load', () => {
    /* init functions that need to run on page load */
    $(window).trigger('resize');
    initCheckboxes();
    initPopups();
});