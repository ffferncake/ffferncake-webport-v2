import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import HeroSection from "../components/sections/hero-section";
import AboutSection from "../components/sections/about-section";
import ProjectsSection from "../components/sections/projects-section";
import AchievementsSection from "../components/sections/achievements-section";
import EmailSection from "../components/sections/email-section";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <Navbar />
      <div className="container mt-24 mx-auto px-12 py-4">
        <HeroSection />
        {/* <AchievementsSection /> */}
        <AboutSection />
        <ProjectsSection />
        <EmailSection />
      </div>
      <Footer />
    </main>
  );
}
