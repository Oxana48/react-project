import { useMutation } from "@tanstack/react-query";
import { addToFavourites, removeFromFavourites } from "../api/Favourites";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { selectUser, setUser } from "../store/authSlice";

export const useFavourites = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const addMutation = useMutation({
    mutationFn: addToFavourites,
    onSuccess: (updatedUser) => {
      dispatch(setUser(updatedUser));
    },
  });

  const removeMutation = useMutation({
    mutationFn: removeFromFavourites,
    onSuccess: (updatedUser) => {
      dispatch(setUser(updatedUser));
    },
  });

  const isFavourite = (movieId?: number): boolean => {
    if (!movieId || !user?.favorites) return false;
    return user.favorites.includes(movieId.toString());
  };

  const toggleFavourite = async (movieId: number) => {
    if (isFavourite(movieId)) {
      removeMutation.mutate(movieId);
    } else {
      addMutation.mutate(movieId);
    }
  };

  return {
    isFavourite,
    toggleFavourite,
    addMutation,
    removeMutation,
    isLoading: addMutation.isPending || removeMutation.isPending,
  };
};
