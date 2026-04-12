/**
 * MQT Destination → State Slug Mapping
 * Used by the hybrid image resolver to find city-level images.
 * To add a new destination: add its slug → stateSlug pair here.
 */
export const DEST_STATE_MAP: Record<string, string> = {
  // ── Uttarakhand ──────────────────────────────────────────────────────────
  'kedarnath':        'uttarakhand',
  'badrinath':        'uttarakhand',
  'rishikesh':        'uttarakhand',
  'haridwar':         'uttarakhand',
  'mussoorie':        'uttarakhand',
  'nainital':         'uttarakhand',
  'auli':             'uttarakhand',
  'chopta':           'uttarakhand',
  'valley-of-flowers':'uttarakhand',
  'char-dham':        'uttarakhand',
  'jim-corbett':      'uttarakhand',
  'dehradun':         'uttarakhand',
  'lansdowne':        'uttarakhand',
  'chakrata':         'uttarakhand',
  'munsiyari':        'uttarakhand',
  'ranikhet':         'uttarakhand',

  // ── Himachal Pradesh ─────────────────────────────────────────────────────
  'manali':           'himachal-pradesh',
  'shimla':           'himachal-pradesh',
  'dharamshala':      'himachal-pradesh',
  'kasol':            'himachal-pradesh',
  'spiti-valley':     'himachal-pradesh',
  'dalhousie':        'himachal-pradesh',
  'bir-billing':      'himachal-pradesh',
  'kasauli':          'himachal-pradesh',
  'khajjiar':         'himachal-pradesh',
  'chail':            'himachal-pradesh',
  'kufri':            'himachal-pradesh',
  'solang-valley':    'himachal-pradesh',
  'rohtang-pass':     'himachal-pradesh',
  'mcleod-ganj':      'himachal-pradesh',

  // ── Jammu & Kashmir ──────────────────────────────────────────────────────
  'kashmir':          'jammu-kashmir',
  'srinagar':         'jammu-kashmir',
  'gulmarg':          'jammu-kashmir',
  'pahalgam':         'jammu-kashmir',
  'sonamarg':         'jammu-kashmir',
  'patnitop':         'jammu-kashmir',
  'vaishno-devi':     'jammu-kashmir',
  'gurez-valley':     'jammu-kashmir',

  // ── Ladakh ───────────────────────────────────────────────────────────────
  'leh':              'ladakh',
  'ladakh':           'ladakh',
  'nubra-valley':     'ladakh',
  'pangong-lake':     'ladakh',
  'tso-moriri':       'ladakh',
  'khardung-la':      'ladakh',
  'magnetic-hill':    'ladakh',
  'zanskar-valley':   'ladakh',

  // ── Punjab / Haryana / Delhi / Chandigarh ────────────────────────────────
  'amritsar':         'punjab',
  'chandigarh':       'chandigarh',
  'new-delhi':        'delhi',
  'old-delhi':        'delhi',
  'delhi':            'delhi',
  'kurukshetra':      'haryana',

  // ── Rajasthan ────────────────────────────────────────────────────────────
  'jaipur':           'rajasthan',
  'udaipur':          'rajasthan',
  'jodhpur':          'rajasthan',
  'jaisalmer':        'rajasthan',
  'pushkar':          'rajasthan',
  'ranthambore':      'rajasthan',
  'mount-abu':        'rajasthan',
  'bikaner':          'rajasthan',
  'chittorgarh':      'rajasthan',
  'bundi':            'rajasthan',
  'thar-desert':      'rajasthan',
  'sam-sand-dunes':   'rajasthan',

  // ── Gujarat ──────────────────────────────────────────────────────────────
  'ahmedabad':        'gujarat',
  'rann-of-kutch':    'gujarat',
  'dwarka':           'gujarat',
  'somnath':          'gujarat',
  'gir-national-park':'gujarat',
  'statue-of-unity':  'gujarat',

  // ── Maharashtra ──────────────────────────────────────────────────────────
  'lonavala':         'maharashtra',
  'mahabaleshwar':    'maharashtra',
  'ajanta':           'maharashtra',
  'ellora':           'maharashtra',
  'shirdi':           'maharashtra',
  'nashik':           'maharashtra',
  'pune':             'maharashtra',
  'mumbai':           'maharashtra',
  'alibaug':          'maharashtra',
  'matheran':         'maharashtra',

  // ── Goa ──────────────────────────────────────────────────────────────────
  'north-goa':        'goa',
  'south-goa':        'goa',
  'goa':              'goa',
  'panjim':           'goa',
  'palolem':          'goa',
  'anjuna':           'goa',
  'baga':             'goa',
  'calangute':        'goa',

  // ── Kerala ───────────────────────────────────────────────────────────────
  'munnar':           'kerala',
  'alleppey':         'kerala',
  'wayanad':          'kerala',
  'thekkady':         'kerala',
  'kovalam':          'kerala',
  'kochi':            'kerala',
  'varkala':          'kerala',
  'kumarakom':        'kerala',
  'vagamon':          'kerala',
  'athirapilly':      'kerala',

  // ── Tamil Nadu ───────────────────────────────────────────────────────────
  'ooty':             'tamil-nadu',
  'kodaikanal':       'tamil-nadu',
  'madurai':          'tamil-nadu',
  'rameswaram':       'tamil-nadu',
  'kanyakumari':      'tamil-nadu',
  'mahabalipuram':    'tamil-nadu',
  'thanjavur':        'tamil-nadu',
  'chennai':          'tamil-nadu',
  'yercaud':          'tamil-nadu',
  'yelagiri':         'tamil-nadu',

  // ── Karnataka ────────────────────────────────────────────────────────────
  'coorg':            'karnataka',
  'hampi':            'karnataka',
  'chikmagalur':      'karnataka',
  'gokarna':          'karnataka',
  'mysore':           'karnataka',
  'kabini':           'karnataka',
  'bengaluru':        'karnataka',
  'dandeli':          'karnataka',
  'jog-falls':        'karnataka',
  'badami':           'karnataka',

  // ── Andhra Pradesh ───────────────────────────────────────────────────────
  'tirupati':         'andhra-pradesh',
  'araku-valley':     'andhra-pradesh',
  'visakhapatnam':    'andhra-pradesh',
  'borra-caves':      'andhra-pradesh',
  'vijayawada':       'andhra-pradesh',

  // ── Telangana ────────────────────────────────────────────────────────────
  'hyderabad':        'telangana',
  'warangal':         'telangana',

  // ── Uttar Pradesh ────────────────────────────────────────────────────────
  'varanasi':         'uttar-pradesh',
  'agra':             'uttar-pradesh',
  'ayodhya':          'uttar-pradesh',
  'mathura':          'uttar-pradesh',
  'vrindavan':        'uttar-pradesh',
  'prayagraj':        'uttar-pradesh',
  'lucknow':          'uttar-pradesh',
  'taj-mahal':        'uttar-pradesh',
  'fatehpur-sikri':   'uttar-pradesh',

  // ── Madhya Pradesh ───────────────────────────────────────────────────────
  'khajuraho':        'madhya-pradesh',
  'orchha':           'madhya-pradesh',
  'kanha':            'madhya-pradesh',
  'bandhavgarh':      'madhya-pradesh',
  'pachmarhi':        'madhya-pradesh',
  'ujjain':           'madhya-pradesh',
  'sanchi':           'madhya-pradesh',
  'gwalior':          'madhya-pradesh',

  // ── West Bengal ──────────────────────────────────────────────────────────
  'darjeeling':       'west-bengal',
  'kolkata':          'west-bengal',
  'sundarbans':       'west-bengal',
  'kalimpong':        'west-bengal',
  'digha':            'west-bengal',

  // ── Sikkim ───────────────────────────────────────────────────────────────
  'gangtok':          'sikkim',
  'lachung':          'sikkim',
  'yumthang':         'sikkim',
  'pelling':          'sikkim',
  'gurudongmar-lake': 'sikkim',
  'tsomgo-lake':      'sikkim',

  // ── Assam ────────────────────────────────────────────────────────────────
  'guwahati':         'assam',
  'kaziranga':        'assam',
  'majuli':           'assam',

  // ── Meghalaya ────────────────────────────────────────────────────────────
  'shillong':         'meghalaya',
  'cherrapunji':      'meghalaya',
  'dawki':            'meghalaya',
  'mawlynnong':       'meghalaya',

  // ── Arunachal Pradesh ────────────────────────────────────────────────────
  'tawang':           'arunachal-pradesh',
  'ziro-valley':      'arunachal-pradesh',
  'bomdila':          'arunachal-pradesh',

  // ── Nagaland ─────────────────────────────────────────────────────────────
  'kohima':           'nagaland',

  // ── Manipur ──────────────────────────────────────────────────────────────
  'imphal':           'manipur',
  'loktak-lake':      'manipur',

  // ── Odisha ───────────────────────────────────────────────────────────────
  'bhubaneswar':      'odisha',
  'puri':             'odisha',
  'konark':           'odisha',
  'chilika-lake':     'odisha',

  // ── Bihar ────────────────────────────────────────────────────────────────
  'bodh-gaya':        'bihar',
  'nalanda':          'bihar',
  'patna':            'bihar',
  'rajgir':           'bihar',

  // ── Andaman & Nicobar ────────────────────────────────────────────────────
  'havelock-island':  'andaman-nicobar',
  'neil-island':      'andaman-nicobar',
  'port-blair':       'andaman-nicobar',
  'andaman':          'andaman-nicobar',
  'andaman-and-nicobar-islands': 'andaman-nicobar',
  'radhanagar-beach': 'andaman-nicobar',

  // ── Puducherry ───────────────────────────────────────────────────────────
  'puducherry':       'puducherry',
  'auroville':        'puducherry',
  'white-town':       'puducherry',

  // ── Lakshadweep ──────────────────────────────────────────────────────────
  'agatti':           'lakshadweep',
  'bangaram':         'lakshadweep',
  'kavaratti':        'lakshadweep',
};

/**
 * Looks up the stateSlug for a given destination slug.
 * Falls back to the destSlug itself (treats it as a state slug).
 */
export function getStateSlugForDest(destSlug: string): string {
  return DEST_STATE_MAP[destSlug] ?? destSlug;
}
