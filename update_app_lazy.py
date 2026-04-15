import re

with open("src/App.tsx", "r") as f:
    content = f.read()

# Replace static imports with React.lazy
lazy_imports = []
new_content = "import React, { Suspense } from 'react';\n" + content

def replace_import(match):
    name = match.group(1)
    path = match.group(2)
    # Don't lazy load Index, let it load fast!
    if name == "Index":
        return match.group(0)
    
    # Check if multiple names (destructuring) like { AdminFAQs, FAQForm }
    if "{" in name:
        return match.group(0) # Let's handle these manually or keep them if they are too complex
        
    return f"const {name} = React.lazy(() => import('{path}'));"

# We'll just do a targeted replace for /pages/ and /components/admin
# But wait, python regex might be tricky for destructured imports
