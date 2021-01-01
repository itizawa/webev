import { configure, addDecorator } from "@storybook/react";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

//storybook
import { withInfo } from "@storybook/addon-info";
import { withKnobs } from "@storybook/addon-knobs";

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
addDecorator(withInfo);

addDecorator((storyFn) => (
  <>
    {storyFn()}
  </>
));

const req = require.context("../src", true, /\.stories\.tsx$/);
configure(req, module);