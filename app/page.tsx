import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center w-full">
      <header className="navbar shadow-md">
        <nav className="navbar-start">liteRengskap</nav>
        <nav className="navbar-end">
          <button className="btn-circle">
            <BsFillMoonFill />
          </button>
        </nav>
      </header>
    </main>
  );
}
