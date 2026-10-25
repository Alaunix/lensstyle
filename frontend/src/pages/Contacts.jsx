import { Button, Input } from "../components/UI";
export default function Contacts({ booking, setBooking, go }) {
  return <section className="mx-auto max-w-2xl">
    <p className="text-xs font-bold tracking-[0.3em] text-red-500">ШАГ 4</p>
    <h2 className="mt-3 text-4xl font-black">Ваши контакты</h2>
    <div className="mt-8 grid gap-4">
      <Input placeholder="ФИО" value={booking.fio} onChange={(e) => setBooking({ ...booking, fio: e.target.value })} />
      <Input placeholder="Телефон" value={booking.phone} onChange={(e) => setBooking({ ...booking, phone: e.target.value })} />
      <Input placeholder="@Telegram" value={booking.telegram} onChange={(e) => setBooking({ ...booking, telegram: e.target.value })} />
    </div>
    <div className="mt-8 flex justify-between"><Button secondary onClick={() => go("date")}>Назад</Button><Button disabled={!booking.fio || !booking.phone || !booking.telegram} onClick={() => go("confirm")}>Проверить заказ</Button></div>
  </section>;
}
