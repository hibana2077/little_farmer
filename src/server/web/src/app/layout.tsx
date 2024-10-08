import { ReduxProvider } from '../redux/provider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Navbar />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}