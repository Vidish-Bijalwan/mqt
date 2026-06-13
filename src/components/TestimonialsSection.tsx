import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, MapPin, BadgeCheck, Quote } from "lucide-react";
import { allTestimonials } from "@/data/testimonials";
import type { Testimonial } from "@/data/testimonials";

// Map destinations to images
const DEST_IMAGES: Record<string, string> = {
  Kashmir: "/tourism/India_Central/Incredible_India/016_dal-lake-srinagar-jammu--kashmir-2-attr-hero_govt.jpg",
  Kedarnath: "/tourism/India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
  Ladakh: "/tourism/India_Central/Incredible_India/015_7-choglamsar-leh-ladakh-city-hero-new_govt.jpg",
  Varanasi: "/tourism/India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
  Manali: "/tourism/India_Central/Incredible_India/017_hidimba-temple-manali-himachal-pradesh-1-attr-hero_govt.jpg",
  "Char Dham": "/tourism/India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
  "Valley of Flowers": "/tourism/India_Central/Incredible_India/025_happy-valley-tea-estate-darjeeling-west_bengal-1-h_govt.jpg",
};

// Pull out the emotional hook
const getHook = (text: string, maxLen = 160): string => {
  const sentences = text.split(/(?<=[.!?])\s+/);
  let hook = sentences[0];
  if (sentences.length > 1 && (hook.length + sentences[1].length) < maxLen) {
    hook += " " + sentences[1];
  }
  return hook;
};

// ─── Featured Review ──────────────────────────────────────────────────────────
const FeaturedReview = ({ review }: { review: Testimonial }) => {
  const destImage = DEST_IMAGES[review.destination];

  return (
    <div className="rounded-3xl overflow-hidden bg-white shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
      <div className="grid lg:grid-cols-5">
        {/* Image — takes 2/5 */}
        <div className="relative h-[240px] lg:h-auto lg:col-span-2 overflow-hidden">
          <img
            src={destImage}
            alt={review.destination}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/50 to-transparent" />
          <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6 flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30">
            <MapPin className="w-3.5 h-3.5 text-white" />
            <span className="text-white font-semibold text-xs">{review.destination}</span>
          </div>
        </div>

        {/* Content — takes 3/5 */}
        <div className="lg:col-span-3 card-pad flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex gap-0.5">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            {review.source && (
              <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
                {review.source === "Google" ? "Google Review" : review.source === "TripAdvisor" ? "TripAdvisor" : "Verified"}
              </span>
            )}
          </div>

          <blockquote className="text-lg md:text-xl text-gray-800 leading-relaxed mb-5 font-body">
            "{getHook(review.text, 220)}"
          </blockquote>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-amber-600 flex items-center justify-center text-white font-bold text-base shadow-md">
              {review.name.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-gray-900 flex items-center gap-1.5">
                {review.name}
                {review.verified && <BadgeCheck className="w-4 h-4 text-primary" />}
              </p>
              <p className="text-sm text-gray-400">{review.location} · {review.tour}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Secondary Card ───────────────────────────────────────────────────────────
const ReviewCard = ({ review }: { review: Testimonial }) => {
  return (
    <div className="bg-white rounded-2xl card-pad shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5 text-primary text-xs font-bold">
          <MapPin className="w-3.5 h-3.5" />
          {review.destination}
        </div>
        <div className="flex gap-0.5">
          {[...Array(review.rating)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          ))}
        </div>
      </div>

      {/* Quote */}
      <p className="text-sm text-gray-700 leading-relaxed mb-4 flex-1 line-clamp-3">
        "{getHook(review.text, 120)}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-amber-600 flex items-center justify-center text-white font-bold text-sm shadow-sm shrink-0">
          {review.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-sm text-gray-900 truncate flex items-center gap-1">
            {review.name}
            {review.verified && <BadgeCheck className="w-3.5 h-3.5 text-primary shrink-0" />}
          </p>
          <p className="text-xs text-gray-400 truncate">{review.location} · {review.date}</p>
        </div>
      </div>
    </div>
  );
};

// ─── Main Section ─────────────────────────────────────────────────────────────
const TestimonialsSection = () => {
  const featured = allTestimonials[1]; // Priya – Kashmir Honeymoon
  const secondary = [
    allTestimonials[0],  // Rahul – Kedarnath
    allTestimonials[2],  // Amit – Ladakh
    allTestimonials[5],  // Deepak – Varanasi
    allTestimonials[6],  // Kavya – Manali
  ];

  // Mobile carousel
  const [mobileIdx, setMobileIdx] = useState(0);
  const mobileReviews = [featured, ...secondary];
  const nextMobile = () => setMobileIdx((p) => (p + 1) % mobileReviews.length);
  const prevMobile = () => setMobileIdx((p) => (p - 1 + mobileReviews.length) % mobileReviews.length);

  return (
    <section className="section-compact">
      <div className="container-page">
        <div className="section-header-center section-intro-center">
          <h2 className="section-heading">What Our Travellers Say</h2>
          <div className="flex items-center justify-center gap-4 flex-wrap text-sm">
            <div className="flex items-center gap-1.5">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold text-gray-900">4.9</span>
            </div>
            <span className="text-gray-300">·</span>
            <span className="text-gray-500 font-medium">500+ Verified Travellers</span>
            <span className="text-gray-300">·</span>
            <span className="text-gray-500 font-medium">Google & TripAdvisor</span>
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden md:block">
          {/* Featured */}
          <div className="mb-6">
            <FeaturedReview review={featured} />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-gap">
            {secondary.map((t) => (
              <ReviewCard key={t.id} review={t} />
            ))}
          </div>
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden">
          <div className="min-h-0">
            {mobileReviews[mobileIdx] === featured ? (
              <FeaturedReview review={featured} />
            ) : (
              <ReviewCard review={mobileReviews[mobileIdx]} />
            )}
          </div>

          {/* Nav */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              type="button"
              onClick={prevMobile}
              className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors shadow-sm"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {mobileReviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setMobileIdx(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === mobileIdx
                      ? "w-6 h-2.5 bg-primary"
                      : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={nextMobile}
              className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors shadow-sm"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
