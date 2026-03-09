import "./globals.css";

export const metadata = {
  title: "Reddit/Youtube style Comment Demo",
  description: "Standalone demo of a Reddit/Youtube style comment section",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-zinc-900">{children}</body>
    </html>
  );
}
