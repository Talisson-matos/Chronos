import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import { FaTemperatureLow } from 'react-icons/fa';

interface TemperatureConverterProps {
  isOpen: boolean;
  onClose: () => void;
}

type TempUnit = 'celsius' | 'fahrenheit' | 'kelvin';

const TemperatureConverter: React.FC<TemperatureConverterProps> = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<TempUnit>('celsius');
  const [toUnit, setToUnit] = useState<TempUnit>('fahrenheit');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Reset result when input changes
  useEffect(() => {
    if (inputValue === '') {
      setResult('');
      setError('');
    }
  }, [inputValue]);

  const convertTemperature = () => {
    const numericValue = parseFloat(inputValue);
    
    if (isNaN(numericValue)) {
      setError('Por favor, insira um valor numérico válido');
      setResult('');
      return;
    }
    
    setError('');
    let convertedValue: number;

    // First convert to Kelvin (our "intermediate" unit)
    let kelvinValue: number;
    switch (fromUnit) {
      case 'celsius':
        kelvinValue = numericValue + 273.15;
        break;
      case 'fahrenheit':
        kelvinValue = (numericValue - 32) * 5/9 + 273.15;
        break;
      case 'kelvin':
        kelvinValue = numericValue;
        break;
    }

    // Then convert from Kelvin to target unit
    switch (toUnit) {
      case 'celsius':
        convertedValue = kelvinValue - 273.15;
        break;
      case 'fahrenheit':
        convertedValue = (kelvinValue - 273.15) * 9/5 + 32;
        break;
      case 'kelvin':
        convertedValue = kelvinValue;
        break;
    }

    // Format the result to avoid excessive decimal places
    setResult(convertedValue.toFixed(2));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleFromUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFromUnit(e.target.value as TempUnit);
  };

  const handleToUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToUnit(e.target.value as TempUnit);
  };

  const handleReset = () => {
    setInputValue('');
    setFromUnit('celsius');
    setToUnit('fahrenheit');
    setResult('');
    setError('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Conversor de Temperatura">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-center mb-2">
          <div className="w-16 h-16 rounded-full bg-blue-900 text-white flex items-center justify-center text-2xl">
            <FaTemperatureLow />
          </div>
        </div>
        
        {/* Input field */}
        <div>
          <label htmlFor="temperature" className="block text-sm font-medium text-gray-700">
            Valor
          </label>
          <input
            type="number"
            id="temperature"
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
              className="mt-1  text-black block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={fromUnit}
              onChange={handleFromUnitChange}
            >
              <option value="celsius">Celsius (°C)</option>
              <option value="fahrenheit">Fahrenheit (°F)</option>
              <option value="kelvin">Kelvin (K)</option>
            </select>
          </div>
          <div>
            <label htmlFor="toUnit" className="block text-sm font-medium text-gray-700">
              Para
            </label>
            <select
              id="toUnit"
              className="mt-1 block w-full p-2 border  text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={toUnit}
              onChange={handleToUnitChange}
            >
              <option value="celsius">Celsius (°C)</option>
              <option value="fahrenheit">Fahrenheit (°F)</option>
              <option value="kelvin">Kelvin (K)</option>
            </select>
          </div>
        </div>

        {/* Converter button */}
        <button
          onClick={convertTemperature}
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Converter
        </button>

        {/* Result */}
        {result && (
          <div className="mt-4 p-3 bg-gray-100 rounded-md">
            <p className="text-sm text-gray-600">Resultado:</p>
            <p className="text-lg  text-black font-bold">
              {inputValue} {fromUnit === 'celsius' ? '°C' : fromUnit === 'fahrenheit' ? '°F' : 'K'} = {result}{' '}
              {toUnit === 'celsius' ? '°C' : toUnit === 'fahrenheit' ? '°F' : 'K'}
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

export default TemperatureConverter;