-- ═══════════════════════════════════════════════════════════════════════
-- MQT MASTER DATA SEED — Run in Supabase SQL Editor
-- Populates: States/UTs, Package Categories, Festivals, Travel Routes,
--            Discovery Vibes, Domestic/International, Travel Experiences,
--            Why Choose Us, How It Works, Newsletter, Trust Strip, FAQs
-- ═══════════════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────────────────────────────
-- 1. STATES & UNION TERRITORIES (All 28 States + 8 UTs)
-- ─────────────────────────────────────────────────────────────────────
INSERT INTO public.states_uts (name, slug, type, image_url, short_description, intro_overview, best_season, active, featured, sort_order)
VALUES
  -- North India
  ('Uttarakhand', 'uttarakhand', 'State',
   'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=800',
   'The Land of Gods — home to Himalayan peaks, the sacred Char Dham, and the yoga capital.',
   'Devbhoomi Uttarakhand is a mystical realm of sky-piercing peaks, plunging river valleys, and deeply embedded spiritual heritage. From the extreme adventure of white-water rafting in Rishikesh to the intense devotion of the Kedarnath pilgrimage.',
   'March to June, Sep to Nov', true, true, 1),

  ('Himachal Pradesh', 'himachal-pradesh', 'State',
   'https://images.unsplash.com/photo-1582972236019-ea4af5ffe587?auto=format&fit=crop&q=80&w=800',
   'Snow-clad summits, lush pine valleys, and ancient Buddhist monasteries.',
   'Himachal Pradesh is India''s most beloved mountain state. It seamlessly blends raw alpine beauty with vibrant local cultures, offering everything from relaxing family holidays in Shimla to extreme trans-Himalayan adventures in Spiti.',
   'March to June (Summer), Dec to Feb (Snow)', true, true, 2),

  ('Uttar Pradesh', 'uttar-pradesh', 'State',
   'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800',
   'The heartland of India, housing the Taj Mahal, Kashi, and the cultural roots of the nation.',
   'Uttar Pradesh is defined by its deep historical and spiritual resonance. The holy ghats of Varanasi lie in stark contrast to the magnificent Mughal architecture of Agra.',
   'October to March', true, true, 3),

  ('Punjab', 'punjab', 'State',
   'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&q=80&w=800',
   'The land of five rivers, golden wheat fields, and the spectacular Golden Temple.',
   'Known for its hearty hospitality, rich culinary heritage, and energetic culture.',
   'October to March', true, false, 4),

  ('Haryana', 'haryana', 'State',
   'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800',
   'Ancient historical sites and modern urban landscapes.',
   'A blend of ancient civilization roots like Kurukshetra and the modern metropolis of Gurugram.',
   'October to March', true, false, 5),

  -- West India
  ('Rajasthan', 'rajasthan', 'State',
   'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80&w=800',
   'Grand forts, sprawling deserts, and royal heritage.',
   'Rajasthan is India''s most colourful state. It is a visual feast of majestic forts, opulent palaces, sprawling desert dunes, and vibrant festivals that keep the Rajput history alive.',
   'October to March', true, true, 6),

  ('Gujarat', 'gujarat', 'State',
   'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800',
   'The vibrant state of the Rann of Kutch, Asiatic lions, and rich textiles.',
   'From the blinding white salt desert of Kutch to the home of the last surviving Asiatic lions in Gir.',
   'November to February', true, false, 7),

  ('Maharashtra', 'maharashtra', 'State',
   'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&q=80&w=800',
   'The powerhouse of India featuring the Western Ghats, ancient caves, and coastal beauty.',
   'Combining the fast-paced life of Mumbai with the ancient, intricately carved caves of Ajanta and Ellora.',
   'September to April', true, false, 8),

  ('Goa', 'goa', 'State',
   'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=800',
   'India''s pocket-sized paradise of sun, sand, and Portuguese heritage.',
   'Famous globally for its golden beaches, trance parties, and laid-back vibe, Goa also hides beautiful 16th-century churches and dense spice plantations inland.',
   'November to March', true, true, 9),

  -- South India
  ('Kerala', 'kerala', 'State',
   'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800',
   'God''s Own Country — tranquil backwaters and lush tea gardens.',
   'Kerala is a network of glistening backwaters, spice and tea-covered hills of the Western Ghats, and sweeping golden beaches bordering the Arabian Sea.',
   'September to March', true, true, 10),

  ('Karnataka', 'karnataka', 'State',
   'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=800',
   'A glorious mix of IT hubs, ancient temple ruins, and coffee plantations.',
   'From the ruined empire of Hampi to the lush coffee estates of Coorg and the tiger reserves of Kabini.',
   'October to April', true, false, 11),

  ('Tamil Nadu', 'tamil-nadu', 'State',
   'https://images.unsplash.com/photo-1605436247078-f0ef43ee8d5c?auto=format&fit=crop&q=80&w=800',
   'The epicentre of Dravidian culture with towering temples and high hill stations.',
   'Tamil Nadu is the stronghold of South Indian culture, featuring the highest gopurams in South Asia, the hill station of Ooty, and beaches of Marina.',
   'November to March', true, false, 12),

  ('Andhra Pradesh', 'andhra-pradesh', 'State',
   'https://images.unsplash.com/photo-1594322436404-5a0526db4d13?auto=format&fit=crop&q=80&w=800',
   'Home to Tirupati temple, ancient Buddhist sites, and scenic coastline.',
   'Andhra Pradesh spans the Deccan Plateau and the Bay of Bengal coastline with mighty rivers and rich temple architecture.',
   'October to March', true, false, 13),

  ('Telangana', 'telangana', 'State',
   'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=800',
   'Hyderabad''s Nizami grandeur, biryani, and the ancient Warangal forts.',
   'Telangana offers a unique blend of Persian-influenced Hyderabadi culture with rural Deccan landscapes.',
   'October to February', true, false, 14),

  -- East India
  ('West Bengal', 'west-bengal', 'State',
   'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
   'The land of Rabindranath Tagore, Himalayan Darjeeling, and Sundarbans tigers.',
   'West Bengal is a culturally rich state that stretches from the mangrove forests of the Sundarbans to the tea gardens of Darjeeling.',
   'October to March', true, false, 15),

  ('Odisha', 'odisha', 'State',
   'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&q=80&w=800',
   'The temple state — Puri, Konark Sun Temple, and pristine tribal culture.',
   'Odisha is one of India''s best-kept secrets with the magnificent Konark Sun Temple, jagannath rath yatra, and untouched tribal heartland.',
   'October to February', true, false, 16),

  ('Bihar', 'bihar', 'State',
   'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800',
   'The cradle of civilization, Buddhism, and the ancient Nalanda university.',
   'Bihar is the birthplace of Buddhism and Jainism, with Bodh Gaya, Nalanda, and Rajgir being world-heritage-level pilgrimage sites.',
   'November to March', true, false, 17),

  ('Jharkhand', 'jharkhand', 'State',
   'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&q=80&w=800',
   'Dense forests, waterfalls, and rich tribal culture.',
   'Jharkhand is home to beautiful waterfalls, dense forests, and India''s most authentic tribal communities.',
   'October to February', true, false, 18),

  -- Central India
  ('Madhya Pradesh', 'madhya-pradesh', 'State',
   'https://images.unsplash.com/photo-1549517045-bc93de28e977?auto=format&fit=crop&q=80&w=800',
   'The heart of India — royal Khajuraho temples and magnificent tiger reserves.',
   'From the UNESCO-listed Khajuraho temples to Kanha and Bandhavgarh — India''s premier tiger reserves.',
   'October to March', true, true, 19),

  ('Chhattisgarh', 'chhattisgarh', 'State',
   'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&q=80&w=800',
   'Waterfalls, tribal art, and dense forests — India''s hidden gem.',
   'Chhattisgarh is one of India''s most unspoilt states with Chitrakote waterfall, Bastar tribal heartland, and massive forests.',
   'October to February', true, false, 20),

  -- North East India
  ('Assam', 'assam', 'State',
   'https://images.unsplash.com/photo-1611821064430-0d40291d0f0b?auto=format&fit=crop&q=80&w=800',
   'Kaziranga rhinos, Brahmaputra river, and one-horned wonder.',
   'Assam is home to the world-famous Kaziranga National Park where two-thirds of the world''s one-horned rhinos roam freely.',
   'November to April', true, false, 21),

  ('Meghalaya', 'meghalaya', 'State',
   'https://images.unsplash.com/photo-1566402441566-38f8e982c2da?auto=format&fit=crop&q=80&w=800',
   'The abode of clouds — living root bridges and the wettest place on Earth.',
   'Meghalaya''s misty hills, living root bridges of Cherrapunji, and clear river canyons make it a natural paradise.',
   'October to May', true, false, 22),

  ('Sikkim', 'sikkim', 'State',
   'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800',
   'India''s smallest and greenest state — Kanchenjunga views and Buddhist monasteries.',
   'Sikkim offers stunning views of Kanchenjunga — the world''s third-highest peak — along with pristine monasteries.',
   'March to May, Sep to Nov', true, false, 23),

  ('Manipur', 'manipur', 'State',
   'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&q=80&w=800',
   'The dancing state — classical arts, floating lake, and misty hills.',
   'Famous for Loktak Lake and the classical Manipuri dance form, the state is emerging as a cultural and ecotourism destination.',
   'October to March', true, false, 24),

  ('Mizoram', 'mizoram', 'State',
   'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&q=80&w=800',
   'The Land of the Blue Mountains — one of the cleanest states in India.',
   'Mizoram''s misty green hills and the warm Mizo culture are barely known — making it an ultimate offbeat destination.',
   'October to March', true, false, 25),

  ('Nagaland', 'nagaland', 'State',
   'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&q=80&w=800',
   'Home to the Hornbill Festival and vibrant Naga warrior culture.',
   'Nagaland is famous for the Hornbill Festival — India''s most culturally rich tribal festival.',
   'October to March', true, false, 26),

  ('Tripura', 'tripura', 'State',
   'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&q=80&w=800',
   'Ancient temples, bamboo crafts, and border landscapes.',
   'Tripura''s Ujjayanta Palace, Neermahal Water Palace, and tribal heartland offer a very unique travel experience.',
   'October to March', true, false, 27),

  ('Arunachal Pradesh', 'arunachal-pradesh', 'State',
   'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&q=80&w=800',
   'Land of the Dawn-Lit Mountains — monasteries and Himalayan wilderness.',
   'India''s easternmost state is a vast frontier of untouched Himalayan wilderness, Buddhist monasteries, and tribal villages.',
   'March to October', true, false, 28),

  -- Union Territories
  ('Jammu and Kashmir', 'jammu-and-kashmir', 'Union Territory',
   'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&q=80&w=800',
   'The crown of India — Dal Lake houseboats, Mughal gardens, and snowy peaks.',
   'Kashmir is often called "Paradise on Earth" — and for good reason. Srinagar''s pristine Dal Lake, Gughal gardens, and the snow-draped Gulmarg combine to create an otherworldly experience.',
   'April to October (Summer), Dec to Feb (Snow)', true, true, 29),

  ('Ladakh', 'ladakh', 'Union Territory',
   'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&q=80&w=800',
   'The Land of High Passes — Buddhist culture at 11,000 feet.',
   'Ladakh is one of the most surreal destinations on Earth — a cold desert plateau framed by the Himalayan and Karakoram ranges, dotted with ancient monasteries, and home to the turquoise Pangong Lake.',
   'June to September', true, true, 30),

  ('Delhi', 'delhi', 'Union Territory',
   'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=800',
   'India''s capital — a seamless blend of Mughal heritage and modern India.',
   'Delhi is a city of contrasts — ancient Mughal monuments like the Red Fort and Qutub Minar stand alongside the modern Lotus Temple and India Gate.',
   'October to March', true, true, 31),

  ('Puducherry', 'puducherry', 'Union Territory',
   'https://images.unsplash.com/photo-1582490588865-d7c0c2c9c45c?auto=format&fit=crop&q=80&w=800',
   'Little France in India — colourful colonial streets and Sri Aurobindo Ashram.',
   'Puducherry is a unique blend of French colonial architecture and Tamil Dravidian culture, with the world-famous Sri Aurobindo Ashram.',
   'October to March', true, false, 32),

  ('Chandigarh', 'chandigarh', 'Union Territory',
   'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800',
   'India''s most planned city — designed by Le Corbusier.',
   'Chandigarh is a unique urban landscape, designed by the famous architect Le Corbusier, offering a clean and organised city experience with beautiful gardens.',
   'October to March', true, false, 33),

  ('Andaman and Nicobar Islands', 'andaman-and-nicobar-islands', 'Union Territory',
   'https://images.unsplash.com/photo-1568402102990-bc541580b59f?auto=format&fit=crop&q=80&w=800',
   'Crystal clear waters, coral reefs, and WWII history.',
   'The Andaman Islands offer some of the most pristine beaches and coral reefs in the world, along with the haunting colonial-era history of the Cellular Jail.',
   'November to May', true, true, 34),

  ('Lakshadweep', 'lakshadweep', 'Union Territory',
   'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=800',
   'India''s smallest UT — untouched coral atolls and the clearest waters.',
   'Lakshadweep is a remote and pristine archipelago of 36 islands with some of the clearest blue waters and untouched coral reefs in Asia.',
   'October to May', true, false, 35),

  ('Dadra and Nagar Haveli and Daman and Diu', 'dadra-and-nagar-haveli-and-daman-and-diu', 'Union Territory',
   'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=800',
   'Portuguese colonial coastal towns and tribal forest regions.',
   'A quiet coastal Union Territory with Portuguese colonial charm, forested interiors, and golden beaches.',
   'November to February', true, false, 36)

ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  image_url = EXCLUDED.image_url,
  short_description = EXCLUDED.short_description,
  intro_overview = EXCLUDED.intro_overview,
  best_season = EXCLUDED.best_season;


