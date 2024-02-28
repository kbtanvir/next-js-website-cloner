import { type EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

export function EmblaCarousel({
  children = (
    <>
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <EmblaCarouselItem key={i} slides={2}>
            <div className="my-5 rounded-lg bg-blue-300 px-8 py-4 shadow-lg   ">
              <div>
                <h2 className="text-3xl font-semibold text-gray-800">
                  Title {i}
                </h2>
              </div>
            </div>
          </EmblaCarouselItem>
        ))}
    </>
  ),
  options = {
    slidesToScroll: 1,
    align: "start",
    loop: true,
  },
}: {
  children: React.ReactNode;
  options?: EmblaOptionsType;
}) {
  const [emblaRef] = useEmblaCarousel(options, [Autoplay()]);

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">{children}</div>
    </div>
  );
}

export function EmblaCarouselItem({
  children,
  slides = 2,
}: {
  children: React.ReactNode;
  slides: number;
}) {
  return (
    <div
      className={`ml-10`}
      style={{
        flex: `0 0 calc(100% / ${slides})`,
        maxWidth: `calc(100% / ${slides})`,
      }}
    >
      {children}
    </div>
  );
}
