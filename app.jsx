import { useMemo, useState } from 'react';
import './App.css';

const questions = [
  {
    prompt: 'Choose your vibe before heading out on a road trip.',
    options: [
      { label: 'Zooming past everyone in a silver blur', group: 'speed' },
      { label: 'Strolling calmly with perfect timing', group: 'reliable' },
      { label: 'Making a dramatic entrance, louder than necessary', group: 'loud' },
      { label: 'Cuddling up in a cozy blanket and getting there later', group: 'cozy' },
    ],
  },
  {
    prompt: 'Pick the sound that best describes your ideal highway soundtrack.',
    options: [
      { label: 'A nice purr and an engine whisper', group: 'reliable' },
      { label: 'Rumble, turbo, and full drama', group: 'speed' },
      { label: 'A vintage horn with total confidence', group: 'loud' },
      { label: 'Soft jazz with a nap break every 20 minutes', group: 'cozy' },
    ],
  },
  {
    prompt: 'What is your ideal parking strategy?',
    options: [
      { label: 'Sneak into the tiny gap and make it look easy', group: 'speed' },
      { label: 'Park neatly and never ever move again', group: 'reliable' },
      { label: 'Occupy the whole lane and call it “presence”', group: 'loud' },
      { label: 'Find the nearest sunny spot and loaf there', group: 'cozy' },
    ],
  },
  {
    prompt: 'Your ultimate road trip companion is:',
    options: [
      { label: 'A fierce little speed demon', group: 'speed' },
      { label: 'An old friend who never leaves you stranded', group: 'reliable' },
      { label: 'A loud show-off with extra glitter', group: 'loud' },
      { label: 'A nap-loving cuddle bug', group: 'cozy' },
    ],
  },
];

const resultProfiles = {
  speed: {
    title: 'The Speedy Sports Car',
    description: 'You are fast, flashy, and absolutely convinced every red light is a challenge.',
    tagline: 'A sleek zoomer who treats every lane like a catwalk.',
  },
  reliable: {
    title: 'The Reliable Sedan',
    description: 'You keep calm, get the job done, and somehow never forget the snacks.',
    tagline: 'A dependable little commuter that always arrives on time with impeccable purrs.',
  },
  loud: {
    title: 'The Loud Convertible',
    description: 'You bring energy, flair, and just enough chaos to make the whole block notice.',
    tagline: 'A dramatic favorite with an engine that basically meows “look at me.”',
  },
  cozy: {
    title: 'The Cozy SUV',
    description: 'You are comfort-first, warm-hearted, and deeply committed to a good nap spot.',
    tagline: 'The kind of ride that says “let’s take the scenic route” and absolutely means it.',
  },
};

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [resultKey, setResultKey] = useState(null);

  const currentQuestion = questions[currentStep];

  const resultCatUrl = useMemo(() => {
    return `https://cataas.com/cat?${Date.now()}`;
  }, [resultKey]);

  function handleStart() {
    setHasStarted(true);
    setCurrentStep(0);
    setAnswers([]);
    setResultKey(null);
  }

  function handleAnswer(group) {
    const nextAnswers = [...answers, group];
    setAnswers(nextAnswers);

    if (currentStep === questions.length - 1) {
      const score = nextAnswers.reduce(
        (accumulator, answer) => {
          accumulator[answer] += 1;
          return accumulator;
        },
        { speed: 0, reliable: 0, loud: 0, cozy: 0 },
      );

      const topGroup = Object.entries(score).sort((a, b) => b[1] - a[1])[0][0];
      setResultKey(topGroup);
      return;
    }

    setCurrentStep((step) => step + 1);
  }

  function handleRetake() {
    setHasStarted(false);
    setCurrentStep(0);
    setAnswers([]);
    setResultKey(null);
  }

  const result = resultProfiles[resultKey] || null;

  return (
    <main className="app-shell">
      <section className="quiz-card">
        <div className="title-wrap">
          <p className="eyebrow">A completely serious automotive personality test</p>
          <h1>The Car Lover&apos;s Cat Test</h1>
          <p className="subtitle">Answer four tiny questions and discover which car you are… via cats.</p>
        </div>

        {!hasStarted && !result ? (
          <div className="intro-panel">
            <div className="cat-strip" aria-hidden="true">
              <img src="https://cataas.com/cat?width=320&height=220" alt="" />
              <img src="https://cataas.com/cat?width=320&height=220" alt="" />
            </div>
            <button className="primary-button" onClick={handleStart}>
              Start Test
            </button>
          </div>
        ) : null}

        {hasStarted && !result ? (
          <div className="question-panel">
            <div className="progress-row" aria-label="Question progress">
              <span>
                Question {currentStep + 1} of {questions.length}
              </span>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            <h2>{currentQuestion.prompt}</h2>

            <div className="options-grid">
              {currentQuestion.options.map((option) => (
                <button
                  key={`${currentQuestion.prompt}-${option.label}`}
                  className="option-button"
                  onClick={() => handleAnswer(option.group)}
                >
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {result ? (
          <div className="result-panel">
            <div className="result-image-wrap">
              <img src={resultCatUrl} alt="A cat in a result mood" className="result-image" />
            </div>
            <div className="result-copy">
              <p className="result-label">Your car personality</p>
              <h2>{result.title}</h2>
              <p>{result.description}</p>
              <p className="tagline">{result.tagline}</p>
              <button className="primary-button" onClick={handleRetake}>
                Retake Test
              </button>
            </div>
          </div>
        ) : null}
      </section>
    </main>
  );
}

export default App;