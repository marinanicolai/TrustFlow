import { useState } from 'react';
import { ReflectionQuestion } from './components/ReflectionQuestion';
import { TrustRating } from './components/TrustRatings';
import { ActionPlanCard } from './components/ActionPlanCard';
import { Target } from 'lucide-react';

type Step = 'reflection' | 'rating' | 'action';

interface ActionStep {
  id: number;
  text: string;
  completed: boolean;
}

const DAILY_QUESTIONS = [
  "What's one promise I made to myself recently, and did I keep it?",
  "When did I choose what was right for me over what was easy today?",
  "What's a decision I'm proud of making this week?",
  "In what area of my life do I feel most aligned with my values?",
  "What would I do differently today if I trusted myself completely?",
  "What small win can I celebrate from today?",
  "Where did I show up for myself today, even in a small way?",
];

const generateActionSteps = (rating: number): ActionStep[] => {
  if (rating <= 3) {
    return [
      { id: 1, text: 'Write down one thing you did well today, no matter how small', completed: false },
      { id: 2, text: 'Set one tiny, achievable goal for tomorrow', completed: false },
      { id: 3, text: 'Practice 5 minutes of deep breathing or meditation', completed: false },
    ];
  } else if (rating <= 6) {
    return [
      { id: 1, text: 'Identify one decision you need to make and list pros/cons', completed: false },
      { id: 2, text: "Take action on something you've been postponing for 15 minutes", completed: false },
      { id: 3, text: '"I trust my ability to figure this out" - say this to yourself', completed: false },
    ];
  } else if (rating <= 8) {
    return [
      { id: 1, text: 'Tackle your most important task first thing tomorrow', completed: false },
      { id: 2, text: 'Share your progress or a win with someone you trust', completed: false },
    ];
  } else {
    return [
      { id: 1, text: 'Take on a challenge that excites and stretches you', completed: false },
      { id: 2, text: "Mentor or help someone who's building their own self-trust", completed: false },
    ];
  }
};

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('reflection');
  const [reflectionAnswer, setReflectionAnswer] = useState('');
  const [trustRating, setTrustRating] = useState(5);
  const [actionSteps, setActionSteps] = useState<ActionStep[]>([]);

  // Get today's question based on date
  const todayQuestion = DAILY_QUESTIONS[new Date().getDay()];

  const handleReflectionNext = () => {
    setCurrentStep('rating');
  };

  const handleRatingNext = () => {
    const steps = generateActionSteps(trustRating);
    setActionSteps(steps);
    setCurrentStep('action');
  };

  const handleToggleStep = (id: number) => {
    setActionSteps(
      actionSteps.map((step) =>
        step.id === id ? { ...step, completed: !step.completed } : step
      )
    );
  };

  const handleReset = () => {
    setCurrentStep('reflection');
    setReflectionAnswer('');
    setTrustRating(5);
    setActionSteps([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900">TrustFlow</h1>
              <p className="text-gray-600">Build self-trust daily</p>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="max-w-md mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-8">
          {(['reflection', 'rating', 'action'] as Step[]).map((step, index) => (
            <div key={step} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  currentStep === step
                    ? 'bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg scale-110'
                    : index < (['reflection', 'rating', 'action'] as Step[]).indexOf(currentStep)
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {index + 1}
              </div>
              {index < 2 && (
                <div
                  className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                    index < (['reflection', 'rating', 'action'] as Step[]).indexOf(currentStep)
                      ? 'bg-emerald-500'
                      : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="pb-8">
          {currentStep === 'reflection' && (
            <ReflectionQuestion
              question={todayQuestion}
              answer={reflectionAnswer}
              onAnswerChange={setReflectionAnswer}
              onNext={handleReflectionNext}
            />
          )}

          {currentStep === 'rating' && (
            <TrustRating
              rating={trustRating}
              onRatingChange={setTrustRating}
              onNext={handleRatingNext}
            />
          )}

          {currentStep === 'action' && (
            <ActionPlanCard
              rating={trustRating}
              steps={actionSteps}
              onToggleStep={handleToggleStep}
              onReset={handleReset}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;