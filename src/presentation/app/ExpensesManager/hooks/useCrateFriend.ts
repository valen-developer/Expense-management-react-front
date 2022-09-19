import { useSelector } from "react-redux";
import { container } from "tsyringe";
import { FriendCreator } from "../../../../application/Friend/FriendCreator";
import { Friend } from "../../../../domain/Friend/Friend.model";
import { RootState } from "../../store/store";

export const useCreateFriend = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const friendCreator = container.resolve(FriendCreator);

  const handleCreateFriend = (name: string): Promise<Friend> => {
    if (!user) {
      return Promise.reject(new Error("User not authenticated"));
    }

    return friendCreator.create({
      name,
      user: user.uuid.value,
    });
  };

  return {
    handleCreateFriend,
  };
};
