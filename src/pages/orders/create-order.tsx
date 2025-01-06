import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonIcon,
  IonSearchbar,
} from "@ionic/react";
import {
  location as locationOutline,
  navigate as navigateOutline,
  time as timeOutline,
  cash as cashOutline,
} from "ionicons/icons";
import { useState } from "react";
import { DeliveryMap } from "../../components/map/DeliveryMap";
import { colors } from "../../theme/shared-styles";

interface Location {
  lng: number;
  lat: number;
  address: string;
}

export function CreateOrderPage() {
  const [pickup, setPickup] = useState<Location>();
  const [dropoff, setDropoff] = useState<Location>();
  const [details, setDetails] = useState({
    packageSize: "",
    notes: "",
    estimatedPrice: "$15.00",
    estimatedTime: "15-20 min",
  });

  const handleCreateOrder = () => {
    // TODO: Implement order creation with Firebase
    console.log("Creating order", { pickup, dropoff, details });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ "--background": colors.white }}>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/app/dashboard" />
          </IonButtons>
          <IonTitle>New Delivery</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent
        className="ion-padding"
        style={{ "--background": colors.background }}
      >
        <div style={{ height: "200px", marginBottom: "24px" }}>
          <DeliveryMap pickup={pickup} dropoff={dropoff} />
        </div>

        <IonCard style={{ margin: "0 0 24px" }}>
          <IonCardContent>
            <IonItem lines="none" style={{ "--background": "transparent" }}>
              <IonIcon
                icon={locationOutline}
                slot="start"
                style={{ color: colors.primary }}
              />
              <IonSearchbar
                placeholder="Pickup Location"
                value={pickup?.address}
                onIonChange={(e) => {
                  // TODO: Implement location search
                }}
                style={{ "--box-shadow": "none" }}
              />
            </IonItem>

            <IonItem lines="none" style={{ "--background": "transparent" }}>
              <IonIcon
                icon={locationOutline}
                slot="start"
                style={{ color: colors.danger }}
              />
              <IonSearchbar
                placeholder="Dropoff Location"
                value={dropoff?.address}
                onIonChange={(e) => {
                  // TODO: Implement location search
                }}
                style={{ "--box-shadow": "none" }}
              />
            </IonItem>

            <IonItem lines="none" style={{ "--background": "transparent" }}>
              <IonLabel position="stacked">Package Size</IonLabel>
              <IonInput
                value={details.packageSize}
                onIonChange={(e) =>
                  setDetails({ ...details, packageSize: e.detail.value! })
                }
                placeholder="Small, Medium, Large"
              />
            </IonItem>

            <IonItem lines="none" style={{ "--background": "transparent" }}>
              <IonLabel position="stacked">Additional Notes</IonLabel>
              <IonTextarea
                value={details.notes}
                onIonChange={(e) =>
                  setDetails({ ...details, notes: e.detail.value! })
                }
                placeholder="Any special instructions..."
              />
            </IonItem>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardContent>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <IonIcon icon={cashOutline} />
                <div>
                  <div style={{ color: colors.text.secondary }}>
                    Estimated Price
                  </div>
                  <div style={{ fontWeight: "bold" }}>
                    {details.estimatedPrice}
                  </div>
                </div>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <IonIcon icon={timeOutline} />
                <div>
                  <div style={{ color: colors.text.secondary }}>
                    Estimated Time
                  </div>
                  <div style={{ fontWeight: "bold" }}>
                    {details.estimatedTime}
                  </div>
                </div>
              </div>
            </div>

            <IonButton
              expand="block"
              onClick={handleCreateOrder}
              style={{
                "--background": colors.primary,
                "--border-radius": "10px",
              }}
            >
              Create Delivery Order
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
}
