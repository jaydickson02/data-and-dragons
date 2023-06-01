import Link from 'next/link'

export default function Error400({error}) {

  const handleRefresh = () => {
    window.location.reload()
  }

    return (
      <>
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-indigo-600">400</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Failed to load page</h1>
            <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t load the the page. Something may be wrong with the server.</p>
            <p className="mt-6 text-base leading-7 text-gray-600">More information: {error}</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Home
              </Link>

              <button onClick={handleRefresh} className="rounded-md bg-gray-100 px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-100">
                Retry
              </button>
            </div>
          </div>
        </main>
      </>
    )
  }
  