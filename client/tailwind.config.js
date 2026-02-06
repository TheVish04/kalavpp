/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#8c25f4',
                'primary-dark': '#701bc4',
                accent: '#FFB84C', // Golden Amber
                'background-dark': '#121212', // Deep Charcoal
                'surface-dark': '#1E1E1E',
                'surface-glass': 'rgba(30, 30, 30, 0.4)',
                'background-light': '#f7f5f8',
            },
            fontFamily: {
                display: ['Manrope', 'sans-serif'],
            },
            backgroundImage: {
                'hero-gradient':
                    'linear-gradient(to right bottom, rgba(140, 37, 244, 0.2), rgba(0, 0, 0, 0.8)), linear-gradient(rgba(18, 18, 18, 0.3), rgba(18, 18, 18, 1))',
            },
        },
    },
    plugins: [],
};
