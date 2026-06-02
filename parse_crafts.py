import re
import json

data = """
### Haryana — Phulkari Embroidery    **Location:** Hisar, Haryana, India  **Why Popular:** Traditional floral embroidery used in dupattas, shawls, and festive clothing.  **Image Link:** [https://upload.wikimedia.org/wikipedia/commons/4/43/Phulkari_Embroidery.jpg](https://upload.wikimedia.org/wikipedia/commons/4/43/Phulkari_Embroidery.jpg)    
### Madhya Pradesh — Gond Painting    **Location:** Mandla, Madhya Pradesh, India  **Why Popular:** Tribal artwork known for colorful animal and nature-inspired patterns.  **Image Link:** [https://upload.wikimedia.org/wikipedia/commons/7/75/Gond_Painting.jpg](https://upload.wikimedia.org/wikipedia/commons/7/75/Gond_Painting.jpg)    
### Madhya Pradesh — Chanderi Saree    **Location:** Chanderi, Madhya Pradesh, India  **Why Popular:** Lightweight silk saree famous for elegance and royal heritage.  **Image Link:** [https://upload.wikimedia.org/wikipedia/commons/5/5f/Chanderi_Saree.jpg](https://upload.wikimedia.org/wikipedia/commons/5/5f/Chanderi_Saree.jpg)    
### Maharashtra — Kolhapuri Chappal    **Location:** Kolhapur, Maharashtra, India  **Why Popular:** Handmade leather footwear known across India for comfort and durability.  **Image Link:** [https://upload.wikimedia.org/wikipedia/commons/8/8f/Kolhapuri_Chappal.jpg](https://upload.wikimedia.org/wikipedia/commons/8/8f/Kolhapuri_Chappal.jpg)    
### Maharashtra — Warli Painting    **Location:** Palghar, Maharashtra, India  **Why Popular:** Tribal artwork featuring storytelling through geometric figures.  **Image Link:** [https://upload.wikimedia.org/wikipedia/commons/e/e5/Warli_Painting.jpg](https://upload.wikimedia.org/wikipedia/commons/e/e5/Warli_Painting.jpg)    
### Manipur — Black Pottery    **Location:** Longpi, Manipur, India  **Why Popular:** Unique handcrafted pottery made without a potter's wheel.  **Image Link:** [https://upload.wikimedia.org/wikipedia/commons/7/73/Black_Pottery.jpg](https://upload.wikimedia.org/wikipedia/commons/7/73/Black_Pottery.jpg)    
### Meghalaya — Bamboo Handicrafts    **Location:** Shillong, Meghalaya, India  **Why Popular:** Handmade eco-friendly decorative products.  **Image Link:** [https://upload.wikimedia.org/wikipedia/commons/1/15/Bamboo_Craft.jpg](https://upload.wikimedia.org/wikipedia/commons/1/15/Bamboo_Craft.jpg)    
### Himachal Pradesh — Kullu Shawl    **Location:** Kullu, Himachal Pradesh, India  **Why Popular:** Famous wool shawls featuring colorful Himalayan patterns.  **Image Link:** [https://upload.wikimedia.org/wikipedia/commons/0/00/Kullu_Shawl.jpg](https://upload.wikimedia.org/wikipedia/commons/0/00/Kullu_Shawl.jpg)    
### Jharkhand — Dokra Art    **Location:** Hazaribagh, Jharkhand, India  **Why Popular:** Ancient tribal metal casting artwork.  **Image Link:** [https://upload.wikimedia.org/wikipedia/commons/0/05/Dhokra_Art.jpg](https://upload.wikimedia.org/wikipedia/commons/0/05/Dhokra_Art.jpg)    
### Karnataka — Mysore Silk Saree    **Location:** Mysuru, Karnataka, India  **Why Popular:** One of India's most luxurious silk sarees.  **Image Link:** [https://upload.wikimedia.org/wikipedia/commons/8/86/Mysore_Silk.jpg](https://upload.wikimedia.org/wikipedia/commons/8/86/Mysore_Silk.jpg)    
### Kerala — Kathakali Mask    **Location:** Kochi, Kerala, India  **Why Popular:** Represents Kerala's world-famous classical dance tradition.  **Image Link:** [https://upload.wikimedia.org/wikipedia/commons/7/75/Kathakali_Mask.jpg](https://upload.wikimedia.org/wikipedia/commons/7/75/Kathakali_Mask.jpg)    
### Mizoram — Puan Shawl  **Location:** Aizawl, Mizoram, India **Why Popular:** Traditional handwoven shawl representing Mizo identity and culture. **Image Link:** [https://upload.wikimedia.org/wikipedia/commons/5/57/Handwoven_Shawl.jpg](https://upload.wikimedia.org/wikipedia/commons/5/57/Handwoven_Shawl.jpg)  
### Nagaland — Naga Shawl  **Location:** Kohima, Nagaland, India **Why Popular:** Traditional tribal shawls with symbolic patterns representing status and heritage. **Image Link:** [https://upload.wikimedia.org/wikipedia/commons/5/57/Handwoven_Shawl.jpg](https://upload.wikimedia.org/wikipedia/commons/5/57/Handwoven_Shawl.jpg)  
### Odisha — Pattachitra Painting  **Location:** Raghurajpur, Odisha, India **Why Popular:** Traditional cloth-based paintings depicting mythology and Jagannath culture. **Image Link:** [https://upload.wikimedia.org/wikipedia/commons/2/2d/Pattachitra_Painting.jpg](https://upload.wikimedia.org/wikipedia/commons/2/2d/Pattachitra_Painting.jpg)  
### Punjab — Punjabi Jutti  **Location:** Patiala, Punjab, India **Why Popular:** Handmade embroidered footwear worn during weddings and festivals. **Image Link:** [https://upload.wikimedia.org/wikipedia/commons/f/f5/Punjabi_Jutti.jpg](https://upload.wikimedia.org/wikipedia/commons/f/f5/Punjabi_Jutti.jpg)  
### Rajasthan — Blue Pottery  **Location:** Jaipur, Rajasthan, India **Why Popular:** Famous handcrafted ceramic art with vibrant blue Persian-inspired patterns. **Image Link:** [https://upload.wikimedia.org/wikipedia/commons/0/09/Blue_Pottery_Jaipur.jpg](https://upload.wikimedia.org/wikipedia/commons/0/09/Blue_Pottery_Jaipur.jpg)  
### Sikkim — Thangka Paintings  **Location:** Gangtok, Sikkim, India **Why Popular:** Traditional Buddhist paintings used for meditation and spiritual décor. **Image Link:** [https://upload.wikimedia.org/wikipedia/commons/1/13/Thangka_Painting.jpg](https://upload.wikimedia.org/wikipedia/commons/1/13/Thangka_Painting.jpg)  
### Tamil Nadu — Kanchipuram Silk Saree  **Location:** Kanchipuram, Tamil Nadu, India **Why Popular:** One of India's most luxurious silk sarees known for temple-inspired designs. **Image Link:** [https://upload.wikimedia.org/wikipedia/commons/0/08/Kanchipuram_Saree.jpg](https://upload.wikimedia.org/wikipedia/commons/0/08/Kanchipuram_Saree.jpg)  
"""

items = re.findall(r'### (.*?) — (.*?)\s+\*\*Location:\*\* (.*?),\s*(.*?),\s*India\s+\*\*Why Popular:\*\* (.*?)\s+\*\*Image Link:\*\* \[.*?\]\((.*?)\)', data)

crafts = []
for state, name, city, parsed_state, desc, img in items:
    # Some images might be 404, we'll provide fallbacks just in case, but use the ones given.
    id_str = f"{state.lower().replace(' ', '-')}-{name.lower().replace(' ', '-')}"
    crafts.append({
        "id": id_str,
        "name": name.strip(),
        "state": state.strip(),
        "city": city.strip(),
        "description": desc.strip(),
        "image": img.strip(),
        "colorHex": "#E8B059" # default warm tone
    })

ts_content = """export interface Craft {
  id: string;
  name: string;
  state: string;
  city: string;
  description: string;
  image: string;
  colorHex: string;
}

export const craftsData: Craft[] = """ + json.dumps(crafts, indent=2) + """;
"""

with open('src/data/crafts.ts', 'w') as f:
    f.write(ts_content)

print(f"Generated {len(crafts)} crafts.")
