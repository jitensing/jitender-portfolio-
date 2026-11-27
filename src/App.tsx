import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { AnimatedText, ContactButton, FadeIn } from './components';
import LivingPortrait from './LivingPortrait';
import { about, education, experience, profile, services, skills, tools } from './data';

const HEADING = 'font-black uppercase leading-none tracking-tight text-center';
const BIG = { fontSize: 'clamp(3rem,12vw,160px)' };
const ROUND = 'rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]';

function Hero() {
  return (
    <section className="relative h-screen flex flex-col" style={{ overflowX: 'clip' }}>
      <FadeIn y={-20}>
        <nav className="flex justify-between px-6 md:px-10 pt-6 md:pt-8 text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem]">
          {['About', 'Services', 'Experience', 'Contact'].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="hover:opacity-70 transition-opacity duration-200">{l}</a>
          ))}
        </nav>
      </FadeIn>
      <div className="overflow-hidden">
        <FadeIn delay={0.15} y={40}>
          {/* naam lamba hai, isliye font size "Hi, i'm mina" wale design se chhota rakha hai */}
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center text-[10vw] sm:text-[10.5vw] md:text-[11vw] lg:text-[11.5vw] mt-6 sm:mt-4">
            Hi, i&apos;m {profile.firstName.toLowerCase()}
          </h1>
        </FadeIn>
      </div>
      <div className="mt-auto flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]" style={{ fontSize: 'clamp(0.75rem,1.4vw,1.5rem)' }}>
            a digital marketer helping businesses get found on search and social
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20} className="relative z-20"><ContactButton /></FadeIn>
      </div>
      <LivingPortrait />
    </section>
  );
}

function Marquee() {
  const ref = useRef<HTMLElement>(null);
  const one = useRef<HTMLDivElement>(null);
  const two = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      if (!ref.current || !one.current || !two.current) return;
      const top = ref.current.getBoundingClientRect().top + window.scrollY;
      const offset = (window.scrollY - top + window.innerHeight) * 0.3;
      one.current.style.transform = `translateX(${offset - 200 - one.current.scrollWidth / 3}px)`;
      two.current.style.transform = `translateX(${-(offset - 200)}px)`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const row = (items: string[]) => [...items, ...items, ...items].map((t, i) => (
    <div key={i} className="shrink-0 rounded-2xl border border-[#D7E2EA]/20 px-10 py-8 text-[#D7E2EA] uppercase font-semibold tracking-wide text-xl md:text-3xl">{t}</div>
  ));
  return (
    <section ref={ref} className="pt-24 sm:pt-32 md:pt-40 pb-10 flex flex-col gap-3 overflow-hidden">
      <div ref={one} className="marquee-row">{row(skills)}</div>
      <div ref={two} className="marquee-row">{row(tools)}</div>
    </section>
  );
}

const CDN = 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/';
const DECOR = [
  ['moon_icon.11395d36.png', 'w-[120px] sm:w-[160px] md:w-[210px] top-[4%] left-[1%] sm:left-[2%] md:left-[4%]', 0.1, -80],
  ['p59_1.4659672e.png', 'w-[100px] sm:w-[140px] md:w-[180px] bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]', 0.25, -80],
  ['lego_icon-1.703bb594.png', 'w-[120px] sm:w-[160px] md:w-[210px] top-[4%] right-[1%] sm:right-[2%] md:right-[4%]', 0.15, 80],
  ['Group_134-1.2e04f3ce.png', 'w-[130px] sm:w-[170px] md:w-[220px] bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]', 0.3, 80],
] as const;

function About() {
  return (
    <section id="about" className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 gap-16 sm:gap-20 md:gap-24">
      {DECOR.map(([file, cls, delay, x]) => (
        <FadeIn key={file} delay={delay} x={x} y={0} duration={0.9} className={`absolute pointer-events-none ${cls}`}>
          <img src={CDN + file} alt="" className="w-full" />
        </FadeIn>
      ))}
      <div className="relative flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn y={40}><h2 className={`hero-heading ${HEADING}`} style={BIG}>About me</h2></FadeIn>
        <AnimatedText text={about} />
      </div>
      <ContactButton />
    </section>
  );
}

