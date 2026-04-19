import os
import json

base_dir = "india_tourism"

slug_map = {
    "Andaman_Nicobar": "andaman-and-nicobar-islands",
    "Andhra_Pradesh": "andhra-pradesh",
    "Chandigarh": "chandigarh",
    "Delhi": "delhi",
    "Goa": "goa",
    "Gujarat": "gujarat",
    "Haryana": "haryana",
    "Himachal_Pradesh": "himachal-pradesh",
    "Lakshadweep": "lakshadweep",
    "Madhya_Pradesh": "madhya-pradesh",
    "Maharashtra": "maharashtra",
    "Manipur": "manipur",
    "Odisha": "odisha",
    "Rajasthan": "rajasthan",
    "Sikkim": "sikkim",
    "Tamil_Nadu": "tamil-nadu",
    "Tripura": "tripura",
    "India_Central": "" # Ignore maybe
}

state_images = {}

for root, _, files in os.walk(base_dir):
    for file in files:
        if file.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
            path = os.path.join(root, file)
            parts = path.split(os.sep)
            # parts[0] is 'india_tourism', parts[1] is State
            if len(parts) > 1:
                state_folder = parts[1]
                slug = slug_map.get(state_folder)
                if slug:
                    if slug not in state_images:
                        state_images[slug] = []
                    # Keep at most 10 images for gallery per state
                    if len(state_images[slug]) < 10:
                        state_images[slug].append(f"/tourism/{'/'.join(parts[1:])}")

with open("src/data/stateImagesMap.ts", "w") as f:
    f.write("export const stateImagesMap: Record<string, string[]> = ")
    json.dump(state_images, f, indent=2)
    f.write(";\n")
