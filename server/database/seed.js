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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const db_1 = __importDefault(require("./db"));
function runSeeds() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const seedsPath = path_1.default.resolve(__dirname, 'seeds.sql');
            const seedsSQL = (0, fs_1.readFileSync)(seedsPath, 'utf-8');
            yield db_1.default.query(seedsSQL);
            console.log('Database seeded successfully');
        }
        catch (error) {
            console.error('Error seeding database:', error);
        }
        finally {
            yield db_1.default.end();
        }
    });
}
runSeeds();
