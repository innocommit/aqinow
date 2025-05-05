import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { rtdb } from "@/configs/firebase.config";
import { SensorData } from "@/types/sensor.type";

export function useSensorRealtime(path: string = "/sensors") {
  const [data, setData] = useState<SensorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sensorRef = ref(rtdb, path);

    const unsubscribe = onValue(
      sensorRef,
      (snapshot) => {
        const val = snapshot.val();
        console.log("Sensor data:", val);
        setData(val ?? null);
        setLoading(false);
      },
      (err) => {
        console.error("Firebase read error:", err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [path]);

  return { data, loading, error };
}
