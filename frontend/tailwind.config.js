/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                palette: {
                    darkestBlue: '#111827',
                    darkBlue: '#2B2D42',
                    blueGray: '#8D99AE',
                    mediumGray: '#C0C8D1',
                    lightGray: '#EDF2F4',
                    red: '#EF233C',
                    darkRed: '#D90429',
                },
            }
        },
    },
    plugins: [],
};

