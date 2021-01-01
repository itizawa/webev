import { configure, addDecorator } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import React from "react";

export const parameters = {
  backgrounds: {
    default: "light",
    values: [
      {
        name: "dark",
        value: "#333",
      },
      {
        name: "gray",
        value: "#d3d3d3",
      },
      {
        name: "light",
        value: "#f5f5f5",
      },
      {
        name: "white",
        value: "#fff",
      },
    ],
  },
};

addDecorator(withKnobs);

addDecorator((storyFn) => (
  <>
    <CssBaseline />
    {storyFn()}
  </>
));

const req = require.context("../src", true, /\.stories\.tsx$/);
configure(req, module);