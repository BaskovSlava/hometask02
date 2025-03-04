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
exports.postCollection = exports.blogCollection = void 0;
exports.connectToDB = connectToDB;
const mongodb_1 = require("mongodb");
const settings_1 = require("../settings");
function connectToDB(url) {
    return __awaiter(this, void 0, void 0, function* () {
        // Проверка подключения к базе данных
        let client = new mongodb_1.MongoClient(url);
        let db = client.db(settings_1.SETTINGS.DB_NAME);
        // Получение доступа к коллекциям
        exports.blogCollection = db.collection(settings_1.SETTINGS.PATH.BLOGS);
        exports.postCollection = db.collection(settings_1.SETTINGS.PATH.POSTS);
        try {
            yield client.connect();
            yield db.command({ ping: 1 });
            console.log("Connected to DB");
            return true;
        }
        catch (error) {
            console.log(error);
            yield client.close();
            return false;
        }
    });
}
