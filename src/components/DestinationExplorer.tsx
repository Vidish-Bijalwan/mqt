import { Link } from "react-router-dom";
import { destinations } from "@/data/packages";

const DestinationExplorer = () => {
  return (
    <section className="section-padding bg-surface">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="section-heading">Explore Our Top Destinations</h2>
          <p className="section-subheading mx-auto">
            From ancient temples to frozen lakes — every trail tells a story
          </p>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {destinations.map((dest) => (
            <Link
              key={dest.id}
              to={`/destinations/${dest.slug}`}
              className="flex-shrink-0 w-[200px] md:w-[240px] snap-start group"
            >
              <div className="relative rounded-xl overflow-hidden aspect-[3/4]">
                <img
                  src={dest.image}
                  alt={`${dest.name} travel destination in India`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  width={240}
                  height={320}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-body font-semibold text-lg text-background">{dest.name}</h3>
                  <p className="text-sm text-background/80">{dest.packagesCount} Packages</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationExplorer;
