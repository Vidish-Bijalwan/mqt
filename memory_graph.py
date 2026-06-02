import json
import os

MEMORY_FILE = "memory.json"

if not os.path.exists(MEMORY_FILE):
    with open(MEMORY_FILE, "w") as f:
        json.dump([], f)

def add_memory(subject, relation, target):
    with open(MEMORY_FILE, "r") as f:
        memories = json.load(f)

    memories.append({
        "subject": subject,
        "relation": relation,
        "target": target
    })

    with open(MEMORY_FILE, "w") as f:
        json.dump(memories, f, indent=4)

def search_memory(subject):
    with open(MEMORY_FILE, "r") as f:
        memories = json.load(f)

    return [m for m in memories if m["subject"] == subject]

add_memory("User", "likes", "AI Agents")
add_memory("User", "uses", "Arch Linux")

print(search_memory("User"))
