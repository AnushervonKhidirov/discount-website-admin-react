import WithHeader from 'app/hoc/with-header/with-header';
import BanksPage from '~pages/banks/banks';

export default function Banks() {
  return (
    <WithHeader>
      <BanksPage />
    </WithHeader>
  );
}
