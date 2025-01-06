import {
  IonContent,
  IonPage,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonCard,
  IonCardContent,
  IonIcon,
  IonText,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import {
  person as personOutline,
  mail as mailOutline,
  lockClosed as lockClosedOutline,
  call as callOutline,
  business as businessOutline,
} from "ionicons/icons";
import { useState } from "react";
import { colors } from "../../theme/shared-styles";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    userType: "customer" as const,
    phone: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const history = useHistory();

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleRegister = async () => {
    try {
      setError("");
      setLoading(true);

      // Validate form data
      if (!formData.email || !formData.password || !formData.name || !formData.phone) {
        throw new Error("All fields are required");
      }

      // Create user profile data
      const profileData = {
        email: formData.email,
        name: formData.name,
        phone: formData.phone,
        userType: formData.userType,
        rating: 5.0,
        completedOrders: 0,
        ...(formData.userType === 'driver' && {
          isOnline: false,
          vehicleType: 'car' as const,
        }),
      };

      await register(formData.email, formData.password, profileData);
      history.push("/app");
    } catch (err) {
      console.error("Registration error:", err);
      setError(err instanceof Error ? err.message : "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent
        className="ion-padding"
        style={{ "--background": colors.background }}
      >
        <div className="ion-text-center ion-padding-vertical">
          <img
            src="/assets/logo.png"
            alt="Logo"
            style={{
              width: "120px",
              marginTop: "1rem",
            }}
          />
          <IonText>
            <h1
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: colors.text.primary,
              }}
            >
              Create Account
            </h1>
            <p
              style={{
                color: colors.text.secondary,
                marginBottom: "1rem",
              }}
            >
              Join our delivery network
            </p>
          </IonText>
        </div>

        <IonCard
          style={{
            boxShadow: "none",
            background: colors.white,
            borderRadius: "16px",
          }}
        >
          <IonCardContent>
            <IonItem lines="none" style={{ "--background": "transparent" }}>
              <IonIcon
                icon={personOutline}
                slot="start"
                style={{ color: colors.text.secondary }}
              />
              <IonInput
                placeholder="Full Name"
                value={formData.name}
                onIonChange={(e) => handleChange("name", e.detail.value!)}
                style={{ "--padding-start": "8px" }}
              />
            </IonItem>

            <IonItem lines="none" style={{ "--background": "transparent" }}>
              <IonIcon
                icon={mailOutline}
                slot="start"
                style={{ color: colors.text.secondary }}
              />
              <IonInput
                type="email"
                placeholder="Email"
                value={formData.email}
                onIonChange={(e) => handleChange("email", e.detail.value!)}
                style={{ "--padding-start": "8px" }}
              />
            </IonItem>

            <IonItem lines="none" style={{ "--background": "transparent" }}>
              <IonIcon
                icon={lockClosedOutline}
                slot="start"
                style={{ color: colors.text.secondary }}
              />
              <IonInput
                type="password"
                placeholder="Password"
                value={formData.password}
                onIonChange={(e) => handleChange("password", e.detail.value!)}
                style={{ "--padding-start": "8px" }}
              />
            </IonItem>

            <IonItem lines="none" style={{ "--background": "transparent" }}>
              <IonIcon
                icon={callOutline}
                slot="start"
                style={{ color: colors.text.secondary }}
              />
              <IonInput
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onIonChange={(e) => handleChange("phone", e.detail.value!)}
                style={{ "--padding-start": "8px" }}
              />
            </IonItem>

            <IonItem lines="none" style={{ "--background": "transparent" }}>
              <IonIcon
                icon={businessOutline}
                slot="start"
                style={{ color: colors.text.secondary }}
              />
              <IonSelect
                placeholder="Select Account Type"
                value={formData.userType}
                onIonChange={(e) => handleChange("userType", e.detail.value)}
                style={{ width: "100%", "--padding-start": "8px" }}
              >
                <IonSelectOption value="customer">Customer</IonSelectOption>
                <IonSelectOption value="driver">
                  Delivery Driver
                </IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonButton
              expand="block"
              className="ion-margin-top"
              onClick={handleRegister}
              disabled={loading}
              style={{
                "--background": colors.primary,
                "--border-radius": "10px",
                margin: "24px 0 16px",
              }}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </IonButton>

            <div className="ion-text-center">
              <IonButton
                fill="clear"
                routerLink="/login"
                style={{
                  "--color": colors.text.secondary,
                  fontSize: "14px",
                }}
              >
                Already have an account?{" "}
                <span style={{ color: colors.primary, marginLeft: "4px" }}>
                  Sign In
                </span>
              </IonButton>
            </div>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
}
