import Hero from "@/components/Hero";
import ReelStrip from "@/components/ReelStrip";

import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import FocusController from "@/components/FocusController";

export default function Home() {
  return (
    <>
      <FocusController />
      <Hero />
      <ReelStrip />
      <Projects />
      <About />
      <Contact />
    </>
  );
}
