import React, { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { allContext } from "../Context/CreateStore";

type Question = {
  _id: string;
  topic: string;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correctOption: string;
  timer: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  image?: string;
};

type Result = {
  _id: string;
  name: string;
  socketid: string;
  score: number;
  __v: number;
};

const Quizpage = () => {
  const { data } = useContext(allContext);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [results, setResult] = useState<Result[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [progress, setProgress] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [username] = useState(localStorage.getItem("auth") || "");

  useEffect(() => {
    if (data) {
      setQuestions(data);
      console.log(data)
    }
  }, [data]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          handleNextClick();
          return 0;
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentQuestionIndex]);

  async function allscore(currentScore: number) {
    try {
      const response = await axios.post(
        "https://multi-player-quiz.onrender.com/api/v1/user/score",
        {
          name: username,
          score: currentScore,
        }
      );
      return response.data.data;
    } catch (error) {
      console.error("Error posting score or fetching results:", error);
    }
  }

  useEffect(() => {
    if (questions.length > 0) {
      setTimeLeft(questions[currentQuestionIndex].timer || 30);
      setProgress(((currentQuestionIndex + 1) / questions.length) * 100);
    }
  }, [currentQuestionIndex, questions]);

  const handleAnswerClick = (answer: string) => {
    setCurrentAnswer(answer);
  };

  const handleNextClick = () => {
    const newScore =
      currentAnswer === questions[currentQuestionIndex].correctOption
        ? score + 1
        : score;

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setCurrentAnswer(null);
      setScore(newScore);
      allscore(newScore);
    } else {
      setScore(newScore);
      allscore(newScore);
      setTimeout(() => {
        setQuizCompleted(true);
      }, 1000);
    }
  };

  useEffect(() => {
    if (quizCompleted) {
      const fetchResult = async () => {
        const scoreResult = await allscore(score);
        if (scoreResult) {
          setResult([scoreResult]);
        } else {
          setResult([]);
        }
      };
      fetchResult();
    }
  }, [quizCompleted, score]);

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

  if (quizCompleted) {
    return (
      <>
        <div className="flex bg-slate-50 justify-center items-center min-h-screen">
          <section className="w-full md:max-w-3xl p-6 rounded-lg shadow-xl bg-white">
            <h1 className="text-3xl font-bold mb-6 text-center">
              Quiz Completed!
            </h1>
            <p className="text-xl text-center mb-4">
              Your score: {score} / {questions.length}
            </p>
            <div className="space-y-4">
              {questions.map((q, index) => (
                <div key={q._id} className="border p-4 rounded-lg">
                  <p className="font-semibold">
                    {index + 1}. {q.question}
                  </p>
                  <p className="mt-2">Correct answer: {q.correctOption}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-8 md:mx-32 px-11 mx-6 my-4 border rounded-md p-6 shadow-lg">
          <h2 className="text-center text-3xl font-semibold pb-6">
            Leaderboard
          </h2>
          <div className="flex items-center justify-between pb-4">
            <p className="font-semibold text-2xl">Name</p>
            <p className="font-semibold text-2xl">Score</p>
          </div>
          {results.length > 0 ? (
            results.map((val) => (
              <div
                key={val._id}
                className="grid grid-cols-2 leading-tight gap-2"
              >
                <div className="flex text-gray-600 justify-start font-semibold text-lg">
                  {val.name}
                </div>
                <div className="flex justify-end font-semibold text-gray-600 text-lg">
                  {val.score}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No results available .</p>
          )}
        </div>
      </>
    );
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
                {[
                  currentQuestion.option1,
                  currentQuestion.option2,
                  currentQuestion.option3,
                  currentQuestion.option4,
                ].map((answer, index) => (
                  <button
                    key={index}
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
      </section>
    </div>
  );
};

export default Quizpage;
