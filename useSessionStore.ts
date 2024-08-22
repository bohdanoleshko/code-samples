import { type IDiscordUser } from "@/types/discord-user";
import { type DocumentData } from "firebase/firestore";
import { create } from "zustand";

interface Store {
  discordToken: string | null;
  discordUser: IDiscordUser | null;
  firebaseUser: DocumentData | null;
  setFirebaseUser: (data: DocumentData) => void;
  setDiscordUser: (data: IDiscordUser) => void;
  setDiscordToken: (token: string) => void;
  logOut: () => void;
}

const getFirebaseUserFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const user = window.localStorage.getItem("firebaseUser");
    if (user && user?.length !== 0) return JSON.parse(user) as DocumentData;
  }
  return null;
};

const getDiscordUserLocalStorage = () => {
  if (typeof window !== "undefined") {
    const user = window.localStorage.getItem("discordUser");
    if (user && user?.length !== 0) return JSON.parse(user) as IDiscordUser;
  }
  return null;
};

const getDiscordTokenLocalStorage = () => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("discordToken");
    if (token && token?.length !== 0) return token;
  }
  return null;
};

const setFirebaseUserToLocalStorage = (data: DocumentData) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("firebaseUser", JSON.stringify(data));
  }
};

const setDiscordUserLocalStorage = (data: IDiscordUser) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(
      "discordUser",
      JSON.stringify({
        ...data,
        createdAt: new Date().toISOString().split("T")[0],
      }),
    );
  }
};

const setDiscordTokenLocalStorage = (data: string) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("discordToken", data);
  }
};

const logOut = () => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem("firebaseUser");
    window.localStorage.removeItem("discordUser");
    window.localStorage.removeItem("discordToken");
  }
};

export const useSession = create<Store>()((set) => ({
  firebaseUser: getFirebaseUserFromLocalStorage(),
  discordUser: getDiscordUserLocalStorage(),
  discordToken: getDiscordTokenLocalStorage(),
  logOut: () =>
    set(() => {
      logOut();
      return {
        firebaseUser: null,
        discordToken: null,
        discordUser: null,
      };
    }),
  setDiscordToken: (data) =>
    set(() => {
      setDiscordTokenLocalStorage(data);
      return { discordToken: data };
    }),
  setDiscordUser: (data) =>
    set(() => {
      setDiscordUserLocalStorage(data);
      return {
        discordUser: data,
      };
    }),
  setFirebaseUser: (data) =>
    set(() => {
      setFirebaseUserToLocalStorage(data);
      return { firebaseUser: data };
    }),
}));
