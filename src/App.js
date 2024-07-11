import { Routes, Route, BrowserRouter} from "react-router-dom";
import Login from "./pages/auth/login/Login";
import MainRoute from "./route/mainRoute/MainRoute";
import AuthRoute from "./route/authRoute/AuthRoute";
import Home from "./pages/screen/home/Home";
import TVShowList from "./pages/screen/tvShow/TvShow";
import MovieList from "./pages/screen/movie/Movie";
import MyList from "./pages/screen/myList/MyList";
import ComingSoon from "./pages/screen/comingSoon/ComingSoon";
import Notification from "./pages/screen/notification/Notification";
import Profile from "./pages/screen/profile/Profile";
import Setting from "./pages/screen/setting/Setting";
import TVShowDetail from "./pages/screen/tvShowDetail/TvShowDetail";


export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainRoute/>}>
            <Route index element={<Home/>} />
            <Route path="/tvShow" element={<TVShowList />} />
            <Route path="/tv/:id" element={<TVShowDetail />} />
            <Route path="/movie" element={<MovieList />} />
            <Route path="/myList" element={<MyList />} />
            <Route path="/comingSoon" element={<ComingSoon />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/setting" element={<Setting />} />
          </Route>
          <Route path="/auth" element={<AuthRoute />}>
            <Route path="/auth/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}
