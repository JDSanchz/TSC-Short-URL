import { MongoClient, Db } from "mongodb";

export class Database {
  private static currentDatabase: Database | null = null; // New static field
  private client?: MongoClient;
  private db: Db | null = null;

  constructor(private uri: string) {
    Database.currentDatabase = this; // Set the current active instance
  }

  static getDB(): Db | null { // New static method
    return Database.currentDatabase?.db ?? null;
  }

  async connect(dbName: string): Promise<void> {
    try {
      this.client = new MongoClient(this.uri);
      await this.client.connect();
      this.db = this.client.db(dbName);
    } catch (error) {
      console.error("Failed to connect to MongoDB:", error);
    }
  }

  getDBInstance(): Db | null { // Renamed this method to avoid a clash with the static one
    return this.db;
  }

  async close(): Promise<void> {
    await this.client?.close();
  }
}
