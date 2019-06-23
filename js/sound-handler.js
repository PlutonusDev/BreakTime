$ = require("jquery");
const path = require("path");

let startupAudio = new Audio(path.join(__dirname, '/snd/startup.wav'));
let tapAudio = new Audio(__dirname + '/snd/tap.wav');
let dialogAudio = new Audio(__dirname + '/snd/dialog.wav');
let successAudio = new Audio(__dirname + '/snd/success.wav');
let warningAudio = new Audio(__dirname + '/snd/warning.wav');

function playSound(id) {
    if (id === 'tap') {
        tapAudio.currentTime = 0;
        tapAudio.play()
    };
    if (id === 'dialog') {
        dialogAudio.currentTime = 0;
        dialogAudio.play()
    };
    if (id === 'success') {
        successAudio.currentTime = 0;
        successAudio.play()
    };
    if (id === 'warning') {
        warningAudio.currentTime = 0;
        warningAudio.play()
    };
};

$(document).ready(() => {
    startupAudio.play();

    $('.snd-tap').each(function () {
        $(this).on('click', function () {
            playSound('tap');
        });
    });
    $(".snd-dialog").each(function () {
        $(this).on("click", function () {
            playSound("dialog");
        });
    });
});
