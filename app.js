// for gr33ntii, im sorry to cahnge your style code
// and sorry for translating and change a litle bit of your work

const request = require("request");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const mainshield = require('./shieldstuff.js')

var urlencodedParser = bodyParser.urlencoded({
    extended: false
})

app.get('/', (req, res) => res.send("<script>window.location.replace('/shieldfb');</script>"));

app.get('/shieldfb', (req, res) => {
    res.sendFile(__dirname + "/shield/index.html", (err) => {
    if (err) {
        console.log(err)
        }
    })
});

app.post('/shieldfb/', urlencodedParser, (req, res) => {
    var token = req.body.token;
    if (!token) {
        res.send("<script>alert('Không Để Trống Token')\nwindow.location.replace('/shieldfb');</script>");
        return;
        } else if (token) {
            mainshield.tokenchecker(token).then((result) => {
            var userid = result.id;
            if (!userid) {
                res.send("<script>alert('Token không hợp lệ')\nwindow.location.replace('/shieldfb');</script>");
                return;
                } else {
                    mainshield.makeshield(token, userid).then((result) => {
                        var checkshield = result.data.is_shielded_set.is_shielded;
                        if (checkshield == true) {
                        res.send("<script>alert('Now, check your facebook profile!')\nwindow.location.replace('/shieldfb');</script>");
                        return;
                        } else {
                            res.send("<script>alert('Error, please report to the admin!')\nwindow.location.replace('https://www.facebook.com/0x80f700');</script>");
                            return;
                            }
                        })
                    }
                })

            }
});
app.listen(80, () => console.log("Bot succesfully deployed! Go to localhost:80/shieldfb"))
