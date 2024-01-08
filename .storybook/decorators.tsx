import React from "react";
import ThemeContextDecorator from "./utils/ThemeContext";

export const decorators = [
  (Story: any) => (
    <ThemeContextDecorator>
      <Story />
    </ThemeContextDecorator>
  ),
];