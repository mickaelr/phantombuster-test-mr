import type { Meta, StoryObj } from '@storybook/react';
import SelectableList from './SelectableList';

const meta = {
  title: 'Common/SelectableList',
  component: SelectableList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SelectableList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SimpleSelectableList: Story = {
  args: {
    label: 'Simple selectable list',
    options: new Set([
      'option 1',
      'option 2',
      'option 3',
    ]),
    onChange: () => { console.log('selected value changed') },
  },
};