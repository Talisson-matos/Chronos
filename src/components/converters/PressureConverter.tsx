import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import { IoMdTimer } from 'react-icons/io';  // Mantive o ícone que você estava usando no componente original

interface PressureConverterProps {
  isOpen: boolean;
  onClose: () => void;
}

// Define all pressure units with their conversion rates to Pascal (base unit)
type PressureUnit = 
  'pa' | 'hpa' | 'kpa' | 'mpa' | // SI
  'psi' | // Imperial
  'bar' | 'atm' | 'torr' | // Traditional
  'mmhg' | 'cmh2o'; // Liquid Column

const conversionRates: Record<PressureUnit, number> = {
  // SI (to Pascal)
  pa: 1,
  hpa: 100,
  kpa: 1000,
  mpa: 1000000,
  
  // Imperial (to Pascal)
  psi: 6895,
  
  // Traditional (to Pascal)
  bar: 100000,
  atm: 101325,
  torr: 133.322,
  
  // Liquid Column (to Pascal)
  mmhg: 133.322,
  cmh2o: 98.0665
};

const unitLabels: Record<PressureUnit, string> = {
  pa: 'Pascal (Pa)',
  hpa: 'Hectopascal (hPa)',
  kpa: 'Quilopascal (kPa)',
  mpa: 'Megapascal (MPa)',
  psi: 'PSI (lb/in²)',
  bar: 'Bar',
  atm: 'Atmosfera (atm)',
  torr: 'Torr',
  mmhg: 'Milímetro de Mercúrio (mmHg)',
  cmh2o: 'Centímetro de Água (cmH₂O)'
};

const PressureConverter: React.FC<PressureConverterProps> = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<PressureUnit>('pa');
  const [toUnit, setToUnit] = useState<PressureUnit>('bar');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Reset result when input changes
  useEffect(() => {
    if (inputValue === '') {
      setResult('');
      setError('');
    }
  }, [inputValue]);

  const convertPressure = () => {
    const numericValue = parseFloat(inputValue);
    
    if (isNaN(numericValue)) {
      setError('Por favor, insira um valor numérico válido');
      setResult('');
      return;
    }
    
    setError('');
    
    // Convert from source unit to pascals (our base unit)
    const valueInPascals = numericValue * conversionRates[fromUnit];
    
    // Convert from pascals to target unit
    const convertedValue = valueInPascals / conversionRates[toUnit];

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
    setFromUnit(e.target.value as PressureUnit);
  };

  const handleToUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToUnit(e.target.value as PressureUnit);
  };

  const handleReset = () => {
    setInputValue('');
    setFromUnit('pa');
    setToUnit('bar');
    setResult('');
    setError('');
  };

  // Group units by category for the dropdown menu
  const unitGroups = {
    'Sistema Internacional (SI)': ['pa', 'hpa', 'kpa', 'mpa'],
    'Sistema Imperial': ['psi'],
    'Medidas Tradicionais': ['bar', 'atm', 'torr'],
    'Medidas em Coluna de Líquido': ['mmhg', 'cmh2o']
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Conversor de Pressão">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-center mb-2">
          <div className="w-16 h-16 rounded-full bg-blue-900 text-white flex items-center justify-center text-2xl">
            <IoMdTimer />
          </div>
        </div>
        
        {/* Input field */}
        <div>
          <label htmlFor="pressure" className="block text-sm font-medium text-gray-700">
            Valor
          </label>
          <input
            type="number"
            id="pressure"
            className="mt-1 block w-full text-black p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
              className="mt-1 block w-full p-2 text-black border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={fromUnit}
              onChange={handleFromUnitChange}
            >
              {Object.entries(unitGroups).map(([groupName, unitCodes]) => (
                <optgroup label={groupName} key={groupName}>
                  {unitCodes.map((code) => (
                    <option value={code} key={code}>
                      {unitLabels[code as PressureUnit]}
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
              className="mt-1 block w-full p-2 text-black border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={toUnit}
              onChange={handleToUnitChange}
            >
              {Object.entries(unitGroups).map(([groupName, unitCodes]) => (
                <optgroup label={groupName} key={groupName}>
                  {unitCodes.map((code) => (
                    <option value={code} key={code}>
                      {unitLabels[code as PressureUnit]}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>

        {/* Converter button */}
        <button
          onClick={convertPressure}
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Converter
        </button>

        {/* Result */}
        {result && (
          <div className="mt-4 p-3 bg-gray-100 rounded-md">
            <p className="text-sm text-gray-600">Resultado:</p>
            <p className="text-lg text-black   font-bold">
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

export default PressureConverter;