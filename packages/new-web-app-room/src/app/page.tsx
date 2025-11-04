'use client';

import { useState, useEffect } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [isWiggling, setIsWiggling] = useState(false);

  // Wiggle animation for equals button every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsWiggling(true);
      setTimeout(() => setIsWiggling(false), 600); // Animation duration
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clearAll = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const clearEntry = () => {
    setDisplay('0');
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-orange-50 to-orange-100 rounded-lg shadow-xl p-6 w-full max-w-sm border border-orange-200">
        <h1 className="text-2xl font-bold text-center mb-6 text-orange-800">Coop&apos;s Calc</h1>
        
        {/* Display */}
        <div className="bg-gradient-to-r from-orange-800 to-orange-900 text-white p-4 rounded-lg mb-4 text-right text-2xl font-mono min-h-[60px] flex items-center justify-end shadow-inner">
          {display}
        </div>

        {/* Button Grid */}
        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 */}
          <button
            onClick={clearAll}
            className="col-span-2 bg-purple-500 hover:bg-purple-600 hover:scale-105 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Clear
          </button>
          <button
            onClick={clearEntry}
            className="bg-orange-400 hover:bg-orange-500 hover:scale-105 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            CE
          </button>
          <button
            onClick={() => inputOperation('÷')}
            className="bg-orange-600 hover:bg-orange-700 hover:scale-105 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            ÷
          </button>

          {/* Row 2 */}
          <button
            onClick={() => inputNumber('7')}
            className="bg-orange-200 hover:bg-orange-300 hover:scale-105 text-orange-900 font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            7
          </button>
          <button
            onClick={() => inputNumber('8')}
            className="bg-orange-200 hover:bg-orange-300 hover:scale-105 text-orange-900 font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            8
          </button>
          <button
            onClick={() => inputNumber('9')}
            className="bg-orange-200 hover:bg-orange-300 hover:scale-105 text-orange-900 font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            9
          </button>
          <button
            onClick={() => inputOperation('×')}
            className="bg-orange-600 hover:bg-orange-700 hover:scale-105 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            ×
          </button>

          {/* Row 3 */}
          <button
            onClick={() => inputNumber('4')}
            className="bg-orange-200 hover:bg-orange-300 hover:scale-105 text-orange-900 font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            4
          </button>
          <button
            onClick={() => inputNumber('5')}
            className="bg-orange-200 hover:bg-orange-300 hover:scale-105 text-orange-900 font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            5
          </button>
          <button
            onClick={() => inputNumber('6')}
            className="bg-orange-200 hover:bg-orange-300 hover:scale-105 text-orange-900 font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            6
          </button>
          <button
            onClick={() => inputOperation('-')}
            className="bg-orange-600 hover:bg-orange-700 hover:scale-105 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            -
          </button>

          {/* Row 4 */}
          <button
            onClick={() => inputNumber('1')}
            className="bg-orange-200 hover:bg-orange-300 hover:scale-105 text-orange-900 font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            1
          </button>
          <button
            onClick={() => inputNumber('2')}
            className="bg-orange-200 hover:bg-orange-300 hover:scale-105 text-orange-900 font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            2
          </button>
          <button
            onClick={() => inputNumber('3')}
            className="bg-orange-200 hover:bg-orange-300 hover:scale-105 text-orange-900 font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            3
          </button>
          <button
            onClick={() => inputOperation('+')}
            className="bg-orange-600 hover:bg-orange-700 hover:scale-105 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            +
          </button>

          {/* Row 5 */}
          <button
            onClick={() => inputNumber('0')}
            className="col-span-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            0
          </button>
          <button
            onClick={inputDecimal}
            className="bg-orange-200 hover:bg-orange-300 hover:scale-105 text-orange-900 font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            .
          </button>
          <button
            onClick={performCalculation}
            className={`bg-green-500 hover:bg-green-600 hover:scale-105 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg ${
              isWiggling ? 'animate-wiggle' : ''
            }`}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}



















