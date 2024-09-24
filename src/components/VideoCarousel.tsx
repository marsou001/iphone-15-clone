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
  const videoDivRef = useRef<HTMLSpanElement[]>([]);

  const { id, isEnd, startPlay, isLastVideo, isPlaying } = video;

  useGSAP(() => gsap.to(".video-carousel_container video", {
    scrollTrigger: {
      trigger: ".video-carousel_container video",
      toggleActions: "restart none none none",
    },
    onComplete: () => {
      setVideo((prevVideo) => ({ ...prevVideo, startPlay: true, isPlaying: true }));
    },
  }), [isEnd, id]);

  function handleVideoPlay() {
    setVideo((prevVideo) => ({ ...prevVideo, isPlaying: true }));
  }

  function handleProcess(type: ProcessType) {
    switch (type) {
      case ProcessType.VIDEO_END:
        setVideo((prevVideo) => ({ ...prevVideo, isEnd: true, id: prevVideo.id + 1 }));
        break;
      case ProcessType.VIDEO_LAST:
        setVideo((prevVideo) => ({ ...prevVideo, isLastVideo: true }));
        break;
      case ProcessType.VIDEO_RESET:
        setVideo((prevVideo) => ({ ...prevVideo, isLastVideo: false, id: 0 }));
        break;
      case ProcessType.PLAY:
        setVideo((prevVideo) => ({ ...prevVideo, isPlaying: !prevVideo.isPlaying }));
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

  useEffect(() => {
    const currentProgress = 0;
    let span = videoSpanRef.current;

    if (span !== undefined && span[id]) {
      let animation = gsap.to(span[id], {
        onUpdate: () => {},
        onComplete: () => {},
      });
    }
  }, [id, startPlay]);

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((slide, i) => (
          <div key={slide.id} className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div className="bg-black w-full h-full flex-center rounded-3xl overflow-hidden">
                <video
                  playsInline
                  muted
                  ref={(el) => { videoRef.current[i] = el! }}
                  onPlay={handleVideoPlay}   
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
            <span
              key={i}
              ref={(el) => { videoDivRef.current[i] = el! }}
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
            >
              <span 
                ref={(el) => { videoSpanRef.current[i] = el! }}
                className="absolute h-full w-full rounded-full"
              />
            </span>
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
                : () => handleProcess(ProcessType.VIDEO_END)
            }
          />
        </button>
      </div>
    </>
  )
}