"use client"

import React, { useState, useEffect, useCallback } from 'react'

const CalculatorComponent = () => {
    const [display, setDisplay] = useState('0')
    const [operation, setOperation] = useState('')
    const [previousValue, setPreviousValue] = useState<number | null>(null)
    const [resetDisplay, setResetDisplay] = useState(false)

    const handleNumberClick = useCallback((number: string) => {
        if (display === '0' || resetDisplay) {
            setDisplay(number);
            setResetDisplay(false);
        } else {
            setDisplay(display + number);
        }
    }, [display, resetDisplay]);

    const handleDecimalClick = () => {
        if (resetDisplay) {
            setDisplay('0,')
            setResetDisplay(false)
            return
        }

        if (!display.includes(',')) {
            setDisplay(display + ',')
        }
    }

    const handleOperationClick = (op: string) => {
        const currentValue = parseFloat(display.replace(',', '.'))

        if (previousValue !== null) {
            const result = calculate(previousValue, currentValue, operation)
            setDisplay(formatNumber(result))
            setPreviousValue(result)
        } else {
            setPreviousValue(currentValue)
        }

        setOperation(op)
        setResetDisplay(true)
    }

    const handlePercentage = () => {
        const currentValue = parseFloat(display.replace(',', '.'))

        if (previousValue !== null) {
            const percentValue = (previousValue * currentValue) / 100
            setDisplay(formatNumber(percentValue))
        } else {
            const percentValue = currentValue / 100
            setDisplay(formatNumber(percentValue))
        }
    }

    const handleSquareRoot = () => {
        const currentValue = parseFloat(display.replace(',', '.'))
        if (currentValue < 0) {
            setDisplay("Erro")
            setResetDisplay(true)
            return
        }
        const result = Math.sqrt(currentValue)
        setDisplay(formatNumber(result))
        setResetDisplay(true)
    }

    const handleEquals = () => {
        if (previousValue === null || operation === '') return

        const currentValue = parseFloat(display.replace(',', '.'))
        const result = calculate(previousValue, currentValue, operation)

        setDisplay(formatNumber(result))
        setPreviousValue(null)
        setOperation('')
        setResetDisplay(true)
    }

    const calculate = (a: number, b: number, op: string): number => {
        switch (op) {
            case '+':
                return a + b
            case '-':
                return a - b
            case '×':
                return a * b
            case '÷':
                return b !== 0 ? a / b : 0
            default:
                return b
        }
    }

    const formatNumber = (num: number): string => {
        return num.toString().replace('.', ',')
    }

    const handleClear = () => {
        setDisplay('0')
        setPreviousValue(null)
        setOperation('')
        setResetDisplay(false)
    }

    const handleDelete = () => {
        if (display.length === 1 || (display.length === 2 && display.includes('-'))) {
            setDisplay('0')
        } else {
            setDisplay(display.slice(0, -1))
        }
    }

    // Adicionando suporte para teclado
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const { key } = event

            // Números
            if (/[0-9]/.test(key)) {
                handleNumberClick(key)
            }
            // Operações
            else if (key === '+') {
                handleOperationClick('+')
            }
            else if (key === '-') {
                handleOperationClick('-')
            }
            else if (key === '*') {
                handleOperationClick('×')
            }
            else if (key === '/') {
                handleOperationClick('÷')
            }
            // Vírgula
            else if (key === ',' || key === '.') {
                handleDecimalClick()
            }
            // Enter para igual
            else if (key === 'Enter') {
                handleEquals()
            }
            // Delete para limpar tudo
            else if (key === 'Delete' || key === 'Escape' ) {
                handleClear()
            }
            // Backspace para apagar um dígito
            else if (key === 'Backspace') {
                handleDelete()
            }
            // Alt + 1 para raiz quadrada
            else if (key.toLowerCase() === 'r') {
                handleSquareRoot()
            }
            // Percentual
            else if (key === '%') {
                handlePercentage()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [display, operation, previousValue, resetDisplay])

   

    const renderButton = (content: string, onClick: () => void, className: string = '') => {
        return (
            <button
                onClick={onClick}
                className={`flex h-16 w-16 items-center justify-center rounded-full text-2xl font-medium ${className}`}
            >
                {content}
            </button>
        )
    }

    return (
        <div className="flex flex-4 h-screen w-full items-center justify-center bg-slate-950 border-2 border-slate-100">
           
            <div className="w-80 rounded-3xl bg-slate-900 p-5 shadow-xl">
           
                {/* Display */}
                <div className="mb-5 flex h-24 items-end overflow-auto  justify-end rounded-xl bg-slate-800 p-4">
                    <div className="text-right">
                        {operation && (
                            <div className="text-sm text-gray-400">
                                {formatNumber(previousValue || 0)} {operation}
                            </div>
                        )}
                        <div className="text-3xl text-white overflow-hidden text-ellipsis">{display}</div>
                    </div>
                </div>

                {/* Keypad */}
                <div className="grid grid-cols-4 gap-3">
                    {/* Primeira linha */}
                    {renderButton('C', handleClear, 'bg-emerald-950 text-white hover:bg-emerald-900')}
                    {renderButton('←', handleDelete, 'bg-gray-700 text-white hover:bg-gray-600')}
                    {renderButton('%', handlePercentage, 'bg-gray-700 text-white hover:bg-gray-600')}
                    {renderButton('÷', () => handleOperationClick('÷'), 'bg-cyan-950 text-white hover:bg-cyan-900')}

                    {/* Segunda linha */}
                    {renderButton('7', () => handleNumberClick('7'), 'bg-gray-700 text-white hover:bg-gray-600')}
                    {renderButton('8', () => handleNumberClick('8'), 'bg-gray-700 text-white hover:bg-gray-600')}
                    {renderButton('9', () => handleNumberClick('9'), 'bg-gray-700 text-white hover:bg-gray-600')}
                    {renderButton('×', () => handleOperationClick('×'), 'bg-cyan-950 text-white hover:bg-cyan-900')}

                    {/* Terceira linha */}
                    {renderButton('4', () => handleNumberClick('4'), 'bg-gray-700 text-white hover:bg-gray-600')}
                    {renderButton('5', () => handleNumberClick('5'), 'bg-gray-700 text-white hover:bg-gray-600')}
                    {renderButton('6', () => handleNumberClick('6'), 'bg-gray-700 text-white hover:bg-gray-600')}
                    {renderButton('-', () => handleOperationClick('-'), 'bg-cyan-950 text-white hover:bg-cyan-900')}

                    {/* Quarta linha */}
                    {renderButton('1', () => handleNumberClick('1'), 'bg-gray-700 text-white hover:bg-gray-600')}
                    {renderButton('2', () => handleNumberClick('2'), 'bg-gray-700 text-white hover:bg-gray-600')}
                    {renderButton('3', () => handleNumberClick('3'), 'bg-gray-700 text-white hover:bg-gray-600')}
                    {renderButton('+', () => handleOperationClick('+'), 'bg-cyan-950 text-white hover:bg-cyan-900')}

                    {/* Quinta linha */}
                    {renderButton('√', handleSquareRoot, 'bg-gray-700 text-white hover:bg-gray-600')}
                    {renderButton('0', () => handleNumberClick('0'), 'bg-gray-700 text-white hover:bg-gray-600')}
                    {renderButton(',', handleDecimalClick, 'bg-gray-700 text-white hover:bg-gray-600')}
                    {renderButton('=', handleEquals, 'bg-cyan-950 text-white hover:bg-cyan-900')}
                </div>
            </div>
        </div>
    )
}

export default CalculatorComponent