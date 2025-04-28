"use client"

import React, { useState } from 'react';
import { FaMoneyBillAlt, FaBalanceScale, FaTemperatureLow } from 'react-icons/fa';
import { GiBodyHeight, GiAquarium, GiBrazil, GiWeight, GiMightyForce } from 'react-icons/gi';
import { IoMdTimer, IoMdSpeedometer  } from 'react-icons/io';
import { TfiTimer } from 'react-icons/tfi';
import { AiTwotoneThunderbolt } from 'react-icons/ai';

// Importe o conversor de temperatura
import TemperatureConverter from './converters/TempertureConverter';
import LengthConverter from './converters/LengthConverter';
import PressureConverter from './converters/PressureConverter';
import EnergyConverter from './converters/EnergyConverter';
import VolumeConverter from './converters/VolumeConverter';
import AreaConverter from './converters/AreaConverter';
import SpeedConverter from './converters/SpeedConverter';
import ForceConverter from './converters/ForceConverter';
import WeightConverter from './converters/WeightConverter';
import TimeConverter from './converters/TimeConverter';
import IMCConverter from './converters/IMCConverter';
import CurrencyConverter from './converters/CurrencyConverter';

const MeasureConverterComponent = () => {
  // Estado para controlar qual modal está aberto
  const [openModal, setOpenModal] = useState<string | null>(null);

  // Função para abrir um modal específico
  const handleOpenModal = (modalName: string) => {
    setOpenModal(modalName);
  };

  // Função para fechar qualquer modal aberto
  const handleCloseModal = () => {
    setOpenModal(null);
  };

  // Classe comum para os círculos
  const circleClass = 'aspect-square h-48 rounded-full bg-slate-800 text-slate-100 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-700 transition-colors';

  return (
    <div className="flex-4 overflow-auto h-screen  bg-slate-950 border-2 border-slate-100 flex flex-wrap items-center justify-center p-4">
      <h2>Conversor de medidas</h2>
      <div className="max-w-6xl flex flex-wrap gap-6 justify-around">
        <div 
          className={circleClass}
          onClick={() => handleOpenModal('currency')}
        >
          <FaMoneyBillAlt className="text-3xl mb-2" />
          <span>Moeda</span>
        </div>
        
        <div 
          className={circleClass}
          onClick={() => handleOpenModal('length')}
        >
          <GiBodyHeight className="text-3xl mb-2" />
          <span>Comprimento</span>
        </div>
        
        <div 
          className={circleClass}
          onClick={() => handleOpenModal('pressure')}
        >
          <IoMdTimer className="text-3xl mb-2" />
          <span>Pressão</span>
        </div>
        
        <div 
          className={circleClass}
          onClick={() => handleOpenModal('bmi')}
        >
          <FaBalanceScale className="text-3xl mb-2" />
          <span>IMC</span>
        </div>
        
        <div 
          className={circleClass}
          onClick={() => handleOpenModal('temperature')}
        >
          <FaTemperatureLow className="text-3xl mb-2" />
          <span>Temperatura</span>
        </div>
        
        <div 
          className={circleClass}
          onClick={() => handleOpenModal('energy')}
        >
          <AiTwotoneThunderbolt className="text-3xl mb-2" />
          <span>Energia</span>
        </div>
        
        <div 
          className={circleClass}
          onClick={() => handleOpenModal('volume')}
        >
          <GiAquarium className="text-3xl mb-2" />
          <span>Volume</span>
        </div>
        
        <div 
          className={circleClass}
          onClick={() => handleOpenModal('time')}
        >
          <TfiTimer className="text-3xl mb-2" />
          <span>Tempo</span>
        </div>
        
        <div 
          className={circleClass}
          onClick={() => handleOpenModal('area')}
        >
          <GiBrazil className="text-3xl mb-2" />
          <span>Área</span>
        </div>
        
        <div 
          className={circleClass}
          onClick={() => handleOpenModal('weight')}
        >
          <GiWeight className="text-3xl mb-2" />
          <span>Peso</span>
        </div>
        
        <div 
          className={circleClass}
          onClick={() => handleOpenModal('speed')}
        >
          <IoMdSpeedometer  className="text-3xl mb-2" />
          <span>Velocidade</span>
        </div>
        
        <div 
          className={circleClass}
          onClick={() => handleOpenModal('force')}
        >
          <GiMightyForce className="text-3xl mb-2" />
          <span>Força</span>
        </div>
      </div>
      
      {/* Temperatura */}

      <TemperatureConverter 
        isOpen={openModal === 'temperature'} 
        onClose={handleCloseModal} 
      />
      
      {/* Comprimento */}

      <LengthConverter 
        isOpen={openModal === 'length'} 
        onClose={handleCloseModal} 
      />

      {/* Pressão */}

      <PressureConverter 
        isOpen={openModal === 'pressure'} 
        onClose={handleCloseModal} 
      />

      {/* Energia */}

      <EnergyConverter 
        isOpen={openModal === 'energy'} 
        onClose={handleCloseModal} 
      />

      {/* Volume */}

      <VolumeConverter 
        isOpen={openModal === 'volume'} 
        onClose={handleCloseModal} 
      />

      {/* Área */}

      <AreaConverter 
        isOpen={openModal === 'area'} 
        onClose={handleCloseModal} 
      />

      {/* Velocidade */}

      <SpeedConverter 
        isOpen={openModal === 'speed'} 
        onClose={handleCloseModal} 
      />

      {/* Força */}

      <ForceConverter 
        isOpen={openModal === 'force'} 
        onClose={handleCloseModal} 
      />

      {/* Peso */}

      <WeightConverter 
        isOpen={openModal === 'weight'} 
        onClose={handleCloseModal} 
      />

      {/* Tempo */}

      <TimeConverter 
        isOpen={openModal === 'time'} 
        onClose={handleCloseModal} 
      />

      {/* IMC */}

      <IMCConverter 
        isOpen={openModal === 'bmi'} 
        onClose={handleCloseModal} 
      />


      {/* Moeda */}

      <CurrencyConverter 
        isOpen={openModal === 'currency'} 
        onClose={handleCloseModal} 
      />



    </div>
  );
};

export default MeasureConverterComponent;