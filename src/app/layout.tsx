import "~/styles/globals.css";

import { Roboto } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateRequest } from "~/server/auth";
import { AuthProvider } from "~/app/providers/auth-provider";

export const metadata = {
  title: "Texas Motorheads",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const font = Roboto({ subsets: ["latin"], weight: "400" });

export default async function ({ children }: { children: React.ReactNode }) {
  const v = await validateRequest();
  return (
    <html lang="en" className={`${font.className} dark`}>
      <body>
        <AuthProvider {...v}>
          {children}
          <ToastContainer theme={"colored"} />
        </AuthProvider>
      </body>
    </html>
  );
}
