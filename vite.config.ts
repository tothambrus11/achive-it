import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [tsconfigPaths()],
    build: {
        rollupOptions: {
            input: ['index.html', 'add-goal.html', 'goal.html', 'dashboard.html']
        }
    }
})