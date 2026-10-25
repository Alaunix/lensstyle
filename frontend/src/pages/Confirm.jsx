import { Button } from "../components/UI";
export default function Confirm({ booking, createBooking }) {
  const rows = [["Услуга", booking.serviceName], ["Цена", `${booking.price.toLocaleString("ru-RU")} ₽`], ["Дата", booking.date], ["Время", booking.time], ["Стиль", booking.style], ["Количество", booking.people], ["ФИО", booking.fio], ["Телефон", booking.phone], ["Telegram", booking.telegram]];
  return <section className="mx-auto max-w-2xl"><h2 className="text-4xl font-black">Подтверждение</h2><div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">{rows.map(([label, value]) => <div key={label} className="flex justify-between gap-4 border-b border-zinc-800 py-3 text-sm"><span className="text-zinc-500">{label}</span><b className="text-right">{value}</b></div>)}<div className="mt-6"><Button onClick={createBooking}>Подтвердить бронирование</Button></div></div></section>;
}
