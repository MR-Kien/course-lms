import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Profile from "../components/Profile";

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          <Sidebar activeItem="profile" />
          <Profile />
        </div>
      </div>
    </div>
  );
}
