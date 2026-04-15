import re

with open("vite.config.ts", "r") as f:
    text = f.read()

manual_chunks_snippet = """
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) return 'vendor-react';
            if (id.includes('framer-motion')) return 'vendor-motion';
            if (id.includes('lucide-react')) return 'vendor-icons';
            if (id.includes('@radix-ui') || id.includes('cmdk')) return 'vendor-ui';
            if (id.includes('@supabase')) return 'vendor-supabase';
            return 'vendor';
          }
          if (id.includes('/data/')) {
            return 'data-content';
          }
        },
      },
    },
"""

if "rollupOptions:" not in text:
    text = text.replace('        hmr: {\n      overlay: false,\n    },\n  },', '        hmr: {\n      overlay: false,\n    },\n  },\n  build: {' + manual_chunks_snippet + '\n  },')

with open("vite.config.ts", "w") as f:
    f.write(text)