-- ─────────────────────────────────────────────────────────────────────
-- 2. PACKAGE CATEGORIES
-- ─────────────────────────────────────────────────────────────────────
INSERT INTO public.package_categories (name, slug, description, active, sort_order)
VALUES
  ('Pilgrimage', 'pilgrimage', 'Sacred journeys to India''s holiest sites — Char Dham, Kedarnath, Varanasi, and beyond.', true, 0),
  ('Adventure', 'adventure', 'Trekking, river rafting, camping, and high-altitude expeditions across India.', true, 1),
  ('Honeymoon', 'honeymoon', 'Romantic getaways designed for couples — houseboats, hill stations, and private villas.', true, 2),
  ('Family', 'family', 'Carefully crafted itineraries for families with children — comfortable, fun, and memorable.', true, 3),
  ('Wildlife', 'wildlife', 'Tiger safaris, national parks, and bird-watching across India''s biodiversity hotspots.', true, 4),
  ('Beach', 'beach', 'Sun-kissed shores of Goa, Andaman, Kerala, and Lakshadweep.', true, 5),
  ('Hill Station', 'hill-station', 'Cool escapes to the mountains — Manali, Shimla, Ooty, Munnar, and Darjeeling.', true, 6),
  ('Heritage', 'heritage', 'Discover India''s UNESCO sites — Taj Mahal, Ajanta Caves, Hampi, and Rajasthan forts.', true, 7),
  ('International', 'international', 'Curated packages for Nepal, Bhutan, Sri Lanka, Maldives, and Southeast Asia.', true, 8)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description;


