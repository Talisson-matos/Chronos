import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import { FaBalanceScale } from 'react-icons/fa';

interface WeightConverterProps {
  isOpen: boolean;
  onClose: () => void;
}

type WeightUnit = 'gram' | 'kilogram' | 'tonne' | 'ounce' | 'pound' | 'short_ton' | 'long_ton' | 'stone' | 'carat';

const WeightConverter: React.FC<WeightConverterProps> = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<WeightUnit>('kilogram');
  const [toUnit, setToUnit] = useState<WeightUnit>('pound');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Reset result when input changes
  useEffect(() => {
    if (inputValue === '') {
      setResult('');
      setError('');
    }
  }, [inputValue]);

  const convertWeight = () => {
    const numericValue = parseFloat(inputValue);
    
    if (isNaN(numericValue)) {
      setError('Por favor, insira um valor numérico válido');
      setResult('');
      return;
    }
    
    setError('');
    let convertedValue: number;

    // First convert to Kilogram (our "intermediate" unit)
    let kilogramValue: number;
    switch (fromUnit) {
      case 'gram':
        kilogramValue = numericValue / 1000;
        break;
      case 'kilogram':
        kilogramValue = numericValue;
        break;
      case 'tonne':
        kilogramValue = numericValue * 1000;
        break;
      case 'ounce':
        kilogramValue = numericValue * 0.02835;
        break;
      case 'pound':
        kilogramValue = numericValue * 0.453592;
        break;
      case 'short_ton':
        kilogramValue = numericValue * 907.184;
        break;
      case 'long_ton':
        kilogramValue = numericValue * 1016.05;
        break;
      case 'stone':
        kilogramValue = numericValue * 6.35;
        break;
      case 'carat':
        kilogramValue = numericValue * 0.0002;
        break;
    }

    // Then convert from Kilogram to target unit
    switch (toUnit) {
      case 'gram':
        convertedValue = kilogramValue * 1000;
        break;
      case 'kilogram':
        convertedValue = kilogramValue;
        break;
      case 'tonne':
        convertedValue = kilogramValue / 1000;
        break;
      case 'ounce':
        convertedValue = kilogramValue / 0.02835;
        break;
      case 'pound':
        convertedValue = kilogramValue / 0.453592;
        break;
      case 'short_ton':
        convertedValue = kilogramValue / 907.184;
        break;
      case 'long_ton':
        convertedValue = kilogramValue / 1016.05;
        break;
      case 'stone':
        convertedValue = kilogramValue / 6.35;
        break;
      case 'carat':
        convertedValue = kilogramValue / 0.0002;
        break;
    }

    // Format the result to avoid excessive decimal places
    setResult(convertedValue.toFixed(4));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleFromUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFromUnit(e.target.value as WeightUnit);
  };

  const handleToUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToUnit(e.target.value as WeightUnit);
  };

  const handleReset = () => {
    setInputValue('');
    setFromUnit('kilogram');
    setToUnit('pound');
    setResult('');
    setError('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Conversor de Peso">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-center mb-2">
          <div className="w-16 h-16 rounded-full bg-blue-900 text-white flex items-center justify-center text-2xl">
            <FaBalanceScale />
          </div>
        </div>
        
        {/* Input field */}
        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
            Valor
          </label>
          <input
            type="number"
            id="weight"
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
              <option value="gram">Grama (g)</option>
              <option value="kilogram">Quilograma (kg)</option>
              <option value="tonne">Tonelada (t)</option>
              <option value="ounce">Onça (oz)</option>
              <option value="pound">Libra (lb)</option>
              <option value="short_ton">Tonelada curta (short ton)</option>
              <option value="long_ton">Tonelada longa (long ton)</option>
              <option value="stone">Stone</option>
              <option value="carat">Carat (ct)</option>
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
              <option value="gram">Grama (g)</option>
              <option value="kilogram">Quilograma (kg)</option>
              <option value="tonne">Tonelada (t)</option>
              <option value="ounce">Onça (oz)</option>
              <option value="pound">Libra (lb)</option>
              <option value="short_ton">Tonelada curta (short ton)</option>
              <option value="long_ton">Tonelada longa (long ton)</option>
              <option value="stone">Stone</option>
              <option value="carat">Carat (ct)</option>
            </select>
          </div>
        </div>

        {/* Converter button */}
        <button
          onClick={convertWeight}
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Converter
        </button>

        {/* Result */}
        {result && (
          <div className="mt-4 p-3 bg-gray-100 rounded-md">
            <p className="text-sm text-gray-600">Resultado:</p>
            <p className="text-lg font-bold text-black">
              {inputValue} {fromUnit === 'gram' ? 'g' : fromUnit === 'kilogram' ? 'kg' : 
                          fromUnit === 'tonne' ? 't' : fromUnit === 'ounce' ? 'oz' : 
                          fromUnit === 'pound' ? 'lb' : fromUnit === 'short_ton' ? 'short ton' : 
                          fromUnit === 'long_ton' ? 'long ton' : fromUnit === 'stone' ? 'stone' : 'ct'} = {result}{' '}
              {toUnit === 'gram' ? 'g' : toUnit === 'kilogram' ? 'kg' : 
               toUnit === 'tonne' ? 't' : toUnit === 'ounce' ? 'oz' : 
               toUnit === 'pound' ? 'lb' : toUnit === 'short_ton' ? 'short ton' : 
               toUnit === 'long_ton' ? 'long ton' : toUnit === 'stone' ? 'stone' : 'ct'}
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

export default WeightConverter;