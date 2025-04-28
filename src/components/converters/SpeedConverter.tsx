import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import { FaTachometerAlt } from 'react-icons/fa';

interface SpeedConverterProps {
  isOpen: boolean;
  onClose: () => void;
}

type SpeedUnit = 'meter_per_second' | 'kilometer_per_hour' | 'mile_per_hour' | 'foot_per_second' | 'knot' | 'light_speed' | 'mach';

const SpeedConverter: React.FC<SpeedConverterProps> = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<SpeedUnit>('kilometer_per_hour');
  const [toUnit, setToUnit] = useState<SpeedUnit>('mile_per_hour');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Reset result when input changes
  useEffect(() => {
    if (inputValue === '') {
      setResult('');
      setError('');
    }
  }, [inputValue]);

  const convertSpeed = () => {
    const numericValue = parseFloat(inputValue);
    
    if (isNaN(numericValue)) {
      setError('Por favor, insira um valor numérico válido');
      setResult('');
      return;
    }
    
    setError('');
    let convertedValue: number;

    // First convert to Meter per Second (our "intermediate" unit)
    let meterPerSecondValue: number;
    switch (fromUnit) {
      case 'meter_per_second':
        meterPerSecondValue = numericValue;
        break;
      case 'kilometer_per_hour':
        meterPerSecondValue = numericValue / 3.6;
        break;
      case 'mile_per_hour':
        meterPerSecondValue = numericValue * 0.44704;
        break;
      case 'foot_per_second':
        meterPerSecondValue = numericValue * 0.3048;
        break;
      case 'knot':
        meterPerSecondValue = numericValue * 0.514444;
        break;
      case 'light_speed':
        meterPerSecondValue = numericValue * 299792458;
        break;
      case 'mach':
        meterPerSecondValue = numericValue * 343;
        break;
    }

    // Then convert from Meter per Second to target unit
    switch (toUnit) {
      case 'meter_per_second':
        convertedValue = meterPerSecondValue;
        break;
      case 'kilometer_per_hour':
        convertedValue = meterPerSecondValue * 3.6;
        break;
      case 'mile_per_hour':
        convertedValue = meterPerSecondValue / 0.44704;
        break;
      case 'foot_per_second':
        convertedValue = meterPerSecondValue / 0.3048;
        break;
      case 'knot':
        convertedValue = meterPerSecondValue / 0.514444;
        break;
      case 'light_speed':
        convertedValue = meterPerSecondValue / 299792458;
        break;
      case 'mach':
        convertedValue = meterPerSecondValue / 343;
        break;
    }

    // Format the result to avoid excessive decimal places
    setResult(convertedValue.toFixed(4));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleFromUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFromUnit(e.target.value as SpeedUnit);
  };

  const handleToUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToUnit(e.target.value as SpeedUnit);
  };

  const handleReset = () => {
    setInputValue('');
    setFromUnit('kilometer_per_hour');
    setToUnit('mile_per_hour');
    setResult('');
    setError('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Conversor de Velocidade">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-center mb-2">
          <div className="w-16 h-16 rounded-full bg-blue-900 text-white flex items-center justify-center text-2xl">
            <FaTachometerAlt />
          </div>
        </div>
        
        {/* Input field */}
        <div>
          <label htmlFor="speed" className="block text-sm font-medium text-gray-700">
            Valor
          </label>
          <input
            type="number"
            id="speed"
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
              <option value="meter_per_second">Metros por segundo (m/s)</option>
              <option value="kilometer_per_hour">Quilômetros por hora (km/h)</option>
              <option value="mile_per_hour">Milhas por hora (mph)</option>
              <option value="foot_per_second">Pés por segundo (ft/s)</option>
              <option value="knot">Nós (knots)</option>
              <option value="light_speed">Velocidade da luz (c)</option>
              <option value="mach">Velocidade do som (Mach)</option>
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
              <option value="meter_per_second">Metros por segundo (m/s)</option>
              <option value="kilometer_per_hour">Quilômetros por hora (km/h)</option>
              <option value="mile_per_hour">Milhas por hora (mph)</option>
              <option value="foot_per_second">Pés por segundo (ft/s)</option>
              <option value="knot">Nós (knots)</option>
              <option value="light_speed">Velocidade da luz (c)</option>
              <option value="mach">Velocidade do som (Mach)</option>
            </select>
          </div>
        </div>

        {/* Converter button */}
        <button
          onClick={convertSpeed}
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Converter
        </button>

        {/* Result */}
        {result && (
          <div className="mt-4 p-3 bg-gray-100 rounded-md">
            <p className="text-sm text-gray-600">Resultado:</p>
            <p className="text-lg font-bold text-black">
              {inputValue} {fromUnit === 'meter_per_second' ? 'm/s' : fromUnit === 'kilometer_per_hour' ? 'km/h' : 
                          fromUnit === 'mile_per_hour' ? 'mph' : fromUnit === 'foot_per_second' ? 'ft/s' : 
                          fromUnit === 'knot' ? 'knots' : fromUnit === 'light_speed' ? 'c' : 'Mach'} = {result}{' '}
              {toUnit === 'meter_per_second' ? 'm/s' : toUnit === 'kilometer_per_hour' ? 'km/h' : 
               toUnit === 'mile_per_hour' ? 'mph' : toUnit === 'foot_per_second' ? 'ft/s' : 
               toUnit === 'knot' ? 'knots' : toUnit === 'light_speed' ? 'c' : 'Mach'}
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

export default SpeedConverter;