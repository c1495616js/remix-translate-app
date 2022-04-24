import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';

import { authenticator } from '~/services/auth.server';

// export let loader: LoaderFunction = () => redirect('/login');

export let action: ActionFunction = ({ request }) => {
  const url = new URL(request.url);
  const articleId = url.searchParams.get('id');
  return redirect(articleId ? `/${articleId}` : '/');
};
