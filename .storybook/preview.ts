import type { Preview } from '@storybook/react'

import { themes } from '@storybook/theming'

import '../src/app/globals.css'

import { initialize, mswLoader } from 'msw-storybook-addon'

initialize({
  onUnhandledRequest: 'bypass'
})

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    docs: {
      theme: themes.dark
    },
    backgrounds: {
      default: 'dark'
    }
  },
  loaders: [mswLoader]
}

export default preview
