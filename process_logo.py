from rembg import remove
from PIL import Image
import sys

input_path = "WhatsApp Image 2026-04-05 at 12.26.45 PM(1).jpeg"
output_path = "public/logo.png"

print("Opening image...")
with open(input_path, 'rb') as i:
    with open(output_path, 'wb') as o:
        input_data = i.read()
        print("Removing background...")
        output_data = remove(input_data)
        o.write(output_data)

print("Cropping image...")
with Image.open(output_path) as img:
    # Convert absolute white or neat white to transparent just to be safe if rembg missed it, but rembg is usually good
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        # resize nicely to max 500px width/height to save space
        img.thumbnail((500, 500), Image.Resampling.LANCZOS)
        img.save(output_path, format="PNG")
        print("Final logo saved at", output_path)
    else:
        print("No bounding box found.")

