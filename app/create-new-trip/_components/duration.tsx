import { Button } from '@/components/ui/button';
import { useState } from 'react';

const Duration = ({onselectOption}:any) => {
  const [count, setCount] = useState(0);

  return (
    <div className="max-w-md mx-auto mt-3 p-6 bg-slate-50 rounded-xl border border-slate-100 font-sans shadow-sm flex flex-col items-center">
        <h2 className="text-lg font-bold text-slate-900 mb-6">
          How many days do you want to travel?
        </h2>

        {/* Counter Controls */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <Button 
            onClick={() => setCount(prev => Math.max(0, prev - 1))}
            className="w-10 h-10 rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 flex items-center justify-center text-xl font-medium"
          >
            -
          </Button>
          
          <span className="text-2xl font-black text-slate-900 min-w-[90px] text-center select-none">
            {count} Days
          </span>
          
          <Button 
            onClick={() => setCount(prev => prev + 1)}
            className="w-10 h-10 rounded-full border border-slate-200 bg-white text-slate-600 flex items-center hover:bg-slate-50 justify-center text-xl font-medium"
          >
            +
          </Button>
        </div>

        {/* Confirm Button */}
        <Button onClick={()=>onselectOption(count+ ' Days')} className="px-8 py-2 bg-primary text-white font-semibold rounded-xl text-sm">
          Confirm
        </Button>
      </div>
  );
};

export default Duration;
