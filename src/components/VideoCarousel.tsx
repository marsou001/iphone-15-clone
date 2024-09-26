import { useState, useEffect, useRef } from "react";
import { hightlightsSlides } from "@/constants/texts";
import Video from "@/types/Video.type";
import { pauseImgPath, playImgPath, replayImgPath } from "@/constants/paths";
import ProcessType from "@/enums/process-type.enum";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger);

export default function VideoCarousel() {
  const [video,  setVideo] = useState<Video>({
    id: 0,
    isEnd: false,
    startPlay: false,
    isLastVideo: false,
    isPlaying: false,
  });

  const videoRef = useRef<HTMLVideoElement[]>([]);
  const videoSpanRef = useRef<HTMLSpanElement[]>([]);
  const videoDivRef = useRef<HTMLDivElement[]>([]);

  const { id, isEnd, startPlay, isLastVideo, isPlaying } = video;

  function handleProcess(...args: [type: ProcessType.VIDEO_END, index: number] | [type: Exclude<ProcessType, ProcessType.VIDEO_END>]) {
    switch (args[0]) {
      case ProcessType.VIDEO_END:
        setVideo((prevVideo) => ({ ...prevVideo, isEnd: true, id: args[1] + 1 }));
        break;
      case ProcessType.VIDEO_LAST:
        setVideo((prevVideo) => ({ ...prevVideo, isLastVideo: true }));
        break;
      case ProcessType.VIDEO_RESET:
        setVideo((prevVideo) => ({ ...prevVideo, isLastVideo: false, id: 0 }));
        break;
      case ProcessType.PLAY:
        setVideo((prevVideo) => ({ ...prevVideo, isPlaying: true }));
        break;
      case ProcessType.PAUSE:
        setVideo((prevVideo) => ({ ...prevVideo, isPlaying: false }));
        break;
      default:
        return video;
    }
  }

  useEffect(() => {
    if (!isPlaying) {
      videoRef.current[id].pause();
    } else {
      startPlay && videoRef.current[id].play();
    }
  }, [startPlay, id, isPlaying]);

  // Videos on slider only start playing on view scope
  useGSAP(() => {
    gsap.to(".video-carousel_container video", {
      scrollTrigger: {
        trigger: ".video-carousel_container video",
        toggleActions: "play none none none",
      },
      onComplete: () => {
        setVideo((prevVideo) => ({ ...prevVideo, startPlay: true, isPlaying: true }));
      },
    })
  });

  //Move to the next slide on video change
  useGSAP(() => {
    gsap.to(".slide", {
      transform: `translateX(${-100 * id}%)`,
      duration: 2,
      ease: "power2.inOut"
    });
  }, [isEnd, id]);  

  // Handles dots displaying currently playing video and its progress
  useGSAP(() => {
    const span = videoSpanRef.current;
    const div  = videoDivRef.current;
    let currentProgress = 0;

    let animation = gsap.to(span[id], {
      onUpdate: () => {
        const progress = Math.ceil(animation.progress() * 100);
        
        if (currentProgress !== progress) {
          currentProgress = progress;
          gsap.to(div[id], {
            width: window.innerWidth < 1200 ? "10vw" : "4vw",
          })
        }

        gsap.to(span[id], {
          width: currentProgress + "%",
          backgroundColor: "white",
        })
      },
      onComplete: () => {
        gsap.to(div[id], { width: '12px' });
        gsap.to(span[id], { backgroundColor: "#afafaf" });
      },
    });
    
    // Don't use the `duration` property because the animation will carry on even if you pause
    // Use this instead to control the animation progress manually
    function updateAnimation() {
      const { currentTime, duration } = videoRef.current[id];
      animation.progress(currentTime / duration);
    }

    if (isPlaying) {
      gsap.ticker.add(updateAnimation);
    } else {
      gsap.ticker.remove(updateAnimation);
    }
  }, [id, startPlay]);

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((slide, i) => (
          <div key={slide.id} className="slide sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div className="bg-black w-full h-full flex-center rounded-3xl overflow-hidden">
                <video
                  playsInline
                  muted
                  ref={(el) => { videoRef.current[i] = el! }}
                  className={`${slide.id === 2 && 'translate-x-44'} pointer-events-none`}
                  onPlay={() => handleProcess(ProcessType.PLAY)}   
                  onEnded={() =>
                    i !== 3 
                      ? handleProcess(ProcessType.VIDEO_END, i)
                      : handleProcess(ProcessType.VIDEO_LAST)
                  }
                >
                  <source src={slide.videoPath} type="video/mp4" />
                </video>
              </div>

              <div className="absolute top-12 left-[5%] z-10">
                {slide.textLists.map((text) => (
                  <p key={text} className="text-xl md:text-2xl font-medium">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {hightlightsSlides.map((_, i) => (
            <div
              key={i}
              ref={(el) => { videoDivRef.current[i] = el! }}
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
            >
              <span 
                ref={(el) => { videoSpanRef.current[i] = el! }}
                className="absolute h-full w-full rounded-full"
              />
            </div>
          ))}
        </div>

        <button className="control-btn">
          <img
            src={isLastVideo ? replayImgPath : !isPlaying ? playImgPath : pauseImgPath}
            alt={isLastVideo? 'replay' : !isPlaying ? 'play' : 'pause'} 
            onClick={isLastVideo
              ? () => handleProcess(ProcessType.VIDEO_RESET)
              : !isPlaying
                ? () => handleProcess(ProcessType.PLAY)
                : () => handleProcess(ProcessType.PAUSE)
            }
          />
        </button>
      </div>
    </>
  )
}