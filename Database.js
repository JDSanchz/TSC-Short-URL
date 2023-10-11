"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mongodb_1 = require("mongodb");
class Database {
    constructor(uri) {
        this.uri = uri;
        this.db = null;
        Database.currentDatabase = this; // Set the current active instance
    }
    static getDB() {
        var _a, _b;
        return (_b = (_a = Database.currentDatabase) === null || _a === void 0 ? void 0 : _a.db) !== null && _b !== void 0 ? _b : null;
    }
    connect(dbName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.client = new mongodb_1.MongoClient(this.uri);
                yield this.client.connect();
                this.db = this.client.db(dbName);
            }
            catch (error) {
                console.error("Failed to connect to MongoDB:", error);
            }
        });
    }
    getDBInstance() {
        return this.db;
    }
    close() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield ((_a = this.client) === null || _a === void 0 ? void 0 : _a.close());
        });
    }
}
exports.Database = Database;
Database.currentDatabase = null; // New static field