-- ─────────────────────────────────────────────────────────────────────
-- 3. FESTIVALS
-- ─────────────────────────────────────────────────────────────────────
INSERT INTO public.festivals (name, slug, description, image_url, state, month, date_range, significance, active, featured, sort_order)
VALUES
  ('Holi', 'holi',
   'World''s most colourful festival — powder-drenched celebrations at the birthplace of Lord Krishna.',
   'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
   'Uttar Pradesh', 'March', 'March (Full Moon)', 'UNESCO Cultural Heritage', true, true, 0),

  ('Diwali', 'diwali',
   'Festival of lights — floating diyas on the Ganga in Varanasi and rooftop fireworks over Jaipur forts.',
   'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&q=80&w=800',
   'Pan India', 'Oct – Nov', 'October or November', 'India''s Biggest Festival', true, true, 1),

  ('Pushkar Camel Fair', 'pushkar-camel-fair',
   'World''s largest camel fair — 200,000+ attendees, camel races, traditional folk performances.',
   'https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?auto=format&fit=crop&q=80&w=800',
   'Rajasthan', 'November', 'Nov (Kartik Purnima)', 'National Geographic''s Top Festivals', true, true, 2),

  ('Kumbh Mela', 'kumbh-mela',
   'World''s largest human gathering — millions take a sacred dip at the Sangam confluence.',
   'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=800',
   'Uttar Pradesh', 'Jan – Mar', 'Every 12 years at Prayagraj', 'UNESCO Intangible Cultural Heritage', true, true, 3),

  ('Durga Puja', 'durga-puja',
   '10-day UNESCO heritage festival — pandal-hopping, goddess idols, and Bengal''s greatest cultural spectacle.',
   'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=800',
   'West Bengal', 'October', 'October (Navratri)', 'UNESCO Intangible Heritage', true, true, 4),

  ('Ganesh Chaturthi', 'ganesh-chaturthi',
   '10-day festival culminating in Lalbaugcha Raja''s grand immersion procession drawing millions.',
   'https://images.unsplash.com/photo-1601628828688-632f38a5a7d0?auto=format&fit=crop&q=80&w=800',
   'Maharashtra', 'Aug – Sep', 'Aug or September', 'Mumbai''s Grandest Festival', true, true, 5),

  ('Onam', 'onam',
   'Snake boat races with 100 rowers, Pookalam flower carpets, and the legendary 28-dish Onam Sadhya feast.',
   'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800',
   'Kerala', 'Aug – Sep', 'August or September', 'Kerala State Harvest Festival', true, true, 6),

  ('Hornbill Festival', 'hornbill-festival',
   '10-day summit of Naga tribal culture — warrior dances, morungs, and traditional singing.',
   'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&q=80&w=800',
   'Nagaland', 'December', '1–10 December', 'India''s Most Culturally Rich Festival', true, false, 7),

  ('Pongal', 'pongal',
   'Tamil harvest festival celebrating the sun, cattle, and gratitude — a 4-day celebration.',
   'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800',
   'Tamil Nadu', 'January', 'January 14–17', 'Tamil Nadu Harvest Festival', true, false, 8)

ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  month = EXCLUDED.month;


