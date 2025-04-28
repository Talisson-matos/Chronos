"use client";
import '../app/timer.css';
import React, { useState, useEffect, useRef, useCallback } from 'react';

interface Time {
  hours: number;
  minutes: number;
  seconds: number;
}

const TimerComponent = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(3600); // 1 hora em segundos
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTime, setEditTime] = useState<Time>({ hours: 1, minutes: 0, seconds: 0 });
  const [selectedSound, setSelectedSound] = useState('');
  const [customSound, setCustomSound] = useState<File | null>(null);
  const [isTimerActive, setIsTimerActive] = useState(false); // Novo estado para .timer_active
  const timerInterval = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null); // Ref para controlar o áudio
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const defaultSounds = [
    { name: 'Novo Mundo', url: '/sounds/novo_mundo.mp3' },
    { name: 'Pássaros', url: '/sounds/passaros.mp3' },
    { name: 'Perplexo', url: '/sounds/perplexo.mp3' },
    { name: 'Sempre com Você', url: '/sounds/sempre_com_vc.mp3' },
    { name: 'Sonata Feliz', url: '/sounds/sonata_feliz.mp3' },
    { name: 'Último Adeus', url: '/sounds/ultimo_adeus.mp3' },
    { name: 'Velhos Amigos', url: '/sounds/velhos_amigos.mp3' },
  ];

  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
        timerInterval.current = setInterval(() => {
            setTimeRemaining((prevTime) => prevTime - 1);
        }, 1000);
    } else if (timeRemaining === 0 && isRunning) {
        setIsRunning(false);
        setIsTimerActive(true);
        playSound();
    } else {
        clearInterval(timerInterval.current as NodeJS.Timeout);
    }

    return () => clearInterval(timerInterval.current as NodeJS.Timeout);
}, [isRunning, timeRemaining]); // Inclua playSound

  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleEditClick = () => {
    const currentHours = Math.floor(timeRemaining / 3600);
    const currentMinutes = Math.floor((timeRemaining % 3600) / 60);
    const currentSeconds = timeRemaining % 60;
    setEditTime({ hours: currentHours, minutes: currentMinutes, seconds: currentSeconds });
    setIsModalOpen(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    if (name === 'hours' || name === 'minutes' || name === 'seconds') {
      setEditTime((prevTime) => ({ ...prevTime, [name]: parseInt(value, 10) }));
    } else if (name === 'selectedSound') {
      setSelectedSound(value);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setCustomSound(event.target.files[0]);
      setSelectedSound('custom');
    }
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeRemaining(3600);
    setEditTime({ hours: 1, minutes: 0, seconds: 0 });
    setIsTimerActive(false); // Desativar .timer_active ao redefinir
    stopSound(); // Parar o som, se estiver tocando
  };

  const handleApplySettings = () => {
    const totalSeconds = (editTime.hours * 3600) + (editTime.minutes * 60) + editTime.seconds;
    setTimeRemaining(totalSeconds);
    setIsModalOpen(false);
  };

  const handleCancelSettings = () => {
    setIsModalOpen(false);
  };

  const playSound = useCallback(() => {
    let soundUrl = '';
    if (selectedSound === 'custom' && customSound) {
      soundUrl = URL.createObjectURL(customSound);
    } else if (selectedSound) {
      const defaultSound = defaultSounds.find((sound) => sound.name === selectedSound);
      soundUrl = defaultSound?.url || '';
    }

    if (soundUrl) {
      audioRef.current = new Audio(soundUrl);
      audioRef.current.play().catch((error) => console.error('Erro ao tocar o som:', error));
    }
  }, [selectedSound, customSound, defaultSounds]); // Adicione as dependências relevantes

  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Resetar o áudio
      audioRef.current = null; // Limpar a referência
    }
  };

  const handleClose = () => {
    setIsTimerActive(false); // Remover .timer_active
    stopSound(); // Parar o som
  };

  const handleOpenFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex-4 h-screen flex flex-col bg-slate-950 items-center justify-center p-8 border-2 border-slate-100">
      <div className={`timer_active ${isTimerActive ? 'active' : ''}`}>
        <div className="flex flex-col items-center justify-center">
           <h2 className="text-3xl">Temporizador</h2>
        <div className="text-4xl font-bold mb-4">{formatTime(timeRemaining)}</div>
        </div>
       

        <div className="flex flex-wrap justify-around gap-1 mb-4">
          <button
            onClick={handleStart}
            className="bg-cyan-950 w-[144px] hover:bg-slate-700 text-white font-bold py-2 mb-2 px-4 rounded disabled:bg-slate-600"
            disabled={isRunning || timeRemaining === 0}
          >
            Iniciar
          </button>
          <button
            onClick={handleStop}
            className="bg-cyan-950 w-[144px] hover:bg-slate-700 text-white font-bold py-2 mb-2 px-4 rounded"
            disabled={!isRunning}
          >
            Parar
          </button>
          <button
            onClick={handleReset}
            className="bg-cyan-950 w-[144px] hover:bg-slate-700 text-white font-bold py-2 mb-2 px-4 rounded"
          >
            Redefinir
          </button>
          <button
            onClick={handleEditClick}
            className="bg-cyan-950 w-[144px] hover:bg-slate-700 text-white font-bold py-2 mb-2 px-4 rounded"
          >
            Editar
          </button>
        </div>

        {isTimerActive && (
          <button
            onClick={handleClose}
            className="bg-white w-[144px] shadow-lg cursor-pointer text-slate-900 font-bold py-2 px-4 rounded"
          >
            Fechar
          </button>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed z-[10000] top-0 left-0 w-full h-full bg-slate-900 bg-opacity-75 flex justify-center items-center">
          <div className="bg-slate-950 p-8 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Editar Temporizador</h2>

            <div className="mb-4 flex space-x-2">
              <div>
                <label htmlFor="hours" className="block text-slate-200 text-sm font-bold mb-2">
                  Horas:
                </label>
                <input
                  type="number"
                  id="hours"
                  name="hours"
                  value={editTime.hours}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
                  min="0"
                />
              </div>
              <div>
                <label htmlFor="minutes" className="block text-slate-200 text-sm font-bold mb-2">
                  Minutos:
                </label>
                <input
                  type="number"
                  id="minutes"
                  name="minutes"
                  value={editTime.minutes}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
                  min="0"
                  max="59"
                />
              </div>
              <div>
                <label htmlFor="seconds" className="block text-slate-200 text-sm font-bold mb-2">
                  Segundos:
                </label>
                <input
                  type="number"
                  id="seconds"
                  name="seconds"
                  value={editTime.seconds}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
                  min="0"
                  max="59"
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="selectedSound" className="block text-slate-200 text-sm font-bold mb-2">
                Toque ao finalizar:
              </label>
              <select
                id="selectedSound"
                name="selectedSound"
                value={selectedSound}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 bg-slate-900 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Nenhum toque</option>
                {defaultSounds.map((sound) => (
                  <option key={sound.name} value={sound.name}>
                    {sound.name}
                  </option>
                ))}
                <option value="custom">{customSound ? customSound.name : 'Arquivo personalizado'}</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="customSound" className="block text-slate-200 text-sm font-bold mb-2">
                Adicionar toque personalizado:
              </label>
              <input
                type="file"
                id="customSound"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleFileChange}
                accept="audio/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
              />
              <button
                type="button"
                className="bg-slate-700 hover:bg-slate-600 cursor-pointer text-slate-200 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleOpenFileDialog}
              >
                Selecionar Arquivo
              </button>
              {customSound && <p className="text-slate-600 text-xs mt-1">Arquivo selecionado: {customSound.name}</p>}
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={handleApplySettings}
                className="bg-cyan-950 hover:bg-cyan-900 cursor-pointer text-slate-200 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Finalizar
              </button>
              <button
                onClick={handleCancelSettings}
                className="bg-emerald-950 hover:bg-emerald-900 cursor-pointer text-slate-200 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimerComponent;