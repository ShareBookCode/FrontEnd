import { useGetProfileQuery } from "../../services/api/sharebookApi.ts";
import { ProfileInfo } from "./info";
import { useParams } from "react-router";
import { ProfileOwnButtons } from "./ownButtons";
import { ProfileOtherButtons } from "./otherButtons";

export function Profile() {
  let { userId } = useParams();

  if (userId === "0" || userId === "my" || !userId || !isFinite(+userId)) {
    userId = "-1";
  }

  const isOwnProfile = userId === "-1";

  const { data } = useGetProfileQuery({ userId, zone: 4 });

  return (
    <ProfileInfo profile={data} isOwnProfile={isOwnProfile}>
      {isOwnProfile ? <ProfileOwnButtons /> : <ProfileOtherButtons />}
    </ProfileInfo>
  );
}
