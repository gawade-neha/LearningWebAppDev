// Client-side code
/* jshint browser: true, jquery: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */
// Server-side code
/* jshint node: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: false, trailing: true */
var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost/links");


app.use(bodyParser.urlencoded({
    extended: false
}));

var listSchema = mongoose.Schema({
    title: String,
    link: String,
    clicks: Number
});

var list = mongoose.model("links", listSchema);


app.get("/links", function(req, res) {

    list.find({}, function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("found links:");
        res.json(result);

    });

});
app.get("/click/:title", function(req, res) {

    var t = req.params.title;
    console.log(t);
    list.findOneAndUpdate({
        "title": t
    }, {
        $inc: {
            clicks: 1
        }
    }).exec(function(error, results) {
        if (error) {
            console.log(error);
            res.send("ERROR");
        }
        res.redirect(results.link);
        list.find({}, function(err, results) {
            if (err !== null) {
                res.send("ERROR");
            }
        });

    });

});


app.post("/links", function(req, res) {

    console.log(req.body);

    var t = req.body.title;
    var l = req.body.link;

    var newlist = new list({
        "title": t,
        "link": l,
        "clicks": 0
    });
    newlist.save(function(error, result) {
        if (error !== null) {
            console.log(error);
            res.send("ERROR");
        } else {
            list.find({}, function(err, results) {
                if (err !== null) {
                    res.send("ERROR");
                }
                res.json(results);
            });
        }
    });

});


app.listen(3000, function() {


    console.log("listening on port 3000");
});
