const moment = require("moment");
const time = require("moment-duration-format")(moment);

$(document).ready(function () {
    setInterval(() => UpdateDateAndTimeDisplay(), 1000);
});

function UpdateDateAndTimeDisplay() {
    $("#lblDateDisplay").html(moment().format("DD/MM/YY"));
    $("#lblTimeDisplay").html(moment().format("hh:mm:ss"));
}