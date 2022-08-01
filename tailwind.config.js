module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			width: {
				1600: '1600px',
				400: '400px',
				450: '450px',
				210: '210px',
				550: '550px',
				260: '260px',
				650: '650px',
			},
			height: {
				600: '600px',
				280: '280px',
				900: '900px',
				458: '458px',
			},
			top: {
				' 50%': '50%',
			},
			backgroundColor: {
				primary: '#F1F1F2',
				blur: '#030303',
			},
			colors: {
				primary: 'rgb(22, 24, 35)',
			},
			height: {
				'88vh': '88vh',
			},
		},
	},
	plugins: [],
};
