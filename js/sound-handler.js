const $ = require('jquery');
const path = require('path');

const startupAudio = new Audio(path.join(__dirname, '/snd/startup.wav'));
const tapAudio = new Audio(path.join(__dirname, '/snd/tap.wav'));
const dialogAudio = new Audio(path.join(__dirname, '/snd/dialog.wav'));
const successAudio = new Audio(path.join(__dirname, '/snd/success.wav'));
const warningAudio = new Audio(path.join(__dirname, '/snd/warning.wav'));

function playSound(id) {

    if (id === 'tap') {
        tapAudio.currentTime = 0;
        tapAudio.play();
    }

    if (id === 'dialog') {
        dialogAudio.currentTime = 0;
        dialogAudio.play();
    }

    if (id === 'success') {
        successAudio.currentTime = 0;
        successAudio.play();
    }

    if (id === 'warning') {
        warningAudio.currentTime = 0;
        warningAudio.play();
    }

}

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
