import "@/styles/globals.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";
import NProgress from "nprogress";
import Router from "next/router";
import "@/styles/nprogress.css";

export default function App({ Component, pageProps }) {
  Router.events.on("routeChangeStart", NProgress.start);
  Router.events.on("routeChangeError", NProgress.done);
  Router.events.on("routeChangeComplete", NProgress.done);
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
