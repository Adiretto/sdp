const { readFileSync, writeFileSync } = require("fs");

const { Client } = require("pg");

class ConnectionDB {
  private static instance: ConnectionDB;
  private host: string;
  private user: string;
  private port: number;
  private password: string;
  private database: string;
  private constructor(
    host: string,
    user: string,
    port: number,
    password: string,
    database: string
  ) {
    this.host = host;
    this.user = user;
    this.port = port;
    this.password = password;
    this.database = database;
  }
  public static getInstance(
    host: string,
    user: string,
    port: number,
    password: string,
    database: string
  ): ConnectionDB {
    if (!ConnectionDB.instance) {
      ConnectionDB.instance = new ConnectionDB(
        host,
        user,
        port,
        password,
        database
      );
    }
    return ConnectionDB.instance;
  }
  public connectDB(client: typeof Client): typeof Client {
    client = new Client({
      host: this.host,
      user: this.user,
      port: this.port,
      password: this.password,
      database: this.database,
    });
    client.connect();
    return client;
  }
}
const db = ConnectionDB.getInstance(
  "localhost",
  "postgres",
  5432,
  "6266",
  "silkway"
);
let client: typeof Client;
client = db.connectDB(client);

let person = [{}];
const selectPerson = () => {
  return new Promise((resolve, reject) => {
    client.query("Select name from person", (err, res) => {
      if (!err) {
        for (let i = 0; i < res.rows.length; i++) {
          person.push(res.rows[i].name);
        }
        person.splice(0, 1);
        resolve(person);
      } else {
        reject(err);
      }
      client.end;
    });
  });
};

interface StrategyInterface {
  execute(data): void;
}
class SortAndWrite implements StrategyInterface {
  execute(data): void {
    let d = data.sort();
    d.forEach((element) => {
      writeFileSync("../results/resultDB.txt", element + "\n", { flag: "a" });
    });
  }
}
class ReverseAndWrite implements StrategyInterface {
  execute(data): void {
    let d = data.reverse();
    d.forEach((element) => {
      writeFileSync("../results/resultDB.txt", element + "\n", { flag: "a" });
    });
  }
}

class ContextStrategy {
  private strategy: StrategyInterface;
  constructor(strategy: StrategyInterface) {
    this.strategy = strategy;
  }
  setStrategy(strategy: StrategyInterface) {
    this.strategy = strategy;
  }
  executeStrategy(data): void {
    this.strategy.execute(data);
  }
}
const c = new ContextStrategy(new SortAndWrite());

async function ex() {
  try {
    const p = (await selectPerson()) as string[];
    c.executeStrategy(p);
  } catch (error) {
    console.log(error);
  }
}
ex();
