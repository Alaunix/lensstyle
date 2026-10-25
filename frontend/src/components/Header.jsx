import { Button } from "./UI";

export default function Header({ go, login }) {
  return (
    <header className="sticky top-0 z-20 border-b border-zinc-800 bg-black/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <button onClick={() => go("home")} className="text-xl font-black tracking-tight">
          LENS<span className="text-red-500">&STYLE</span>
        </button>
        <div className="flex gap-2">
          <Button secondary onClick={() => go("services")}>Бронирование</Button>
          <Button secondary onClick={login}>Для фотографа</Button>
        </div>
      </div>
    </header>
  );
}
