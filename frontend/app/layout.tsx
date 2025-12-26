import "@/globals.css";
import Providers from "@/providers";
import ClientLayout from "@/components/ClientLayout";

export const metadata = {
  title: "Task Manager",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <Providers>
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