-- ─────────────────────────────────────────────────────────────────────
-- 4. TRAVEL ROUTES
-- ─────────────────────────────────────────────────────────────────────
INSERT INTO public.travel_routes (name, slug, description, image_url, duration, difficulty, highlights, active, featured, sort_order)
VALUES
  ('Golden Triangle', 'golden-triangle',
   'India''s most iconic circuit — Delhi''s Mughal grandeur, Agra''s Taj Mahal, and Jaipur''s royal forts.',
   'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800',
   '5–7 days', 'Easy',
   ARRAY['Taj Mahal at sunrise', 'Amber Fort elephant ride', 'Delhi street food tour', 'Fatehpur Sikri UNESCO site'],
   true, true, 0),

  ('Rajasthan Royal Circuit', 'rajasthan-royal-circuit',
   'The grand Rajasthani loop traversing palaces, forts, and desert dunes.',
   'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80&w=800',
   '10–12 days', 'Easy',
   ARRAY['Jaipur palace forts', 'Jodhpur blue city', 'Jaisalmer camel safari', 'Udaipur lake palace'],
   true, true, 1),

  ('Kerala Backwaters', 'kerala-backwaters',
   'A serene journey through God''s Own Country — from misty hills to backwater canals.',
   'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800',
   '8–10 days', 'Easy',
   ARRAY['Alleppey houseboat stay', 'Munnar tea estates', 'Periyar wildlife sanctuary', 'Kovalam beach'],
   true, true, 2),

  ('Himalayan Road Trip', 'himalayan-road-trip',
   'An elite mountain drive through some of the highest motorable roads in the world.',
   'https://images.unsplash.com/photo-1540611025311-01df3cef54b5?auto=format&fit=crop&q=80&w=800',
   '12–15 days', 'Challenging',
   ARRAY['Rohtang Pass', 'Spiti Valley cold desert', 'Key Monastery', 'Kinnaur Valley orchards'],
   true, true, 3),

  ('Northeast Explorer', 'northeast-explorer',
   'Discover India''s most hidden green treasure — offbeat landscapes and tribal culture.',
   'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&q=80&w=800',
   '7–10 days', 'Moderate',
   ARRAY['Shillong city', 'Cherrapunji waterfalls', 'Kaziranga rhino safari', 'Living root bridges'],
   true, false, 4),

  ('Char Dham Yatra', 'char-dham-yatra',
   'The most sacred pilgrimage in Hindu culture — four divine shrines in the Himalayas.',
   'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=800',
   '10–14 days', 'Challenging',
   ARRAY['Kedarnath shrine', 'Badrinath temple', 'Gangotri glacier origin', 'Yamunotri hot springs'],
   true, true, 5)

ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url;


