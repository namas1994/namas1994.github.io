import { useEffect, useRef, useState } from "react";
import { ProfileContext, type ProfileContextType } from "./ProfileContext";
import profileData from "../data/profile.json";

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const initialized = useRef(true);
  const [profile, setProfile] = useState<ProfileContextType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | unknown>(null);

  useEffect(() => {
    setLoading(true);
    try {
      const data = profileData as unknown as ProfileContextType;
      setProfile({
        ...data,
        initialized: initialized,
      });
    } catch (err) {
      console.error("Error fetching configuration:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [profile?.initialized]); // Run only once on component mount

  if (loading || !profile) {
    return <div>Loading profile...</div>; // Or a spinner/loading component
  }
  if (error) {
    return (
      <div>
        Error loading configuration:{" "}
        {error instanceof Error ? error.message : "Unkown error"}
      </div>
    );
  }

  return (
    <ProfileContext.Provider value={{ ...profile }}>
      {children}
    </ProfileContext.Provider>
  );
}
