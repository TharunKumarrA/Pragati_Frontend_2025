import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const FilmGallery = () => {
  const filmRow1 = [
    "https://imgur.com/VV6iT2O.jpg",
    "https://imgur.com/bgAm230.jpg",
    "https://imgur.com/uozwB6Q.jpg",
    "https://imgur.com/8uiAo3u.jpg",
    "https://imgur.com/9s7HUzK.jpg",
    "https://imgur.com/iZwu8n7.jpg",
    "https://imgur.com/3vVNSU0.jpg",
  ];

  const filmRow2 = [
    "https://imgur.com/8D3wj3M.jpg",
    "https://imgur.com/6PIApMy.jpg",
    "https://imgur.com/VV7aNmo.jpg",
    "https://imgur.com/bJrbv7a.jpg",
    "https://imgur.com/OejAu8Y.jpg",
    "https://imgur.com/7V0smoJ.jpg",
    "https://imgur.com/ino79ZK.jpg",
  ];

  // Refs for GSAP animations
  const row1 = useRef(null);
  const row2 = useRef(null);
  const Phrow1 = useRef(null);
  const Phrow2 = useRef(null);
  const container = useRef(null);
  const phoneContainer = useRef(null);

  // Preloader state: count how many images have loaded.
  const [loadedCount, setLoadedCount] = useState(0);
  // Total images count: desktop (both rows) + mobile (first 5 from each row)
  const totalImages =
    filmRow1.length +
    filmRow2.length +
    filmRow1.slice(0, 5).length +
    filmRow2.slice(0, 5).length;
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    if (loadedCount >= totalImages) {
      setAllLoaded(true);
    }
  }, [loadedCount, totalImages]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Desktop View ScrollTrigger
      const desktopTl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 50%",
          end: "+=100%",
          scrub: true,
        },
      });

      desktopTl.to(row1.current, { x: -450, duration: 2 });
      desktopTl.to(row2.current, { x: 450, duration: 2 }, "-=2");

      // Mobile View ScrollTrigger
      const mobileTl = gsap.timeline({
        scrollTrigger: {
          trigger: phoneContainer.current,
          start: "top 50%",
          end: "+=100%",
          scrub: true,
        },
      });

      mobileTl.to(Phrow1.current, { x: -200, duration: 2 });
      mobileTl.to(Phrow2.current, { x: 200, duration: 2 }, "-=2");
    }, container);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <div className="mt-20">
      <div className="cursor-default flex flex-col justify-center items-center mb-4">
        <div className="text-5xl tracking-wider text-center text-black max-md:text-3xl [font-family:var(--font-chicavenue)]">
          GALLERY
        </div>
      </div>

      <div className="gallery-wrapper relative">
        {/* Skeleton Preloader Gallery */}
        {!allLoaded && (
          <>
            {/* Desktop Skeleton */}
            <div className="pc-view hidden z-10 lg:block">
              <div className="overflow-hidden">
                <div className="pcrow1 grid grid-cols-7 gap-2 h-[40vh] w-[130vw] my-3">
                  {filmRow1.map((_, idx) => (
                    <div
                      key={`skeleton-pc1-${idx}`}
                      className="h-full w-full bg-gray-300 animate-pulse rounded-md"
                    ></div>
                  ))}
                </div>
                <div
                  className="pcrow2 grid grid-cols-7 gap-2 h-[40vh] w-[130vw] my-3"
                  style={{ marginLeft: "-30vw", overflowX: "hidden" }}
                >
                  {filmRow2.map((_, idx) => (
                    <div
                      key={`skeleton-pc2-${idx}`}
                      className="h-full w-full bg-gray-300 animate-pulse rounded-md"
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Skeleton */}
            <div className="mobile-view block z-10 lg:hidden">
              <div className="overflow-hidden">
                <div className="mrow1 grid grid-cols-5 gap-2 h-[30vh] w-[270vw] my-3">
                  {filmRow1.slice(0, 5).map((_, idx) => (
                    <div
                      key={`skeleton-mobile1-${idx}`}
                      className="h-full w-full bg-gray-300 animate-pulse rounded-md"
                    ></div>
                  ))}
                </div>
                <div
                  className="mrow2 grid grid-cols-5 gap-2 h-[30vh] w-[270vw] my-3"
                  style={{ marginLeft: "-170vw", overflowX: "hidden" }}
                >
                  {filmRow2.slice(0, 5).map((_, idx) => (
                    <div
                      key={`skeleton-mobile2-${idx}`}
                      className="h-full w-full bg-gray-300 animate-pulse rounded-md"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Actual Gallery */}
        <div
          className={`${
            allLoaded ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
        >
          {/* Desktop View */}
          <div className="pc-view hidden z-10 lg:block">
            <div className="overflow-hidden" ref={container}>
              <div
                className="pcrow1 grid grid-cols-7 gap-2 h-[40vh] w-[130vw] my-3"
                ref={row1}
              >
                {filmRow1.map((src) => (
                  <div
                    className="flex relative justify-center items-center mx-2 h-full w-full"
                    key={src + "-pc1"}
                  >
                    <Image
                      src={src}
                      alt={`Film ${filmRow1.indexOf(src) + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                      onLoadingComplete={() =>
                        setLoadedCount((prev) => prev + 1)
                      }
                    />
                  </div>
                ))}
              </div>
              <div
                className="pcrow2 grid grid-cols-7 gap-2 h-[40vh] w-[130vw] my-3"
                ref={row2}
                style={{ marginLeft: "-30vw", overflowX: "hidden" }}
              >
                {filmRow2.map((src) => (
                  <div
                    className="flex relative justify-center items-center mx-2 h-full w-full"
                    key={src + "-pc2"}
                  >
                    <Image
                      src={src}
                      alt={`Film ${filmRow2.indexOf(src) + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                      onLoadingComplete={() =>
                        setLoadedCount((prev) => prev + 1)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile View */}
          <div className="mobile-view block z-10 lg:hidden">
            <div className="overflow-hidden" ref={phoneContainer}>
              <div
                className="mrow1 grid grid-cols-5 gap-2 h-[30vh] w-[270vw] my-3"
                ref={Phrow1}
              >
                {filmRow1.slice(0, 5).map((src) => (
                  <div
                    className="flex relative justify-center items-center mx-2 h-full w-full"
                    key={src + "-mobile1"}
                  >
                    <Image
                      src={src}
                      alt={`Film ${filmRow1.indexOf(src) + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                      onLoadingComplete={() =>
                        setLoadedCount((prev) => prev + 1)
                      }
                    />
                  </div>
                ))}
              </div>
              <div
                className="mrow2 grid grid-cols-5 gap-2 h-[30vh] w-[270vw] my-3"
                ref={Phrow2}
                style={{ marginLeft: "-170vw", overflowX: "hidden" }}
              >
                {filmRow2.slice(0, 5).map((src) => (
                  <div
                    className="flex relative justify-center items-center mx-2 h-full w-full"
                    key={src + "-mobile2"}
                  >
                    <Image
                      src={src}
                      alt={`Film ${filmRow2.indexOf(src) + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                      onLoadingComplete={() =>
                        setLoadedCount((prev) => prev + 1)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmGallery;
