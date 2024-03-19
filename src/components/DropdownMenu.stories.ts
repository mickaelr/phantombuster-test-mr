import type { Meta, StoryObj } from '@storybook/react';
import DropdownMenu from './DropdownMenu';
import { within, userEvent, expect } from '@storybook/test';

const meta = {
  title: 'Common/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SimpleMenu: Story = {
  args: {
    items: [
      { text: 'First action', action: () => { alert('First action clicked') } },
      { text: '2nd action', action: () => { alert('2nd action clicked') } }
    ],
    refId: 'randomId',
    children: 'Menu'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const menuButton = canvas.getByRole('button', { name: /Menu/i });
    await expect(menuButton).toBeInTheDocument();
    await userEvent.click(menuButton);

    const firstMenuItem = canvas.getByRole('button', { name: /First action/i });
    const secondMenuItem = canvas.getByRole('button', { name: /2nd action/i });
    await expect(firstMenuItem).toBeInTheDocument();
    await expect(secondMenuItem).toBeInTheDocument();
  },
};