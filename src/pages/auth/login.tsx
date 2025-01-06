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
} from "@ionic/react";
import {
  mail as mailOutline,
  lockClosed as lockClosedOutline,
  logoGoogle,
} from "ionicons/icons";
import { useState } from "react";
import { colors } from "../../theme/shared-styles";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory, useLocation } from "react-router-dom";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const history = useHistory();
  const location = useLocation<{ from: { pathname: string } }>();

  const handleLogin = async () => {
    try {
      setError("");
      setLoading(true);

      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      await login(email, password);
      history.replace(location.state?.from || "/app");
    } catch (err) {
      console.error("Login error:", err);
      setError(err instanceof Error ? err.message : "Failed to sign in");
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
              marginTop: "2rem",
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
              Welcome Back
            </h1>
            <p
              style={{
                color: colors.text.secondary,
                marginBottom: "2rem",
              }}
            >
              Sign in to continue
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
                icon={mailOutline}
                slot="start"
                style={{ color: colors.text.secondary }}
              />
              <IonInput
                type="email"
                placeholder="Email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
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
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
                style={{ "--padding-start": "8px" }}
              />
            </IonItem>

            <IonButton
              expand="block"
              className="ion-margin-top"
              onClick={handleLogin}
              disabled={loading}
              style={{
                "--background": colors.primary,
                "--border-radius": "10px",
                margin: "24px 0 16px",
              }}
            >
              {loading ? "Signing In..." : "Sign In"}
            </IonButton>

            <div className="ion-text-center">
              <IonButton
                fill="outline"
                expand="block"
                style={{
                  "--border-radius": "10px",
                  "--border-color": colors.text.secondary,
                  "--color": colors.text.primary,
                }}
              >
                <IonIcon icon={logoGoogle} slot="start" />
                Sign in with Google
              </IonButton>
            </div>

            <div
              className="ion-text-center ion-padding-top"
              style={{ marginTop: "16px" }}
            >
              <IonButton
                fill="clear"
                routerLink="/register"
                style={{
                  "--color": colors.text.secondary,
                  fontSize: "14px",
                }}
              >
                Don't have an account?{" "}
                <span style={{ color: colors.primary, marginLeft: "4px" }}>
                  Sign Up
                </span>
              </IonButton>
            </div>
          </IonCardContent>
        </IonCard>

        {error && (
          <div
            style={{
              color: colors.danger,
              textAlign: "center",
              marginTop: "16px",
            }}
          >
            {error}
          </div>
        )}
      </IonContent>
    </IonPage>
  );
}
