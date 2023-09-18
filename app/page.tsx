import ThemeSelector from '@/components/ThemeSelector';

export default function Home() {
  return (
    <main className="flex flex-col justify-center gap-2 items-center w-full md:gap-4 transition-all ease-out duration-100">
      <header className="max-w-xs w-full navbar lg:max-w-lg transition-all ease-out duration-100">
        <nav className="navbar-start">liteRengskap</nav>
        <nav className="navbar-end flex gap-4">
          <ThemeSelector />
          <a href="/sign-in">Sign in</a>
        </nav>
      </header>
      <div className="hero max-w-xs w-full lg:max-w-lg transition-all ease-out duration-100">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello there</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
      <div className="divider" />
    </main>
  );
}
