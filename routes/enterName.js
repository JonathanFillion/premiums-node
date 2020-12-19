let router = require('express').Router();
let storage = require('../storage/simpleStorage');

router.get('/', function(request,response) {
  response.render ('enterName', {pageTitle: "Enter Your Name"});
});

router.post('/submitName', function (request, response) {
  storage.setValue(request.body.userName);
  response.redirect('/displayName');
});

module.exports = router;

/*router.get('/displayName', function(request,response) {
  let userName = storage.getValue();
  response.render ('displayName',
     {
       pageTitle: "Your Name Display",
       userName: userName
     });
  });
*/