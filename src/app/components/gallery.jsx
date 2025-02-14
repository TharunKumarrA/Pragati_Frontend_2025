"use client";
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
    "/Images/gallery(3).jpg",
    "https://imgur.com/bJrbv7a.jpg",
    "https://imgur.com/OejAu8Y.jpg",
    "https://imgur.com/7V0smoJ.jpg",
    "https://imgur.com/ino79ZK.jpg",
  ];

  // Determine if the view is mobile based on window width.
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Refs for GSAP animations
  const row1 = useRef(null);
  const row2 = useRef(null);
  const Phrow1 = useRef(null);
  const Phrow2 = useRef(null);
  const container = useRef(null);
  const phoneContainer = useRef(null);

  // Preloader state: count how many images have loaded.
  const [loadedCount, setLoadedCount] = useState(0);
  // Total images count depends on the view:
  // Desktop: use all images. Mobile: use only the first 5 from each row.
  const totalImages = isMobile
    ? filmRow1.slice(0, 5).length + filmRow2.slice(0, 5).length
    : filmRow1.length + filmRow2.length;

  const [allLoaded, setAllLoaded] = useState(false);

  // Mark as loaded when loadedCount reaches totalImages.
  useEffect(() => {
    if (totalImages > 0 && loadedCount >= totalImages) {
      setAllLoaded(true);
      // Refresh ScrollTrigger to recalc dimensions and trigger positions.
      ScrollTrigger.refresh();
    }
  }, [loadedCount, totalImages]);

  // GSAP animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Desktop timeline
      if (!isMobile && container.current) {
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
      }
      // Mobile timeline
      if (isMobile && phoneContainer.current) {
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
      }
    });
    return () => ctx.revert();
  }, [allLoaded, isMobile]);

  return (
    <div className="mt-20">
      <div className="cursor-default flex flex-col justify-center items-center mb-4">
        <div className="text-5xl tracking-wider text-center text-black max-md:text-3xl [font-family:var(--font-chicavenue)]">
          GALLERY
        </div>
      </div>

      <div className="gallery-wrapper relative">
        {/* Skeleton Preloader */}
        {!allLoaded && (
          <>
            {!isMobile ? (
              // Desktop Skeleton
              <div className="pc-view z-10">
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
            ) : (
              // Mobile Skeleton
              <div className="mobile-view z-10">
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
            )}
          </>
        )}

        {/* Actual Gallery */}
        <div
          className={`${
            allLoaded ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
        >
          {!isMobile ? (
            // Desktop Gallery
            <div className="pc-view z-10">
              <div className="overflow-hidden" ref={container}>
                <div
                  className="pcrow1 grid grid-cols-7 gap-2 h-[40vh] w-[130vw] my-3"
                  ref={row1}
                >
                  {filmRow1.map((src, index) => (
                    <div
                      className="flex relative justify-center items-center mx-2 h-full w-full"
                      key={src + "-pc1"}
                    >
                      <Image
                        src={src}
                        alt={`Film ${index + 1}`}
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
                  {filmRow2.map((src, index) => (
                    <div
                      className="flex relative justify-center items-center mx-2 h-full w-full"
                      key={src + "-pc2"}
                    >
                      <Image
                        src={src}
                        alt={`Film ${index + 1}`}
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
          ) : (
            // Mobile Gallery
            <div className="mobile-view z-10">
              <div className="overflow-hidden" ref={phoneContainer}>
                <div
                  className="mrow1 grid grid-cols-5 gap-2 h-[30vh] w-[270vw] my-3"
                  ref={Phrow1}
                >
                  {filmRow1.slice(0, 5).map((src, index) => (
                    <div
                      className="flex relative justify-center items-center mx-2 h-full w-full"
                      key={src + "-mobile1"}
                    >
                      <Image
                        src={src}
                        alt={`Film ${index + 1}`}
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
                  {filmRow2.slice(0, 5).map((src, index) => (
                    <div
                      className="flex relative justify-center items-center mx-2 h-full w-full"
                      key={src + "-mobile2"}
                    >
                      <Image
                        src={src}
                        alt={`Film ${index + 1}`}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default FilmGallery;
