import type { Meta, StoryObj } from "@storybook/react";

import { Hoge } from "./Hoge";

const meta = {
  component: Hoge,
} satisfies Meta<typeof Hoge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
