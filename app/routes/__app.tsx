import {
  useLoaderData,
  Outlet,
  Link,
  useParams,
  useSearchParams,
} from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { GraphQLClient, gql } from 'graphql-request';
import clsx from 'clsx';
import { plus } from 'react-icons-kit/fa/plus';
import Icon from 'react-icons-kit';
import format from 'date-fns/format';

import { authenticator } from '~/services/auth.server';
import AddArticleModal from '~/components/article/add-article.modal';

const GetArticlesQuery = gql`
  {
    articles(orderBy: title_DESC) {
      id
      title
      content
      updatedAt
    }
  }
`;

export let loader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  const graphcms = new GraphQLClient(
    'https://api-us-west-2.graphcms.com/v2/cl2asc77z307o01yze9ic4hh2/master'
  );

  const { articles } = await graphcms.request(GetArticlesQuery);

  return json({ articles });
};

const Home = () => {
  let data = useLoaderData();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <main className="flex-grow flex min-h-0 border-t h-full max-h-[calc(100vh-70px)]">
      {!params?.id && <AddArticleModal />}
      {/* List section */}
      <section
        className={clsx(
          'sm:flex flex-col p-4 w-full max-w-sm flex-none bg-gray-100 min-h-0 overflow-auto gap-4',
          {
            hidden:
              searchParams.get('list') === 'false' || !searchParams.get('list'),
          }
        )}
      >
        <header className="flex justify-between items-center mb-4 sm:mb-0">
          <h1 className="font-semibold">Lists</h1>
          <button
            className="rounded-md bg-gradient-to-r from-indigo-500  via-purple-500 to-pink-500 px-4 py-2 flex items-center justify-between "
            onClick={() => setSearchParams({ ...searchParams, modal: 'true' })}
          >
            <Icon icon={plus} className="text-white !flex" />
            <span className="text-white">{params?.id ? 'Update' : 'Add'}</span>
          </button>
        </header>
        <ul>
          {data.articles.map(({ id, title, content, updatedAt }: any) => (
            <li key={id}>
              <Link to={id}>
                <article
                  className={clsx(
                    'w-full cursor-pointer border rounded-md p-3 bg-white flex text-gray-700 mb-2 hover:border-green-500 focus:outline-none focus:border-green-500',
                    { 'border-green-500': params?.id === id }
                  )}
                >
                  <div className="flex-1 w-full">
                    <header className="mb-1">{title}</header>

                    <p
                      className={clsx('text-gray-600', {
                        'truncate w-4/5': params?.id !== id,
                        'w-full': params?.id === id,
                      })}
                    >
                      {content}
                    </p>

                    <footer className="text-gray-500 mt-2 text-sm">
                      {format(new Date(updatedAt), 'yyyy-MM-dd HH:mm')}
                    </footer>
                  </div>
                </article>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      {/* section content */}
      <section
        aria-label="main content"
        className="flex min-h-0 flex-col flex-auto border-l"
      >
        <Outlet />
      </section>
    </main>
  );
};

export default Home;
