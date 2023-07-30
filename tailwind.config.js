const defaultTheme = require("tailwindcss/defaultTheme")
module.exports = {
  content: ["./app/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
				sans: ['Poppins', ...defaultTheme.fontFamily.sans],
			}
    },
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
}
