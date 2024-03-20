import type { Meta, StoryObj } from '@storybook/react';
import SelectableList from './SelectableList';
import { expect, userEvent, within } from '@storybook/test';

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
    value: null,
    onChange: () => { console.log('selected value changed') },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const firstOption = canvas.getByText(/option 1/i);
    const secondOption = canvas.getByText(/option 2/i);
    const thirdOption = canvas.getByText(/option 3/i);

    // No options are selected by default
    await expect(firstOption.classList).not.toContain('selected');
    await expect(secondOption.classList).not.toContain('selected');
    await expect(thirdOption.classList).not.toContain('selected');

    // First option is selected
    await userEvent.click(firstOption);
    await expect(firstOption.classList).toContain('selected');
    await expect(secondOption.classList).not.toContain('selected');
    await expect(thirdOption.classList).not.toContain('selected');

    // Third option is selected
    await userEvent.click(thirdOption);
    await expect(firstOption.classList).not.toContain('selected');
    await expect(secondOption.classList).not.toContain('selected');
    await expect(thirdOption.classList).toContain('selected');

    // Third option is unselected
    await userEvent.click(thirdOption);
    await expect(firstOption.classList).not.toContain('selected');
    await expect(secondOption.classList).not.toContain('selected');
    await expect(thirdOption.classList).not.toContain('selected');
  },
};