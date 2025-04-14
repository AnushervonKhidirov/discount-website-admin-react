import WithHeader from 'app/hoc/with-header/with-header';
import { HomePage } from '~pages/home/home';

export default function Home() {
  return (
    <WithHeader>
      <HomePage />
    </WithHeader>
  );
}
