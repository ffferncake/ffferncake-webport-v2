import "./globals.css";
export const metadata = {
  title: "Fern Nichanun — Geospatial Front-end Developer",
  description: "Portfolio of Fern Nichanun, building map, satellite, GIS, mobile and spatial data experiences.",

  icons: {
    icon: "/carrot.png",
    shortcut: "/carrot.png",
    apple: "/carrot.png",
    other: {
      rel: "shortcut icon",
      url: "/carrot.png"
    }
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
