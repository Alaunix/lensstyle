import { useEffect, useState } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Quiz from "./pages/Quiz";
import DatePage from "./pages/Date";
import Contacts from "./pages/Contacts";
import Confirm from "./pages/Confirm";
import Success from "./pages/Success";
import Photographer from "./pages/Photographer";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";
const initialBooking = { serviceId: "", serviceName: "", price: 0, style: "", people: "", date: "", time: "", fio: "", phone: "", telegram: "" };

export default function App() {
  const [page, setPage] = useState("home");
  const [services, setServices] = useState([]);
  const [booking, setBooking] = useState(initialBooking);
  const [quizStep, setQuizStep] = useState(1);
  const [error, setError] = useState("");
  const [bookings, setBookings] = useState([]);

  useEffect(() => { fetch(`${API}/api/services`).then(r => r.json()).then(setServices).catch(() => setError("Не удалось загрузить услуги")); }, []);
  const go = (next) => { setPage(next); setError(""); window.scrollTo(0, 0); };
  const chooseService = (service) => { setBooking({ ...initialBooking, serviceId: service.id, serviceName: service.name, price: service.price }); setQuizStep(1); go("quiz"); };
  const createBooking = async () => { const response = await fetch(`${API}/api/bookings`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(booking) }); const data = await response.json(); if (!response.ok) { setError(data.error || "Ошибка бронирования"); return; } go("success"); };
  const login = async () => { const email = prompt("Email фотографа:", "photographer@example.com"); const password = prompt("Пароль:", "demo1234"); if (!email || !password) return; const response = await fetch(`${API}/api/auth/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) }); const data = await response.json(); if (!response.ok) { setError(data.error || "Ошибка входа"); return; } localStorage.setItem("lens_token", data.token); loadBookings(data.token); go("photographer"); };
  const loadBookings = async (token = localStorage.getItem("lens_token")) => { if (!token) return; const response = await fetch(`${API}/api/bookings`, { headers: { Authorization: `Bearer ${token}` } }); if (response.ok) setBookings(await response.json()); };
  const updateStatus = async (id, status) => { const token = localStorage.getItem("lens_token"); await fetch(`${API}/api/bookings/${id}/status`, { method: "PATCH", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ status }) }); loadBookings(token); };
  const logout = () => { localStorage.removeItem("lens_token"); go("home"); };

  return <div className="min-h-screen bg-zinc-950 text-white"><Header go={go} login={login} /><main className="mx-auto max-w-6xl px-5 py-12">{error && <div className="mb-6 rounded-xl border border-red-900 bg-red-950/40 p-4 text-sm text-red-300">{error}</div>}
    {page === "home" && <Home go={go} />}
    {page === "services" && <Services services={services} chooseService={chooseService} />}
    {page === "quiz" && <Quiz booking={booking} setBooking={setBooking} quizStep={quizStep} setQuizStep={setQuizStep} go={go} />}
    {page === "date" && <DatePage booking={booking} setBooking={setBooking} go={go} />}
    {page === "contacts" && <Contacts booking={booking} setBooking={setBooking} go={go} />}
    {page === "confirm" && <Confirm booking={booking} createBooking={createBooking} />}
    {page === "success" && <Success go={go} />}
    {page === "photographer" && <Photographer bookings={bookings} updateStatus={updateStatus} logout={logout} />}
  </main></div>;
}
