import { Route, Routes } from "react-router-dom";
import { ListUsers, AddUser, EditUser } from "modules/user-details";
import { Header } from "components/header";
import { Sidebar } from "components/sidebar";
import ErrorPage from "components/error";

function AppRoutes() {
  return (
    <>
      <div className="app-layout">
        {/* <div className="sidebar">
            <Sidebar />
        </div> */}
        <div className="app-main">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<ListUsers />} />
              <Route path="/add" element={<AddUser />} />
              <Route path="/edit/:id" element={<EditUser />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
}

export default AppRoutes;
