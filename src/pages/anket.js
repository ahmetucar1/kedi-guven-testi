import React, { useState } from "react";
import { questions } from "./data";

const KediGuvenAnketi = () => {
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null); 

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        questionId,
        answer,
      },
    ]);
  };

  const interpretResult = (percent) => {
    if (percent >= 0 && percent <= 20) {
      return "Güvenmiyor";
    } else if (percent > 20 && percent <= 50) {
      return "Güveniyor ama temkinli";
    } else if (percent > 50 && percent <= 70) {
      return "Güveniyor";
    } else if (percent > 70 && percent <= 100) {
      return "Güveni tam";
    } else {
      return "Geçersiz sonuç";
    }
  };

  const handleSubmit = () => {
    const totalQuestions = questions.length;
    let correctAnswers = 0;

    answers.forEach((answer) => {
      const question = questions.find((q) => q.id === answer.questionId);
      if (question && question.correctAnswer === answer.answer) {
        correctAnswers++;
      }
    });

    const percent = (correctAnswers / totalQuestions) * 100;
    const roundedPercent = Math.floor(percent);
    setResult(interpretResult(roundedPercent));
  };

  return (
    <div
    className="min-h-screen bg-gradient-to-r from-blue-400 to-indigo-500 py-8"
    style={{ backgroundImage: "url('/kedi.jpg')" }} 
  >
    <div className="max-w-md mx-auto  rounded-lg shadow-lg">
    <div className="min-h-screen py-8">
      <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
          Kedi Güven Anketi
        </h2>
        {questions.map((q) => (
          <div key={q.id} className="mb-4">
            <p className="text-gray-800 mb-1">
              {q.id}. {q.question}
            </p>
            <ul className="ml-4">
              {q.options.map((option, index) => (
                <li key={index} className="mt-1">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={option}
                      onChange={() => handleAnswerChange(q.id, option)}
                      className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    />
                    <span className="ml-2 text-gray-800">{option}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      <button
          onClick={handleSubmit}
          className="w-full mt-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
        >
          Sonuçları Gönder
        </button>
        {result && (
           <div className="mt-4 p-4 rounded-md text-center text-white font-semibold bg-blue-800">
          <p className="mt-1 text-center text-white font-semibold">
            Kedinizin size {result}
          </p>
           </div>
        )}
        </div>
    </div>
      </div>
    </div>
  );
};

export default KediGuvenAnketi;
