import { useState } from "react";
import { getUserByEmail } from "@/helpers/get-user-by-email";
import { type DocumentData } from "firebase/firestore";
import { useSession } from "@/store/useSession";

export function useGetUserByEmail(
  onSuccess?: () => void,
  onError?: () => void,
) {
  const [data, setData] = useState<DocumentData | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setFirebaseUser } = useSession();
  async function LoadData(email: string) {
    try {
      setIsLoading(true);
      const data = await getUserByEmail(email);
      if (!data) {
        setData(null);
        if (onError) onError();
      }
      if (data) {
        setData(data);
        setFirebaseUser(data);
        if (onSuccess) onSuccess();
      }
      setIsLoading(false);
    } catch (error) {
      if (error) setIsError(true);
    }
  }
  return { data, isLoading, isError, LoadData };
}
