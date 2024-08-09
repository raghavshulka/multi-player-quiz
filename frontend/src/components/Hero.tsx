import { Link } from "react-router-dom";
import vid from "../assets/vid.mp4"
const Hero = () => {
  return (
    <div className="px-4 py-10">
      <div className="flex flex-col md:flex-row gap-6 justify-start md:justify-center items-center">
        {/* Left Section */}
        <div className="flex md:ml-8 flex-col gap-4 md:w-1/2">
          <h1 className="text-5xl font-bold leading-tight">
            Test Your
            <br /> Knowledge with Engaging Quizzes
          </h1>
          <p className="text-slate-600 text-lg font-medium">
            Explore a wide range of topics, challenge
            <br /> your mind, and have fun with our expertly
            <br /> crafted quizzes.
          </p>
          <div className="self-start">
            <button className="bg-black text-xl px-4 py-2 rounded-md text-white hover:bg-gray-800 transition">
              Start a Quiz
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 flex justify-center md:justify-center">
        <div className="relative h-[450px] w-[450px] md:w-[700px] rounded-md overflow-hidden">
            <video 
              autoPlay
              loop
              muted 
              preload="auto"
              className="object-cover w-full h-full"
              src={vid}
              
            >
              Your browser does not support the video tag.
            </video>
          </div>

        </div>
      </div>

      <div className="mt-12 flex flex-col justify-center items-center bg-slate-100 p-1 py-20">
        <h2 className="text-5xl font-bold">Popular Quizzes</h2>
        <p className="py-4 text-xl text-slate-600 font-normal">
          Explore our most popular and engaging
          <br /> quizzes across a variety of topics.
        </p>

        {/* Cards Section */}
        <div className="flex flex-col md:flex-row gap-6 justify-center md:justify-start ">
          <div className="flex flex-col items-center justify-center gap-4 p-6 border rounded-lg shadow w-full md:w-1/3">
            <div className="h-12 w-12">{/* Icon Placeholder */}</div>
            <h3 className="text-2xl font-bold">History Challenge</h3>
            <p className="text-base text-slate-500">
              Dive into the past and test your historical knowledge.
            </p>
            <a
              href="#"
              className="inline-flex h-9 items-center justify-center rounded-md bg-black text-white px-4 text-sm font-medium shadow transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-500 disabled:pointer-events-none disabled:opacity-50"
            >
              Start Quiz
            </a>
          </div>

          {/* Additional Cards */}
          <div className="flex flex-col items-center justify-center gap-4 p-6 border rounded-lg shadow w-full md:w-1/3">
            <div className="h-12 w-12">{/* Icon Placeholder */}</div>
            <h3 className="text-2xl font-bold">Science Trivia</h3>
            <p className="text-base text-slate-500">
              Explore the wonders of science and put your knowledge to the test.
            </p>
            <a
              href="#"
              className="inline-flex h-9 items-center justify-center rounded-md bg-black text-white px-4 text-sm font-medium shadow transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-500 disabled:pointer-events-none disabled:opacity-50"
            >
              Start Quiz
            </a>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 p-6 border rounded-lg shadow w-full md:w-1/3">
            <div className="h-12 w-12">{/* Icon Placeholder */}</div>
            <h3 className="text-2xl font-bold">Math Mastery</h3>
            <p className="text-base text-slate-500">
              Challenge your mathematical skills with our tricky quizzes.
            </p>
            <a
              href="#"
              className="inline-flex h-9 items-center justify-center rounded-md bg-black text-white px-4 text-sm font-medium shadow transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-500 disabled:pointer-events-none disabled:opacity-50"
            >
              Start Quiz
            </a>
          </div>
        </div>
      </div>

      <div className="px-4 py-12 bg-gray-50">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">
          What Our Users Say
        </h2>
        <p className="text-lg text-slate-600 mt-4">
          Hear from our satisfied users and see why they love our quiz app.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="flex flex-col items-center p-6 border rounded-lg shadow bg-white">
          {/* Avatar */}
          <div className="h-16 w-16 bg-gray-300 rounded-full mb-4"></div>
          {/* User Name and Title */}
          <h3 className="text-xl font-semibold">John Doe</h3>
          <p className="text-sm text-slate-500">Software Engineer</p>
          {/* Testimonial */}
          <p className="mt-4 text-center text-slate-600">
            "I love using this quiz app! The questions are challenging and the
            interface is so clean and easy to use. It's become a regular part of my routine."
          </p>
        </div>

        <div className="flex flex-col items-center p-6 border rounded-lg shadow bg-white">
          {/* Avatar */}
          <div className="h-16 w-16 bg-gray-300 rounded-full mb-4"></div>
          {/* User Name and Title */}
          <h3 className="text-xl font-semibold">Jane Smith</h3>
          <p className="text-sm text-slate-500">Marketing Manager</p>
          {/* Testimonial */}
          <p className="mt-4 text-center text-slate-600">
            "This quiz app has been a game-changer for me. It's helped me learn so much
            and stay mentally sharp. I highly recommend it to anyone looking to challenge themselves."
          </p>
        </div>

        <div className="flex flex-col items-center p-6 border rounded-lg shadow bg-white">
          {/* Avatar */}
          <div className="h-16 w-16 bg-gray-300 rounded-full mb-4"></div>
          {/* User Name and Title */}
          <h3 className="text-xl font-semibold">Michael Johnson</h3>
          <p className="text-sm text-slate-500">Student</p>
          {/* Testimonial */}
          <p className="mt-4 text-center text-slate-600">
            "I use this quiz app to prepare for my exams and it's been incredibly helpful.
            The questions are well-crafted and the feedback is really useful. Highly recommended!"
          </p>
        </div>
      </div>
    </div>
    <footer className="flex flex-col gap-2 sm:flex-row py-4 w-full items-center px-4 md:px-6 border-t bg-gray-50">
        <p className="text-xs text-gray-500">
          &copy; 2024 Quiz App. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-2 sm:gap-6">
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

export default Hero;
