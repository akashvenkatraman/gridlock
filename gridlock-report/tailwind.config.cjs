module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                gridlock: {
                    bg: '#0a0a0a',
                    panel: '#111111',
                    cyan: '#00f3ff',
                    red: '#ff003c',
                    text: '#e5e5e5',
                    muted: '#888888',
                }
            },
            fontFamily: {
                mono: ['Roboto Mono', 'monospace'],
                sans: ['Inter', 'sans-serif'],
                tech: ['Rajdhani', 'sans-serif'],
            },
            animation: {
                'glitch': 'glitch 1s linear infinite',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                glitch: {
                    '2%, 64%': { transform: 'translate(2px,0) skew(0deg)' },
                    '4%, 60%': { transform: 'translate(-2px,0) skew(0deg)' },
                    '62%': { transform: 'translate(0,0) skew(5deg)' },
                }
            }
        },
    },
    plugins: [],
}
