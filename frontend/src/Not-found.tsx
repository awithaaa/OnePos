import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <p className="text-base font-semibold text-red-600">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
          Page not found
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to={"/dashboard"}
            className="rounded-4xl bg-black px-4 py-2.5 text-sm font-semibold text-white hover:bg-white hover:text-black hover:outline-2 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
          >
            Go back Dashboard
          </Link>
          <Link to={"/"} className="text-sm font-semibold text-gray-900">
            Contact support <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
