import type { Meta, StoryObj } from '@storybook/react';
import PhantomItem from './PhantomItem';

const meta = {
  title: 'Dashboard/PhantomItem',
  component: PhantomItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PhantomItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ManualLaunch: Story = {
  args: {
    id: "1",
    name: "My First Phantom",
    script: "My First Phantom.js",
    manifest: {
        "tags": {
            "categories": [
                "linkedin",
            ]
        }
    },
    launchType: "manually"
  },
};

export const ReapetedLaunch: Story = {
  args: {
    id: "2",
    name: "My Second Phantom",
    script: "My Second Phantom.js",
    manifest: {
        "tags": {
            "categories": [
                "linkedin",
                "mail",
            ]
        }
    },
    launchType: "repeatedly",
    repeatedLaunchTimes: {
        "simplePreset": "Once per day"
    },
    nextLaunchIn: 180
  },
};

export const WithMenu: Story = {
  args: {
    id: "2",
    name: "My Second Phantom",
    script: "My Second Phantom.js",
    manifest: {
        "tags": {
            "categories": [
                "linkedin",
                "mail",
            ]
        }
    },
    launchType: "repeatedly",
    repeatedLaunchTimes: {
        "simplePreset": "Once per day"
    },
    nextLaunchIn: 180,
    actions: {
      rename: () => { alert('Rename action') },
      duplicate: () => { alert('Duplicate action') },
      delete: () => { alert('Delete action') },
    },
  },
};
