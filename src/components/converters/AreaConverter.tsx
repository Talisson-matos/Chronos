import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import { FaRulerCombined } from 'react-icons/fa';

interface AreaConverterProps {
  isOpen: boolean;
  onClose: () => void;
}

type AreaUnit = 'square_millimeter' | 'square_centimeter' | 'square_meter' | 'hectare' | 'square_kilometer' | 'acre';

const AreaConverter: React.FC<AreaConverterProps> = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<AreaUnit>('square_meter');
  const [toUnit, setToUnit] = useState<AreaUnit>('hectare');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Reset result when input changes
  useEffect(() => {
    if (inputValue === '') {
      setResult('');
      setError('');
    }
  }, [inputValue]);

  const convertArea = () => {
    const numericValue = parseFloat(inputValue);
    
    if (isNaN(numericValue)) {
      setError('Por favor, insira um valor numérico válido');
      setResult('');
      return;
    }
    
    setError('');
    let convertedValue: number;

    // First convert to Square Meter (our "intermediate" unit)
    let squareMeterValue: number;
    switch (fromUnit) {
      case 'square_millimeter':
        squareMeterValue = numericValue / 1000000;
        break;
      case 'square_centimeter':
        squareMeterValue = numericValue / 10000;
        break;
      case 'square_meter':
        squareMeterValue = numericValue;
        break;
      case 'hectare':
        squareMeterValue = numericValue * 10000;
        break;
      case 'square_kilometer':
        squareMeterValue = numericValue * 1000000;
        break;
      case 'acre':
        squareMeterValue = numericValue * 4046.86;
        break;
    }

    // Then convert from Square Meter to target unit
    switch (toUnit) {
      case 'square_millimeter':
        convertedValue = squareMeterValue * 1000000;
        break;
      case 'square_centimeter':
        convertedValue = squareMeterValue * 10000;
        break;
      case 'square_meter':
        convertedValue = squareMeterValue;
        break;
      case 'hectare':
        convertedValue = squareMeterValue / 10000;
        break;
      case 'square_kilometer':
        convertedValue = squareMeterValue / 1000000;
        break;
      case 'acre':
        convertedValue = squareMeterValue / 4046.86;
        break;
    }

    // Format the result to avoid excessive decimal places
    setResult(convertedValue.toFixed(4));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleFromUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFromUnit(e.target.value as AreaUnit);
  };

  const handleToUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToUnit(e.target.value as AreaUnit);
  };

  const handleReset = () => {
    setInputValue('');
    setFromUnit('square_meter');
    setToUnit('hectare');
    setResult('');
    setError('');
  };

  return (
    <Modal  isOpen={isOpen} onClose={onClose} title="Conversor de Área">
      <div className="flex flex-col space-y-4  ">
        <div className="flex justify-center mb-2  ">
          <div className="w-16 h-16 rounded-full bg-blue-900 text-white flex items-center justify-center text-2xl">
            <FaRulerCombined />
          </div>
        </div>
        
        {/* Input field */}
        <div >
          <label htmlFor="area" className="block text-sm font-medium text-gray-700">
            Valor
          </label>
          <input
            type="number"
            id="area"
            step="any"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-black focus:ring-blue-500 focus:border-blue-500"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Digite o valor"
          />
        </div>

        {/* Conversion units */}
        <div className="grid grid-cols-2 gap-4 ">
          <div>
            <label htmlFor="fromUnit" className="block text-sm font-medium text-gray-700">
              De
            </label>
            <select
              id="fromUnit"
              className="mt-1  block w-full p-2 border border-gray-300 rounded-md shadow-sm text-black focus:ring-blue-500 focus:border-blue-500"
              value={fromUnit}
              onChange={handleFromUnitChange}
            >
              <option value="square_millimeter">Milímetros quadrados (mm²)</option>
              <option value="square_centimeter">Centímetros quadrados (cm²)</option>
              <option value="square_meter">Metros quadrados (m²)</option>
              <option value="hectare">Hectares (ha)</option>
              <option value="square_kilometer">Quilômetros quadrados (km²)</option>
              <option value="acre">Acres</option>
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
              <option value="square_millimeter">Milímetros quadrados (mm²)</option>
              <option value="square_centimeter">Centímetros quadrados (cm²)</option>
              <option value="square_meter">Metros quadrados (m²)</option>
              <option value="hectare">Hectares (ha)</option>
              <option value="square_kilometer">Quilômetros quadrados (km²)</option>
              <option value="acre">Acres</option>
            </select>
          </div>
        </div>

        {/* Converter button */}
        <button
          onClick={convertArea}
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Converter
        </button>

        {/* Result */}
        {result && (
          <div className="mt-4 p-3 bg-gray-100 rounded-md">
            <p className="text-sm text-gray-600">Resultado:</p>
            <p className="text-lg font-bold text-black">
              {inputValue} {fromUnit === 'square_millimeter' ? 'mm²' : fromUnit === 'square_centimeter' ? 'cm²' : 
                          fromUnit === 'square_meter' ? 'm²' : fromUnit === 'hectare' ? 'ha' : 
                          fromUnit === 'square_kilometer' ? 'km²' : 'acre'} = {result}{' '}
              {toUnit === 'square_millimeter' ? 'mm²' : toUnit === 'square_centimeter' ? 'cm²' : 
               toUnit === 'square_meter' ? 'm²' : toUnit === 'hectare' ? 'ha' : 
               toUnit === 'square_kilometer' ? 'km²' : 'acre'}
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

export default AreaConverter;