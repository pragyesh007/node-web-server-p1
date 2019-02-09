const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', ()=>
{
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text)=>
{
  return text.toUpperCase();
});
app.set('view engine','hbs');

app.use((req,res,next)=>
{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('sever.log',log +'\n', (err) =>
{
  if(err)
  {
    console.log('unable to connect to sever.log');
  }
  next();
});
});

app.use((req,res,next) =>
{
   res.render('maintanence.hbs');
   next();
});

app.use(express.static(__dirname + '/public'));

app.get('/',(req,res) =>
{
  //res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs',
  {
    pageTitle:'About Page',
    welcomeMessage:'Welcome to my website',
    CurrentYear:new Date().getFullYear()
  });
  });

app.get('/about', (req,res) =>
  {
    res.render('about.hbs',
  {
    pageTitle:'About Page',
    CurrentYear:new Date().getFullYear()
  });
  });

 app.get('/bad', (req,res) =>
{
  res.send({
    error:"unable to connect"
  });
});

app.listen(port, ()=>
{
  console.log(`server is at port ${port}`);
});
