import React from 'react';
import CountUp from 'react-countup';
const STATS = [
  { end: 12000, suffix: "+", label: "Ebooks" },
  { end: 3400,  suffix: "+", label: "Writers" },
  { end: 98000, suffix: "+", label: "Readers" },
];
const NumberCountUp = () => {
    return (
        <>
   {STATS.map(({ end, suffix, label }) => (
            <div key={label} className="flex flex-col items-center gap-0.5">
              <span className="text-xl sm:text-2xl font-bold text-white ">
                <CountUp
                  end={end}
                  suffix={suffix}
                  duration={2.5}
                  separator=","
                 
                />
              </span>
              <span className="text-xs text-zinc-500">{label}</span>
            </div>
          ))}


        </>
    );
};

export default NumberCountUp;