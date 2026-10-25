import { Button } from "../components/UI";
export default function Home({ go }) {
  return <section className="py-20 text-center">
    <p className="text-xs font-bold tracking-[0.3em] text-red-500">LENS&STYLE</p>
    <h1 className="mx-auto mt-5 max-w-4xl text-5xl font-black tracking-tight md:text-7xl">Фотостудия и удобное бронирование</h1>
    <p className="mx-auto mt-6 max-w-2xl text-zinc-400">Выберите услугу, пройдите короткий квиз и забронируйте удобное время.</p>
    <div className="mt-8 flex justify-center"><Button onClick={() => go("services")}>Посмотреть услуги</Button></div>
  </section>;
}
