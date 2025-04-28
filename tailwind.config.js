/** @type {import('tailwindcss').Config} */
export const content = [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
];
export const theme = {
    extend: {
        colors: {
            'primary': {
                100: '#000524',
                200: '#010937',
                300: '#020f59',
                400: '#101f78',
                500: '#1c31a5',
            },
            // Você também pode dar nomes específicos para cada cor
            'navy-dark': '#000524',
            'navy': '#010937',
            'indigo-dark': '#020f59',
            'indigo': '#101f78',
            'indigo-light': '#1c31a5',
        }
    },
};
export const plugins = [];