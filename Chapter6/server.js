// Client-side code
/* jshint browser: true, jquery: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */
// Server-side code
/* jshint node: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser");
var wins = 0,
    losses = 0;
app.use(bodyParser.json());

app.post("/flip", function(req, res) {

    "use strict";

    var usercoin = req.body.call;
    console.log("User choice:  " + usercoin);


    var coincomp = Math.floor(Math.random() * 2) === 0 ? "heads" : "tails";
    console.log("Randomly generated: " + coincomp);


    if (coincomp === usercoin) {
        wins = wins + 1;
        console.log("wins:" + wins);
        console.log("losses:" + losses);
        res.send(JSON.stringify({
            "result": "win"
        }));
    } else {
        losses = losses + 1;
        console.log("wins:" + wins);
        console.log("losses:" + losses);
        res.send(JSON.stringify({
            "result": "loss"
        }));
    }

});

app.get("/stats", function(req, res) {
    "use strict";

    res.send(JSON.stringify({
        "wins": wins,
        "losses": losses
    }));
});
app.listen(3000, function() {
    "use strict";

    console.log("listening on port 3000");
});
