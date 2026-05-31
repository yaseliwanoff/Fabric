import { Suspense } from "react";
import { Outlet } from "react-router";

import { RouteFallback } from "@components/common/route-fallback/RouteFallback";
import { Footer } from "@components/layout/footer/Footer";
import { Header } from "@components/layout/header/Header";
import { useHeaderHeight } from "@/hooks/useHeaderHeight";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

import styles from "./DefaultLayout.module.scss";

export function DefaultLayout() {
  useHeaderHeight();
  useSmoothScroll();

  return (
    <div className={styles.layout}>
      <Header />
      <main id="main-content" className={styles.main}>
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
