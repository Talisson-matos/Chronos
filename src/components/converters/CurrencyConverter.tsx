import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import { FaMoneyBillWave } from 'react-icons/fa';

interface CurrencyConverterProps {
  isOpen: boolean;
  onClose: () => void;
}

type CurrencyUnit = 'USD' | 'BRL' | 'EUR';

const CurrencyConverter: React.FC<CurrencyConverterProps> = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState<string>('');
  const [fromCurrency, setFromCurrency] = useState<CurrencyUnit>('USD');
  const [toCurrency, setToCurrency] = useState<CurrencyUnit>('BRL');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Reset result when input changes
  useEffect(() => {
    if (amount === '') {
      setResult('');
      setError('');
    }
  }, [amount]);

  const convertCurrency = async () => {
    const numericValue = parseFloat(amount);
    
    if (isNaN(numericValue)) {
      setError('Por favor, insira um valor numérico válido');
      setResult('');
      return;
    }
    
    if (numericValue <= 0) {
      setError('O valor deve ser maior que zero');
      setResult('');
      return;
    }

    setError('');
    
    try {
      // Fetch exchange rates from ExchangeRate-API
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/2570c0aabca5780e5857bc8e/latest/${fromCurrency}`
      );
      
      if (!response.ok) {
        throw new Error('Falha ao obter taxas de câmbio');
      }

      const data = await response.json();
      
      if (data.result !== 'success') {
        throw new Error('Erro na resposta da API');
      }

      const exchangeRate = data.conversion_rates[toCurrency];
      
      if (!exchangeRate) {
        throw new Error('Taxa de câmbio não disponível para a moeda selecionada');
      }

      const convertedValue = numericValue * exchangeRate;
      
      // Format the result to avoid excessive decimal places
      setResult(convertedValue.toFixed(2));
    } catch (err) {
      console.error('Erro ao obter taxas de câmbio:', err);
      setError('Erro ao obter taxas de câmbio. Tente novamente mais tarde.');
      setResult('');
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleFromCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFromCurrency(e.target.value as CurrencyUnit);
  };

  const handleToCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToCurrency(e.target.value as CurrencyUnit);
  };

  const handleReset = () => {
    setAmount('');
    setFromCurrency('USD');
    setToCurrency('BRL');
    setResult('');
    setError('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Conversor de Moedas">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-center mb-2">
          <div className="w-16 h-16 rounded-full bg-blue-900 text-white flex items-center justify-center text-2xl">
            <FaMoneyBillWave />
          </div>
        </div>
        
        {/* Amount input field */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Valor
          </label>
          <input
            type="number"
            id="amount"
            step="any"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-black focus:ring-blue-500 focus:border-blue-500"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Digite o valor"
          />
        </div>

        {/* Currency units */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="fromCurrency" className="block text-sm font-medium text-gray-700">
              De
            </label>
            <select
              id="fromCurrency"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-black focus:ring-blue-500 focus:border-blue-500"
              value={fromCurrency}
              onChange={handleFromCurrencyChange}
            >
              <option value="USD">Dólar (USD)</option>
              <option value="BRL">Real (BRL)</option>
              <option value="EUR">Euro (EUR)</option>
            </select>
          </div>
          <div>
            <label htmlFor="toCurrency" className="block text-sm font-medium text-gray-700">
              Para
            </label>
            <select
              id="toCurrency"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-black focus:ring-blue-500 focus:border-blue-500"
              value={toCurrency}
              onChange={handleToCurrencyChange}
            >
              <option value="USD">Dólar (USD)</option>
              <option value="BRL">Real (BRL)</option>
              <option value="EUR">Euro (EUR)</option>
            </select>
          </div>
        </div>

        {/* Converter button */}
        <button
          onClick={convertCurrency}
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Converter
        </button>

        {/* Result */}
        {result && (
          <div className="mt-4 p-3 bg-gray-100 rounded-md">
            <p className="text-sm text-gray-600">Resultado:</p>
            <p className="text-lg font-bold text-black">
              {amount} {fromCurrency} = {result} {toCurrency}
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

export default CurrencyConverter;