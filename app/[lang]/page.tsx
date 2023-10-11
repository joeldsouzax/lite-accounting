import { getDictionary } from '@/get-dictionary';
import { Lang } from '@/utils/types';
import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage<{ params: Lang }> = async ({ params: { lang } }) => {
  const dictionary = await getDictionary(lang);
  return (
    <main id="lite-regnskap-landing px-4 md:px-2">
      <section id="hero-section">
        <div className="hero">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">
                {dictionary['landing'].title}
              </h1>
              <p className="py-6">{dictionary['landing'].hero}</p>
              <Link className="btn btn-primary" href={'/home'}>
                {dictionary['landing'].call_to_action}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
