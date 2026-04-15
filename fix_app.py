import re

with open("src/App.tsx", "r") as f:
    text = f.read()

# Make a Suspense wrapper around <Routes>
text = text.replace('<Routes location={location} key={location.pathname}>', '<Suspense fallback={<div className="h-screen w-full flex items-center justify-center p-4"><div className="w-8 h-8 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div></div>}>\n        <Routes location={location} key={location.pathname}>')
text = text.replace('</Routes>', '</Routes>\n      </Suspense>')

# Provide lazy imports
# 1. Regular default imports from './pages...' or './components/admin...'
def replace_default(m):
    name = m.group(1)
    path = m.group(2)
    if name in ["Index"]: # Keep Index eager
        return m.group(0)
    return f"const {name} = React.lazy(() => import('{path}'));"

text = re.sub(r'^import\s+([A-Z]\w+)\s+from\s+"(\./(?:pages|components/admin)/[^"]+)";', replace_default, text, flags=re.MULTILINE)

# 2. Destructured ones: `import { AdminDestinations, DestinationForm } from "./pages/admin/content/AdminDestinations.tsx";`
def replace_named(m):
    names_str = m.group(1)
    path = m.group(2)
    names = [n.strip() for n in names_str.split(",")]
    # React.lazy only supports default exports out of the box... wait.
    # If the file exports named constituents, React.lazy needs to adapt them!
    # const AdminFAQs = React.lazy(() => import('path').then(m => ({default: m.AdminFAQs})))
    res = []
    for nm in names:
        res.append(f"const {nm} = React.lazy(() => import('{path}').then(module => ({{ default: module.{nm} }})));")
        
    return "\n".join(res)

text = re.sub(r'^import\s+\{\s*([^}]+)\s*\}\s+from\s+"(\./(?:pages|components/admin)/[^"]+)";', replace_named, text, flags=re.MULTILINE)

if "import React, { Suspense }" not in text:
    text = text.replace('import { QueryClient, QueryClientProvider }', 'import React, { Suspense } from "react";\nimport { QueryClient, QueryClientProvider }')

with open("src/App.tsx", "w") as f:
    f.write(text)
