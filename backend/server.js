import "dotenv/config";
import express from "express";
import cors from "cors";
import admin from "firebase-admin";

const app = express();
const PORT = process.env.PORT || 4000;

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n")
  })
});

const db = admin.firestore();

app.use(cors());
app.use(express.json());

const services = [
  {
    id: "portrait",
    name: "Портретная фотосессия",
    description: "Индивидуальная съёмка в студии.",
    price: 5000
  },
  {
    id: "love",
    name: "Love Story",
    description: "Съёмка для двоих.",
    price: 7000
  },
  {
    id: "family",
    name: "Семейная фотосессия",
    description: "Съёмка для семьи.",
    price: 6000
  },
  {
    id: "content",
    name: "Контент для соцсетей",
    description: "Фотографии для личного бренда.",
    price: 4000
  }
];

app.get("/api/services", (req, res) => {
  res.json(services);
});

app.post("/api/bookings", async (req, res) => {
  try {
    const {
      serviceId,
      serviceName,
      price,
      style,
      people,
      date,
      time,
      fio,
      phone,
      telegram
    } = req.body;

    if (!serviceId || !date || !time || !fio || !phone || !telegram) {
      return res.status(400).json({
        error: "Заполните все обязательные поля"
      });
    }

    const existing = await db
      .collection("bookings")
      .where("date", "==", date)
      .where("time", "==", time)
      .where("status", "==", "NEW")
      .get();

    if (!existing.empty) {
      return res.status(409).json({
        error: "Это время уже занято"
      });
    }

    const booking = {
      serviceId,
      serviceName,
      price,
      style,
      people,
      date,
      time,
      fio,
      phone,
      telegram,
      status: "NEW",
      createdAt: new Date().toISOString()
    };

    const ref = await db.collection("bookings").add(booking);

    res.status(201).json({
      id: ref.id,
      ...booking
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  // Для простого прототипа.
  // В реальном проекте здесь можно подключить Firebase Admin Auth.
  const { email, password } = req.body;

  if (
    email !== "photographer@example.com" ||
    password !== "demo1234"
  ) {
    return res.status(401).json({
      error: "Неверный email или пароль"
    });
  }

  res.json({
    token: "demo-photographer-token",
    photographer: {
      name: "Фотограф",
      email
    }
  });
});

function photographerOnly(req, res, next) {
  const token = req.headers.authorization;

  if (token !== "Bearer demo-photographer-token") {
    return res.status(401).json({
      error: "Нужна авторизация"
    });
  }

  next();
}

app.get("/api/bookings", photographerOnly, async (req, res) => {
  try {
    const snapshot = await db
      .collection("bookings")
      .orderBy("createdAt", "desc")
      .get();

    const result = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

app.patch("/api/bookings/:id/status", photographerOnly, async (req, res) => {
  const { status } = req.body;

  if (!["NEW", "CONFIRMED", "CANCELLED"].includes(status)) {
    return res.status(400).json({
      error: "Неверный статус"
    });
  }

  await db
    .collection("bookings")
    .doc(req.params.id)
    .update({ status });

  res.json({ ok: true });
});


app.listen(PORT, "0.0.0.0", () => {
  console.log(`LENS&STYLE backend: http://localhost:${PORT}`);
});

