var PORT = 8083;
var withHeadlessBrowser = true;
var enableBrowserLogs = true;

var https = require('https');
var express = require('express');
var fs = require("fs");
const puppeteer = require('puppeteer');

var app = express();

app.use(function(req, res, next) {
    "use strict";
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
    res.header('Access-Control-Allow-Headers', 'origin, content-type', 'X-Requested-With');
    if (req.method == 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});

app.use(express.static(__dirname + '/public'));

var privateKey = fs.readFileSync( './cert/key.pem' );
var certificate = fs.readFileSync( './cert/cert.pem' );
// var privateKey = fs.readFileSync( './cert/wss.pem' );
// var certificate = fs.readFileSync( './cert/wss.pem' );

var server = https.createServer({
    key: privateKey,
    cert: certificate
}, app).listen(PORT);

console.log("Server running on port:", PORT);

if(withHeadlessBrowser) {
	//Run a headless browser
	var url = "https://127.0.0.1:"+PORT+"/";
	(async () => {
		const browser = await puppeteer.launch({
			"ignoreHTTPSErrors" : true,
			args: ['--no-sandbox']
		});
		const page = await browser.newPage();

		if(enableBrowserLogs) {
			page.on('console', msg => {
				for (let i = 0; i < msg.args().length; ++i) {
				  	console.log(`${i}: ${msg.args()[i]}`);
				}
			});
		}

		await page.goto(url);
		await page.waitFor('#loadLicodeSipBridge'); //Do it like this because of Error otherwise: The AudioContext was not allowed to start. It must be resume (or created) after a user gesture on the page
		await page.click('body');
		await page.click('#loadLicodeSipBridge');

		console.log("Bridge Loaded!")
	})();
}