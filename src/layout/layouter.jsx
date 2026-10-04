import { Outlet } from "react-router-dom"
import AppHeader from '../layout/appHeader'
import AppFooter from '../layout/appFooter'
export default function DefaultLayout() {
  return (
    <div>
      <AppHeader />
      <main>
         <Outlet />
      </main>
      <AppFooter />
    </div>
  );
}
