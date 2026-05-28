import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import HeartParticles from "@/components/HeartParticles";

export const metadata: Metadata = {
  title: "Gopal | Heartfulness Meditation Trainer",
  description: "Experience the profound peace of transmission-based Heartfulness Meditation. Guided by certified Trainer Gopal, explore breath pacer sanctuaries, interactive timers, and virtual cleaning sessions.",
  keywords: "Heartfulness, Meditation, Gopal, Trainer, Transmission, Pranahuti, Breath pacer, Coherent breathing, Meditation timer, Inner peace, Spiritual cleaning",
  openGraph: {
    title: "Gopal | Heartfulness Meditation Trainer",
    description: "Dive into peace with custom 3D WebGL particle meditation guides, interactive tools, and certified guided instruction from Trainer Gopal.",
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

          {/* Main Content Sections */}
          <main className="relative z-10 w-full min-h-screen">
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}
