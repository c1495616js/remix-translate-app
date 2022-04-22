import { Link } from '@remix-run/react';
export default function Nav() {
  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5">
      <div className="container flex flex-wrap justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap ">
            Translate!
          </span>
        </Link>
      </div>
    </nav>
  );
}
