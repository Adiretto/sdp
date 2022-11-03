var nodemailer = require("nodemailer");
var p = require("../database/databasepg");
var transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "nodea4912520@gmail.com",
        pass: "ruveizhsxagzlwzm"
    }
});
var detail = {
    from: "nodea4912520@gmail.com",
    to: "a4912520@gmail.com",
    subject: "nodemailer testing",
    text: "some text"
};
var Chat = /** @class */ (function () {
    function Chat() {
        this.observers = [];
    }
    Chat.prototype.addObserver = function (observer) {
        this.observers.push(observer);
        console.log("added " + observer.getName());
    };
    Chat.prototype.removeObserver = function (observer) {
        var observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) {
            console.log("none existing observer");
        }
        this.observers.splice(observerIndex, 1);
        console.log("removed " + observer.getName());
    };
    Chat.prototype.notifyObservers = function (message) {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.sendMessage(message);
        }
    };
    return Chat;
}());
var User = /** @class */ (function () {
    function User(name, email) {
        this.name = name;
        this.email = email;
    }
    User.prototype.setName = function (name) {
        this.name = name;
    };
    User.prototype.getName = function () {
        return this.name;
    };
    User.prototype.sendMessage = function (message) {
        detail.text = message;
        detail.to = this.email;
        transport.sendMail(detail, function (err) {
            if (err)
                console.log(err);
        });
    };
    return User;
}());
var Admin = /** @class */ (function () {
    function Admin(name, email) {
        this.name = name;
        this.email = email;
    }
    Admin.prototype.setName = function (name) {
        this.name = name;
    };
    Admin.prototype.getName = function () {
        return this.name;
    };
    Admin.prototype.sendMessage = function (message) {
        detail.text = message;
        detail.to = this.email;
        transport.sendMail(detail, function (err) {
            if (err)
                console.log(err);
        });
    };
    return Admin;
}());
var chat = new Chat();
var user = new User("Adilet111", "a4912520@gmail.com");
var admin = new Admin("Adilet222", "adiletaskar91@gmail.com");
chat.addObserver(user);
