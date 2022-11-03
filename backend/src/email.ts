const nodemailer = require("nodemailer");
const p = require("../database/databasepg");
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nodea4912520@gmail.com",
    pass: "ruveizhsxagzlwzm",
  },
});

let detail = {
  from: "nodea4912520@gmail.com",
  to: "a4912520@gmail.com",
  subject: "nodemailer testing",
  text: "some text",
};
interface ObserverInterface {
  sendMessage(message: string): void;
  getName(): string;
}
interface SubjectInterface {
  addObserver(observer: ObserverInterface): void;
  removeObserver(observer: ObserverInterface): void;
  notifyObservers(message: string): void;
}
class Chat implements SubjectInterface {
  private observers: ObserverInterface[] = [];
  addObserver(observer: ObserverInterface): void {
    this.observers.push(observer);
    console.log("added " + observer.getName());
  }
  removeObserver(observer: ObserverInterface): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
      console.log("none existing observer");
    }
    this.observers.splice(observerIndex, 1);
    console.log("removed " + observer.getName());
  }
  notifyObservers(message: string): void {
    for (const observer of this.observers) {
      observer.sendMessage(message);
    }
  }
}
class User implements ObserverInterface {
  private name: string;
  private email: string;
  setName(name: string): void {
    this.name = name;
  }
  getName(): string {
    return this.name;
  }
  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
  sendMessage(message: string): void {
    detail.text = message;
    detail.to = this.email;
    transport.sendMail(detail, (err: string) => {
      if (err) console.log(err);
    });
  }
}
class Admin implements ObserverInterface {
  private name: string;
  private email: string;
  setName(name: string): void {
    this.name = name;
  }
  getName(): string {
    return this.name;
  }
  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
  sendMessage(message: string): void {
    detail.text = message;
    detail.to = this.email;
    transport.sendMail(detail, (err: string) => {
      if (err) console.log(err);
    });
  }
}
const chat = new Chat();
const user = new User("Adilet111", "a4912520@gmail.com");
const admin = new Admin("Adilet222", "adiletaskar91@gmail.com");
chat.addObserver(user);
