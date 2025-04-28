import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import { FaWeightHanging } from 'react-icons/fa';

interface ForceConverterProps {
  isOpen: boolean;
  onClose: () => void;
}

type ForceUnit = 'newton' | 'pound_force' | 'ounce_force' | 'dyne' | 'kilopond' | 'ton_force';

const ForceConverter: React.FC<ForceConverterProps> = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<ForceUnit>('newton');
  const [toUnit, setToUnit] = useState<ForceUnit>('pound_force');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Reset result when input changes
  useEffect(() => {
    if (inputValue === '') {
      setResult('');
      setError('');
    }
  }, [inputValue]);

  const convertForce = () => {
    const numericValue = parseFloat(inputValue);
    
    if (isNaN(numericValue)) {
      setError('Por favor, insira um valor numérico válido');
      setResult('');
      return;
    }
    
    setError('');
    let convertedValue: number;

    // First convert to Newton (our "intermediate" unit)
    let newtonValue: number;
    switch (fromUnit) {
      case 'newton':
        newtonValue = numericValue;
        break;
      case 'pound_force':
        newtonValue = numericValue * 4.448;
        break;
      case 'ounce_force':
        newtonValue = numericValue * 0.278;
        break;
      case 'dyne':
        newtonValue = numericValue * 0.00001;
        break;
      case 'kilopond':
        newtonValue = numericValue * 9.80665;
        break;
      case 'ton_force':
        newtonValue = numericValue * 9806.65;
        break;
    }

    // Then convert from Newton to target unit
    switch (toUnit) {
      case 'newton':
        convertedValue = newtonValue;
        break;
      case 'pound_force':
        convertedValue = newtonValue / 4.448;
        break;
      case 'ounce_force':
        convertedValue = newtonValue / 0.278;
        break;
      case 'dyne':
        convertedValue = newtonValue / 0.00001;
        break;
      case 'kilopond':
        convertedValue = newtonValue / 9.80665;
        break;
      case 'ton_force':
        convertedValue = newtonValue / 9806.65;
        break;
    }

    // Format the result to avoid excessive decimal places
    setResult(convertedValue.toFixed(4));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleFromUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFromUnit(e.target.value as ForceUnit);
  };

  const handleToUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToUnit(e.target.value as ForceUnit);
  };

  const handleReset = () => {
    setInputValue('');
    setFromUnit('newton');
    setToUnit('pound_force');
    setResult('');
    setError('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Conversor de Força">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-center mb-2">
          <div className="w-16 h-16 rounded-full bg-blue-900 text-white flex items-center justify-center text-2xl">
            <FaWeightHanging />
          </div>
        </div>
        
        {/* Input field */}
        <div>
          <label htmlFor="force" className="block text-sm font-medium text-gray-700">
            Valor
          </label>
          <input
            type="number"
            id="force"
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
              <option value="newton">Newton (N)</option>
              <option value="pound_force">Libra-força (lbf)</option>
              <option value="ounce_force">Onça-força (ozf)</option>
              <option value="dyne">Dyne (dyn)</option>
              <option value="kilopond">Kilopond (kp/kgf)</option>
              <option value="ton_force">Tonelada-força (tf)</option>
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
              <option value="newton">Newton (N)</option>
              <option value="pound_force">Libra-força (lbf)</option>
              <option value="ounce_force">Onça-força (ozf)</option>
              <option value="dyne">Dyne (dyn)</option>
              <option value="kilopond">Kilopond (kp/kgf)</option>
              <option value="ton_force">Tonelada-força (tf)</option>
            </select>
          </div>
        </div>

        {/* Converter button */}
        <button
          onClick={convertForce}
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Converter
        </button>

        {/* Result */}
        {result && (
          <div className="mt-4 p-3 bg-gray-100 rounded AREA">
            <p className="text-sm text-gray-600">Resultado:</p>
            <p className="text-lg font-bold text-black">
              {inputValue} {fromUnit === 'newton' ? 'N' : fromUnit === 'pound_force' ? 'lbf' : 
                          fromUnit === 'ounce_force' ? 'ozf' : fromUnit === 'dyne' ? 'dyn' : 
                          fromUnit === 'kilopond' ? 'kp' : 'tf'} = {result}{' '}
              {toUnit === 'newton' ? 'N' : toUnit === 'pound_force' ? 'lbf' : 
               toUnit === 'ounce_force' ? 'ozf' : toUnit === 'dyne' ? 'dyn' : 
               toUnit === 'kilopond' ? 'kp' : 'tf'}
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

export default ForceConverter;