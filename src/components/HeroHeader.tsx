
import { Button } from "@/components/ui/button";

const HeroHeader = () => (
  <div className="relative h-[64vh] min-h-[420px] w-full flex items-center justify-center">
    <img
      src="https://images.unsplash.com/photo-1588776814546-ec7e6fa1b8fc?auto=format&fit=crop&w=1200&q=80"
      alt="Medical team"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/40" />
    <div className="relative z-10 max-w-2xl mx-auto text-center text-white flex flex-col gap-6 items-center pt-12">
      <span className="bg-blue-600/80 rounded-full px-4 py-1 text-xs uppercase tracking-widest font-bold shadow-lg mb-1 inline-block">
        Markets &amp; Resources
      </span>
      <h1 className="text-3xl md:text-5xl font-extrabold drop-shadow-lg mb-3">
        Find the Best Doctor Near You.
      </h1>
      <div className="flex gap-4 justify-center">
        <Button className="px-6 py-2 text-base font-semibold rounded-full shadow-2xl bg-blue-600 hover:bg-blue-700">
          Find a Doctor
        </Button>
        <Button variant="outline" className="px-6 py-2 text-base font-semibold rounded-full bg-white/80 hover:bg-white border-2 border-white text-blue-900">
          Read More
        </Button>
      </div>
    </div>
  </div>
);

export default HeroHeader;
