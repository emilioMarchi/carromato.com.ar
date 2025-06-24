import { useState, useEffect, useRef } from "react";

export function TypewriterTitle({
  text = "",           // valor por defecto vacío
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

  useEffect(() => {
    // Validar que text sea string y no esté vacío
    if (typeof text !== "string" || text.length === 0) {
      return;
    }

    if (!loop && hasFinished.current) {
      return;
    }

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
  }, [text, index, isDeleting, speed, pause, loop]);

  return (
    <Tag className={`${size} font-extrabold uppercase tracking-wide ${className}`}>
      {displayedText}
      {(loop || index < text.length) && <span className="animate-pulse">|</span>}
    </Tag>
  );
}
