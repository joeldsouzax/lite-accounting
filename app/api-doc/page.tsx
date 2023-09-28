import { getApiDocs } from '@/utils/swagger';
import ReactSwagger from './react-swagger';

export default async function ApiPage() {
  const spec = await getApiDocs();
  return (
    <section className="container">
      <ReactSwagger spec={spec} />
    </section>
  );
}
