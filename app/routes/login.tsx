import { Form } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/node';

import { authenticator } from '~/services/auth.server';

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    successRedirect: '/',
  });
  return user;
};

export default function Login() {
  return (
    <Form action="/auth/google" method="post" className="h-full">
      <div className="font-sans h-full">
        <div className="relative h-full flex flex-col justify-center items-center bg-gray-100 ">
          <div className="relative w-3/4 sm:max-w-sm">
            <div className="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6" />
            <div className="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6" />
            <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
              <label className="block mt-3 text-xl text-gray-700 text-center font-semibold">
                User Login
              </label>

              <div className="mt-7">
                <button className="bg-red-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105 flex items-center justify-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    className="w-5"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12c6.627 0 12-5.373 12-12S18.627 0 12 0zm.14 19.018c-3.868 0-7-3.14-7-7.018c0-3.878 3.132-7.018 7-7.018c1.89 0 3.47.697 4.682 1.829l-1.974 1.978v-.004c-.735-.702-1.667-1.062-2.708-1.062c-2.31 0-4.187 1.956-4.187 4.273c0 2.315 1.877 4.277 4.187 4.277c2.096 0 3.522-1.202 3.816-2.852H12.14v-2.737h6.585c.088.47.135.96.135 1.474c0 4.01-2.677 6.86-6.72 6.86z"
                        fill="currentColor"
                      />
                    </g>
                  </svg>
                  <span>Google Login</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}
