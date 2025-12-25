import { Sparkles } from 'lucide-react';

interface ReflectionQuestionProps {
  question: string;
  answer: string;
  onAnswerChange: (answer: string) => void;
  onNext: () => void;
}

export function ReflectionQuestion({
  question,
  answer,
  onAnswerChange,
  onNext,
}: ReflectionQuestionProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 p-6 bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl shadow-lg">
        <Sparkles className="w-6 h-6 text-white flex-shrink-0 mt-1" />
        <div>
          <h2 className="text-white mb-2">Today's Reflection</h2>
          <p className="text-white/90">{question}</p>
        </div>
      </div>

      <div className="space-y-4">
        <label htmlFor="reflection" className="block text-gray-700">
          Your thoughts
        </label>
        <textarea
          id="reflection"
          value={answer}
          onChange={(e) => onAnswerChange(e.target.value)}
          placeholder="Take a moment to reflect..."
          className="w-full h-40 px-4 py-3 bg-white border-2 border-gray-200 rounded-2xl focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all resize-none"
        />
      </div>

      <button
        onClick={onNext}
        disabled={!answer.trim()}
        className="w-full py-4 px-6 bg-gradient-to-r from-coral-500 to-orange-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg"
      >
        Continue
      </button>
    </div>
  );
}
