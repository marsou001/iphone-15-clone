import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { heroVideoPath, smallHeroVideoPath } from "@/constants/paths";
import { useEffect, useState } from "react";

export default function Hero() {
  const [videoSrc, setVideoSrc] = useState("");

  useGSAP(() => {
    gsap.to("p", {
      opacity: 1,
      delay: 1.5,
    })
  }, []);

  function handleVideoSrc() {
    if (window.innerWidth < 760) {
      setVideoSrc(smallHeroVideoPath);
    } else {
      setVideoSrc(heroVideoPath);
    }
  }

  useEffect(() => {
    handleVideoSrc();
    window.addEventListener("resize", handleVideoSrc);
    return () => window.removeEventListener("resize", handleVideoSrc);
  }, []);

  return (
    <section className="w-full nav-height bg-black relative">
      <div className="h-5/6 w-full flex-center flex-col">
        <p className="hero-title">iPhone 15 Pro</p>

        <div className="w-9/12 md:10/12">
          <video className="pointer-events-none" autoPlay muted playsInline key={videoSrc}>
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  )
}