-- ─────────────────────────────────────────────────────────────────────
-- 5. DISCOVERY VIBES
-- ─────────────────────────────────────────────────────────────────────
DELETE FROM public.discovery_vibes; -- Replace defaults with full set
INSERT INTO public.discovery_vibes (style, label, tagline, description, icon_name, active, sort_order)
VALUES
  ('beach',      'Beach Escape',        'Sun, sand & serenity',         'Goa, Andaman, Lakshadweep — pristine shores await.', 'Waves', true, 0),
  ('adventure',  'Mountain Adventure',  'Above the clouds',             'Ladakh, Spiti Valley, Kashmir — epic Himalayan journeys.', 'Mountain', true, 1),
  ('heritage',   'Heritage & Culture',  'Stories carved in stone',      'Rajasthan, Varanasi, Hampi — timeless India unfolds.', 'Landmark', true, 2),
  ('pilgrimage', 'Pilgrimage Tours',    'Sacred India awaits',          'Kedarnath, Varanasi, Char Dham — devotion & divinity.', 'Star', true, 3),
  ('honeymoon',  'Honeymoon Journeys',  'Romance, reimagined',          'Kashmir, Kerala, Udaipur — where love stories are written.', 'Heart', true, 4),
  ('wildlife',   'Wildlife Safaris',    'Into the wild',                'Ranthambore, Kaziranga, Jim Corbett — India''s big-five adventure.', 'Binoculars', true, 5),
  ('wellness',   'Wellness Retreats',   'Heal, rest, reconnect',        'Rishikesh yoga ashrams, Kerala Ayurveda, Himalayan meditation retreats.', 'Leaf', true, 6),
  ('backpacking','Budget Backpacking',  'Explore more, spend less',     'Himachal, Northeast India, and Goa on a shoestring budget.', 'Backpack', true, 7)
