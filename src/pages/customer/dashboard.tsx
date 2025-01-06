import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
  IonAvatar,
} from "@ionic/react";
import {
  bicycle as bicycleOutline,
  car as carOutline,
  bus as truckOutline,
  location as locationOutline,
  time as timeOutline,
  star as starOutline,
  add as addOutline,
} from "ionicons/icons";
import { colors } from "../../theme/shared-styles";

export function CustomerDashboard() {
  const nearbyDrivers = [
    { id: 1, name: "John Doe", rating: 4.8, distance: "0.5km", type: "bike" },
    { id: 2, name: "Jane Smith", rating: 4.9, distance: "1.2km", type: "car" },
    // Add more drivers
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ "--background": colors.white }}>
          <IonTitle>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <IonIcon
                icon={locationOutline}
                style={{ color: colors.primary }}
              />
              <div>
                <div style={{ fontSize: "14px", color: colors.text.secondary }}>
                  Current Location
                </div>
                <div style={{ fontSize: "16px", fontWeight: "bold" }}>
                  123 Main Street, City
                </div>
              </div>
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent
        className="ion-padding"
        style={{ "--background": colors.background }}
      >
        <IonSearchbar
          placeholder="Where to deliver?"
          style={{ "--box-shadow": "none", "--background": colors.white }}
        />

        <IonCard style={{ margin: "24px 0" }}>
          <IonCardContent>
            <h2
              style={{
                margin: "0 0 16px",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              Delivery Type
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "12px",
              }}
            >
              {[
                { icon: bicycleOutline, label: "Bike", color: "#4F46E5" },
                { icon: carOutline, label: "Car", color: "#3B82F6" },
                { icon: truckOutline, label: "Truck", color: "#10B981" },
              ].map((item) => (
                <IonButton
                  key={item.label}
                  fill="outline"
                  style={{
                    "--border-radius": "12px",
                    "--border-color": item.color,
                    "--color": item.color,
                    height: "80px",
                    flexDirection: "column",
                  }}
                >
                  <IonIcon
                    icon={item.icon}
                    style={{ fontSize: "24px", marginBottom: "4px" }}
                  />
                  {item.label}
                </IonButton>
              ))}
            </div>
          </IonCardContent>
        </IonCard>

        <div style={{ margin: "24px 0" }}>
          <h2
            style={{
              margin: "0 0 16px",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            Nearby Drivers
          </h2>
          <IonList style={{ background: "transparent" }}>
            {nearbyDrivers.map((driver) => (
              <IonItem
                key={driver.id}
                style={{
                  "--background": colors.white,
                  "--border-radius": "12px",
                  marginBottom: "8px",
                }}
              >
                <IonAvatar slot="start">
                  <img
                    src={`https://i.pravatar.cc/300?u=${driver.id}`}
                    alt={driver.name}
                  />
                </IonAvatar>
                <IonLabel>
                  <h2 style={{ fontWeight: "bold" }}>{driver.name}</h2>
                  <p
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <IonIcon icon={starOutline} />
                    {driver.rating}
                    <span style={{ margin: "0 4px" }}>•</span>
                    <IonIcon icon={locationOutline} />
                    {driver.distance}
                  </p>
                </IonLabel>
                <IonButton
                  fill="clear"
                  slot="end"
                  style={{ "--color": colors.primary }}
                >
                  Select
                </IonButton>
              </IonItem>
            ))}
          </IonList>
        </div>

        <IonButton
          routerLink="/app/orders/create"
          style={{
            position: "fixed",
            bottom: "80px",
            right: "16px",
            "--border-radius": "50%",
            width: "56px",
            height: "56px",
            "--background": colors.primary,
            "--box-shadow": "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <IonIcon icon={addOutline} />
        </IonButton>
      </IonContent>
    </IonPage>
  );
}
