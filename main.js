'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path    = require("path");
const Overpay = require('./router/overpay')
const WrongPrice = require('./router/wrongprice')
const OverpayDetail = require('./router/overpay')
const SuspicionTransactions = require('./router/SuspicionTransactions')
const config = require('./config/config')

app.use(express.static(path.join(__dirname, 'src/react/build')));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", 
  "Origin, X-Requested-With, Content-Type, Accept, authorization");
  next();
});
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(session({
//   secret: config.SessionConfig.Secret,
//   resave: config.SessionConfig.Resave,
//   saveUninitialized: config.SessionConfig.SaveUninitialized,
//   unset: config.SessionConfig.Unset,
//   cookie: {
//     maxAge: config.SessionConfig.MaxAge,
//     sameSite: config.SessionConfig.SameSite,
//   }
// }))
app.set('port', (process.env.FDS_PORT || 5000))
app.set('host', (process.env.FDS_HOST || 'localhost'))
app.use('/api/overpay', Overpay)
app.use('/api/wrongprice', WrongPrice)
app.use('/api/SuspicionTransactions',SuspicionTransactions)
// app.use('/api/overpayDetail', OverpayDetail)

// app.get('/*', (req, res, next) => {
//     res.sendFile(path.join(__dirname+'/src/react/build/index.html'))
// })

app.listen(app.get('port'), () => {
  console.log(`Server is running at ${app.get('host')}:${app.get('port')}`)
})
