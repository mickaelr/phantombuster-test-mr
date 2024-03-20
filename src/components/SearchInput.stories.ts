import type { Meta, StoryObj } from '@storybook/react';
import SearchInput from './SearchInput';

const meta = {
  title: 'Common/SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SimpleSearchInput: Story = {
  args: {
    name: 'Simple search input',
    placeholder: 'Simple SearchInput',
    value: '',
    onChange: () => { console.log('input value changed') },
  },
};