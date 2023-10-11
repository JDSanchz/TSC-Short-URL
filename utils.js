"use strict";
// utils.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomString = void 0;
function generateRandomString() {
    return Math.random().toString(36).substr(2, 9);
}
exports.generateRandomString = generateRandomString;
