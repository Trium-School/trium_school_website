import { RouteObject } from "react-router";
import HomePage from './pages/index';
import AdmissionsPage from './pages/admissions';
import AboutPage from './pages/about';
import AcademicsPage from './pages/academics';
import ContactPage from './pages/contact';
import CampusPage from './pages/campus';
import AdminLoginPage from './pages/admin/login';
import AdminEnquiriesPage from './pages/admin/enquiries';
// Eager import so renderToString doesn't hit a Suspense boundary on 404 routes
// and abort to client rendering. The prod 404 page is tiny; the dev-tools
// variant stays lazy because it pulls in dev-only code we don't want in
// production bundles.
import ProdNotFoundPage from './pages/_404';
const NotFoundPage = ProdNotFoundPage;
export const routes: RouteObject[] = [{
  path: '/',
  element: <HomePage />
}, {
  path: '/admissions',
  element: <AdmissionsPage />
}, {
  path: '/about',
  element: <AboutPage />
}, {
  path: '/academics',
  element: <AcademicsPage />
}, {
  path: '/contact',
  element: <ContactPage />
}, {
  path: '/campus',
  element: <CampusPage />
}, {
  path: '/admin/login',
  element: <AdminLoginPage />
}, {
  path: '/admin/enquiries',
  element: <AdminEnquiriesPage />
}, {
  path: '*',
  element: <NotFoundPage />
}];

// Types for type-safe navigation
export type Path = '/' | '/admissions' | '/about' | '/academics' | '/contact' | '/admin/login' | '/admin/enquiries';
export type Params = Record<string, string | undefined>;
