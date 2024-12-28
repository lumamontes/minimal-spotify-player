import { siteConfig } from "@/config/site";
import { Nunito_Sans as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/providers";

const fontSans = FontSans({
  subsets: ["latin"],
  // variable: "--font-sans",
  variable: "--font-sans",
  weight: [ '400', '500', '700', '900'],
});

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
  ],
  authors: [
    {
      name: "lumamontes",
      url: "https://lumamontes.vercel.app",
    },
  ],
  creator: "lumamontes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <body
          // className={inter.className}
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Providers>{children}</Providers>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
