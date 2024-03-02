import { Button } from "@/components/ui/button";
import { useDotButton, useEmblaNavigation } from "@/hooks/useEmblaNavigation";
import { type EmblaCarouselType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function EmplaSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      slidesToScroll: 1,
      align: "start",
      loop: true,
    },
    [Autoplay()],
  );

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (autoplay.options.stopOnInteraction === false) {
      autoplay.reset;
    } else {
      autoplay.stop;
    }
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick,
  );
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = useEmblaNavigation(emblaApi);

  return (
    <>
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="ml-[-20px] flex">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="embla__slide w-1/3 pl-[20px]">
                  <div className="flex">
                    <div className=" relative h-[300px] w-[700px] max-md:h-[300px]">
                      <Image
                        src={
                          "/sites/real-estate/demo-real-estate-slider-01.jpg"
                        }
                        fill
                        alt="Picture of the author"
                        className="z-0 object-cover"
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="flex gap-4 pt-10">
        <div className="embla__dots flex w-full justify-center gap-4">
          {scrollSnaps.map((_, index) => (
            <Button
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"size-5 rounded-full hover:bg-purple-600".concat(
                index === selectedIndex ? " bg-purple-600" : " bg-gray-300",
              )}
            />
          ))}
        </div>
      </div>
      <div className="relative flex gap-4 pt-10">
        <Button
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
          variant={"outline"}
          className="h-20 w-20 rounded-full    text-[20px]  "
        >
          <FaArrowLeft />
        </Button>
        <Button
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
          variant={"outline"}
          className="h-20 w-20  rounded-full      text-[20px]  "
        >
          <FaArrowRight />
        </Button>
      </div>
    </>
  );
}
