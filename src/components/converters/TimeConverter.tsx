import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import { FaClock } from 'react-icons/fa';

interface TimeConverterProps {
  isOpen: boolean;
  onClose: () => void;
}

type TimeUnit = 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year' | 'millisecond' | 'microsecond' | 'nanosecond' | 'decade' | 'century' | 'millennium';

const TimeConverter: React.FC<TimeConverterProps> = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<TimeUnit>('hour');
  const [toUnit, setToUnit] = useState<TimeUnit>('day');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Reset result when input changes
  useEffect(() => {
    if (inputValue === '') {
      setResult('');
      setError('');
    }
  }, [inputValue]);

  const convertTime = () => {
    const numericValue = parseFloat(inputValue);
    
    if (isNaN(numericValue)) {
      setError('Por favor, insira um valor numérico válido');
      setResult('');
      return;
    }
    
    setError('');
    let convertedValue: number;

    // First convert to Second (our "intermediate" unit)
    let secondValue: number;
    switch (fromUnit) {
      case 'second':
        secondValue = numericValue;
        break;
      case 'minute':
        secondValue = numericValue * 60;
        break;
      case 'hour':
        secondValue = numericValue * 3600;
        break;
      case 'day':
        secondValue = numericValue * 86400;
        break;
      case 'week':
        secondValue = numericValue * 604800;
        break;
      case 'month':
        secondValue = numericValue * 2629800; // 30,4167 days * 86400 seconds/day
        break;
      case 'year':
        secondValue = numericValue * 31557600; // 365,25 days * 86400 seconds/day
        break;
      case 'millisecond':
        secondValue = numericValue / 1000;
        break;
      case 'microsecond':
        secondValue = numericValue / 1000000;
        break;
      case 'nanosecond':
        secondValue = numericValue / 1000000000;
        break;
      case 'decade':
        secondValue = numericValue * 315576000; // 10 years
        break;
      case 'century':
        secondValue = numericValue * 3155760000; // 100 years
        break;
      case 'millennium':
        secondValue = numericValue * 31557600000; // 1000 years
        break;
    }

    // Then convert from Second to target unit
    switch (toUnit) {
      case 'second':
        convertedValue = secondValue;
        break;
      case 'minute':
        convertedValue = secondValue / 60;
        break;
      case 'hour':
        convertedValue = secondValue / 3600;
        break;
      case 'day':
        convertedValue = secondValue / 86400;
        break;
      case 'week':
        convertedValue = secondValue / 604800;
        break;
      case 'month':
        convertedValue = secondValue / 2629800; // 30,4167 days * 86400 seconds/day
        break;
      case 'year':
        convertedValue = secondValue / 31557600; // 365,25 days * 86400 seconds/day
        break;
      case 'millisecond':
        convertedValue = secondValue * 1000;
        break;
      case 'microsecond':
        convertedValue = secondValue * 1000000;
        break;
      case 'nanosecond':
        convertedValue = secondValue * 1000000000;
        break;
      case 'decade':
        convertedValue = secondValue / 315576000; // 10 years
        break;
      case 'century':
        convertedValue = secondValue / 3155760000; // 100 years
        break;
      case 'millennium':
        convertedValue = secondValue / 31557600000; // 1000 years
        break;
    }

    // Format the result to avoid excessive decimal places
    setResult(convertedValue.toFixed(4));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleFromUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFromUnit(e.target.value as TimeUnit);
  };

  const handleToUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToUnit(e.target.value as TimeUnit);
  };

  const handleReset = () => {
    setInputValue('');
    setFromUnit('hour');
    setToUnit('day');
    setResult('');
    setError('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Conversor de Tempo">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-center mb-2">
          <div className="w-16 h-16 rounded-full bg-blue-900 text-white flex items-center justify-center text-2xl">
            <FaClock />
          </div>
        </div>
        
        {/* Input field */}
        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700">
            Valor
          </label>
          <input
            type="number"
            id="time"
            step="any"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-black focus:ring-blue-500 focus:border-blue-500"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Digite o valor"
          />
        </div>

        {/* Conversion units */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="fromUnit" className="block text-sm font-medium text-gray-700">
              De
            </label>
            <select
              id="fromUnit"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-black focus:ring-blue-500 focus:border-blue-500"
              value={fromUnit}
              onChange={handleFromUnitChange}
            >
              <option value="second">Segundo (s)</option>
              <option value="minute">Minuto (min)</option>
              <option value="hour">Hora (h)</option>
              <option value="day">Dia</option>
              <option value="week">Semana</option>
              <option value="month">Mês</option>
              <option value="year">Ano (y)</option>
              <option value="millisecond">Milissegundo (ms)</option>
              <option value="microsecond">Microssegundo (µs)</option>
              <option value="nanosecond">Nanossegundo (ns)</option>
              <option value="decade">Década</option>
              <option value="century">Século</option>
              <option value="millennium">Milênio</option>
            </select>
          </div>
          <div>
            <label htmlFor="toUnit" className="block text-sm font-medium text-gray-700">
              Para
            </label>
            <select
              id="toUnit"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-black focus:ring-blue-500 focus:border-blue-500"
              value={toUnit}
              onChange={handleToUnitChange}
            >
              <option value="second">Segundo (s)</option>
              <option value="minute">Minuto (min)</option>
              <option value="hour">Hora (h)</option>
              <option value="day">Dia</option>
              <option value="week">Semana</option>
              <option value="month">Mês</option>
              <option value="year">Ano (y)</option>
              <option value="millisecond">Milissegundo (ms)</option>
              <option value="microsecond">Microssegundo (µs)</option>
              <option value="nanosecond">Nanossegundo (ns)</option>
              <option value="decade">Década</option>
              <option value="century">Século</option>
              <option value="millennium">Milênio</option>
            </select>
          </div>
        </div>

        {/* Converter button */}
        <button
          onClick={convertTime}
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Converter
        </button>

        {/* Result */}
        {result && (
          <div className="mt-4 p-3 bg-gray-100 rounded-md">
            <p className="text-sm text-gray-600">Resultado:</p>
            <p className="text-lg font-bold text-black">
              {inputValue} {fromUnit === 'second' ? 's' : fromUnit === 'minute' ? 'min' : 
                          fromUnit === 'hour' ? 'h' : fromUnit === 'day' ? 'dia' : 
                          fromUnit === 'week' ? 'semana' : fromUnit === 'month' ? 'mês' : 
                          fromUnit === 'year' ? 'ano' : fromUnit === 'millisecond' ? 'ms' : 
                          fromUnit === 'microsecond' ? 'µs' : fromUnit === 'nanosecond' ? 'ns' : 
                          fromUnit === 'decade' ? 'década' : fromUnit === 'century' ? 'século' : 'milênio'} = {result}{' '}
              {toUnit === 'second' ? 's' : toUnit === 'minute' ? 'min' : 
               toUnit === 'hour' ? 'h' : toUnit === 'day' ? 'dia' : 
               toUnit === 'week' ? 'semana' : toUnit === 'month' ? 'mês' : 
               toUnit === 'year' ? 'ano' : toUnit === 'millisecond' ? 'ms' : 
               toUnit === 'microsecond' ? 'µs' : toUnit === 'nanosecond' ? 'ns' : 
               toUnit === 'decade' ? 'década' : toUnit === 'century' ? 'século' : 'milênio'}
            </p>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="mt-2 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Reset button */}
        <button
          onClick={handleReset}
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-200 bg-gray-900 border border-transparent rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"        >
          Limpar
        </button>
      </div>
    </Modal>
  );
};

export default TimeConverter;