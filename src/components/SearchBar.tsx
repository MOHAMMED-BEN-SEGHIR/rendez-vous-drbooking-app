
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const SearchBar = () => {
  const [topic, setTopic] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Ici on pourrait router vers la page /doctors avec query params
    // For now, just console.log
    console.log("Recherche :", { topic, location });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row items-center bg-white rounded-xl shadow-lg p-4 gap-4 md:gap-2"
    >
      <Input
        type="text"
        placeholder="Search Topic (e.g. clinic, doctor...)"
        value={topic}
        onChange={e => setTopic(e.target.value)}
        className="md:w-2/5"
      />
      <Input
        type="text"
        placeholder="Location"
        value={location}
        onChange={e => setLocation(e.target.value)}
        className="md:w-2/5"
      />
      <Button
        type="submit"
        className="w-full md:w-auto flex items-center gap-2 px-6 py-2 shadow font-semibold"
      >
        <Search className="w-5 h-5" />
        Find Now
      </Button>
    </form>
  );
};

export default SearchBar;
