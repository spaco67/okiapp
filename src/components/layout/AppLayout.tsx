import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
} from "@ionic/react";
import { Route, Redirect } from "react-router-dom";
import {
  home as homeOutline,
  location as locationOutline,
  person as personOutline,
  document as documentTextOutline,
} from "ionicons/icons";
import { CustomerDashboard } from "../../pages/customer/dashboard";
import { DriverDashboard } from "../../pages/driver/dashboard";
import { OrdersPage } from "../../pages/orders/orders";
import { ProfilePage } from "../../pages/profile/profile";
import { colors } from "../../theme/shared-styles";
import { CreateOrderPage } from "../../pages/orders/create-order";
import { useAuth } from "../../contexts/AuthContext";

export function AppLayout() {
  const { profile } = useAuth();
  const userType = profile?.userType || 'customer';

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/app/dashboard">
          {userType === "customer" ? <CustomerDashboard /> : <DriverDashboard />}
        </Route>
        <Route exact path="/app/orders" component={OrdersPage} />
        <Route exact path="/app/orders/create" component={CreateOrderPage} />
        <Route exact path="/app/profile" component={ProfilePage} />
        <Route exact path="/app">
          <Redirect to="/app/dashboard" />
        </Route>
      </IonRouterOutlet>

      <IonTabBar
        slot="bottom"
        style={{
          "--background": colors.white,
          "--border": "none",
          boxShadow: "0 -4px 12px rgba(0, 0, 0, 0.05)",
        }}
      >
        <IonTabButton tab="dashboard" href="/app/dashboard">
          <IonIcon icon={homeOutline} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>

        <IonTabButton tab="orders" href="/app/orders">
          <IonIcon icon={documentTextOutline} />
          <IonLabel>Orders</IonLabel>
        </IonTabButton>

        <IonTabButton tab="profile" href="/app/profile">
          <IonIcon icon={personOutline} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}