ON CONFLICT (style) DO UPDATE SET
  label = EXCLUDED.label,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description;


-- ─────────────────────────────────────────────────────────────────────
-- 6. DOMESTIC / INTERNATIONAL
-- ─────────────────────────────────────────────────────────────────────
INSERT INTO public.domestic_international (type, title, subtitle, description, cta_text, cta_link, active, sort_order)
VALUES
  ('domestic',      'Explore Incredible India',
   '28+ states, 200+ handpicked destinations',
   'Snowy peaks of Ladakh to the backwaters of Kerala — we cover every corner of India with curated packages for every budget and travel style.',
   'Browse Domestic Tours →', '/packages?type=domestic', true, 0),

  ('international', 'Beyond the Borders',
   'Nepal, Bhutan, Sri Lanka, Maldives & more',
   'Short international getaways to neighbouring destinations — expertly managed from booking to hotel to transfers.',
   'Browse International Tours →', '/packages?type=international', true, 1)
ON CONFLICT (type) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description;


-- ─────────────────────────────────────────────────────────────────────
-- 7. WHY CHOOSE US
-- ─────────────────────────────────────────────────────────────────────
DELETE FROM public.why_choose_us;
INSERT INTO public.why_choose_us (icon_name, title, description, active, sort_order)
VALUES
  ('Compass',  'Destination Experts Across India',    'Deep local knowledge of every route, coast, and trail — from Ladakh high passes to Kerala backwaters.', true, 0),
  ('Pencil',   '100% Customised Itineraries',         'No copy-paste packages — every itinerary is built from scratch to match your travel style and budget.', true, 1),
  ('User',     'Expert Trip Advisors',                'Real humans available Mon–Sat 9AM–7PM — call, WhatsApp, or email. No chatbots.', true, 2),
  ('Shield',   'Safety First Always',                 'Verified hotels, vetted guides, local SIM cards, and 24/7 emergency contact for every trip.', true, 3),
  ('Wallet',   'Price Transparency',                  'Complete cost breakdown before you pay. Zero hidden charges. No surprise additions on checkout.', true, 4),
  ('Star',     'Rated 4.9/5 on Google',               '500+ verified reviews from real travellers. Our reputation is our strongest asset.', true, 5)
;

