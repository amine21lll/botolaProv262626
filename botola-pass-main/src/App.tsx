import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Home from "./pages/Home";
import Matches from "./pages/Matches";
import Reservation from "./pages/Reservation";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import Stadiums from "./pages/Stadiums";
import StadiumDetail from "./pages/StadiumDetail";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "@/context/AuthContext";
import { DataProvider } from "@/context/DataContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Admin Imports
import AdminLayout from "@/components/layout/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import TeamsManagement from "./pages/admin/TeamsManagement";
import StadiumsManagement from "./pages/admin/StadiumsManagement";
import MatchesManagement from "./pages/admin/MatchesManagement";
import UsersManagement from "./pages/admin/UsersManagement";
import TicketingManagement from "./pages/admin/TicketingManagement";

const queryClient = new QueryClient();

function Layout() {
  const location = useLocation();
  const hideLayout = ["/login", "/register", "/admin/login"].includes(location.pathname) || (location.pathname.startsWith("/admin") && location.pathname !== "/admin/login");

  return (
    <>
      {!hideLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/matches" element={<Matches />} />
        <Route 
          path="/reservation/:matchId" 
          element={
            <ProtectedRoute>
              <Reservation />
            </ProtectedRoute>
          } 
        />
        <Route path="/stadiums" element={<Stadiums />} />
        <Route path="/stadiums/:stadiumId" element={<StadiumDetail />} />
        <Route path="/classement" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } 
        />

        {/* Admin Routes */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute requireAdmin>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="teams" element={<TeamsManagement />} />
          <Route path="stadiums" element={<StadiumsManagement />} />
          <Route path="matches" element={<MatchesManagement />} />
          <Route path="users" element={<UsersManagement />} />
          <Route path="ticketing" element={<TicketingManagement />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      {!hideLayout && <Footer />}
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <DataProvider>
        <AuthProvider>
          <BrowserRouter>
            <Layout />
          </BrowserRouter>
        </AuthProvider>
      </DataProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
