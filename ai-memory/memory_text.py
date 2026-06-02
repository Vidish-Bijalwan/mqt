from mem0 import Memory

config = {
    "vector_store": {
        "provider": "chroma",
        "config": {
            "collection_name": "project_memory",
            "path": "./memory_db"
        }
    }
}

memory = Memory.from_config(config)

memory.add(
    "User likes AI agents and Arch Linux",
    user_id="sirus"
)

result = memory.search(
    "What does user like?",
    user_id="sirus"
)

print(result)