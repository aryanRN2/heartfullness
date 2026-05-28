import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import HeartParticles from "@/components/HeartParticles";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Gopal Ram | Heartfulness Meditation & Inner Coherence",
  description: "Experience the profound peace of transmission-based Heartfulness Meditation. Guided by certified instructor Gopal Ram, explore breath pacer sanctuaries, interactive timers, and virtual cleaning sessions.",
  keywords: "Heartfulness, Meditation, Gopal Ram, Transmission, Pranahuti, Breath pacer, Coherent breathing, Meditation timer, Inner peace, Spiritual cleaning",
  openGraph: {
    title: "Gopal Ram | Heartfulness Meditation & Coherence",
    description: "Dive into peace with custom 3D WebGL particle meditation guides, interactive tools, and certified guided instruction from Gopal Ram.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SmoothScroll>
          {/* WebGL Particle Heart Logo System (Global Fixed Background) */}
          <HeartParticles />

          {/* Glowing Ambient Background Orbs */}
          <div className="bg-orb orb-primary" />
          <div className="bg-orb orb-secondary" />
          <div className="bg-orb orb-tertiary" />

          {/* Navigation Header */}
          <Header />

          {/* Main Content Sections */}
          <main className="relative z-10 w-full min-h-screen">
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}
