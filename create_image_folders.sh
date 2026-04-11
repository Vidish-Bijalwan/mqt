#!/bin/bash

ROOT_DIR="src/assets/images"
STATES_DIR="$ROOT_DIR/states"
CITIES_DIR="$ROOT_DIR/cities"
LOCATIONS_DIR="$ROOT_DIR/popular-locations"

mkdir -p "$ROOT_DIR"
mkdir -p "$ROOT_DIR/packages" "$ROOT_DIR/categories" "$ROOT_DIR/blog" "$ROOT_DIR/testimonials" "$ROOT_DIR/site" "$ROOT_DIR/homepage" "$ROOT_DIR/placeholders"

STATES=(
  "andhra-pradesh" "arunachal-pradesh" "assam" "bihar" "chhattisgarh" "goa" "gujarat" 
  "haryana" "himachal-pradesh" "jharkhand" "karnataka" "kerala" "madhya-pradesh" 
  "maharashtra" "manipur" "meghalaya" "mizoram" "nagaland" "odisha" "punjab" 
  "rajasthan" "sikkim" "tamil-nadu" "telangana" "tripura" "uttar-pradesh" 
  "uttarakhand" "west-bengal" "andaman-and-nicobar-islands" "chandigarh" 
  "dadra-and-nagar-haveli-and-daman-and-diu" "delhi" "jammu-and-kashmir" 
  "ladakh" "lakshadweep" "puducherry"
)

# Setup initial structural cities for a few main ones as an example of nesting as requested
declare -A CITIES
CITIES["uttarakhand"]="rishikesh haridwar"
CITIES["rajasthan"]="jaipur udaipur"
CITIES["kerala"]="munnar kochi"
CITIES["goa"]="panaji"

# Setup initial locations
declare -A LOCATIONS
LOCATIONS["uttarakhand"]="kedarnath valley-of-flowers"
LOCATIONS["ladakh"]="pangong-lake"
LOCATIONS["rajasthan"]="hawa-mahal"
LOCATIONS["uttar-pradesh"]="varanasi-ghats"

for state in "${STATES[@]}"; do
  # Create states directory
  mkdir -p "$STATES_DIR/$state"
  touch "$STATES_DIR/$state/.gitkeep"
  
  # Create nested structural bases
  mkdir -p "$CITIES_DIR/$state"
  mkdir -p "$LOCATIONS_DIR/$state"

  # Populate specific cities
  if [[ -n "${CITIES[$state]}" ]]; then
    for city in ${CITIES[$state]}; do
      mkdir -p "$CITIES_DIR/$state/$city"
      touch "$CITIES_DIR/$state/$city/.gitkeep"
    done
  fi

  # Populate specific locations
  if [[ -n "${LOCATIONS[$state]}" ]]; then
    for loc in ${LOCATIONS[$state]}; do
      mkdir -p "$LOCATIONS_DIR/$state/$loc"
      touch "$LOCATIONS_DIR/$state/$loc/.gitkeep"
    done
  fi
done

echo "Architecture generated successfully."
