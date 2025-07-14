import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light", // keep light theme
    primary: {
      main: "#374151", // Tailwind bg-gray-700
      contrastText: "#fff",
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
