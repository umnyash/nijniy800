$(function () {

    /* Start day || night */
    try {
        const currTime = new Date().getHours();
        if (currTime < 6 || currTime >= 20) {
            $('.main__inner').removeClass('day')
            $('.main__inner').addClass('day');
        } else {
            $('.main__inner').removeClass('night');
            $('.main__inner').addClass('day');
        }
    } catch (e) {}
    /* End day || night */
});
