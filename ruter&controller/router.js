const { Router } = require('express');
const {FacebookController} = require('./controller');

const FacebookRouter = new Router();
//GET /Facebook/printAllFriends 
FacebookRouter.get('/printAllFriends', FacebookController.get);

//GET /Facebook/printFriend/{NumberFried(number)}=>..../1 or ...../2
FacebookRouter.get('/printFriend/:id', FacebookController.get);

//POST /Facebook/createFriend
FacebookRouter.post('/createFriend', FacebookController.post);

//PUT /Facebook/uptadeFriend/{NumberFriend(number)}
FacebookRouter.put('/uptadeFriend/:id', FacebookController.put);

//DELETE /Facebook/deleteAllFriends
FacebookRouter.delete('/deleteAllFriends', FacebookController.delete);

//DELETE /Facebook/deleteFrrend/{NumberFriend(number)}
FacebookRouter.delete('/deleteFriend/:id', FacebookController.delete);

FacebookRouter.all('*',(req, res) => {
    res.write("Write (GET) /printAllFriends for print all data");
    res.write("Write:(GET)  /printFriend/:id for print Specific data");
    res.write("Write (POST) /createFriend for create data");
    res.write("Write (PUT) /uptadeFriend/:id for update Specific data");
    res.write("Write (DELETE) /deleteFriend/:id for delete Specific data");
    res.write("Write (DELETE) /deleteAllFriends for delete All data");
    res.send ("Happy Fun !!!!");
})
module.exports = FacebookRouter;
   