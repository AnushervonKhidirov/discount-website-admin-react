import type { RouteConfig } from '@react-router/dev/routes';

import { index, route } from '@react-router/dev/routes';

const routes: RouteConfig = [
  index('routes/home.tsx'),
  route('login', 'routes/login.tsx'),
  route('users', 'routes/users.tsx'),
];

export default routes;
