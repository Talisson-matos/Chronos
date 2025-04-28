import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import { FaTachometerAlt } from 'react-icons/fa';

interface VolumeConverterProps {
  isOpen: boolean;
  onClose: () => void;
}

type VolumeUnit = 'milliliter' | 'cubic_centimeter' | 'liter' | 'cubic_meter' | 'fluid_ounce' | 'cup' | 'pint' | 'gallon' | 'barrel' | 'quart' | 'deciliter' | 'hectoliter';

const VolumeConverter: React.FC<VolumeConverterProps> = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<VolumeUnit>('liter');
  const [toUnit, setToUnit] = useState<VolumeUnit>('gallon');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Reset result when input changes
  useEffect(() => {
    if (inputValue === '') {
      setResult('');
      setError('');
    }
  }, [inputValue]);

  const convertVolume = () => {
    const numericValue = parseFloat(inputValue);
    
    if (isNaN(numericValue)) {
      setError('Por favor, insira um valor numérico válido');
      setResult('');
      return;
    }
    
    setError('');
    let convertedValue: number;

    // First convert to Liter (our "intermediate" unit)
    let literValue: number;
    switch (fromUnit) {
      case 'milliliter':
        literValue = numericValue / 1000;
        break;
      case 'cubic_centimeter':
        literValue = numericValue / 1000;
        break;
      case 'liter':
        literValue = numericValue;
        break;
      case 'cubic_meter':
        literValue = numericValue * 1000;
        break;
      case 'fluid_ounce':
        literValue = numericValue * 0.029573;
        break;
      case 'cup':
        literValue = numericValue * 0.236588;
        break;
      case 'pint':
        literValue = numericValue * 0.473176;
        break;
      case 'gallon':
        literValue = numericValue * 3.785;
        break;
      case 'barrel':
        literValue = numericValue * 159;
        break;
      case 'quart':
        literValue = numericValue * 0.946353;
        break;
      case 'deciliter':
        literValue = numericValue * 0.1;
        break;
      case 'hectoliter':
        literValue = numericValue * 100;
        break;
    }

    // Then convert from Liter to target unit
    switch (toUnit) {
      case 'milliliter':
        convertedValue = literValue * 1000;
        break;
      case 'cubic_centimeter':
        convertedValue = literValue * 1000;
        break;
      case 'liter':
        convertedValue = literValue;
        break;
      case 'cubic_meter':
        convertedValue = literValue / 1000;
        break;
      case 'fluid_ounce':
        convertedValue = literValue / 0.029573;
        break;
      case 'cup':
        convertedValue = literValue / 0.236588;
        break;
      case 'pint':
        convertedValue = literValue / 0.473176;
        break;
      case 'gallon':
        convertedValue = literValue / 3.785;
        break;
      case 'barrel':
        convertedValue = literValue / 159;
        break;
      case 'quart':
        convertedValue = literValue / 0.946353;
        break;
      case 'deciliter':
        convertedValue = literValue / 0.1;
        break;
      case 'hectoliter':
        convertedValue = literValue / 100;
        break;
    }

    // Format the result to avoid excessive decimal places
    setResult(convertedValue.toFixed(4));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleFromUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFromUnit(e.target.value as VolumeUnit);
  };

  const handleToUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToUnit(e.target.value as VolumeUnit);
  };

  const handleReset = () => {
    setInputValue('');
    setFromUnit('liter');
    setToUnit('gallon');
    setResult('');
    setError('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Conversor de Volume">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-center mb-2">
          <div className="w-16 h-16 rounded-full bg-blue-900 text-white flex items-center justify-center text-2xl">
            <FaTachometerAlt />
          </div>
        </div>
        
        {/* Input field */}
        <div>
          <label htmlFor="volume" className="block text-sm font-medium text-gray-700">
            Valor
          </label>
          <input
            type="number"
            id="volume"
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
              <option value="milliliter">Mililitro (mL)</option>
              <option value="cubic_centimeter">Centímetro cúbico (cm³)</option>
              <option value="liter">Litro (L)</option>
              <option value="cubic_meter">Metro cúbico (m³)</option>
              <option value="fluid_ounce">Onça líquida (fl oz, EUA)</option>
              <option value="cup">Copo (cup, EUA)</option>
              <option value="pint">Pinta (pint, EUA)</option>
              <option value="gallon">Galão (gallon, EUA)</option>
              <option value="barrel">Barril (petróleo)</option>
              <option value="quart">Quartilho (quart, EUA)</option>
              <option value="deciliter">Decilitro (dL)</option>
              <option value="hectoliter">Hectolitro (hL)</option>
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
              <option value="milliliter">Mililitro (mL)</option>
              <option value="cubic_centimeter">Centímetro cúbico (cm³)</option>
              <option value="liter">Litro (L)</option>
              <option value="cubic_meter">Metro cúbico (m³)</option>
              <option value="fluid_ounce">Onça líquida (fl oz, EUA)</option>
              <option value="cup">Copo (cup, EUA)</option>
              <option value="pint">Pinta (pint, EUA)</option>
              <option value="gallon">Galão (gallon, EUA)</option>
              <option value="barrel">Barril (petróleo)</option>
              <option value="quart">Quartilho (quart, EUA)</option>
              <option value="deciliter">Decilitro (dL)</option>
              <option value="hectoliter">Hectolitro (hL)</option>
            </select>
          </div>
        </div>

        {/* Converter button */}
        <button
          onClick={convertVolume}
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Converter
        </button>

        {/* Result */}
        {result && (
          <div className="mt-4 p-3 bg-gray-100 rounded-md">
            <p className="text-sm text-gray-600">Resultado:</p>
            <p className="text-lg font-bold text-black">
              {inputValue} {fromUnit === 'milliliter' ? 'mL' : fromUnit === 'cubic_centimeter' ? 'cm³' : fromUnit === 'liter' ? 'L' : 
                          fromUnit === 'cubic_meter' ? 'm³' : fromUnit === 'fluid_ounce' ? 'fl oz' : fromUnit === 'cup' ? 'cup' : 
                          fromUnit === 'pint' ? 'pint' : fromUnit === 'gallon' ? 'gal' : fromUnit === 'barrel' ? 'bbl' : 
                          fromUnit === 'quart' ? 'qt' : fromUnit === 'deciliter' ? 'dL' : 'hL'} = {result}{' '}
              {toUnit === 'milliliter' ? 'mL' : toUnit === 'cubic_centimeter' ? 'cm³' : toUnit === 'liter' ? 'L' : 
               toUnit === 'cubic_meter' ? 'm³' : toUnit === 'fluid_ounce' ? 'fl oz' : toUnit === 'cup' ? 'cup' : 
               toUnit === 'pint' ? 'pint' : toUnit === 'gallon' ? 'gal' : toUnit === 'barrel' ? 'bbl' : 
               toUnit === 'quart' ? 'qt' : toUnit === 'deciliter' ? 'dL' : 'hL'}
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

export default VolumeConverter;