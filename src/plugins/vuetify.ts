/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

const wiiisdomTheme = {
  dark: false,
  colors: {
    wiiisdom_darkBlue: "#1f1d74",
    wiiisdom_blue: "#0393f0",
    wiiisdom_orange: "#f38e02",
    wiiisdom_darkOrange: "#ea5319",
  }
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: "wiiisdomTheme",
    themes: {
      wiiisdomTheme
    }
  }
})
