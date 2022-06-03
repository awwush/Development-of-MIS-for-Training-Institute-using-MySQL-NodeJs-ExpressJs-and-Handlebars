const hbs = require("hbs");

const equals = hbs.registerHelper("ifZero", function (v1, options) {
    // console.log("handlebar helper equals accessed");
    if (v1 == 0) {
        return '<img class="d-block mx-auto" src="/image/noData.gif" alt="image">'
    }
    else {
        return null;
    }
})

module.exports = { equals };