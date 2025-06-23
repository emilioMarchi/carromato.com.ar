import { useState, useEffect } from "react";

export function TypewriterTitle({
  text,
  speed = 120,
  pause = 2000,
  as: Tag = "h1",
  size = "text-5xl",
  className = "",
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timer;

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
    } else {
      timer = setTimeout(() => {
        setIsDeleting(!isDeleting);
      }, pause);
    }

    return () => clearTimeout(timer);
  }, [text, index, isDeleting, speed, pause]);

  return (
    <Tag className={`${size} font-extrabold uppercase tracking-wide ${className}`}>
      {displayedText}
      <span className="animate-pulse">|</span>
    </Tag>
  );
}
