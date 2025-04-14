import WithHeader from 'app/hoc/with-header/with-header';
import UsersPage from '~pages/users/users';

export default function User() {
  return (
    <WithHeader>
      <UsersPage />
    </WithHeader>
  );
}
