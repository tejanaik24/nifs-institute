import { useEffect, useRef, useState } from "react";

/** Fires `onEnter` once, the first time `ref`'s element scrolls into view. */
export function useInView<T extends Element>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

/** Types out `text` one character at a time once `start` becomes true.
 * Returns the currently-revealed substring and whether typing has finished. */
export function useTypewriter(text: string, start: boolean, speed = 40) {
  const [output, setOutput] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!start) return;
    setOutput("");
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setOutput(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(id);
  }, [start, text, speed]);

  return [output, done] as const;
}

/** Counts up from 0 to `target` once `start` becomes true. Returns the
 * current value and whether counting has finished. */
export function useCountUp(target: number, start: boolean, duration = 900) {
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!start) return;
    setValue(0);
    setDone(false);
    const startTime = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setValue(Math.round(progress * target));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setDone(true);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, target, duration]);

  return [value, done] as const;
}
