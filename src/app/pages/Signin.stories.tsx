import { expect } from '@storybook/jest'
import { Meta, StoryObj } from '@storybook/react'
import { userEvent, waitFor, within } from '@storybook/testing-library'
import { rest } from 'msw'
import SignIn from './Signin'

export default {
  title: 'Components/Sign in',
  component: SignIn,
  args: {},
  argTypes: {},
  parameters: {
    msw: {
      handlers: [
        rest.post('/sessions', (req, res, ctx) => {
          return res(
            ctx.json({
              message: 'Login Realizado'
            })
          )
        })
      ]
    }
  }
} as Meta

export const Default: StoryObj = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.type(
      canvas.getByPlaceholderText('Digite seu e-mail'),
      'flaviorsteixeira@gmail.com'
    )
    await userEvent.type(canvas.getByPlaceholderText('********'), '123456')

    await userEvent.click(canvas.getByText('Entrar na plataforma'))

    await waitFor(() => {
      expect(canvas.getByText('Login Realizado')).toBeInTheDocument()
    })
  }
}
