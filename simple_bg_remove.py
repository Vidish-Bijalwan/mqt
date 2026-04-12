from PIL import Image
import numpy as np

img = Image.open("WhatsApp Image 2026-04-05 at 12.26.45 PM(1).jpeg").convert("RGBA")
data = np.array(img)

# White background (anything close to white)
r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]
# Set threshold for white
threshold = 240
white_areas = (r >= threshold) & (g >= threshold) & (b >= threshold)

data[..., 3][white_areas] = 0

img2 = Image.fromarray(data)

# Crop the image to bounding box of non-transparent areas
bbox = img2.getbbox()
if bbox:
    img2 = img2.crop(bbox)
    # Resize keeping aspect ratio, width=500
    wpercent = (500 / float(img2.size[0]))
    hsize = int((float(img2.size[1]) * float(wpercent)))
    img2 = img2.resize((500, hsize), Image.Resampling.LANCZOS)
    img2.save("public/logo.png")
    print("Logo processed and saved to public/logo.png!")
else:
    print("Empty image.")

