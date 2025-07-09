// @ts-check
import react from "@astrojs/react";
import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import starlightTypeDoc, { typeDocSidebarGroup } from "starlight-typedoc";

// https://astro.build/config
export default defineConfig({
    i18n: {
        locales: ["en"],
        defaultLocale: "en",
        routing: {
            redirectToDefaultLocale: true,
        },
    },

    integrations: [
        react(),
        starlight({
            title: "wanim",
            customCss: ["./src/styles/global.css"],
            social: {
                github: "https://github.com/oliverbooth/wanim",
            },
            sidebar: [
                {
                    label: "Tutorials",
                    autogenerate: { directory: "tutorials" },
                },
                {
                    label: "Reference",
                    autogenerate: { directory: "reference" },
                },
                {
                    link: "/examples",
                    label: "Examples",
                },
                typeDocSidebarGroup,
            ],
            plugins: [
                starlightTypeDoc({
                    output: "api",
                    entryPoints: ["../wanim/src/index.ts"],
                    tsconfig: "../wanim/tsconfig.json",
                }),
            ],
            expressiveCode: {
                themes: ["github-dark"],
            },
        }),
    ],

    vite: {
        plugins: [tailwindcss()],
    },
});
