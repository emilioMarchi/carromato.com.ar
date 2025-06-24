import { useState, useEffect, useRef } from "react";

export function TypewriterTitle({
  text = "",
  speed = 120,
  pause = 2000,
  as: Tag = "h1",
  size = "text-5xl",
  className = "",
  loop = true,
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);
  const hasFinished = useRef(false);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    // IntersectionObserver: activa el efecto cuando el elemento es visible
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 } // se activa cuando el 50% está visible
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    if (typeof text !== "string" || text.length === 0) return;
    if (!loop && hasFinished.current) return;

    let timer;

    if (!loop) {
      if (index < text.length) {
        timer = setTimeout(() => {
          setDisplayedText(text.substring(0, index + 1));
          setIndex(index + 1);
        }, speed);
      } else {
        hasFinished.current = true;
      }
    } else {
      if (!isDeleting && index < text.length) {
        timer = setTimeout(() => {
          setDisplayedText(text.substring(0, index + 1));
          setIndex(index + 1);
        }, speed);
      } else if (isDeleting && index > 0) {
        timer = setTimeout(() => {
          setDisplayedText(text.substring(0, index - 1));
          setIndex(index - 1);
        }, speed);
      } else if (!isDeleting && index === text.length) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pause);
      } else if (isDeleting && index === 0) {
        setIsDeleting(false);
      }
    }

    return () => clearTimeout(timer);
  }, [text, index, isDeleting, speed, pause, loop, isVisible]);

  return (
    <Tag
      ref={elementRef}
      className={`${size} font-extrabold uppercase tracking-wide ${className}`}
    >
      {displayedText}
      {(loop || index < text.length) && isVisible && (
        <span className="animate-pulse">|</span>
      )}
    </Tag>
  );
}
