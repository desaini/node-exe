const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');



hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('transformToUpper', (text) => {
	return text.toUpperCase();
});

app.use( (req, res, next) => {
	var now = new Date().toString();
	var log = now + ' ' + req.method+ ' '+ req.url;
	fs.appendFile('serverLogs.log', log + '\n');
	console.log(now);


	next();
});

app.use( (req, res, next) => {
	res.render('maintenence.hbs');
});
app.use(express.static(__dirname+'/public'));

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle : 'Some website',
		welcome : 'Welcome to brand new website'
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle : 'About website'
	});
});

app.get('/bad', (req, res) => {
	res.send({ errorMessage: '<h1 style="color:red">Request cannot be fulfilled</h1>' });
});

app.listen(3000);
