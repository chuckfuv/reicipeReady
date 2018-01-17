var express       = require('express')
var cookieParser  = require('cookie-parser')
var bodyParser    = require('body-parser')
var querystring   = require('querystring')

//database variable
var MongoClient   = require('mongodb').MongoClient
var mongoose      = require("mongoose");
var mongoUrl      = 'mongodb://localhost:27017/recipeReady'
mongoose.Promise  = global.Promise;

//
// frontend endpoints
var kitchenCanMake            = require ('./kitchen/endpoints/frontEnd/canMake')
var kitchenCouldMake          = require ('./kitchen/endpoints/frontEnd/couldMake')
var kitchenLoginHandler       = require ('./kitchen/endpoints/frontEnd/loginHandler')
var kitchenIngredientsAdd     = require ('./kitchen/endpoints/frontEnd/add')
var kitchenIngredientsSet     = require ('./kitchen/endpoints/frontEnd/set')
//var kitchenIngredientsRemove  = require ('./kitchen/endpoints/frontEnd/remove')
// Sensor endpoints
var kitchenSensorsUpdate      = require ('./kitchen/endpoints/IoT/update')

//app declaration and uses
var app = express()
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//connect to the database, this happens when api starts, and the conection doesn't close until the API shuts down/crashes
var db = mongoose.connect(mongoUrl, {
  useMongoClient: true,
});
db.then(function(db) {
  console.log ('starting connection')
  app.use(express.static(__dirname + '/public')).use(cookieParser())

  app.post('/kitchen/sensors/update', function (req, res){
    console.log ('rocky hit endpoint')
    kitchenSensorsUpdate (req, res)
  })

  /*
  this will be hit if they are accessing our service from a browser
  _______________________________________________________________________
  TO BE SENT:
    JSON from req.body{               :  type  :              Description |
    }
  ________________________________________________________________________*/
  app.post('/login', function (req, res){
    kitchenLoginHandler (req, res)
  })

  app.post('/kitchen/ingredients/add', function (req, res){
    kitchenIngredientsAdd (req, res)
  })

  app.post('/kitchen/ingredients/set', function (req, res){
    kitchenIngredientsSet (req, res)
  })

  app.post('/kitchen/ingredients/remove', function (req, res){
    kitchenIngredientsRemove (req, res)
  })

  app.post('/kitchen/canMake', function (req, res){
    kitchenCanMake (req, res)
  })

  app.post('/kitchen/couldMake', function (req, res){
    kitchenCouldMake (req, res)
  })

  app.listen(80)
})
.catch (function(err){
  console.log (err)
})
