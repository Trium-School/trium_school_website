import { RouteObject } from "react-router";
import HomePage from "./pages/index";
import AdmissionsPage from "./pages/admissions";
import AboutPage from "./pages/about";
import AcademicsPage from "./pages/academics";
import ContactPage from "./pages/contact";
import CampusPage from "./pages/campus";
import CareersPage from "./pages/careers";
import OurDifferentiatorsPage from "./pages/our-differentiators";
import BeyondAcademicsPage from "./pages/beyond-academics";
import AdminLoginPage from "./pages/admin/login";
import AdminEnquiriesPage from "./pages/admin/enquiries";
import OurPartnersPage from "./pages/our-partners";
import BlogsPage from "./pages/blogs";
// Eager import so renderToString doesn't hit a Suspense boundary on 404 routes
// and abort to client rendering. The prod 404 page is tiny; the dev-tools
// variant stays lazy because it pulls in dev-only code we don't want in
// production bundles.
import ProdNotFoundPage from "./pages/_404";
const NotFoundPage = ProdNotFoundPage;
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/admissions",
    element: <AdmissionsPage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/academics",
    element: <AcademicsPage />,
  },
  {
    path: "/our-differentiators",
    element: <OurDifferentiatorsPage />,
  },
  {
    path: "/beyond-academics",
    element: <BeyondAcademicsPage />,
  },
  {
    path: "/our-partners",
    element: <OurPartnersPage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
  {
    path: "/campus",
    element: <CampusPage />,
  },
  {
    path: "/careers",
    element: <CareersPage />,
  },

  {
    path: "/blogs",
    element: <BlogsPage />,
  },
  {
    path: "/admin/login",
    element: <AdminLoginPage />,
  },
  {
    path: "/admin/enquiries",
    element: <AdminEnquiriesPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

// Types for type-safe navigation
export type Path =
  | "/"
  | "/admissions"
  | "/about"
  | "/academics"
  | "/our-differentiators"
  | "/beyond-academics"
  | "/our-partners"
  | "/contact"
  | "/careers"
  | "/admin/login"
  | "/admin/enquiries"
  | "/blogs";
export type Params = Record<string, string | undefined>;
