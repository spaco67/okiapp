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
  IonList,
  IonItem,
  IonLabel,
  IonToggle,
  IonBadge,
} from "@ionic/react";
import {
  location as locationOutline,
  time as timeOutline,
  cash as cashOutline,
  navigate as navigateOutline,
} from "ionicons/icons";
import { useState } from "react";
import { colors } from "../../theme/shared-styles";

export function DriverDashboard() {
  const [isOnline, setIsOnline] = useState(true);
  const [currentOrders] = useState([
    {
      id: 1,
      pickup: "123 Main St",
      dropoff: "456 Oak Ave",
      distance: "3.2km",
      amount: "$15.00",
      time: "15-20 min",
    },
    // Add more orders
  ]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ "--background": colors.white }}>
          <IonTitle>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>Driver Dashboard</div>
              <IonToggle
                checked={isOnline}
                onIonChange={(e) => setIsOnline(e.detail.checked)}
                style={{
                  "--background-checked": colors.success,
                  "--handle-background-checked": colors.white,
                }}
              />
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent
        className="ion-padding"
        style={{ "--background": colors.background }}
      >
        <IonCard style={{ margin: "0 0 24px" }}>
          <IonCardContent>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "16px",
              }}
            >
              <div>
                <div style={{ color: colors.text.secondary }}>
                  Today's Earnings
                </div>
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: colors.success,
                  }}
                >
                  $124.50
                </div>
              </div>
              <div>
                <div style={{ color: colors.text.secondary }}>
                  Completed Orders
                </div>
                <div style={{ fontSize: "24px", fontWeight: "bold" }}>8</div>
              </div>
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
            Available Orders
          </h2>
          <IonList style={{ background: "transparent" }}>
            {currentOrders.map((order) => (
              <IonCard key={order.id} style={{ margin: "0 0 16px" }}>
                <IonCardContent>
                  <div style={{ marginBottom: "16px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "8px",
                      }}
                    >
                      <IonIcon
                        icon={locationOutline}
                        style={{ color: colors.primary }}
                      />
                      <div>
                        <div style={{ fontWeight: "bold" }}>Pickup</div>
                        <div>{order.pickup}</div>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <IonIcon
                        icon={locationOutline}
                        style={{ color: colors.danger }}
                      />
                      <div>
                        <div style={{ fontWeight: "bold" }}>Dropoff</div>
                        <div>{order.dropoff}</div>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderTop: `1px solid ${colors.background}`,
                      paddingTop: "16px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "16px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <IonIcon icon={navigateOutline} />
                        {order.distance}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <IonIcon icon={timeOutline} />
                        {order.time}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <IonIcon icon={cashOutline} />
                        {order.amount}
                      </div>
                    </div>
                    <IonButton
                      style={{
                        "--background": colors.primary,
                        "--border-radius": "8px",
                      }}
                    >
                      Accept
                    </IonButton>
                  </div>
                </IonCardContent>
              </IonCard>
            ))}
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
}
