import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import { FaWeight } from 'react-icons/fa';

interface IMCConverterProps {
  isOpen: boolean;
  onClose: () => void;
}

const IMCConverter: React.FC<IMCConverterProps> = ({ isOpen, onClose }) => {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [classification, setClassification] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Reset result when inputs change
  useEffect(() => {
    if (weight === '' || height === '') {
      setResult('');
      setClassification('');
      setError('');
    }
  }, [weight, height]);

  const calculateIMC = () => {
    const weightValue = parseFloat(weight);
    const heightValue = parseFloat(height);
    
    if (isNaN(weightValue) || isNaN(heightValue)) {
      setError('Por favor, insira valores numéricos válidos para peso e altura');
      setResult('');
      setClassification('');
      return;
    }
    
    if (weightValue <= 0 || heightValue <= 0) {
      setError('Peso e altura devem ser maiores que zero');
      setResult('');
      setClassification('');
      return;
    }
    
    setError('');
    const imc = weightValue / (heightValue * heightValue);
    const imcFormatted = imc.toFixed(2);

    // Classificação do IMC
    let imcClassification: string;
    if (imc < 18.5) {
      imcClassification = 'Abaixo do peso';
    } else if (imc >= 18.5 && imc < 25) {
      imcClassification = 'Peso normal';
    } else if (imc >= 25 && imc < 30) {
      imcClassification = 'Sobrepeso';
    } else if (imc >= 30 && imc < 35) {
      imcClassification = 'Obesidade grau I';
    } else if (imc >= 35 && imc < 40) {
      imcClassification = 'Obesidade grau II';
    } else {
      imcClassification = 'Obesidade grau III';
    }

    setResult(imcFormatted);
    setClassification(imcClassification);
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(e.target.value);
  };

  const handleReset = () => {
    setWeight('');
    setHeight('');
    setResult('');
    setClassification('');
    setError('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Calculadora de IMC">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-center mb-2">
          <div className="w-16 h-16 rounded-full bg-blue-900 text-white flex items-center justify-center text-2xl">
            <FaWeight />
          </div>
        </div>
        
        {/* Weight input field */}
        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
            Peso (kg)
          </label>
          <input
            type="number"
            id="weight"
            step="any"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-black focus:ring-blue-500 focus:border-blue-500"
            value={weight}
            onChange={handleWeightChange}
            placeholder="Digite o peso em kg"
          />
        </div>

        {/* Height input field */}
        <div>
          <label htmlFor="height" className="block text-sm font-medium text-gray-700">
            Altura (m)
          </label>
          <input
            type="number"
            id="height"
            step="any"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-black focus:ring-blue-500 focus:border-blue-500"
            value={height}
            onChange={handleHeightChange}
            placeholder="Digite a altura em metros"
          />
        </div>

        {/* Calculate button */}
        <button
          onClick={calculateIMC}
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Calcular
        </button>

        {/* Result */}
        {result && (
          <div className="mt-4 p-3 bg-gray-100 rounded-md">
            <p className="text-sm text-gray-600">Resultado:</p>
            <p className="text-lg font-bold text-black">
              IMC: {result} kg/m²
            </p>
            <p className="text-md text-black">
              Classificação: {classification}
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

export default IMCConverter;