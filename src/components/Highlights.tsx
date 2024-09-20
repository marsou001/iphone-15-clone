import { rightImgPath, watchImgPath } from "@/constants/paths";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Highlights() {
  useGSAP(() => {
    gsap.to("h1", { opacity: 1, y: 0 });
    gsap.to(".link", { opacity: 1, y: 0, duration: 1, stagger: .25 });
  }, []);
  
  return (
    <section id="highlights" className="bg-zinc w-screen overflow-hidden h-full common-padding">
      <div className="screen-max-width">
        <div className="mb-12 w-full md:flex items-end justify-between">
          <h1 id="title" className="section-heading">Get the highlights.</h1>
          
          <div className="flex flex-wrap items-end gap-7">
            <button className="link">
              Watch the film
              <img src={watchImgPath} alt="watch" className="ml-2" />
            </button>
            <button className="link">
              Watch the event
              <img src={rightImgPath} alt="right" className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}