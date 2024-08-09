import { Link } from "react-router-dom";


const Create = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-1">
        <section className="w-full pt-12 md:pt-24 lg:pt-32">
          <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
            <div className="grid max-w-5xl mx-auto gap-6 px-4 sm:px-6 md:grid-cols-2 md:gap-16">
              <div className="space-y-4">
                <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl md:text-5xl xl:text-6xl leading-tight">
                  Create Your Own Quiz
                </h1>
                <p className="text-lg text-gray-600 md:text-xl">
                Customize your quiz by adding topics, questions, and options.
                </p>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <form className="w-full max-w-md space-y-6">
                  <div className="flex flex-col">
                    <label
                      htmlFor="topic"
                      className="text-sm font-medium text-gray-700"
                    >
                      Topic
                    </label>
                    <input
                      id="topic"
                      type="text"
                      placeholder="Enter quiz topic"
                      className="border border-gray-300 p-2 rounded-md mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="question"
                      className="text-sm font-medium text-gray-700"
                    >
                      Question
                    </label>
                    <input
                      id="question"
                      placeholder="Enter quiz question"
                      className="border border-gray-300 p-2 rounded-md mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="options"
                      className="text-sm font-medium text-gray-700"
                    >
                      Options
                    </label>
                    <input
                      id="options"
                      placeholder="Enter quiz options (separated by commas)"
                      className="border border-gray-300 p-2 rounded-md mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-black text-xl px-4 py-2 rounded-md text-white hover:bg-gray-800 transition w-full"
                  >
                    Create Quiz
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full items-center px-4 md:px-6 border-t bg-gray-50">
        <p className="text-xs text-gray-500">
          &copy; 2024 Quiz App. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            to="#"
            className="text-xs text-gray-600 hover:underline underline-offset-4"
          >
            Terms of Service
          </Link>
          <Link
            to="#"
            className="text-xs text-gray-600 hover:underline underline-offset-4"
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default Create;
