import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { createClient } from '@supabase/supabase-js';

// Configuration
const BUCKET_NAME = 'public-assets';
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_KEY;

// ─── VERIFIED IMAGE MATRIX ─────────────────────────────────────────────────
// All URLs tested. Format: state/city slug → full Unsplash URL
// Cities are stored as: cities/{state-slug}/{city-slug}/

const imageMatrix = {
  // ─── ALL 28 STATES + 8 UTs ───────────────────────────────────────────────
  states: {
    'andhra-pradesh':    'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&q=80',
    'arunachal-pradesh': 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&q=80',
    'assam':             'https://images.unsplash.com/photo-1601628828688-632f38a5a7d0?w=1200&q=80',
    'bihar':             'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&q=80',
    'chhattisgarh':      'https://images.unsplash.com/photo-1597245309671-2b026e9e5a93?w=1200&q=80',
    'goa':               'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80',
    'gujarat':           'https://images.unsplash.com/photo-1609920658906-8223bd289001?w=1200&q=80',
    'haryana':           'https://images.unsplash.com/photo-1575296827059-ac29c4f5dd8b?w=1200&q=80',
    'himachal-pradesh':  'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=80',
    'jharkhand':         'https://images.unsplash.com/photo-1597245309671-2b026e9e5a93?w=1200&q=80',
    'karnataka':         'https://images.unsplash.com/photo-1600100397608-4657e9b4f03d?w=1200&q=80',
    'kerala':            'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80',
    'madhya-pradesh':    'https://images.unsplash.com/photo-1590123715937-5bdbeda57b01?w=1200&q=80',
    'maharashtra':       'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=1200&q=80',
    'manipur':           'https://images.unsplash.com/photo-1618389023889-d51a38f2edd2?w=1200&q=80',
    'meghalaya':         'https://images.unsplash.com/photo-1630938478088-f50a9a7bd7d5?w=1200&q=80',
    'mizoram':           'https://images.unsplash.com/photo-1613861614193-1c1dee53c90e?w=1200&q=80',
    'nagaland':          'https://images.unsplash.com/photo-1601268173584-77ee8d4e3fa7?w=1200&q=80',
    'odisha':            'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&q=80',
    'punjab':            'https://images.unsplash.com/photo-1575296827059-ac29c4f5dd8b?w=1200&q=80',
    'rajasthan':         'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200&q=80',
    'sikkim':            'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80',
    'tamil-nadu':        'https://images.unsplash.com/photo-1582972236019-ea4af5ffe587?w=1200&q=80',
    'telangana':         'https://images.unsplash.com/photo-1609766418204-e4e2af49769a?w=1200&q=80',
    'tripura':           'https://images.unsplash.com/photo-1618389023889-d51a38f2edd2?w=1200&q=80',
    'uttar-pradesh':     'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&q=80',
    'uttarakhand':       'https://images.unsplash.com/photo-1606298855672-3efb63017be8?w=1200&q=80',
    'west-bengal':       'https://images.unsplash.com/photo-1558431382-27e303142255?w=1200&q=80',
    // Union Territories
    'andaman-and-nicobar-islands': 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=1200&q=80',
    'andaman-nicobar':   'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=1200&q=80',
    'chandigarh':        'https://images.unsplash.com/photo-1575296827059-ac29c4f5dd8b?w=1200&q=80',
    'dadra-nagar-haveli':'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80',
    'delhi':             'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&q=80',
    'jammu-and-kashmir': 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=1200&q=80',
    'jammu-kashmir':     'https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=1200&q=80',
    'ladakh':            'https://images.unsplash.com/photo-1609766418204-e4e2af49769a?w=1200&q=80',
    'lakshadweep':       'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=1200&q=80',
    'puducherry':        'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&q=80',
  },

  // ─── CITIES: stored as {state-slug}/{city-slug} ──────────────────────────
  cities: {
    // Uttarakhand
    'uttarakhand/kedarnath':        'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=1200&q=80',
    'uttarakhand/rishikesh':        'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=1200&q=80',
    'uttarakhand/haridwar':         'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=1200&q=80',
    'uttarakhand/mussoorie':        'https://images.unsplash.com/photo-1606298855672-3efb63017be8?w=1200&q=80',
    'uttarakhand/nainital':         'https://images.unsplash.com/photo-1606298855672-3efb63017be8?w=1200&q=80',
    'uttarakhand/auli':             'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=80',
    'uttarakhand/valley-of-flowers':'https://images.unsplash.com/photo-1606298855672-3efb63017be8?w=1200&q=80',
    'uttarakhand/char-dham':        'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=1200&q=80',
    'uttarakhand/jim-corbett':      'https://images.unsplash.com/photo-1545249390-b2b2bdb76d44?w=1200&q=80',
    // Himachal Pradesh
    'himachal-pradesh/manali':      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=80',
    'himachal-pradesh/shimla':      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=80',
    'himachal-pradesh/dharamshala': 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=80',
    'himachal-pradesh/kasol':       'https://images.unsplash.com/photo-1606298855672-3efb63017be8?w=1200&q=80',
    'himachal-pradesh/spiti-valley':'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=80',
    'himachal-pradesh/dalhousie':   'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=80',
    'himachal-pradesh/bir-billing': 'https://images.unsplash.com/photo-1606298855672-3efb63017be8?w=1200&q=80',
    // Jammu & Kashmir / Ladakh
    'jammu-and-kashmir/srinagar':   'https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=1200&q=80',
    'jammu-and-kashmir/gulmarg':    'https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=1200&q=80',
    'jammu-and-kashmir/pahalgam':   'https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=1200&q=80',
    'jammu-and-kashmir/sonamarg':   'https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=1200&q=80',
    'jammu-and-kashmir/kashmir':    'https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=1200&q=80',
    'jammu-kashmir/kashmir':        'https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=1200&q=80',
    'jammu-kashmir/srinagar':       'https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=1200&q=80',
    'ladakh/leh':                   'https://images.unsplash.com/photo-1609766418204-e4e2af49769a?w=1200&q=80',
    'ladakh/ladakh':                'https://images.unsplash.com/photo-1609766418204-e4e2af49769a?w=1200&q=80',
    'ladakh/nubra-valley':          'https://images.unsplash.com/photo-1609766418204-e4e2af49769a?w=1200&q=80',
    'ladakh/pangong-lake':          'https://images.unsplash.com/photo-1609766418204-e4e2af49769a?w=1200&q=80',
    // Rajasthan
    'rajasthan/jaipur':             'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200&q=80',
    'rajasthan/udaipur':            'https://images.unsplash.com/photo-1617958258591-55a8d3e93f1d?w=1200&q=80',
    'rajasthan/jodhpur':            'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=1200&q=80',
    'rajasthan/jaisalmer':          'https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=80',
    'rajasthan/pushkar':            'https://images.unsplash.com/photo-1597131628171-1452f74e6be6?w=1200&q=80',
    'rajasthan/ranthambore':        'https://images.unsplash.com/photo-1545249390-b2b2bdb76d44?w=1200&q=80',
    'rajasthan/mount-abu':          'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200&q=80',
    // Kerala
    'kerala/munnar':                'https://images.unsplash.com/photo-1601468388530-f97a08af12c3?w=1200&q=80',
    'kerala/alleppey':              'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&q=80',
    'kerala/wayanad':               'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80',
    'kerala/thekkady':              'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80',
    'kerala/kovalam':               'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80',
    'kerala/kochi':                 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&q=80',
    'kerala/varkala':               'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80',
    // Goa
    'goa/north-goa':               'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80',
    'goa/south-goa':               'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80',
    'goa/goa':                     'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80',
    // Karnataka
    'karnataka/coorg':             'https://images.unsplash.com/photo-1600100397608-4657e9b4f03d?w=1200&q=80',
    'karnataka/hampi':             'https://images.unsplash.com/photo-1590123715937-5bdbeda57b01?w=1200&q=80',
    'karnataka/chikmagalur':       'https://images.unsplash.com/photo-1600100397608-4657e9b4f03d?w=1200&q=80',
    'karnataka/gokarna':           'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80',
    'karnataka/mysore':            'https://images.unsplash.com/photo-1600100397608-4657e9b4f03d?w=1200&q=80',
    'karnataka/kabini':            'https://images.unsplash.com/photo-1545249390-b2b2bdb76d44?w=1200&q=80',
    // Tamil Nadu
    'tamil-nadu/ooty':             'https://images.unsplash.com/photo-1582972236019-ea4af5ffe587?w=1200&q=80',
    'tamil-nadu/kodaikanal':       'https://images.unsplash.com/photo-1582972236019-ea4af5ffe587?w=1200&q=80',
    'tamil-nadu/madurai':          'https://images.unsplash.com/photo-1582972236019-ea4af5ffe587?w=1200&q=80',
    'tamil-nadu/rameswaram':       'https://images.unsplash.com/photo-1582972236019-ea4af5ffe587?w=1200&q=80',
    'tamil-nadu/kanyakumari':      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80',
    'tamil-nadu/mahabalipuram':    'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&q=80',
    // Uttar Pradesh
    'uttar-pradesh/varanasi':      'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&q=80',
    'uttar-pradesh/agra':          'https://images.unsplash.com/photo-1564507592228-00569727dc02?w=1200&q=80',
    'uttar-pradesh/ayodhya':       'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&q=80',
    'uttar-pradesh/mathura':       'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&q=80',
    'uttar-pradesh/vrindavan':     'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&q=80',
    'uttar-pradesh/prayagraj':     'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&q=80',
    // Madhya Pradesh
    'madhya-pradesh/khajuraho':    'https://images.unsplash.com/photo-1590123715937-5bdbeda57b01?w=1200&q=80',
    'madhya-pradesh/orchha':       'https://images.unsplash.com/photo-1590123715937-5bdbeda57b01?w=1200&q=80',
    'madhya-pradesh/kanha':        'https://images.unsplash.com/photo-1545249390-b2b2bdb76d44?w=1200&q=80',
    'madhya-pradesh/bandhavgarh':  'https://images.unsplash.com/photo-1545249390-b2b2bdb76d44?w=1200&q=80',
    'madhya-pradesh/pachmarhi':    'https://images.unsplash.com/photo-1600100397608-4657e9b4f03d?w=1200&q=80',
    // Maharashtra
    'maharashtra/lonavala':        'https://images.unsplash.com/photo-1600100397608-4657e9b4f03d?w=1200&q=80',
    'maharashtra/mahabaleshwar':   'https://images.unsplash.com/photo-1600100397608-4657e9b4f03d?w=1200&q=80',
    'maharashtra/ajanta':          'https://images.unsplash.com/photo-1590123715937-5bdbeda57b01?w=1200&q=80',
    'maharashtra/ellora':          'https://images.unsplash.com/photo-1590123715937-5bdbeda57b01?w=1200&q=80',
    'maharashtra/shirdi':          'https://images.unsplash.com/photo-1582972236019-ea4af5ffe587?w=1200&q=80',
    // Andaman
    'andaman-and-nicobar-islands/havelock-island': 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=1200&q=80',
    'andaman-and-nicobar-islands/neil-island':     'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=1200&q=80',
    'andaman-and-nicobar-islands/port-blair':      'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=1200&q=80',
    'andaman-nicobar/havelock-island':             'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=1200&q=80',
    'andaman-nicobar/port-blair':                  'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=1200&q=80',
    // West Bengal / Northeast
    'west-bengal/darjeeling':      'https://images.unsplash.com/photo-1558431382-27e303142255?w=1200&q=80',
    'west-bengal/kolkata':         'https://images.unsplash.com/photo-1558431382-27e303142255?w=1200&q=80',
    'sikkim/gangtok':              'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80',
    'meghalaya/shillong':          'https://images.unsplash.com/photo-1630938478088-f50a9a7bd7d5?w=1200&q=80',
    'meghalaya/cherrapunji':       'https://images.unsplash.com/photo-1630938478088-f50a9a7bd7d5?w=1200&q=80',
    'assam/kaziranga':             'https://images.unsplash.com/photo-1601628828688-632f38a5a7d0?w=1200&q=80',
    'arunachal-pradesh/tawang':    'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&q=80',
    // Telangana / AP / Puducherry
    'telangana/hyderabad':         'https://images.unsplash.com/photo-1609766418204-e4e2af49769a?w=1200&q=80',
    'andhra-pradesh/tirupati':     'https://images.unsplash.com/photo-1582972236019-ea4af5ffe587?w=1200&q=80',
    'andhra-pradesh/araku-valley': 'https://images.unsplash.com/photo-1600100397608-4657e9b4f03d?w=1200&q=80',
    'puducherry/puducherry':       'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&q=80',
    'puducherry/auroville':        'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&q=80',
    // Bihar / Odisha
    'bihar/bodh-gaya':             'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&q=80',
    'odisha/puri':                 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&q=80',
    'odisha/konark':               'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&q=80',
  },

  // ─── PACKAGES ─────────────────────────────────────────────────────────────
  packages: {
    'kedarnath-yatra-5-nights-6-days':       'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=1200&q=80',
    'kedarnath-helicopter-2-nights-3-days':  'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=1200&q=80',
    'char-dham-yatra-10-nights-11-days':     'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=1200&q=80',
    'ladakh-adventure-7-nights-8-days':      'https://images.unsplash.com/photo-1609766418204-e4e2af49769a?w=1200&q=80',
    'ladakh-luxury-8-nights-9-days':         'https://images.unsplash.com/photo-1609766418204-e4e2af49769a?w=1200&q=80',
    'himalayan-grand-circuit-12-nights':     'https://images.unsplash.com/photo-1609766418204-e4e2af49769a?w=1200&q=80',
    'kashmir-honeymoon-5-nights-6-days':     'https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=1200&q=80',
    'kashmir-family-7-nights-8-days':        'https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=1200&q=80',
    'kashmir-solo-4-nights-5-days':          'https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=1200&q=80',
    'valley-of-flowers-trek-6-nights-7-days':'https://images.unsplash.com/photo-1606298855672-3efb63017be8?w=1200&q=80',
    'manali-family-4-nights-5-days':         'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=80',
    'manali-winter-snow-4-nights-5-days':    'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=80',
    'rishikesh-adventure-2-nights-3-days':   'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=1200&q=80',
    'varanasi-spiritual-3-nights-4-days':    'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&q=80',
    'varanasi-prayagraj-4-nights-5-days':    'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&q=80',
    // New packages
    'royal-rajasthan-family-escape':         'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200&q=80',
    'kerala-backwaters-romance':             'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&q=80',
    'ladakh-motorbike-expedition':           'https://images.unsplash.com/photo-1609766418204-e4e2af49769a?w=1200&q=80',
    'udaipur-palace-experience':            'https://images.unsplash.com/photo-1617958258591-55a8d3e93f1d?w=1200&q=80',
    'char-dham-yatra':                       'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=1200&q=80',
    'andaman-coral-retreat':                 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=1200&q=80',
    'golden-triangle-classic':              'https://images.unsplash.com/photo-1564507592228-00569727dc02?w=1200&q=80',
    'tiger-safari-expedition':              'https://images.unsplash.com/photo-1545249390-b2b2bdb76d44?w=1200&q=80',
    'kerala-family-escape':                 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80',
    'goa-family-beach-break':               'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80',
    'andaman-family-adventure':             'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=1200&q=80',
    'ooty-coorg-family-journey':            'https://images.unsplash.com/photo-1600100397608-4657e9b4f03d?w=1200&q=80',
    'goa-romantic-escape':                  'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80',
    'coorg-coffee-romance':                 'https://images.unsplash.com/photo-1600100397608-4657e9b4f03d?w=1200&q=80',
    'darjeeling-tea-romance':              'https://images.unsplash.com/photo-1558431382-27e303142255?w=1200&q=80',
    'udaipur-couple-retreat':               'https://images.unsplash.com/photo-1617958258591-55a8d3e93f1d?w=1200&q=80',
    'andaman-honeymoon-journey':            'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=1200&q=80',
    'goa-beach-escape':                     'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80',
    'kovalam-coastal-holiday':              'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80',
    'gokarna-beach-break':                  'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80',
    'rajasthan-heritage-trail':             'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200&q=80',
    'hampi-heritage-trail':                 'https://images.unsplash.com/photo-1590123715937-5bdbeda57b01?w=1200&q=80',
    'jim-corbett-safari':                   'https://images.unsplash.com/photo-1545249390-b2b2bdb76d44?w=1200&q=80',
    'ranthambore-wildlife-tour':            'https://images.unsplash.com/photo-1545249390-b2b2bdb76d44?w=1200&q=80',
    'kaziranga-nature-escape':              'https://images.unsplash.com/photo-1601628828688-632f38a5a7d0?w=1200&q=80',
    'kanha-wildlife-retreat':               'https://images.unsplash.com/photo-1545249390-b2b2bdb76d44?w=1200&q=80',
    'kabini-jungle-escape':                 'https://images.unsplash.com/photo-1545249390-b2b2bdb76d44?w=1200&q=80',
    'kerala-luxury-escape':                 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80',
    'rajasthan-palace-retreat':             'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200&q=80',
    'tirupati-darshan-trip':                'https://images.unsplash.com/photo-1582972236019-ea4af5ffe587?w=1200&q=80',
    'ayodhya-pilgrimage':                   'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&q=80',
    'mathura-vrindavan-yatra':              'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&q=80',
    'rameswaram-temple-trail':              'https://images.unsplash.com/photo-1582972236019-ea4af5ffe587?w=1200&q=80',
    'spiti-valley-escape':                  'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=80',
    'bir-billing-adventure':                'https://images.unsplash.com/photo-1606298855672-3efb63017be8?w=1200&q=80',
    'auli-snow-escape':                     'https://images.unsplash.com/photo-1606298855672-3efb63017be8?w=1200&q=80',
    'pondicherry-weekend-escape':           'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&q=80',
    'mussoorie-weekend-retreat':            'https://images.unsplash.com/photo-1606298855672-3efb63017be8?w=1200&q=80',
    'lonavala-quick-break':                 'https://images.unsplash.com/photo-1600100397608-4657e9b4f03d?w=1200&q=80',
    'kasol-weekend-escape':                 'https://images.unsplash.com/photo-1606298855672-3efb63017be8?w=1200&q=80',
  },

  // ─── CATEGORIES ───────────────────────────────────────────────────────────
  categories: {
    'spiritual':            'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&q=80',
    'pilgrimage-tours':     'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=1200&q=80',
    'honeymoon':            'https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=1200&q=80',
    'honeymoon-journeys':   'https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=1200&q=80',
    'adventure':            'https://images.unsplash.com/photo-1609766418204-e4e2af49769a?w=1200&q=80',
    'adventure-tours':      'https://images.unsplash.com/photo-1609766418204-e4e2af49769a?w=1200&q=80',
    'family':               'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80',
    'family-holidays':      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80',
    'heritage':             'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200&q=80',
    'heritage-trails':      'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200&q=80',
    'nature':               'https://images.unsplash.com/photo-1600100397608-4657e9b4f03d?w=1200&q=80',
    'wildlife-retreats':    'https://images.unsplash.com/photo-1545249390-b2b2bdb76d44?w=1200&q=80',
    'beach':                'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80',
    'beach-escapes':        'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80',
    'luxury':               'https://images.unsplash.com/photo-1617958258591-55a8d3e93f1d?w=1200&q=80',
    'luxury-getaways':      'https://images.unsplash.com/photo-1617958258591-55a8d3e93f1d?w=1200&q=80',
    'weekend-escapes':      'https://images.unsplash.com/photo-1606298855672-3efb63017be8?w=1200&q=80',
  },
};

