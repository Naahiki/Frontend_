import { HeroVideo } from "./components/HeroVideo/HeroVideo";
import { VideosSection } from "./components/VideosSection/VideosSection";
import { HeroSection } from "./components/HeroSection/HeroSection";
import { CategoriesSection } from "./components/CategoriesSection/CategoriesSection";

import { Footer } from "../../components/Footer/Footer";

export const Home = () => {
  return (
    <div className="home-page">
      <div className="hero">
        <HeroSection />
        <VideosSection />
        <CategoriesSection />

        <HeroVideo />
  
        <Footer />

      </div>
    </div>
  );
};
