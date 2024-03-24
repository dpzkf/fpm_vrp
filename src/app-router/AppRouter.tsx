import { PricingPackages, PackageForm } from "../pages/PricingPackages";
import { VendorsForm } from "../pages/Purchases/Vendors";
import { VendorsList } from "../pages/Purchases/Vendors/VendorsList.tsx";
import { Discount } from "../pages/Settings/Discount";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { AuthLayout } from "../layouts/AuthLayout";

import { AppLayout } from "../layouts/AppLayout";
import { AppRoute } from "../constants/routes";

import { AuthGuard } from "../guards/AuthGuard.tsx";
import { NotAuthGuard } from "../guards/NotAuthGuard.tsx";

import { EPageType } from "../constants";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { ForgotPassword } from "../pages/ForgotPassword";
import { PasswordReset } from "../pages/PasswordReset/PasswordReset";
import { EmailVerification } from "../pages/EmailVerification";
import { Subscription } from "../pages/Subscription";
import { Dashboard } from "../pages/Dashboard";
import { Categories } from "../pages/Categories";
import { Tax } from "../pages/Tax";
import { UsersForm, UsersList } from "../pages/Users";
import { Invoices, Customers, Estimates } from "../pages/Sales";
import { BillingSubscription, PaymentInvoices } from "../pages/BillingSubscription";
import { BusinessSettings } from "../pages/BusinessSettings";
import { PaymentsSettings } from "../pages/PaymentSettings";
import { AccountProfile } from "../pages/AccountProfile";
import { CustomerPage } from "../pages/Sales/Customers/CustomerPage";
import { TaxPage } from "../pages/Tax/TaxPage";
import { Preferences, BusinessCategories } from "../pages/Settings";
import { UsersAdmin } from "../pages/UsersAdmin";
import { ProductsAndServices } from "../pages/ProductsAndServices";
import { ProductPage } from "../pages/ProductsAndServices/ProductPage/ProductPage";

const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes location={location}>
        <Route
          element={
            <NotAuthGuard>
              <AuthLayout />
            </NotAuthGuard>
          }
        >
          <Route path={AppRoute.Auth.SignIn.Root.path} element={<SignIn />} />
          <Route path={AppRoute.Auth.SignUp.Root.path} element={<SignUp />} />
          <Route path={AppRoute.Auth.ForgotPassword.Root.path} element={<ForgotPassword />} />
          <Route path={AppRoute.Auth.PasswordReset.Root.path} element={<PasswordReset />} />
          <Route path={AppRoute.Auth.EmailVerification.Root.path} element={<EmailVerification />} />
          <Route path={AppRoute.Auth.SelectSubscription.Root.path} element={<Subscription />} />
        </Route>
        <Route
          element={
            <AuthGuard>
              <AppLayout />
            </AuthGuard>
          }
        >
          <Route path={AppRoute.App.Dashboard.Root.path} element={<Dashboard />} />
          <Route path={AppRoute.App.Categories.Root.path} element={<Categories />} />
          <Route path={AppRoute.App.Users.Root.path} element={<UsersList />} />
          <Route path={AppRoute.App.Users.Add.path} element={<UsersForm isCreate />} />
          <Route path={AppRoute.App.Users.Edit.path} element={<UsersForm isEdit />} />
          <Route path={AppRoute.App.Tax.Root.path} element={<Tax />} />
          <Route path={AppRoute.App.Tax.NewTax.path} element={<TaxPage type={EPageType.New} />} />
          <Route path={AppRoute.App.Tax.EditTax.path} element={<TaxPage type={EPageType.Edit} />} />
          <Route path={AppRoute.App.Sales.Customers.path} element={<Customers />} />
          <Route path={AppRoute.App.Sales.NewCustomer.path} element={<CustomerPage type={EPageType.New} />} />
          <Route path={AppRoute.App.Sales.EditCustomer.path} element={<CustomerPage type={EPageType.Edit} />} />
          <Route path={AppRoute.App.Sales.Estimates.path} element={<Estimates />} />
          <Route path={AppRoute.App.Sales.Invoices.path} element={<Invoices />} />
          <Route path={AppRoute.App.Purchases.VendorsRoot.path} element={<VendorsList />} />
          <Route path={AppRoute.App.Purchases.VendorsAdd.path} element={<VendorsForm isCreate />} />
          <Route path={AppRoute.App.Purchases.VendorsEdit.path} element={<VendorsForm isEdit />} />
          <Route path={AppRoute.App.BillingSubscription.Root.path} element={<BillingSubscription />} />
          <Route path={AppRoute.App.BillingSubscription.PaymentInvoices.path} element={<PaymentInvoices />} />
          <Route path={AppRoute.App.BusinessSettings.Root.path} element={<BusinessSettings />} />
          <Route path={AppRoute.App.PaymentSettings.Root.path} element={<PaymentsSettings />} />
          <Route path={AppRoute.App.MyAccount.Root.path} element={<AccountProfile />} />
          <Route path={AppRoute.App.ProductsAndServices.Root.path} element={<ProductsAndServices />} />
          <Route
            path={AppRoute.App.ProductsAndServices.NewProduct.path}
            element={<ProductPage type={EPageType.New} />}
          />
          <Route
            path={AppRoute.App.ProductsAndServices.EditProduct.path}
            element={<ProductPage type={EPageType.Edit} />}
          />
          <Route path={AppRoute.App.BillingAndSubscriptions.Root.path} />
          <Route path={AppRoute.App.BillingAndSubscriptions.PaymentInvoices.path} />
        </Route>

        <Route element={<AppLayout isAdmin />}>
          <Route path={AppRoute.App.AdminUsers.Root.path} element={<UsersAdmin />} />
          <Route path={AppRoute.App.AdminSettings.Preferences.path} element={<Preferences />} />
          <Route path={AppRoute.App.AdminSettings.BusinessCategories.path} element={<BusinessCategories />} />
          <Route path={AppRoute.App.AdminSettings.PaymentSettings.path} element={<PaymentsSettings />} />
          <Route path={AppRoute.App.AdminSettings.Discount.path} element={<Discount />} />
          <Route path={AppRoute.App.PricingPackages.Root.path} element={<PricingPackages />} />
          <Route path={AppRoute.App.PricingPackages.Edit.path} element={<PackageForm />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
