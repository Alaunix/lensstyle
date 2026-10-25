import { Button } from "../components/UI";
export default function Success({ go }) {
  return <section className="py-20 text-center"><div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-red-500 text-red-500">✓</div><h2 className="mt-6 text-4xl font-black">Бронирование создано</h2><p className="mt-4 text-zinc-400">Данные отправлены фотографу.</p><div className="mt-8"><Button onClick={() => go("home")}>На главную</Button></div></section>;
}
