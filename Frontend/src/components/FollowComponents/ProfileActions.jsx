import { Button, FollowButton} from "../";
import { useNavigate } from "react-router-dom";

function ProfileActions({ isOwnProfile, follow, loading, unfollow, isUserLoggedIn, isFollowedBy , isFollowing  }) {
  if (!isUserLoggedIn) return null;

  const navigate = useNavigate()

  if (isOwnProfile) {
    return (
      <>
        <Button variant="secondary" onClick={() => navigate("/user/profile/edit")}>Edit Profile</Button>
        <Button variant="ghost">Share</Button>
      </>
    );
  }

  return (
    <>
      <FollowButton  
      isFollowing={isFollowing}
      follow={follow}
      unfollow={unfollow}
      loading={loading}
      />
      {isFollowedBy && isFollowing && (<Button variant="secondary">Message</Button>)}
    </>
  );
}
export default ProfileActions