/** Downloads image as a buffer — follows redirects */
function downloadImage(url: string, maxRedirects = 5): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith('https');
    const requester = isHttps ? https : http;
    const request = requester.get(url, { headers: { 'User-Agent': 'MQT-Asset-Pipeline/2.0' } }, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && maxRedirects > 0) {
        const redirectUrl = res.headers.location.startsWith('http') ? res.headers.location : new URL(res.headers.location, url).href;
        return downloadImage(redirectUrl, maxRedirects - 1).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        reject(new Error(`Failed: HTTP ${res.statusCode} for ${url}`));
        return;
      }
      const data: Buffer[] = [];
      res.on('data', (chunk) => data.push(chunk));
      res.on('end', () => resolve(Buffer.concat(data)));
    });
    request.on('error', reject);
    request.setTimeout(15000, () => { request.destroy(); reject(new Error(`Timeout: ${url}`)); });
  });
}

async function run() {
  console.log('🚀 Starting MQT Visual Asset Pipeline v2.0...');
  const rootLocalDir = path.resolve(process.cwd(), 'src/assets/images');
  if (!fs.existsSync(rootLocalDir)) fs.mkdirSync(rootLocalDir, { recursive: true });

  let supabase: any = null;
  if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
    console.log('✅ Supabase credentials found — will upload to Storage.');
    supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  } else {
    console.log('⚠️  No SUPABASE_SERVICE_KEY — local fallback mode only.');
  }

  let successCount = 0;
  let failCount = 0;

  for (const [entityType, mappings] of Object.entries(imageMatrix)) {
    for (const [slugKey, url] of Object.entries(mappings)) {
      const label = `${entityType}/${slugKey}`;
      try {
        const buffer = await downloadImage(url);

        // Determine local paths
        let basePath: string;
        if (entityType === 'cities') {
          // slugKey already contains state/city e.g. 'uttarakhand/kedarnath'
          basePath = `cities/${slugKey}`;
        } else if (entityType === 'packages') {
          basePath = `packages/${slugKey}`;
        } else if (entityType === 'categories') {
          basePath = `categories/${slugKey}`;
        } else {
          basePath = `states/${slugKey}`;
        }

        const variants = ['hero', 'card', 'thumbnail'];
        for (const variant of variants) {
          const filePath = path.join(rootLocalDir, ...`${basePath}/${variant}.webp`.split('/'));
          const dir = path.dirname(filePath);
          if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
          fs.writeFileSync(filePath, buffer);
        }

        // Gallery variants for cities
        if (entityType === 'cities') {
          for (let i = 1; i <= 3; i++) {
            const galleryPath = path.join(rootLocalDir, ...`${basePath}/gallery-${i}.webp`.split('/'));
            fs.writeFileSync(galleryPath, buffer);
          }
        }

        console.log(`  ✅ ${label} (${buffer.length} bytes)`);
        successCount++;

        // Supabase upload (hero only to save bandwidth)
        if (supabase) {
          const storagePath = `${basePath}/hero.webp`;
          const { error } = await supabase.storage.from(BUCKET_NAME).upload(storagePath, buffer, {
            cacheControl: '86400', upsert: true, contentType: 'image/jpeg',
          });
          if (error) console.warn(`  ⚠️  Supabase: ${error.message}`);
        }
      } catch (err: any) {
        console.error(`  ❌ ${label}: ${err.message}`);
        failCount++;
      }
    }
  }

  console.log(`\n✅ Pipeline Complete! ${successCount} succeeded, ${failCount} failed.`);
  console.log('   Restart your dev server to pick up new local asset registrations.');
}

run().catch(console.error);
