export default function Services({ services, chooseService }) {
  return <section>
    <p className="text-xs font-bold tracking-[0.3em] text-red-500">ШАГ 1</p>
    <h2 className="mt-3 text-4xl font-black">Услуги и цены</h2>
    <div className="mt-8 grid gap-4 md:grid-cols-2">
      {services.map((service) => <button key={service.id} onClick={() => chooseService(service)} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-left transition hover:border-zinc-600">
        <h3 className="text-xl font-bold">{service.name}</h3>
        <p className="mt-2 text-sm leading-6 text-zinc-400">{service.description}</p>
        <p className="mt-6 text-lg font-bold">{service.price.toLocaleString("ru-RU")} ₽</p>
      </button>)}
    </div>
  </section>;
}
