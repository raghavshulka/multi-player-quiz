import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface QuizQuestion {
  question: string;
  topic: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correctOption: string;
  timer: number;
  image?: string;
}




const Create = () => {
  const [quizData, setQuizData] = useState<QuizQuestion>({
    topic: "",
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correctOption: "",
    timer: 30,
  });
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: any) => {
    const { id, value } = e.target;
    setQuizData((prev) => ({
      ...prev,
      [id]: id === "timer" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSuccess(false);

    try {
      await axios.post(
        "https://multi-player-quiz.onrender.com/api/v1/question/create",
        quizData
      );
      setSuccess(true);
      //empty ho gya
      setQuizData({
        topic: "",
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
      correctOption: "",  
        timer: 0,
      });
    } catch (err) {
      console.error(err);
    }
  };


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
                <form
                  onSubmit={handleSubmit}
                  className="w-full max-w-md space-y-6"
                >
                  {Object.entries(quizData).map(([key, value]) => (
                    <div key={key} className="flex flex-col">
                      <label
                        htmlFor={key}
                        className="text-sm font-medium text-gray-700"
                      >
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </label>
                      <input
                        id={key}
                        type={key === "timer" ? "number" : "text"}
                        value={value}
                        onChange={handleInputChange}
                        placeholder={`Enter ${key}`}
                        className="border border-gray-300 p-2 rounded-md mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  ))}
                  <button
                    type="submit"
                    className="bg-black text-xl px-4 py-2 rounded-md text-white hover:bg-gray-800 transition w-full disabled:bg-gray-400"
                  >
                    Create Quiz
                  </button>
                  {success && (
                    <p className="text-green-500">
                      {` ${quizData.topic} Quiz question created successfully!`}
                    </p>
                  )}
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
