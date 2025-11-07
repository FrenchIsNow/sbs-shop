import "@/styles/app.scss";

export const metadata = {
  title: "SBS SHOP - Coming Soon ",
  description: "Coming Soon",
  siteName: "SBS SHOP",
  url: "https://sbs-shop.vercel.app",
  type: "website",

  icons: {
    icon: "/favicon.png",
  },

  metadataBase: new URL("https://sbs-shop.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    images: "/ogimage.png",
  },
};

const SbsShopApp = ({ children }) => {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
export default SbsShopApp;