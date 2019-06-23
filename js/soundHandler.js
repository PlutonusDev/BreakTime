var startupAudio = new Audio(__dirname + '/snd/startup.wav');
var tapAudio = new Audio(__dirname + '/snd/tap.wav');
var dialogAudio = new Audio(__dirname + '/snd/dialog.wav');
var successAudio = new Audio(__dirname + '/snd/success.wav');
var warningAudio = new Audio(__dirname + '/snd/warning.wav');

function playSound(id) {
    if (id == "tap") { tapAudio.currentTime = 0; tapAudio.play() }
    if (id == "dialog") { dialogAudio.currentTime = 0; dialogAudio.play() }
    if (id == "success") { successAudio.currentTime = 0; successAudio.play() }
    if (id == "warning") { warningAudio.currentTime = 0; warningAudio.play() }
}

$(document).ready(() => {
    startupAudio.play();

    $(".snd-tap").each(function (btn) {
        $(this).on("click", function () {
            tapAudio.currentTime = 0;
            tapAudio.play();
        });
    });
    $(".snd-dialog").each(function (btn) {
        $(this).on("click", function () {
            dialogAudio.currentTime = 0;
            dialogAudio.play();
        });
    });
});