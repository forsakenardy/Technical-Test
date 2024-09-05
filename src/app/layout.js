import "./styles/Homepage.css";
import "./styles/Details.css"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
