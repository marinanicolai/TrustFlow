import { Heart } from 'lucide-react';
import { useState } from 'react';

interface TrustRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  onNext: () => void;
}

export function TrustRating({ rating, onRatingChange, onNext }: TrustRatingProps) {
  const [isDragging, setIsDragging] = useState(false);

  const getRatingColor = (value: number) => {
    if (value <= 3) return 'from-red-400 to-red-500';
    if (value <= 6) return 'from-amber-400 to-orange-500';
    if (value <= 8) return 'from-teal-400 to-cyan-500';
    return 'from-emerald-400 to-green-500';
  };

  const getRatingText = (value: number) => {
    if (value <= 3) return 'Building Foundation';
    if (value <= 6) return 'Growing Stronger';
    if (value <= 8) return 'Feeling Confident';
    return 'Trusting Myself';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 p-6 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-3xl shadow-lg">
        <Heart className="w-6 h-6 text-white flex-shrink-0 mt-1" />
        <div>
          <h2 className="text-white mb-2">Self-Trust Check-In</h2>
          <p className="text-white/90">
            How much do you trust yourself right now?
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-lg space-y-6">
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br ${getRatingColor(rating)} shadow-lg mb-4`}>
            <span className="text-white">{rating}</span>
          </div>
          <p className="text-gray-700">{getRatingText(rating)}</p>
        </div>

        <div className="space-y-4">
          <input
            type="range"
            min="1"
            max="10"
            value={rating}
            onChange={(e) => onRatingChange(Number(e.target.value))}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            className={`w-full h-3 rounded-full appearance-none cursor-pointer transition-all ${
              isDragging ? 'scale-105' : ''
            }`}
            style={{
              background: `linear-gradient(to right, 
                #ef4444 0%, 
                #f59e0b ${((rating - 1) / 9) * 100}%, 
                #e5e7eb ${((rating - 1) / 9) * 100}%, 
                #e5e7eb 100%)`,
            }}
          />
          <div className="flex justify-between text-gray-500">
            <span>1</span>
            <span>5</span>
            <span>10</span>
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full py-4 px-6 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all"
      >
        Get My Action Plan
      </button>
    </div>
  );
}
