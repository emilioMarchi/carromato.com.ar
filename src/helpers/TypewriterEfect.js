import { useState, useEffect, useRef } from "react";
import React from "react";

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
  const [currentText, setCurrentText] = useState(text);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (text !== currentText) {
      setIsTyping(false);
      setTimeout(() => {
        setCurrentText(text);
        setIndex(0);
        setIsDeleting(false);
        hasFinished.current = false;
        setIsTyping(true);
      }, 50);
    }
  }, [text, currentText]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
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
    if (!isTyping) return;
    if (typeof currentText !== "string" || currentText.length === 0) return;
    if (!loop && hasFinished.current) return;

    let timer;

    if (!loop) {
      if (index < currentText.length) {
        timer = setTimeout(() => {
          setDisplayedText(currentText.substring(0, index + 1));
          setIndex(index + 1);
        }, speed);
      } else {
        hasFinished.current = true;
      }
    } else {
      if (!isDeleting && index < currentText.length) {
        timer = setTimeout(() => {
          setDisplayedText(currentText.substring(0, index + 1));
          setIndex(index + 1);
        }, speed);
      } else if (isDeleting && index > 0) {
        timer = setTimeout(() => {
          setDisplayedText(currentText.substring(0, index - 1));
          setIndex(index - 1);
        }, speed);
      } else if (!isDeleting && index === currentText.length) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pause);
      } else if (isDeleting && index === 0) {
        setIsDeleting(false);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, index, isDeleting, speed, pause, loop, isVisible, isTyping]);

  return (
    <Tag
      ref={elementRef}
      className={`${size} font-extrabold uppercase tracking-wide whitespace-pre-line ${className}`}
    >
      {displayedText.length > 0
        ? displayedText.split("\n").map((line, i, arr) => (
            <React.Fragment key={i}>
              {line}
              {i !== arr.length - 1 && <br />}
            </React.Fragment>
          ))
        : !isTyping
        ? text.split("\n").map((line, i, arr) => (
            <React.Fragment key={i}>
              {line}
              {i !== arr.length - 1 && <br />}
            </React.Fragment>
          ))
        : ""}
      {(loop || index < currentText.length) && isVisible && (
        <span className="animate-pulse">|</span>
      )}
    </Tag>
  );
}
