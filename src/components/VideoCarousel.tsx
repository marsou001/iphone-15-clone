import { hightlightsSlides } from "@/constants/texts";
import Video from "@/types/Video.type";
import isRefNotUndefined from "@/utils/isRefNotUndefined";
import gsap from "gsap";
import { useState, useRef, useEffect } from "react";

export default function VideoCarousel() {
  const [video,  setVideo] = useState<Video>({
    id: 0,
    isEnd: false,
    startPlay: false,
    isLastVideo: false,
    isPlaying: false,
  });
  const [loadedData, setLoadedData] = useState<unknown[]>([]);

  const videoRef = useRef<HTMLVideoElement[]>();
  const videoSpanRef = useRef<HTMLVideoElement[]>();
  const videoDivRef = useRef<HTMLVideoElement[]>();

  function videoRefCallback(element: HTMLVideoElement, index: number) {
    if (isRefNotUndefined<HTMLVideoElement[]>(videoRef)) {
      videoRef.current[index] = element;
    }
  }

  const { id, isEnd, startPlay, isLastVideo, isPlaying } = video;

  function handleVideoPlay() {
    setVideo((prevVideo) => ({ ...prevVideo, isPlaying: true }));
  }

  useEffect(() => {
    if (loadedData.length <= 3) return;
    if (videoRef.current === undefined) return;
    
    if (!isPlaying) {
      videoRef.current[id].pause();
    } else {
      startPlay && videoRef.current[id].play();
    }
  }, [startPlay, id, isPlaying, loadedData]);

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
                  ref={(el) => videoRefCallback(el!, i)}
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
    </>
  )
}