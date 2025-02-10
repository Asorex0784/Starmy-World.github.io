const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

const DATA_FILE = "users.json";

app.use(express.json());
app.use(cors());

// JSON dosyasını oku
function readDatabase() {
    if (!fs.existsSync(DATA_FILE)) {
        return { users: [] };
    }
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

// JSON dosyasına yaz
function writeDatabase(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
}

// Kullanıcı kaydı
app.post("/register", (req, res) => {
    let { username, password } = req.body;
    let db = readDatabase();

    if (db.users.find(user => user.username === username)) {
        return res.status(400).json({ message: "Bu kullanıcı adı zaten alınmış!" });
    }

    let newUser = { id: db.users.length + 1, username, password };
    db.users.push(newUser);
    writeDatabase(db);

    res.json({ message: "Kayıt başarılı!" });
});

// Kullanıcı girişi
app.post("/login", (req, res) => {
    let { username, password } = req.body;
    let db = readDatabase();

    let user = db.users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).json({ message: "Geçersiz kullanıcı adı veya şifre!" });
    }

    res.json({ message: "Giriş başarılı!", user });
});

// Sunucuyu başlat
app.listen(3000, () => {
    console.log("Sunucu 3000 portunda çalışıyor!");
});
