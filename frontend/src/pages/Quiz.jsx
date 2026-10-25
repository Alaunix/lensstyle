import { Button, Options } from "../components/UI";
export default function Quiz({ booking, setBooking, quizStep, setQuizStep, go }) {
  return <section className="mx-auto max-w-3xl">
    <p className="text-xs font-bold tracking-[0.3em] text-red-500">ШАГ 2 · КВИЗ</p>
    <h2 className="mt-3 text-4xl font-black">{booking.serviceName}</h2>
    {quizStep === 1 && <><h3 className="mt-10 text-2xl font-bold">Какой стиль съёмки?</h3><Options value={booking.style} options={["Минимализм", "Классика", "Lifestyle", "Эксперимент"]} onChange={(value) => setBooking({ ...booking, style: value })} /></>}
    {quizStep === 2 && <><h3 className="mt-10 text-2xl font-bold">Сколько человек?</h3><Options value={booking.people} options={["1 человек", "2 человека", "3–5 человек", "Больше 5"]} onChange={(value) => setBooking({ ...booking, people: value })} /></>}
    <div className="mt-8 flex justify-between">
      <Button secondary onClick={() => quizStep === 1 ? go("services") : setQuizStep(1)}>Назад</Button>
      <Button disabled={quizStep === 1 ? !booking.style : !booking.people} onClick={() => quizStep === 1 ? setQuizStep(2) : go("date")}>{quizStep === 1 ? "Далее" : "Выбрать дату"}</Button>
    </div>
  </section>;
}
