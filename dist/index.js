"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const partidos_routes_1 = __importDefault(require("./routes/partidos.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const mongoose_1 = __importDefault(require("mongoose"));
const server = (0, express_1.default)();
dotenv_1.default.config();
const port = process.env.PORT || 5000;
const url = process.env.URL_MONGO;
mongoose_1.default.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
exports.db = mongoose_1.default.connection;
exports.db.on('open', () => {
    console.log("Conexion exitosa a la base de datos");
});
exports.db.on('error', () => {
    console.log("Error al conectarse");
    return false;
});
server.use(express_1.default.json());
server.use((0, cors_1.default)());
server.use('/partidos', partidos_routes_1.default);
server.use('/user', user_routes_1.default);
server.get('/health', (req, res) => {
    res.send("Hola");
});
server.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
exports.default = server;
