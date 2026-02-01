import { Button } from "../";

function FollowButton({ isFollowing, follow, unfollow, loading}) {

  return (
    <Button
      disabled={loading}
      variant={isFollowing ? "secondary" : "primary"}
      onClick={isFollowing ? unfollow : follow}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
}

export default FollowButton;
