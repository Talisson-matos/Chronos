import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import { GiBodyHeight } from 'react-icons/gi';

interface LengthConverterProps {
  isOpen: boolean;
  onClose: () => void;
}

// Define all length units with their conversion rates to meters (base unit)
type LengthUnit = 
  'milimeter' | 'centimeter' | 'meter' | 'kilometer' | // Metric
  'inch' | 'foot' | 'yard' | 'mile' | // Imperial
  'ri' | 'chi' | 'cubit' | 'toise' | // Traditional
  'nauticalMile' | 'fathom'; // Nautical

const conversionRates: Record<LengthUnit, number> = {
  // Metric (to meters)
  milimeter: 0.001,
  centimeter: 0.01,
  meter: 1,
  kilometer: 1000,
  
  // Imperial (to meters)
  inch: 0.0254,
  foot: 0.3048,
  yard: 0.9144,
  mile: 1609.34,
  
  // Traditional (to meters)
  ri: 3930,
  chi: 0.3333,
  cubit: 0.45,
  toise: 1.949,
  
  // Nautical (to meters)
  nauticalMile: 1852,
  fathom: 1.8288
};

const unitLabels: Record<LengthUnit, string> = {
  milimeter: 'Milímetro (mm)',
  centimeter: 'Centímetro (cm)',
  meter: 'Metro (m)',
  kilometer: 'Quilômetro (km)',
  inch: 'Polegada (inch)',
  foot: 'Pé (foot)',
  yard: 'Jarda (yard)',
  mile: 'Milha (mile)',
  ri: 'Ri (Japão)',
  chi: 'Chi (China)',
  cubit: 'Côvado (Antigo)',
  toise: 'Toesa (França Antiga)',
  nauticalMile: 'Milha Náutica',
  fathom: 'Braça (fathom)'
};

const LengthConverter: React.FC<LengthConverterProps> = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<LengthUnit>('meter');
  const [toUnit, setToUnit] = useState<LengthUnit>('foot');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Reset result when input changes
  useEffect(() => {
    if (inputValue === '') {
      setResult('');
      setError('');
    }
  }, [inputValue]);

  const convertLength = () => {
    const numericValue = parseFloat(inputValue);
    
    if (isNaN(numericValue)) {
      setError('Por favor, insira um valor numérico válido');
      setResult('');
      return;
    }
    
    setError('');
    
    // Convert from source unit to meters (our base unit)
    const valueInMeters = numericValue * conversionRates[fromUnit];
    
    // Convert from meters to target unit
    const convertedValue = valueInMeters / conversionRates[toUnit];

    // Format the result based on the magnitude
    let formattedResult: string;
    if (convertedValue < 0.0001 || convertedValue > 1000000) {
      formattedResult = convertedValue.toExponential(6);
    } else {
      // Use more decimal places for small values, fewer for large values
      const decimalPlaces = convertedValue < 0.1 ? 6 : convertedValue < 100 ? 4 : 2;
      formattedResult = convertedValue.toFixed(decimalPlaces);
    }
    
    setResult(formattedResult);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleFromUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFromUnit(e.target.value as LengthUnit);
  };

  const handleToUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToUnit(e.target.value as LengthUnit);
  };

  const handleReset = () => {
    setInputValue('');
    setFromUnit('meter');
    setToUnit('foot');
    setResult('');
    setError('');
  };

  // Group units by category for the dropdown menu
  const unitGroups = {
    'Sistema Métrico': ['milimeter', 'centimeter', 'meter', 'kilometer'],
    'Sistema Imperial': ['inch', 'foot', 'yard', 'mile'],
    'Medidas Tradicionais': ['ri', 'chi', 'cubit', 'toise'],
    'Medidas Náuticas': ['nauticalMile', 'fathom']
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Conversor de Comprimento">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-center mb-2">
          <div className="w-16 h-16 rounded-full bg-blue-900 text-white flex items-center justify-center text-2xl">
            <GiBodyHeight />
          </div>
        </div>
        
        {/* Input field */}
        <div>
          <label htmlFor="length" className="block text-sm font-medium text-gray-700">
            Valor
          </label>
          <input
            type="number"
            id="length"
            className="mt-1 block w-full p-2 text-black border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
              className="mt-1 text-black block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={fromUnit}
              onChange={handleFromUnitChange}
            >
              {Object.entries(unitGroups).map(([groupName, unitCodes]) => (
                <optgroup label={groupName} key={groupName}>
                  {unitCodes.map((code) => (
                    <option value={code} key={code}>
                      {unitLabels[code as LengthUnit]}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="toUnit" className="block text-sm font-medium text-gray-700">
              Para
            </label>
            <select
              id="toUnit"
              className="mt-1 block w-full text-black p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={toUnit}
              onChange={handleToUnitChange}
            >
              {Object.entries(unitGroups).map(([groupName, unitCodes]) => (
                <optgroup label={groupName} key={groupName}>
                  {unitCodes.map((code) => (
                    <option value={code} key={code}>
                      {unitLabels[code as LengthUnit]}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>

        {/* Converter button */}
        <button
          onClick={convertLength}
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Converter
        </button>

        {/* Result */}
        {result && (
          <div className="mt-4 p-3 bg-gray-100 rounded-md">
            <p className="text-sm text-gray-600">Resultado:</p>
            <p className="text-lg text-black font-bold">
              {inputValue} {unitLabels[fromUnit]} = {result} {unitLabels[toUnit]}
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

export default LengthConverter;