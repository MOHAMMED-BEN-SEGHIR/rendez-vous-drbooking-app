
import HeroHeader from "../components/HeroHeader";
import SearchBar from "../components/SearchBar";
import ServicesGrid from "../components/ServicesGrid";

const HomePage = () => (
  <div className="flex flex-col min-h-screen bg-gray-50">
    <HeroHeader />
    <section className="w-full max-w-3xl mx-auto -mt-20 z-10 relative px-4">
      <SearchBar />
    </section>
    <section className="w-full max-w-7xl mx-auto py-16 px-4">
      <ServicesGrid />
    </section>
  </div>
);

export default HomePage;
