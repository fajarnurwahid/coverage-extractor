/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                onest: ["Onest", "sans-serif"],
            },
        },
    },
    plugins: [],
};
