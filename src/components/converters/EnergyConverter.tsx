import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import { FaBolt } from 'react-icons/fa';

interface EnergyConverterProps {
  isOpen: boolean;
  onClose: () => void;
}

type EnergyUnit = 'joule' | 'kilojoule' | 'megajoule' | 'watt_hour' | 'kilowatt_hour' | 'megawatt_hour' | 'calorie' | 'kilocalorie' | 'btu' | 'electronvolt' | 'erg' | 'ton_tnt';

const EnergyConverter: React.FC<EnergyConverterProps> = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<EnergyUnit>('joule');
  const [toUnit, setToUnit] = useState<EnergyUnit>('kilowatt_hour');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Reset result when input changes
  useEffect(() => {
    if (inputValue === '') {
      setResult('');
      setError('');
    }
  }, [inputValue]);

  const convertEnergy = () => {
    const numericValue = parseFloat(inputValue);
    
    if (isNaN(numericValue)) {
      setError('Por favor, insira um valor numérico válido');
      setResult('');
      return;
    }
    
    setError('');
    let convertedValue: number;

    // First convert to Joule (our "intermediate" unit)
    let jouleValue: number;
    switch (fromUnit) {
      case 'joule':
        jouleValue = numericValue;
        break;
      case 'kilojoule':
        jouleValue = numericValue * 1000;
        break;
      case 'megajoule':
        jouleValue = numericValue * 1000000;
        break;
      case 'watt_hour':
        jouleValue = numericValue * 3600;
        break;
      case 'kilowatt_hour':
        jouleValue = numericValue * 3600000;
        break;
      case 'megawatt_hour':
        jouleValue = numericValue * 3600000000;
        break;
      case 'calorie':
        jouleValue = numericValue * 4.184;
        break;
      case 'kilocalorie':
        jouleValue = numericValue * 4184;
        break;
      case 'btu':
        jouleValue = numericValue * 1055;
        break;
      case 'electronvolt':
        jouleValue = numericValue * 1.602e-19;
        break;
      case 'erg':
        jouleValue = numericValue * 1e-7;
        break;
      case 'ton_tnt':
        jouleValue = numericValue * 4.184e9;
        break;
    }

    // Then convert from Joule to target unit
    switch (toUnit) {
      case 'joule':
        convertedValue = jouleValue;
        break;
      case 'kilojoule':
        convertedValue = jouleValue / 1000;
        break;
      case 'megajoule':
        convertedValue = jouleValue / 1000000;
        break;
      case 'watt_hour':
        convertedValue = jouleValue / 3600;
        break;
      case 'kilowatt_hour':
        convertedValue = jouleValue / 3600000;
        break;
      case 'megawatt_hour':
        convertedValue = jouleValue / 3600000000;
        break;
      case 'calorie':
        convertedValue = jouleValue / 4.184;
        break;
      case 'kilocalorie':
        convertedValue = jouleValue / 4184;
        break;
      case 'btu':
        convertedValue = jouleValue / 1055;
        break;
      case 'electronvolt':
        convertedValue = jouleValue / 1.602e-19;
        break;
      case 'erg':
        convertedValue = jouleValue / 1e-7;
        break;
      case 'ton_tnt':
        convertedValue = jouleValue / 4.184e9;
        break;
    }

    // Format the result to avoid excessive decimal places
    setResult(convertedValue.toFixed(4));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleFromUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFromUnit(e.target.value as EnergyUnit);
  };

  const handleToUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToUnit(e.target.value as EnergyUnit);
  };

  const handleReset = () => {
    setInputValue('');
    setFromUnit('joule');
    setToUnit('kilowatt_hour');
    setResult('');
    setError('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Conversor de Energia">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-center mb-2">
          <div className="w-16 h-16 rounded-full bg-blue-900 text-white flex items-center justify-center text-2xl">
            <FaBolt />
          </div>
        </div>
        
        {/* Input field */}
        <div>
          <label htmlFor="energy" className="block text-sm font-medium text-gray-700">
            Valor
          </label>
          <input
            type="number"
            id="energy"
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
              <option value="joule">Joule (J)</option>
              <option value="kilojoule">Quilojoule (kJ)</option>
              <option value="megajoule">Megajoule (MJ)</option>
              <option value="watt_hour">Watt-hora (Wh)</option>
              <option value="kilowatt_hour">Quilowatt-hora (kWh)</option>
              <option value="megawatt_hour">Megawatt-hora (MWh)</option>
              <option value="calorie">Caloria (cal)</option>
              <option value="kilocalorie">Quilocaloria (kcal)</option>
              <option value="btu">BTU</option>
              <option value="electronvolt">Electronvolt (eV)</option>
              <option value="erg">Erg</option>
              <option value="ton_tnt">Tonelada de TNT</option>
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
              <option value="joule">Joule (J)</option>
              <option value="kilojoule">Quilojoule (kJ)</option>
              <option value="megajoule">Megajoule (MJ)</option>
              <option value="watt_hour">Watt-hora (Wh)</option>
              <option value="kilowatt_hour">Quilowatt-hora (kWh)</option>
              <option value="megawatt_hour">Megawatt-hora (MWh)</option>
              <option value="calorie">Caloria (cal)</option>
              <option value="kilocalorie">Quilocaloria (kcal)</option>
              <option value="btu">BTU</option>
              <option value="electronvolt">Electronvolt (eV)</option>
              <option value="erg">Erg</option>
              <option value="ton_tnt">Tonelada de TNT</option>
            </select>
          </div>
        </div>

        {/* Converter button */}
        <button
          onClick={convertEnergy}
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Converter
        </button>

        {/* Result */}
        {result && (
          <div className="mt-4 p-3 bg-gray-100 rounded-md">
            <p className="text-sm text-gray-600">Resultado:</p>
            <p className="text-lg font-bold text-black">
              {inputValue} {fromUnit === 'joule' ? 'J' : fromUnit === 'kilojoule' ? 'kJ' : fromUnit === 'megajoule' ? 'MJ' : 
                          fromUnit === 'watt_hour' ? 'Wh' : fromUnit === 'kilowatt_hour' ? 'kWh' : fromUnit === 'megawatt_hour' ? 'MWh' : 
                          fromUnit === 'calorie' ? 'cal' : fromUnit === 'kilocalorie' ? 'kcal' : fromUnit === 'btu' ? 'BTU' : 
                          fromUnit === 'electronvolt' ? 'eV' : fromUnit === 'erg' ? 'erg' : 'ton TNT'} = {result}{' '}
              {toUnit === 'joule' ? 'J' : toUnit === 'kilojoule' ? 'kJ' : toUnit === 'megajoule' ? 'MJ' : 
               toUnit === 'watt_hour' ? 'Wh' : toUnit === 'kilowatt_hour' ? 'kWh' : toUnit === 'megawatt_hour' ? 'MWh' : 
               toUnit === 'calorie' ? 'cal' : toUnit === 'kilocalorie' ? 'kcal' : toUnit === 'btu' ? 'BTU' : 
               toUnit === 'electronvolt' ? 'eV' : toUnit === 'erg' ? 'erg' : 'ton TNT'}
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

export default EnergyConverter;