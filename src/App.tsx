import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import { lazy, Suspense, useEffect } from "react";
import { useAppDispatch } from "./store/hooks";
import { setUser, setLoading } from "./store/authSlice";
import { fetchUserProfile } from "./api/User";
import { useQuery } from "@tanstack/react-query";
import "./App.css";

const LazyCustomLayout = lazy(() => import("./components/Layout/CustomLayout"));
const LazyMainPage = lazy(() => import("./pages/MainPage/MainPage"));
const LazyGenrePage = lazy(() => import("./pages/GenrePage/GenrePage"));
const LazyGenreMoviesPage = lazy(
  () => import("./pages/GenreMoviesPage/GenreMoviesPage")
);
const LazyMoviePage = lazy(() => import("./pages/MoviePage/MoviePage"));
const LazyProfilePage = lazy(() => import("./pages/ProfilePage/ProfilePage"));

function App() {
  const dispatch = useAppDispatch();

  const queryMe = useQuery({
    queryKey: ["profile"],
    queryFn: fetchUserProfile,
    retry: false,
  });

  useEffect(() => {
    if (queryMe.data) {
      dispatch(setUser(queryMe.data));
    }

    if (queryMe.isError || !queryMe.isSuccess) {
      dispatch(setLoading(false));
    }
  }, [queryMe.data, queryMe.isError, queryMe.isSuccess, dispatch]);

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading</div>}>
        <Routes>
          <Route path="/" element={<LazyCustomLayout />}>
            <Route index element={<LazyMainPage />} />
            <Route path="/genres" element={<LazyGenrePage />} />
            <Route
              path="/movie/genres/:genreId"
              element={<LazyGenreMoviesPage />}
            />
            <Route path="/movie/:id" element={<LazyMoviePage />} />
            <Route path="/profile" element={<LazyProfilePage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
