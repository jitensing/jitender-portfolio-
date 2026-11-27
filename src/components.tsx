import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { ReactNode, useRef } from 'react';
import { profile } from './data';

export function FadeIn({ children, delay = 0, duration = 0.7, x = 0, y = 30, className }: {
  children: ReactNode; delay?: number; duration?: number; x?: number; y?: number; className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function ContactButton() {
  return (
    <a
      href={`mailto:${profile.email}`}
      className="contact-btn inline-block rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base text-white font-medium uppercase tracking-widest"
      style={{
        background: 'linear-gradient(123deg,#18011F 7%,#B600A8 37%,#7621B0 72%,#BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181,1,167,0.25), 4px 4px 12px #7721B1 inset',
        outline: '2px solid white',
        outlineOffset: '-3px',
      }}
    >
      Contact Me
    </a>
  );
}

function Char({ char, progress, range }: { char: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative">
      <span className="invisible">{char}</span>
      <motion.span className="absolute left-0 top-0" style={{ opacity }}>{char}</motion.span>
    </span>
  );
}

export function AnimatedText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] });
  const words = text.split(' ');
  let n = 0;
  return (
    <p ref={ref} aria-label={text} className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px]" style={{ fontSize: 'clamp(1rem,2vw,1.35rem)' }}>
      {words.map((word, w) => (
        <span key={w} aria-hidden="true">
          <span className="inline-block">
            {word.split('').map((c, i) => {
              const at = n++;
              return <Char key={i} char={c} progress={scrollYProgress} range={[at / text.length, (at + 1) / text.length]} />;
            })}
          </span>{' '}
          {(() => { n++; return null; })()}
        </span>
      ))}
    </p>
  );
}
