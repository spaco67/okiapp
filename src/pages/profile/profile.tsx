import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonButton,
  IonAvatar,
} from "@ionic/react";
import {
  person as personOutline,
  mail as mailOutline,
  call as callOutline,
  star as starOutline,
  settings as settingsOutline,
  helpCircle as helpCircleOutline,
  logOut as logOutOutline,
} from "ionicons/icons";
import { colors } from "../../theme/shared-styles";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export function ProfilePage() {
  const { profile, logout } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await logout();
      history.push("/login");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  if (!profile) {
    return null;
  }

  const menuItems = [
    { icon: settingsOutline, label: "Settings", route: "/app/settings" },
    { icon: helpCircleOutline, label: "Help & Support", route: "/app/support" },
    { icon: logOutOutline, label: "Logout", action: handleLogout },
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ "--background": colors.white }}>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent style={{ "--background": colors.background }}>
        <div
          style={{
            background: colors.white,
            padding: "24px",
            textAlign: "center",
          }}
        >
          <IonAvatar
            style={{
              width: "80px",
              height: "80px",
              margin: "0 auto 16px",
            }}
          >
            <img
              src={`https://i.pravatar.cc/300?u=${profile.email}`}
              alt={profile.name}
            />
          </IonAvatar>

          <h2
            style={{
              margin: "0 0 8px",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            {profile.name}
          </h2>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "16px",
              color: colors.text.secondary,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <IonIcon icon={starOutline} />
              {profile.rating?.toFixed(1)}
            </div>
            <div>•</div>
            <div>{profile.completedOrders || 0} Orders</div>
          </div>
        </div>

        <IonList style={{ background: "transparent", padding: "16px" }}>
          <IonItem
            lines="none"
            style={{
              "--background": colors.white,
              borderRadius: "12px",
              marginBottom: "8px",
            }}
          >
            <IonIcon
              icon={mailOutline}
              slot="start"
              style={{ color: colors.primary }}
            />
            <IonLabel>
              <div style={{ color: colors.text.secondary }}>Email</div>
              <div style={{ fontWeight: "500" }}>{profile.email}</div>
            </IonLabel>
          </IonItem>

          <IonItem
            lines="none"
            style={{
              "--background": colors.white,
              borderRadius: "12px",
              marginBottom: "16px",
            }}
          >
            <IonIcon
              icon={callOutline}
              slot="start"
              style={{ color: colors.primary }}
            />
            <IonLabel>
              <div style={{ color: colors.text.secondary }}>Phone</div>
              <div style={{ fontWeight: "500" }}>{profile.phone}</div>
            </IonLabel>
          </IonItem>

          {menuItems.map((item, index) => (
            <IonItem
              key={index}
              lines="none"
              button
              onClick={item.action}
              routerLink={item.route}
              style={{
                "--background": colors.white,
                borderRadius: "12px",
                marginBottom: "8px",
              }}
            >
              <IonIcon
                icon={item.icon}
                slot="start"
                style={{
                  color:
                    item.icon === logOutOutline
                      ? colors.danger
                      : colors.primary,
                }}
              />
              <IonLabel
                style={{
                  color:
                    item.icon === logOutOutline
                      ? colors.danger
                      : colors.text.primary,
                }}
              >
                {item.label}
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}
