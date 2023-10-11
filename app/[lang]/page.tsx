import Link from 'next/link';

export default function Home() {
  return (
    <main id="lite-regnskap-landing px-4 md:px-2">
      <section id="hero-section">
        <div className="hero">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Hello there</h1>
              <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
              <Link className="btn btn-primary" href={'/home'}>
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
