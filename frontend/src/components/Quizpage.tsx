import React, { useEffect, useState } from "react";

import ClientSocket from "./ClientSocket";

interface Question {
  question: string;
  answers: string[];
  topic: string;
}

const Quizpage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setQuestions([
      {
        question: "What is the capital city of Australia?",
        answers: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        topic: "Geography",
      },
      {
        question: "What is the largest country in the world?",
        answers: ["Canada", "China", "USA", "Russia"],
        topic: "Geography",
      },
      {
        question: "What is the tallest mountain in the world?",
        answers: ["K2", "Kangchenjunga", "Everest", "Makalu"],
        topic: "Geography",
      },
    ]);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setTimeLeft(30);
    setProgress(((currentQuestionIndex + 1) / questions.length) * 100);
  }, [currentQuestionIndex, questions.length]);

  const handleAnswerClick = (answer: string) => {
    setCurrentAnswer(answer);
  };

  const handleNextClick = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setCurrentAnswer(null);
    } else {
      console.log("Quiz completed!");
    }
  };

  const ClockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-muted-foreground"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    );
  };

  const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div
          className="bg-black/95 h-2.5 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    );
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex bg-slate-50 justify-center items-center min-h-screen">
      <section className="w-full md:max-w-3xl p-6 rounded-lg shadow-xl bg-white">
        <h1 className="text-3xl font-bold mb-6 text-center">Take a Quiz</h1>
        <div className="rounded-lg">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">
                {currentQuestion.topic} Quiz
              </h2>
              <div className="">
                <span className="font-bold">{currentQuestionIndex + 1}</span> /{" "}
                {questions.length}
              </div>
            </div>
            <ProgressBar progress={progress} />
            <div className="mb-6">
              <p className="text-lg">{currentQuestion.question}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {currentQuestion.answers.map((answer) => (
                  <button
                    key={answer}
                    onClick={() => handleAnswerClick(answer)}
                    className={`rounded-md p-3 font-semibold border-2 transition-all ${
                      currentAnswer === answer
                        ? "bg-primary text-black border-primary border-gray-800 "
                        : "border-gray-300 text-muted-foreground hover:bg-primary hover:bg-slate-100 hover:border-primary"
                    }`}
                  >
                    {answer}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 ">
                <ClockIcon className="w-4 h-4 mr-1" />
                <span>{timeLeft}s</span>
              </div>
              <button
                onClick={handleNextClick}
                className="px-4 py-2 bg-primary text-white font-semibold rounded-md transition-all bg-black/90 hover:bg-primary-dark"
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <ClientSocket />
      </section>
    </div>
  );
};

export default Quizpage;