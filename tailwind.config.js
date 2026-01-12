module.exports = {
  darkMode: 'class',
  content: [
    './resources/views/**/*.blade.php',
    './resources/js/**/*.js',
    './app/Livewire/**/*.php',
  ],
  theme: {
    extend: {
      colors: {
        'nca-500': '#1F6ED5',
        'nca-600': '#0B5ED7',
        'nca-700': '#0B4FA3',
      }
    }
  },
  plugins: [],
};
