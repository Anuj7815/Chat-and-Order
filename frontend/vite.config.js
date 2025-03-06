import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
    plugins: [tailwindcss()],
    server: {
        open: "/login", // Opens http://localhost:5173/login when running npm run dev
    },
});