-- ─────────────────────────────────────────────────────────────────────
-- 8. HOW IT WORKS
-- ─────────────────────────────────────────────────────────────────────
DELETE FROM public.how_it_works;
INSERT INTO public.how_it_works (step_number, emoji, title, description, cta_text, show_cta, active)
VALUES
  (1, '💬', 'Tell Us Your Dream',      'Share your destination, travel dates, group size, and budget. The more you tell us, the better we plan.', 'Fill Enquiry Form', true,  true),
  (2, '📋', 'We Build Your Itinerary', 'Our expert planners craft a custom day-by-day itinerary within 2–4 hours. No AI, just real expertise.', NULL,               false, true),
  (3, '✅', 'Review & Confirm',        'Review your plan, request any modifications, and confirm with a small advance. No upfront full payment.', NULL,               false, true),
  (4, '🏔', 'Journey Begins!',         'We handle all logistics — hotel check-ins, transfers, guides, and emergency support throughout your trip.', NULL,              false, true)
;

-- ─────────────────────────────────────────────────────────────────────
-- 9. NEWSLETTER SETTINGS
-- ─────────────────────────────────────────────────────────────────────
DELETE FROM public.newsletter_settings;
INSERT INTO public.newsletter_settings (headline, subheadline, subscriber_count, benefits, active)
VALUES (
  'Get Exclusive Travel Deals & Insider Guides',
  'Join 5,000+ travellers who receive our monthly newsletter with curated destination picks and flash deals.',
  5000,
  ARRAY['No spam, ever', 'Monthly, not daily', 'Free travel guide on signup', 'Early access to limited seats'],
  true
);

-- ─────────────────────────────────────────────────────────────────────
-- 10. TRUST STRIP
-- ─────────────────────────────────────────────────────────────────────
DELETE FROM public.trust_strip;
INSERT INTO public.trust_strip (badge_text, icon_emoji, order_index, active)
VALUES
  ('500+ Happy Travellers',         '🧳', 0, true),
  ('Rated 4.9/5 on Google',         '⭐', 1, true),
  ('100% Customised Itineraries',   '✏️', 2, true),
  ('24/7 Trip Support',             '📞', 3, true),
  ('Zero Hidden Charges',           '💯', 4, true),
  ('Expert Local Guides',           '🏔', 5, true)
;

-- ─────────────────────────────────────────────────────────────────────
-- 11. FAQs
-- ─────────────────────────────────────────────────────────────────────
INSERT INTO public.faqs (question, answer, scope, active, sort_order)
VALUES
  -- General
  ('How do I book a tour with MyQuickTrippers?',
   'Simply fill out our enquiry form or WhatsApp us directly. Our team will send a custom itinerary within 2–4 hours. No booking fee at this stage.',
   'general', true, 0),

  ('Do you offer group discounts?',
   'Yes! Groups of 6 or more get preferential pricing. Contact us directly for group quotes.',
   'general', true, 1),

  ('What is your cancellation policy?',
   'Cancellations 30+ days before travel: 90% refund. 15–30 days: 60% refund. Under 15 days: no refund. We recommend travel insurance.',
   'general', true, 2),

  -- Packages
  ('Is the itinerary customisable after booking?',
   'Absolutely. We can adjust meals, accommodation category, activities, or travel pace at any point before departure.',
   'packages', true, 3),

  ('Are flights included in package prices?',
   'By default our packages are land-only (hotels + transfers + guides). We can add flights on request with accurate pricing.',
   'packages', true, 4),

  -- Destinations
  ('What is the best time to visit Ladakh?',
   'June to September is ideal when all passes are open. Winter (Oct–May) requires special cold-weather planning.',
   'destination', true, 5),

  ('Do I need special permits for restricted areas like Ladakh or Sikkim?',
   'Yes, Inner Line Permits (ILP) are required for certain zones in Ladakh, Arunachal Pradesh, and parts of Sikkim. We handle all permit arrangements.',
   'destination', true, 6),

  -- Booking
  ('How much advance payment is required to confirm a booking?',
   'Typically 20–30% advance to confirm. The remaining balance is due 7 days before departure.',
   'booking', true, 7),

  ('Can I pay in instalments?',
   'Yes, we offer flexible payment plans for trips over ₹50,000. Discuss with your trip advisor during planning.',
   'booking', true, 8),

  -- Contact
  ('How quickly will I get a response to my enquiry?',
   'Within 2–4 hours during business hours (Mon–Sat, 9AM–7PM IST). Urgent queries via WhatsApp get priority.',
   'general', true, 9)

ON CONFLICT DO NOTHING;

-- ═══════════════════════════════════════════════════════════════════════
-- DONE ✅ All 11 sections seeded successfully.
-- ═══════════════════════════════════════════════════════════════════════
