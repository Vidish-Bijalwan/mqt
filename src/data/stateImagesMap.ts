/**
 * State Images Map — confirmed working local government tourism image paths
 * Every path verified to exist under public/tourism/
 * Used by StateListing.tsx for hero + gallery fallbacks.
 * 
 * Array order: [hero_image, gallery_1, gallery_2, ..., gallery_N]
 * The FIRST entry is used as the state hero image.
 */

const INC = "/tourism/India_Central/Incredible_India";
const AND = "/tourism/Andaman_Nicobar/Destinations";
const AP  = "/tourism/Andhra_Pradesh/Destinations";
const CHD = "/tourism/Chandigarh/Foreign_Tourists";
const DEL = "/tourism/Delhi/Explore_the_City";
const GUJ = "/tourism/Gujarat/Ahmedabad";
const HAR = "/tourism/Haryana/Destinations";
const MAH = "/tourism/Maharashtra/Overview";
const MAN = "/tourism/Manipur/Exclusive_Destination";
const MP  = "/tourism/Madhya_Pradesh/Revered_Burhanpur";
const ODI = "/tourism/Odisha/Screen_Reader";
const LAK = "/tourism/Lakshadweep/Tourist_Focal_Island";
const TN  = "/tourism/Tamil_Nadu/Destinations";
const TRP = "/tourism/Tripura/Destination";

