import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import AnimatedBackground from "@/components/AnimatedBackground";
import HomePage from "./HomePage";
import NameInputPage from "./NameInputPage";
import DashboardPage from "./DashboardPage";
import DiscoverMyselfPage from "./DiscoverMyselfPage";
import RealityCheckPage from "./RealityCheckPage";
import CareerMentorPage from "./CareerMentorPage";

type Page = 'home' | 'name' | 'dashboard' | 'discover' | 'reality' | 'mentor';

const Index = () => {
  const [page, setPage] = useState<Page>('home');
  const [userName, setUserName] = useState("");

  const handleNameSubmit = (name: string) => {
    setUserName(name);
    setPage('dashboard');
  };

  return (
    <>
      <AnimatedBackground />
      <AnimatePresence mode="wait">
        {page === 'home' && <HomePage key="home" onStart={() => setPage('name')} />}
        {page === 'name' && <NameInputPage key="name" onSubmit={handleNameSubmit} />}
        {page === 'dashboard' && <DashboardPage key="dashboard" name={userName} onNavigate={setPage} />}
        {page === 'discover' && <DiscoverMyselfPage key="discover" onBack={() => setPage('dashboard')} />}
        {page === 'reality' && <RealityCheckPage key="reality" onBack={() => setPage('dashboard')} />}
        {page === 'mentor' && <CareerMentorPage key="mentor" onBack={() => setPage('dashboard')} userName={userName} />}
      </AnimatePresence>
    </>
  );
};

export default Index;
