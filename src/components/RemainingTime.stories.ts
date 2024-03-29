import type { Meta, StoryObj } from '@storybook/react';
import RemainingTime from './RemainingTime';

const meta = {
  title: 'Common/RemainingTime',
  component: RemainingTime,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RemainingTime>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {},
};

export const LessThanOneDay: Story = {
  args: {
    minutesRemaining: 1351
  },
};

export const MoreThanOneDay: Story = {
  args: {
    minutesRemaining: 5168
  },
};