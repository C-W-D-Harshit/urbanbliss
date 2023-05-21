import "@/styles/globals.css";
import "@/styles/admin.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";
import NProgress from "nprogress";
import Router, { useRouter } from "next/router";
import "@/styles/nprogress.css";
import AdminLayout from "../../components/admin/layout/AdminLayout";
import { Provider } from "react-redux";
import { store } from "../../store";

export default function App({ Component, pageProps }) {
  Router.events.on("routeChangeStart", NProgress.start);
  Router.events.on("routeChangeError", NProgress.done);
  Router.events.on("routeChangeComplete", NProgress.done);
  const router = useRouter();
  const isInsideAdmin = router.pathname.startsWith("/admin");
  const isInsideAuth =
    router.pathname.startsWith("/signup") ||
    router.pathname.startsWith("/login");

  if (isInsideAdmin) {
    return (
      <>
        <AdminLayout>
          <Component {...pageProps} />
        </AdminLayout>
      </>
    );
  }

  if (isInsideAuth) {
    // Use the admin layout for pages inside the admin folder
    return (
      <>
        <Component {...pageProps} />
      </>
    );
  }
  return (
    <>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}
