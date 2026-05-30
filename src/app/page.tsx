import { Background } from "@/components/Background";
import { ConstellationNav } from "@/components/ConstellationNav";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Thesis } from "@/components/Thesis";
import { Work } from "@/components/Work";
import { Timeline } from "@/components/Timeline";
import { Recognition } from "@/components/Recognition";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative">
      <Background />
      <ThemeToggle />
      <ConstellationNav />
      <Hero />
      <Stats />
      <Thesis />
      <Work />
      <Timeline />
      <Recognition />
      <Contact />
    </main>
  );
}
