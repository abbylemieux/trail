import { useState } from "react";

const questions = [
  {
    question:
      "How would you describe your current fitness level for outdoor activities such as hiking or trail running?",
    options: [
      "Beginner: I have little to no experience hiking or running on trails. I prefer flat, easy terrain and can manage walks or short hikes under 2 miles.",
      "Moderate: I have some experience hiking or running on trails. I’m comfortable with moderate inclines and can manage hikes or runs between 2-5 miles.",
      "Advanced: I hike or run regularly on trails, including steep inclines and rough terrain. I can handle longer hikes (5+ miles) and more challenging conditions.",
      "Expert: I am highly experienced with rigorous hikes or trail runs that include steep elevation changes, rocky or uneven terrain, and distances over 10 miles.",
    ],
  },
  {
    question: "What type of trail experience are you looking for?",
    options: [
      "Scenic/Relaxing: I prefer leisurely walks with minimal elevation and scenic views. I enjoy nature but prefer less strenuous paths.",
      "Moderate Adventure: I like a bit of a challenge, with moderate inclines and some obstacles, but nothing too extreme.",
      "Challenging: I enjoy rugged terrain, steep inclines, and a physical workout, but not necessarily for long distances.",
      "Extreme Adventure: I want a tough, multi-hour challenge with steep elevation, rough terrain, and high endurance requirements.",
    ],
  },
  {
    question: "How much time do you usually have for outdoor activities?",
    options: [
      "Less than 1 hour: I prefer quick hikes or runs, around 1-2 miles.",
      "1-2 hours: I can commit to moderate trails, 2-4 miles.",
      "2-4 hours: I enjoy longer, more immersive hikes, 4-8 miles.",
      "4+ hours: I am ready for long-distance hikes or multi-day adventures over 8 miles.",
    ],
  },
  {
    question: "How do you handle elevation changes on trails?",
    options: [
      "Prefer flat terrain: I prefer trails that are mostly flat with little to no elevation gain.",
      "Gentle inclines: I can manage slight elevation changes but prefer a mostly even trail.",
      "Moderate inclines: I enjoy trails with steady elevation changes and can handle a good workout.",
      "Steep ascents/descents: I enjoy a challenge and can tackle steep climbs and descents without difficulty.",
    ],
  },
  {
    question:
      "Do you have any physical limitations or preferences to consider?",
    options: [
      "Yes, I prefer smooth, easy trails: I need or prefer trails without obstacles such as rocks, roots, or steep sections.",
      "Yes, but I can handle moderate terrain: I have some limitations, but I can manage trails with small obstacles or moderate inclines.",
      "No, I’m ready for any challenge: I have no physical limitations and am ready for rough terrain, steep hills, and longer distances.",
      "I’m not sure yet: I’d prefer to start with easier trails to assess my capabilities.",
    ],
  },
];

const calculateMedian = (values) => {
  const sorted = values.filter((v) => v !== null).sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length === 0) return null;
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
};

const determineFitnessLevel = (median) => {
  if (median === null) return "Please answer all questions to get your result.";
  if (median < 1) return "Beginner";
  if (median < 2) return "Moderate";
  if (median < 3) return "Advanced";
  return "Expert";
};

const Quiz = () => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [fitnessLevel, setFitnessLevel] = useState("");

  const handleChange = (index, optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[index] = optionIndex; // Store the selected option index for the current question
    setAnswers(newAnswers);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    if (answers.includes(null)) {
      alert("Please answer all questions before submitting."); // Alert for unanswered questions
      return;
    }
    const median = calculateMedian(answers); // Calculate the median of the answers
    const level = determineFitnessLevel(median); // Determine fitness level based on median
    setFitnessLevel(level); // Update fitness level state
    setSubmitted(true); // Mark the quiz as submitted
  };

  return (
    <div>
      <h1>Trail Experience Quiz</h1>
      <form onSubmit={handleSubmit}>
        {questions.map((q, index) => (
          <div key={index}>
            <h3>{q.question}</h3>
            {q.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <input
                  type="radio"
                  id={`q${index}o${optionIndex}`}
                  name={`question${index}`}
                  value={option}
                  checked={answers[index] === optionIndex}
                  onChange={() => handleChange(index, optionIndex)}
                />
                <label htmlFor={`q${index}o${optionIndex}`}>{option}</label>
              </div>
            ))}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>

      {submitted && (
        <div>
          <h2>Your Fitness Level:</h2>
          <p>{fitnessLevel}</p>
          <h2>Your Answers:</h2>
          <ul>
            {answers.map((answerIndex, index) => (
              <li key={index}>
                {questions[index].question} -{" "}
                {answerIndex !== null
                  ? questions[index].options[answerIndex]
                  : "Not answered"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Quiz;
