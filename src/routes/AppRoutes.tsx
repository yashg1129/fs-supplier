import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import SupplierLayout from "../components/layout/SupplierLayout";

import CatalogUploadsPage from "../pages/CatalogUploadsPage";
import DashboardPage from "../pages/DashboardPage";
import InventoryPage from "../pages/InventoryPage";
import OrdersPage from "../pages/OrdersPage";
import PaymentsPage from "../pages/PaymentsPage";
import ReportsPage from "../pages/ReportsPage";
import ReturnsPage from "../pages/ReturnsPage";
import SupplierProfilePage from "../pages/SupplierProfilePage";
import BulkCatalogUploadPage from "../pages/BulkCatalogUploadPage";
import BulkCatalogLayout from "../components/layout/FullPageLayout";
import SingleCatalogUploadPage from "../pages/SingleCatalogUploadPage";
import SingleCatalogProductDetailsPage from "../pages/SingleCatalogProductDetailsPage";
import ImageBulkUploadPage from "../pages/ImageBulkUploadPage";
import SupplierLoginPage from "../pages/registration/LoginPage";
import RegisterPage from "../pages/registration/RegisterPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/supplier/dashboard" replace />}
      />

      <Route path="/supplier" element={<SupplierLayout />}>
        <Route
          index
          element={<Navigate to="dashboard" replace />}
        />

        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="catalog-uploads" element={<CatalogUploadsPage />} />
        <Route path="image-bulk-uploads" element={<ImageBulkUploadPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="inventory" element={<InventoryPage />} />
        <Route path="payments" element={<PaymentsPage />} />
        <Route path="returns" element={<ReturnsPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="profile" element={<SupplierProfilePage />} />
      </Route>

      <Route
        path="/supplier"
        element={<BulkCatalogLayout />}
      >
        <Route path="single-catalog-uploads" element={<SingleCatalogUploadPage />} />
        <Route path="bulk-catalog-uploads" element={<BulkCatalogUploadPage />} />
        <Route path="add-product" element={<SingleCatalogProductDetailsPage />} />
        <Route path="login" element={<SupplierLoginPage />}/>
        <Route path="register" element={<RegisterPage />}/>
      </Route>

      <Route
        path="*"
        element={<Navigate to="/supplier/dashboard" replace />}
      />
    </Routes>
  );
}