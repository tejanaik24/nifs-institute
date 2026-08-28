import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { PriyaWidgetLoader } from "@/components/widgets/priya-widget-loader";
import { SmoothScrollProvider } from "@/components/motion/smooth-scroll-provider";
import { HeroSceneWrapper } from "@/components/three/hero-scene-wrapper";

// Public marketing site chrome (header, footer, hero canvas, WhatsApp/Priya
// widgets) — scoped to this route group only. /login and /dashboard sit
// outside (marketing) and render bare, without any of this.
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      <HeroSceneWrapper />
      <SiteHeader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <WhatsAppButton />
      <PriyaWidgetLoader />
    </SmoothScrollProvider>
  );
}
