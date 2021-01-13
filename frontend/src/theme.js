import { createGlobalStyle } from "styled-components";

export const Theme = {
    font: "'Sora', sans-serif",
    bgPrimary: "#FFFFFF",
    border1: "#E5EAED",
    accent: "#9b3f6c",
    black: "#000000",
};

export const GlobalStyle = createGlobalStyle`
    html {
        background-color: ${Theme.bgPrimary};
        font-family: ${Theme.font};
    }

    body {
        margin: 0;
        padding: 0;
    }

    :root {
        ${Object.keys(Theme).map((key) => `--${key}: ${Theme[key]};`)}
    }
`;
