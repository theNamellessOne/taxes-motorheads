import "~/styles/globals.css";
import { Header } from "./_components/header";

export default async function ({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Header />
      {children}
    </main>
  );
}
