import {
  useLoaderData,
  Outlet,
  Link,
  useParams,
  useSearchParams,
} from '@remix-run/react';
import { json } from '@remix-run/node';
import { GraphQLClient, gql } from 'graphql-request';
import clsx from 'clsx';
import { plus } from 'react-icons-kit/fa/plus';
import Icon from 'react-icons-kit';
import AddArticleModal from '~/components/article/add-article.modal';

const GetArticlesQuery = gql`
  {
    articles {
      id
      title
      content
      updatedAt
    }
  }
`;

export let loader = async () => {
  const graphcms = new GraphQLClient(
    'https://api-us-west-2.graphcms.com/v2/cl2asc77z307o01yze9ic4hh2/master'
  );

  const { articles } = await graphcms.request(GetArticlesQuery);

  return json({ articles });
};

type Props = {};
const Home = (props: Props) => {
  let data = useLoaderData();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <main className="flex-grow flex min-h-0 border-t h-full">
      <section className="flex flex-col p-4 w-full max-w-sm flex-none bg-gray-100 min-h-0 overflow-auto gap-4">
        <header className="flex justify-between items-center">
          <h1 className="font-semibold">Lists</h1>
          <button
            className="rounded-md bg-gradient-to-r from-indigo-500  via-purple-500 to-pink-500 px-4 py-2 flex items-center justify-between "
            onClick={() => setSearchParams({ ...searchParams, modal: 'true' })}
          >
            <Icon icon={plus} className="text-white !flex" />
            <span className="text-white">Add</span>
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
                  <span className="flex-none pt-1 pr-2">
                    <img
                      className="h-8 w-8 rounded-md"
                      src="https://raw.githubusercontent.com/bluebrown/tailwind-zendesk-clone/master/public/assets/avatar.png"
                    />
                  </span>
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
                      {updatedAt}
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
