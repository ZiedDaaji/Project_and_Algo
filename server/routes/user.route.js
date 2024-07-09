const userController = require ('../controllers/user.controller');
const { authenticate } = require ('../config/jwt.config');


module.exports = app => {

    app.post('/api/register', userController.registerUser);
    app.post('/api/Login', userController.loginUser);
    app.post('/api/Logout', userController.logoutUser);
    app.get("/api/allUsers", authenticate, userController.findAllUsers);
    app.get("/api/user/:id", authenticate, userController.getOneUser);
    app.delete("/api/users/:id", userController.deleteUser);
    app.get("/api/users", userController.findAllUsers);
    app.get("/api/users/:id", userController.getOneUser);
}
