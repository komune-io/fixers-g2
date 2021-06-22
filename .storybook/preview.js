import React from "react";
import { ThemeContextProvider } from "@smartb/archetypes-ui-themes";
import { getTheme, muiTheme } from "../docs/Theme/Theme";

import font from "./preview.css";

export const parameters = {
  options: {
    storySort: {
      order: [
        "Overview",
        ["Getting started", "Cheatsheet"],
        "Components",
        "Forms",
        "Layout",
      ],
    },
  },
};

export const withThemeProvider = (Story) => {
  return (
    <ThemeContextProvider customMuiTheme={muiTheme} theme={getTheme()}>
      <Story />
    </ThemeContextProvider>
  );
};

export const decorators = [withThemeProvider];
