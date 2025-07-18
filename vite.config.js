import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            // "@root": path.resolve(__dirname, "./src"),
            "@components": path.resolve(__dirname, "./src/common/components"),
            "@hooks": path.resolve(__dirname, "./src/common/hooks"),
            "@utils": path.resolve(__dirname, "./src/common/utils"),
            "@config": path.resolve(__dirname, "./src/config"),
            "@types": path.resolve(__dirname, "./src/common/types/index.ts"),
            "@pages": path.resolve(__dirname, "./src/pages"),
            "@layouts": path.resolve(__dirname, "./src/layouts"),
            "@assets": path.resolve(__dirname, "./src/assets"),
            "@api": path.resolve(__dirname, "./src/api"),
        },
    },
});
