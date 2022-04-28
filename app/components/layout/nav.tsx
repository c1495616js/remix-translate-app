import { Link, Form, useLoaderData, useSearchParams } from '@remix-run/react';
import { bars } from 'react-icons-kit/fa/bars';
import Icon from 'react-icons-kit';

export default function Nav() {
  const profile = useLoaderData();

  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <nav className="border-gray-200 px-2 sm:px-4 py-2.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="flex justify-between items-center w-full">
        <Link to="/" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
            Translate!
          </span>
        </Link>
        {!!profile && (
          <section className="flex gap-4 items-center">
            <article className="sm:flex flex-col items-end hidden">
              <p className="text-white">{profile?._json?.name}</p>
              <p className="text-gray-300">{profile?._json?.email}</p>
            </article>
            <Form method="post" action="/auth/logout">
              <button
                type="submit"
                className="px-4 py-2 border border-white text-white rounded-md hover:border-blue-500 hover:text-blue-500"
              >
                Logout
              </button>
            </Form>
            <button
              type="button"
              className="p-2 border border-white text-white rounded-md hover:border-blue-500 hover:text-blue-500 sm:hidden"
              onClick={() => {
                const list = searchParams.get('list');
                setSearchParams({
                  ...searchParams,
                  list: list === 'true' ? 'false' : 'true',
                });
              }}
            >
              <Icon icon={bars} className="!w-6" />
            </button>
          </section>
        )}
      </div>
    </nav>
  );
}
