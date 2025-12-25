import { CheckCircle2, Zap, RotateCcw } from 'lucide-react';

interface ActionStep {
  id: number;
  text: string;
  completed: boolean;
}

interface ActionPlanCardProps {
  rating: number;
  steps: ActionStep[];
  onToggleStep: (id: number) => void;
  onReset: () => void;
}

export function ActionPlanCard({ rating, steps, onToggleStep, onReset }: ActionPlanCardProps) {
  const getMotivationMessage = (value: number) => {
    if (value <= 3) return "Every journey starts with a single step. You've got this!";
    if (value <= 6) return "You're making progress! Keep building that trust.";
    if (value <= 8) return "You're on fire! Let's keep the momentum going.";
    return "Amazing! You're in a powerful place. Let's leverage it!";
  };

  const completedCount = steps.filter((step) => step.completed).length;

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 p-6 bg-gradient-to-br from-orange-500 to-pink-600 rounded-3xl shadow-lg">
        <Zap className="w-6 h-6 text-white flex-shrink-0 mt-1" />
        <div>
          <h2 className="text-white mb-2">Your Action Plan</h2>
          <p className="text-white/90">{getMotivationMessage(rating)}</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-lg space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Today's Steps</h3>
          <span className="text-gray-500">
            {completedCount}/{steps.length}
          </span>
        </div>

        <div className="space-y-3">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => onToggleStep(step.id)}
              className={`w-full flex items-start gap-3 p-4 rounded-2xl border-2 transition-all text-left ${
                step.completed
                  ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-300'
                  : 'bg-gray-50 border-gray-200 hover:border-violet-300'
              }`}
            >
              <CheckCircle2
                className={`w-6 h-6 flex-shrink-0 mt-0.5 transition-colors ${
                  step.completed ? 'text-emerald-500' : 'text-gray-300'
                }`}
              />
              <span
                className={`flex-1 transition-all ${
                  step.completed
                    ? 'text-gray-700 line-through opacity-75'
                    : 'text-gray-900'
                }`}
              >
                {step.text}
              </span>
            </button>
          ))}
        </div>

        {completedCount === steps.length && (
          <div className="mt-6 p-4 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-2xl border-2 border-emerald-300">
            <p className="text-emerald-800 text-center">
              🎉 Awesome! You completed today's action plan!
            </p>
          </div>
        )}
      </div>

      <button
        onClick={onReset}
        className="w-full py-4 px-6 bg-gray-100 text-gray-700 rounded-2xl shadow hover:shadow-md transition-all flex items-center justify-center gap-2"
      >
        <RotateCcw className="w-5 h-5" />
        Start New Reflection
      </button>
    </div>
  );
}