function Services() {
  return (
    <section id="services" className={`bg-white text-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 ${ROUND}`}>
      <h2 className={`${HEADING} mb-16 sm:mb-20 md:mb-28`} style={BIG}>Services</h2>
      <div className="max-w-5xl mx-auto">
        {services.map(([name, desc], i) => (
          <FadeIn key={name} delay={i * 0.1}>
            <div className="flex items-center gap-6 md:gap-12 py-8 sm:py-10 md:py-12 border-b border-[rgba(12,12,12,0.15)]">
              <span className="font-black leading-none" style={{ fontSize: 'clamp(3rem,10vw,140px)' }}>0{i + 1}</span>
              <div>
                <h3 className="font-medium uppercase" style={{ fontSize: 'clamp(1rem,2.2vw,2.1rem)' }}>{name}</h3>
                <p className="font-light leading-relaxed max-w-2xl opacity-60" style={{ fontSize: 'clamp(0.85rem,1.6vw,1.25rem)' }}>{desc}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function Card({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const total = experience.length;
  const job = experience[index];
  const scale = useTransform(progress, [index / total, 1], [1, 1 - (total - 1 - index) * 0.03]);
  return (
    <div className="h-[70vh] sticky top-24 md:top-32">
      <motion.article
        style={{ scale, top: index * 28 }}
        className="relative origin-top rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-6 md:p-10 text-[#D7E2EA] min-h-[300px] flex flex-col justify-between gap-8"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="hero-heading font-black leading-none" style={{ fontSize: 'clamp(3rem,10vw,140px)' }}>0{index + 1}</span>
          <span className="rounded-full border-2 border-[#D7E2EA] px-8 py-3 uppercase tracking-widest text-sm">{job.duration}</span>
        </div>
        <div>
          <p className="uppercase tracking-widest opacity-60">{job.type}</p>
          <h3 className="font-semibold uppercase leading-tight" style={{ fontSize: 'clamp(1.3rem,3.5vw,3rem)' }}>{job.company}</h3>
        </div>
      </motion.article>
    </div>
  );
}

function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  return (
    <section id="experience" className={`relative z-10 -mt-10 sm:-mt-12 md:-mt-14 bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 ${ROUND}`}>
      <h2 className={`hero-heading ${HEADING} mb-16`} style={BIG}>Experience</h2>
      <div ref={ref} className="max-w-6xl mx-auto">
        {experience.map((job, i) => <Card key={job.company} index={i} progress={scrollYProgress} />)}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <footer id="contact" className="px-5 py-24 text-[#D7E2EA] flex flex-col items-center gap-14">
      <div className="w-full max-w-3xl">
        <h2 className={`hero-heading ${HEADING} mb-8 text-5xl md:text-7xl`}>Education</h2>
        {education.map(([course, year]) => (
          <div key={course} className="flex justify-between gap-4 border-b border-[#D7E2EA]/20 py-4">
            <span>{course}</span><span className="opacity-60 shrink-0">{year}</span>
          </div>
        ))}
      </div>
      <h2 className={`hero-heading ${HEADING}`} style={BIG}>Contact</h2>
      <ul className="flex flex-col items-center gap-3 text-lg">
        <li><a className="flex gap-3 items-center" href={`mailto:${profile.email}`}><Mail size={20} />{profile.email}</a></li>
        <li><a className="flex gap-3 items-center" href={`tel:+91${profile.phone}`}><Phone size={20} />+91 {profile.phone}</a></li>
        <li className="flex gap-3 items-center"><MapPin size={20} />{profile.location}</li>
        <li className="opacity-60">Languages: {profile.languages}</li>
      </ul>
      <ContactButton />
    </footer>
  );
}

export default function App() {
  return (
    <main className="bg-[#0C0C0C]" style={{ overflowX: 'clip' }}>
      <Hero /><Marquee /><About /><Services /><Experience /><Contact />
    </main>
  );
}
