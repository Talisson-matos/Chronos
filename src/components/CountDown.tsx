"use client"

import React, { useState, useEffect } from 'react';

const CountDownComponent: React.FC = () => {
  const [time, setTime] = useState<number>(0); // Tempo em milissegundos
  const [isRunning, setIsRunning] = useState<boolean>(false); // Estado do cronômetro
  const [laps, setLaps] = useState<string[]>([]); // Lista de voltas

  // Atualiza o tempo a cada 10ms quando o cronômetro está ativo
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  // Formata o tempo em horas:minutos:segundos.milissegundos
  const formatTime = (ms: number): string => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10); // Mostra 2 dígitos de milissegundos
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds
      .toString()
      .padStart(2, '0')}`;
  };

  // Inicia o cronômetro
  const start = () => {
    setIsRunning(true);
  };

  // Para o cronômetro
  const stop = () => {
    setIsRunning(false);
  };

  // Reinicia o cronômetro
  const reset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  // Marca uma volta
  const addLap = () => {
    if (isRunning) {
      setLaps((prevLaps) => [...prevLaps, formatTime(time)]);
    }
  };

  return (
    <div className="flex-4 h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-100 p-6  shadow-lg border-2 border-slate-100">
      <h2 className="text-2xl font-bold mb-4 text-center">Cronômetro</h2>

      {/* Exibição do tempo */}
      <div className="text-4xl font-mono text-center mb-6">{formatTime(time)}</div>

      {/* Botões */}
      <div className="flex justify-center gap-4 mb-6">
        {!isRunning && time === 0 && (
          <button
            className="px-4 w-[144px] py-2 bg-cyan-950 rounded hover:bg-slate-700 cursor-pointer"
            onClick={start}
          >
            Iniciar
          </button>
        )}
        {isRunning && (
          <div className='flex flex-wrap justify-around gap-1'>
            <button
              className="px-4 py-2 w-[144px]  bg-cyan-950 rounded hover:bg-slate-700 cursor-pointer"
              onClick={stop}
            >
              Parar
            </button>
            <button
              className="px-4 py-2 w-[144px]  bg-cyan-950 rounded hover:bg-slate-700 cursor-pointer"
              onClick={addLap}
            >
              Volta
            </button>
          </div>
        )}
        {!isRunning && time > 0 && (
          <div className='flex flex-col justify-around gap-2 sm: flex-wrap'>
            <button
              className="px-4 py-2 w-[144px]  bg-cyan-950 rounded hover:bg-slate-700 cursor-pointer"
              onClick={start}
            >
              Continuar
            </button>
            <button
              className="px-4 py-2  w-[144px] bg-cyan-950 rounded hover:bg-slate-700 cursor-pointer"
              onClick={reset}
            >
              Reiniciar
            </button>
            <button
              className="px-4 py-2 w-[144px]  bg-cyan-950 rounded hover:bg-slate-700 cursor-pointer"
              onClick={addLap}
              disabled
            >
              Volta
            </button>
          </div>
        )}
      </div>

      {/* Lista de voltas */}
      {laps.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Voltas</h3>
          <ul className="max-h-40 overflow-y-auto bg-slate-700 p-4 rounded">
            {laps.map((lap, index) => (
              <li
                key={index}
                className="py-1 border-b border-slate-600 last:border-b-0"
              >
                Volta {index + 1}: {lap}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CountDownComponent;