// Only using EXACT verified paths!
export const stateImagesMap: Record<string, string[]> = {
  "andaman-and-nicobar-islands": [
    `${AND}/037_Andaman_And_Nicobar_Islands_govt.jpg`,
    `${AND}/010_Beaches_govt.jpg`,
    `${AND}/024_Camping_govt.jpg`,
    `${AND}/026_Festivals_of_Andaman_and_Nicobar_Islands_govt.jpg`,
    `${AND}/027_Glass_Bottom_Boat_Ride_govt.jpg`,
    `${AND}/039_Andaman_and_Nicobar_Islands_govt.jpg`,
    `${AND}/023_Game_Fishing_govt.jpeg`,
  ],
  "andhra-pradesh": [
    `${INC}/037_2-sri-venkateswara-swamy-vaari-temple-2-attr-hero_govt.jpg`,
    `${AP}/001_image_govt.png`,
    `${AP}/006_image_govt.png`,
    `${AP}/009_image_govt.png`,
    `${AP}/010_image_govt.png`,
    `${AP}/011_image_govt.png`,
  ],
  "arunachal-pradesh": [
    `${INC}/017_hidimba-temple-manali-himachal-pradesh-1-attr-hero_govt.jpg`,
    `${INC}/025_happy-valley-tea-estate-darjeeling-west_bengal-1-h_govt.jpg`,
    `${INC}/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg`,
    "/tourism/valley_of_flowers.jpg",
  ],
  "assam": [
    `${INC}/025_happy-valley-tea-estate-darjeeling-west_bengal-1-h_govt.jpg`,
    `${INC}/035_vitthala-temple-complex-hampi-karnataka-city-hero_govt.jpg`,
    `${INC}/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg`,
    "/tourism/valley_of_flowers.jpg",
  ],
  "bihar": [
    `${INC}/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg`,
    `${INC}/037_2-sri-venkateswara-swamy-vaari-temple-2-attr-hero_govt.jpg`,
    `${INC}/038_1-rameswaram-temple-rameswaram-tamilnadu-hero_govt.jpg`,
    `${INC}/013_red-fort-delhi1-attr-hero_govt.jpg`,
  ],
  "chandigarh": [
    `${CHD}/001_image_govt.png`,
    `${CHD}/006_image_govt.png`,
    `${CHD}/003_image_govt.png`,
    `${CHD}/005_image_govt.png`,
    `${CHD}/002_image_govt.png`,
    `${CHD}/007_image_govt.jpg`,
    `${CHD}/004_image_govt.png`,
  ],
  "chhattisgarh": [
    `${INC}/035_vitthala-temple-complex-hampi-karnataka-city-hero_govt.jpg`,
    `${MP}/005_Asirgarh_Fort_govt.webp`,
    `${MP}/014_Spiritual_Omkareshwar_govt.png`,
    `${INC}/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg`,
    "/tourism/valley_of_flowers.jpg",
  ],
  "dadra-and-nagar-haveli-and-daman-and-diu": [
    `${INC}/027_vagator-beach-goa-city-1-hero_govt.jpg`,
    `${GUJ}/002_Sabarmati_Ashram_govt.jpg`,
    `${INC}/040_Cherai_Beach_Ernakulam_Kochi_Kerala_India_on_a_clo_govt.jpg`,
  ],
  "delhi": [
    `${INC}/013_red-fort-delhi1-attr-hero_govt.jpg`,
    `${DEL}/034_image_govt.jpg`,
    `${DEL}/029_image_govt.jpg`,
    `${DEL}/031_image_govt.jpg`,
    `${DEL}/025_image_govt.jpg`,
    `${DEL}/011_image_govt.jpg`,
    `${DEL}/016_image_govt.jpg`,
  ],
  "goa": [
    `${INC}/027_vagator-beach-goa-city-1-hero_govt.jpg`,
    `${INC}/040_Cherai_Beach_Ernakulam_Kochi_Kerala_India_on_a_clo_govt.jpg`,
    `${INC}/039_auroville-puducherry_govt.jpg`,
    `${AND}/010_Beaches_govt.jpg`,
    `${AND}/027_Glass_Bottom_Boat_Ride_govt.jpg`,
  ],
  "gujarat": [
    `${GUJ}/008_Bai_Harir_ni_Vav_govt.jpg`,
    `${GUJ}/002_Sabarmati_Ashram_govt.jpg`,
    `${GUJ}/006_hutheesing_jain_temple_govt.jpg`,
    `${GUJ}/011_Lothal_govt.jpg`,
    `${GUJ}/004_image_govt.jpg`,
    `${GUJ}/016_image_govt.jpg`,
    `${GUJ}/018_Toran_Hotel_govt.jpg`,
    `${GUJ}/014_image_govt.jpg`,
  ],
  "haryana": [
    `${HAR}/010_Gurgaon_govt.jpg`,
    `${HAR}/018_Nuh_govt.png`,
    `${HAR}/022_Rewari_govt.jpg`,
    `${HAR}/012_Jhajjar_govt.jpg`,
    `${HAR}/006_Ambala_govt.jpg`,
    `${HAR}/015_Karnal_govt.jpg`,
    `${HAR}/013_Jind_govt.jpg`,
    `${HAR}/007_Bhiwani_govt.jpg`,
  ],
  "himachal-pradesh": [
    `${INC}/017_hidimba-temple-manali-himachal-pradesh-1-attr-hero_govt.jpg`,
    `${INC}/015_7-choglamsar-leh-ladakh-city-hero-new_govt.jpg`,
    `${INC}/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg`,
    `${INC}/025_happy-valley-tea-estate-darjeeling-west_bengal-1-h_govt.jpg`,
    "/tourism/valley_of_flowers.jpg",
    `${INC}/016_dal-lake-srinagar-jammu--kashmir-2-attr-hero_govt.jpg`,
  ],
  "jammu-and-kashmir": [
    `${INC}/016_dal-lake-srinagar-jammu--kashmir-2-attr-hero_govt.jpg`,
    `${INC}/017_hidimba-temple-manali-himachal-pradesh-1-attr-hero_govt.jpg`,
    `${INC}/015_7-choglamsar-leh-ladakh-city-hero-new_govt.jpg`,
    `${INC}/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg`,
    `${INC}/025_happy-valley-tea-estate-darjeeling-west_bengal-1-h_govt.jpg`,
  ],
  "jharkhand": [
    `${ODI}/003_Experience_Odisha_govt.webp`,
    `${INC}/023_1-lingaraj-temple-bhubaneshwar-odisha-city-hero_govt.jpg`,
    `${INC}/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg`,
    `${INC}/035_vitthala-temple-complex-hampi-karnataka-city-hero_govt.jpg`,
  ],
  "karnataka": [
    `${INC}/035_vitthala-temple-complex-hampi-karnataka-city-hero_govt.jpg`,
    `${INC}/040_Cherai_Beach_Ernakulam_Kochi_Kerala_India_on_a_clo_govt.jpg`,
    `${INC}/039_auroville-puducherry_govt.jpg`,
    `${INC}/038_1-rameswaram-temple-rameswaram-tamilnadu-hero_govt.jpg`,
    `${MAH}/017_MH-Digital-Standee-Forts-01jpg_govt.jpg`,
    `${INC}/027_vagator-beach-goa-city-1-hero_govt.jpg`,
  ],
  "kerala": [
    `${INC}/040_Cherai_Beach_Ernakulam_Kochi_Kerala_India_on_a_clo_govt.jpg`,
    `${INC}/025_happy-valley-tea-estate-darjeeling-west_bengal-1-h_govt.jpg`,
    `${INC}/039_auroville-puducherry_govt.jpg`,
    `${INC}/027_vagator-beach-goa-city-1-hero_govt.jpg`,
    `${INC}/035_vitthala-temple-complex-hampi-karnataka-city-hero_govt.jpg`,
    `${AND}/010_Beaches_govt.jpg`,
  ],
  "ladakh": [
    `${INC}/015_7-choglamsar-leh-ladakh-city-hero-new_govt.jpg`,
    `${INC}/017_hidimba-temple-manali-himachal-pradesh-1-attr-hero_govt.jpg`,
    `${INC}/016_dal-lake-srinagar-jammu--kashmir-2-attr-hero_govt.jpg`,
    `${INC}/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg`,
    `${INC}/025_happy-valley-tea-estate-darjeeling-west_bengal-1-h_govt.jpg`,
  ],
  "lakshadweep": [
    `${INC}/036_kalpeni-kavaratti-lakshwadeep-3-musthead-hero_govt.jpg`,
    `${LAK}/008_image_govt.jpg`,
    `${LAK}/011_image_govt.jpg`,
    `${LAK}/014_image_govt.jpg`,
    `${LAK}/016_image_govt.jpg`,
  ],
  "madhya-pradesh": [
    `${INC}/031_rajwada-indore-mp-city-hero_govt.jpg`,
    `${MP}/007_Hammam_or_The_Royal_Bath_govt.webp`,
    `${MP}/015_Scenic_Sailani_Island_govt.png`,
    `${MP}/008_Jama_Masjid_govt.webp`,
    `${MP}/005_Asirgarh_Fort_govt.webp`,
    `${MP}/014_Spiritual_Omkareshwar_govt.png`,
    `${MP}/006_Dargah-e-Hakimi_govt.webp`,
    `${MP}/004_Ahukhana_govt.webp`,
    `${MP}/010_Shahi_Qila_govt.webp`,
    `${MP}/013_Tapti_Ghat_govt.webp`,
  ],
  "maharashtra": [
    `${INC}/028_Mumbai_skyline_Bandra_-_Worli_Sea_Link_bridge_with_govt.jpg`,
    `${MAH}/017_MH-Digital-Standee-Forts-01jpg_govt.jpg`,
    `${MAH}/011_indranil-naikjpg_govt.jpg`,
    `${MAH}/016_image_govt.jpg`,
    `${MAH}/037_image_govt.jpg`,
    `${MAH}/003_image_govt.webp`,
    `${MAH}/040_image_govt.jpg`,
    `${MAH}/035_image_govt.jpg`,
  ],
  "manipur": [
    `${MAN}/003_ema_keithel3_govt.jpg`,
    `${MAN}/004_MOREH_BORDER_TRADE_govt.png`,
    `${MAN}/002_MAPAL_KANGJEIBUNG_govt.png`,
  ],
  "meghalaya": [
    `${INC}/025_happy-valley-tea-estate-darjeeling-west_bengal-1-h_govt.jpg`,
    "/tourism/valley_of_flowers.jpg",
    `${INC}/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg`,
    `${INC}/035_vitthala-temple-complex-hampi-karnataka-city-hero_govt.jpg`,
  ],
  "mizoram": [
    `${INC}/025_happy-valley-tea-estate-darjeeling-west_bengal-1-h_govt.jpg`,
    `${INC}/035_vitthala-temple-complex-hampi-karnataka-city-hero_govt.jpg`,
    "/tourism/valley_of_flowers.jpg",
  ],
  "nagaland": [
    `${INC}/025_happy-valley-tea-estate-darjeeling-west_bengal-1-h_govt.jpg`,
    "/tourism/valley_of_flowers.jpg",
    `${MAN}/003_ema_keithel3_govt.jpg`,
  ],
  "odisha": [
    `${INC}/023_1-lingaraj-temple-bhubaneshwar-odisha-city-hero_govt.jpg`,
    `${ODI}/005_Shop_govt.webp`,
    `${ODI}/003_Experience_Odisha_govt.webp`,
    `${ODI}/002_Discover_Odisha_govt.webp`,
    `${ODI}/004_Plan_a_Tour_govt.webp`,
    `/tourism/Odisha/Sambalpur/017_Sambalpuri_Dance_govt.jpg`,
    `/tourism/Odisha/Sambalpur/036_eco_retreat_govt.jpg`,
  ],
  "puducherry": [
    `${INC}/039_auroville-puducherry_govt.jpg`,
    `${INC}/040_Cherai_Beach_Ernakulam_Kochi_Kerala_India_on_a_clo_govt.jpg`,
    `${INC}/038_1-rameswaram-temple-rameswaram-tamilnadu-hero_govt.jpg`,
    `${INC}/027_vagator-beach-goa-city-1-hero_govt.jpg`,
  ],
  "punjab": [
    `${INC}/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg`,
    `${INC}/017_hidimba-temple-manali-himachal-pradesh-1-attr-hero_govt.jpg`,
    `${INC}/013_red-fort-delhi1-attr-hero_govt.jpg`,
    `${HAR}/006_Ambala_govt.jpg`,
    `${HAR}/015_Karnal_govt.jpg`,
  ],
  "rajasthan": [
    `${INC}/020_city-palace-udaipur-rajasthan-2-new-attr-hero_govt.jpg`,
    `${INC}/013_red-fort-delhi1-attr-hero_govt.jpg`,
    `${GUJ}/011_Lothal_govt.jpg`,
    `${MP}/005_Asirgarh_Fort_govt.webp`,
    `${HAR}/022_Rewari_govt.jpg`,
    `${GUJ}/006_hutheesing_jain_temple_govt.jpg`,
  ],
  "sikkim": [
    `${INC}/025_happy-valley-tea-estate-darjeeling-west_bengal-1-h_govt.jpg`,
    `${INC}/015_7-choglamsar-leh-ladakh-city-hero-new_govt.jpg`,
    "/tourism/valley_of_flowers.jpg",
    `${INC}/017_hidimba-temple-manali-himachal-pradesh-1-attr-hero_govt.jpg`,
  ],
  "tamil-nadu": [
    `${INC}/038_1-rameswaram-temple-rameswaram-tamilnadu-hero_govt.jpg`,
    `${TN}/019_Dindigul_Fort_govt.webp`,
    `${TN}/022_Athangudi_Tiles_Enchantingly_Handmade_Karaikudi_govt.webp`,
    `${TN}/029_image_govt.webp`,
    `${TN}/026_Gangaikonda_Cholapuram_govt.webp`,
    `${TN}/017_Coonoor_govt.webp`,
    `${TN}/030_image_govt.webp`,
    `${TN}/018_Dharmapuri_govt.webp`,
    `${TN}/031_image_govt.webp`,
    `${TN}/027_Tenkasi_govt.webp`,
  ],
  "telangana": [
    `${INC}/037_2-sri-venkateswara-swamy-vaari-temple-2-attr-hero_govt.jpg`,
    `${INC}/035_vitthala-temple-complex-hampi-karnataka-city-hero_govt.jpg`,
    `${INC}/038_1-rameswaram-temple-rameswaram-tamilnadu-hero_govt.jpg`,
    `${INC}/031_rajwada-indore-mp-city-hero_govt.jpg`,
  ],
  "tripura": [
    `${TRP}/018_destination_govt.jpg`,
    `${TRP}/003_destination_govt.png`,
    `${TRP}/019_destination_govt.jpg`,
    `${TRP}/026_destination_govt.png`,
    `${TRP}/006_destination_govt.jpg`,
    `${TRP}/034_destination_govt.jpg`,
    `${TRP}/037_image_govt.jpg`,
    `${TRP}/027_destination_govt.png`,
    `${TRP}/014_destination_govt.jpg`,
    `${TRP}/040_image_govt.jpg`,
  ],
  "uttar-pradesh": [
    `${INC}/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg`,
    `${INC}/013_red-fort-delhi1-attr-hero_govt.jpg`,
    `${INC}/037_2-sri-venkateswara-swamy-vaari-temple-2-attr-hero_govt.jpg`,
    `${INC}/038_1-rameswaram-temple-rameswaram-tamilnadu-hero_govt.jpg`,
    `${INC}/023_1-lingaraj-temple-bhubaneshwar-odisha-city-hero_govt.jpg`,
    `${INC}/017_hidimba-temple-manali-himachal-pradesh-1-attr-hero_govt.jpg`,
  ],
  "uttarakhand": [
    `${INC}/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg`,
    `/tourism/valley_of_flowers.jpg`,
    `${INC}/017_hidimba-temple-manali-himachal-pradesh-1-attr-hero_govt.jpg`,
    `${INC}/015_7-choglamsar-leh-ladakh-city-hero-new_govt.jpg`,
    `${INC}/025_happy-valley-tea-estate-darjeeling-west_bengal-1-h_govt.jpg`,
    `${INC}/016_dal-lake-srinagar-jammu--kashmir-2-attr-hero_govt.jpg`,
  ],
  "west-bengal": [
    `${INC}/025_happy-valley-tea-estate-darjeeling-west_bengal-1-h_govt.jpg`,
    `${INC}/023_1-lingaraj-temple-bhubaneshwar-odisha-city-hero_govt.jpg`,
    `${INC}/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg`,
    `${INC}/017_hidimba-temple-manali-himachal-pradesh-1-attr-hero_govt.jpg`,
  ],
};
