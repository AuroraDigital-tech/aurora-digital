import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { RecoveryGuardian, NotFoundScreen } from "@/components/recovery";
import { AppErrorComponent } from "@/lib/error-component";
import { SECURITY_HEADERS } from "@/lib/security-headers";
import appCss from "../styles.css?url";

const APP_NAME = "Aurora Digital";

export const Route = createRootRoute({
  errorComponent: AppErrorComponent,
  notFoundComponent: NotFoundScreen,
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "Menos tarefas. Mais resultado. Automação, sites e sistemas sob medida. De Leopoldina, para o Brasil.",
      },
      { name: "theme-color", content: "#F5F5F7" },
      {
        httpEquiv: "Content-Security-Policy",
        content: SECURITY_HEADERS["Content-Security-Policy"],
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: APP_NAME },
      {
        property: "og:description",
        content:
          "Menos tarefas. Mais resultado. Automação, sites e sistemas sob medida. De Leopoldina, para o Brasil.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: APP_NAME },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  component: () => (
    <html lang="pt-BR" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <RecoveryGuardian />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
