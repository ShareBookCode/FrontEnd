export type OwnerCardProps = {
  name: string;
  avatar: string;
  registrationDate: Date;
  booksGiven: number;
  booksExchanged: number;
  gender: "male" | "female";
  location: string;
  isMessageAvailable: boolean;
};
