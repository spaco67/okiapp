import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
  IonIcon,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import {
  location as locationOutline,
  time as timeOutline,
  cash as cashOutline,
} from "ionicons/icons";
import { useState } from "react";
import { colors } from "../../theme/shared-styles";

interface Order {
  id: number;
  pickup: string;
  dropoff: string;
  status: "pending" | "active" | "completed";
  price: string;
  time: string;
  date: string;
}

export function OrdersPage() {
  const [selectedSegment, setSelectedSegment] = useState<"active" | "history">(
    "active"
  );
  const [orders] = useState<Order[]>([
    {
      id: 1,
      pickup: "123 Main St",
      dropoff: "456 Oak Ave",
      status: "active",
      price: "$15.00",
      time: "15-20 min",
      date: "2024-03-20 14:30",
    },
    {
      id: 2,
      pickup: "789 Pine St",
      dropoff: "321 Elm St",
      status: "completed",
      price: "$25.00",
      time: "25-30 min",
      date: "2024-03-19 16:45",
    },
  ]);

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return colors.warning;
      case "active":
        return colors.primary;
      case "completed":
        return colors.success;
      default:
        return colors.text.secondary;
    }
  };

  const filteredOrders = orders.filter((order) =>
    selectedSegment === "active"
      ? order.status === "active" || order.status === "pending"
      : order.status === "completed"
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ "--background": colors.white }}>
          <IonTitle>My Orders</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent style={{ "--background": colors.background }}>
        <IonSegment
          value={selectedSegment}
          onIonChange={(e) =>
            setSelectedSegment(e.detail.value as "active" | "history")
          }
          style={{
            padding: "12px",
            "--background": colors.white,
          }}
        >
          <IonSegmentButton value="active">
            <IonLabel>Active</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="history">
            <IonLabel>History</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        <IonList style={{ background: "transparent", padding: "16px" }}>
          {filteredOrders.map((order) => (
            <IonItem
              key={order.id}
              style={{
                "--background": colors.white,
                borderRadius: "12px",
                marginBottom: "12px",
              }}
            >
              <IonLabel>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <h2 style={{ fontWeight: "bold" }}>Order #{order.id}</h2>
                  <IonBadge
                    style={{
                      backgroundColor: getStatusColor(order.status),
                      textTransform: "capitalize",
                    }}
                  >
                    {order.status}
                  </IonBadge>
                </div>

                <div style={{ marginBottom: "8px" }}>
                  <p
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      margin: "4px 0",
                    }}
                  >
                    <IonIcon
                      icon={locationOutline}
                      style={{ color: colors.primary }}
                    />
                    From: {order.pickup}
                  </p>
                  <p
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      margin: "4px 0",
                    }}
                  >
                    <IonIcon
                      icon={locationOutline}
                      style={{ color: colors.danger }}
                    />
                    To: {order.dropoff}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "16px",
                    color: colors.text.secondary,
                    fontSize: "14px",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <IonIcon icon={timeOutline} />
                    {order.time}
                  </span>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <IonIcon icon={cashOutline} />
                    {order.price}
                  </span>
                </div>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}
