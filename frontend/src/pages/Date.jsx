import { Button } from "../components/UI";
export default function DatePage({ booking, setBooking, go }) {
  return <section className="mx-auto max-w-3xl">
    <p className="text-xs font-bold tracking-[0.3em] text-red-500">ШАГ 3</p>
    <h2 className="mt-3 text-4xl font-black">Дата и время</h2>
    <input type="date" value={booking.date} onChange={(e) => setBooking({ ...booking, date: e.target.value })} className="mt-8 w-full rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-white" />
    <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">
      {["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"].map((time) => <button key={time} onClick={() => setBooking({ ...booking, time })} className={`rounded-xl border p-4 ${booking.time === time ? "border-red-500 bg-red-500/10" : "border-zinc-800 bg-zinc-900"}`}>{time}</button>)}
    </div>
    <div className="mt-8 flex justify-between"><Button secondary onClick={() => go("quiz")}>Назад</Button><Button disabled={!booking.date || !booking.time} onClick={() => go("contacts")}>Далее</Button></div>
  </section>;
}
