// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";
// const { heroui } = require("@heroui/react");

// https://astro.build/config
export default defineConfig({
    integrations: [react()],

    vite: {
        plugins: [tailwindcss()],
    },
});
