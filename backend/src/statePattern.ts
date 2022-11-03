const http = require("http");
const { readFile, writeFile } = require("fs").promises;

abstract class State {
  protected context: Context;
  public setContext(context: Context) {
    this.context = context;
  }
  abstract execute(data?);
  abstract report();
}
class Context {
  private state: State;
  constructor(state: State) {
    this.transitionTo(state);
  }
  transitionTo(state: State): void {
    this.state = state;
    this.state.setContext(this);
  }
  execute(data?) {
    this.state.execute(data);
  }
  report() {
    this.state.report();
  }
}
class takeData extends State {
  async execute() {
    const text = await readFile("../results/file.txt", "utf8");
    console.log(text);
  }
  async report() {
    console.log("data is taken");
  }
}

class writeData extends State {
  async execute() {
    const text = await readFile("../results/file.txt", "utf8");
    await writeFile("../results/result.txt", text);
  }
  report() {
    console.log("data is sended");
  }
}
class makeBackup extends State {
  private memento = new Memento();
  async execute() {
    this.memento.makeBackup();
  }
  report() {
    console.log("backup is created");
  }
}
class undoBackup extends State {
  private memento = new Memento();
  async execute() {
    this.memento.undo();
  }

  report() {
    console.log("data is backuped");
  }
}
class Memento {
  async makeBackup() {
    let text = await readFile("../results/result.txt", "utf8");
    await writeFile("../results/makeUp.txt", text);
  }
  async undo() {
    let text2 = await readFile("../results/makeUp.txt", "utf8");
    await writeFile("../results/result.txt", text2);
  }
}

let context = new Context(new writeData());
context.execute();
