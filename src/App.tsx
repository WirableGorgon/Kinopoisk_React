
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import './App.css'
import { MainPage } from './pages/MainPage';
import { FetchAboutPage } from "./pages/AboutPage/FetchAboutPage";
import { queryClient } from "./api/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ModalWindow } from "./components/ModalWindow/ModalWindow";
import { useEffect, useState } from "react";
import { AuthForm } from "./components/LogRegModal/AuthForm";
import { Favorite, profile } from "./api/api";
import { Search } from "./components/Search/Search";
import { LoginButton } from "./components/LoginButton/LoginButton";
import { Profile } from "./pages/Profile/Profile";
import { FetchGenresPage } from "./pages/GenresPage/FetchGenresPage";
import { FetchGenreFilmsPage } from "./pages/GenreFilmsPage/FetchGenreFilmsPage";

export function App() {

  const [activeItem, setActiveItem] = useState('home');

  const [modalActive, setModalActive] = useState(false)
  const [userData, setUserData] = useState<Favorite | undefined>()
  //const [searchValue, setSearchValue] = useState('')

  const changeModalActive = (state: boolean) => setModalActive(state);
  const changeUserData = (obj: Favorite | undefined) => setUserData(obj);
  //const changeSearch = (str: string) => setSearchValue(str);

  useEffect(() => {
    profile().then((res) => setUserData(res))
  }, [])

  return (
    <BrowserRouter>
      <div className='header'>
        <nav className='navig'>
          <Link to={'/'} className='logo'>
            <img src="../logo.svg"/>
          </Link>
          <div className="nav-search">
            <Link to={'/'} className={`navig-but ${activeItem === 'home' ? 'active' : ''}`} onClick={() => setActiveItem('home')}>Главная</Link>
            <Link to={'/genres'} className={`navig-but ${activeItem === 'genres' ? 'active' : ''}`} onClick={() => setActiveItem('genres')}>Жанры</Link>
            <QueryClientProvider client={queryClient}>
              <Search />
            </QueryClientProvider>
          </div>
          <ModalWindow active={modalActive} setActive={changeModalActive} prop={<AuthForm changeUserData={changeUserData} changeModalActive={changeModalActive} />} />
          <LoginButton userData={userData} changeModalActive={changeModalActive} changeUserData={changeUserData} />
        </nav>
      </div>

      <main className='content'>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path='/' element={<MainPage active={modalActive} changeUserData={changeUserData} changeModalActive={changeModalActive} />} />
          <Route path='/film/:id' element={<FetchAboutPage active={modalActive} changeUserData={changeUserData} changeModalActive={changeModalActive} />} />
          <Route path="/genres" element={<FetchGenresPage />} />
          <Route path="/genres/:genre" element={<FetchGenreFilmsPage />} />
          <Route path="/profile" element={<Profile userData={userData} changeUserData={changeUserData} />} />
        </Routes>
      </QueryClientProvider>
      </main>
    </BrowserRouter>  
  )
}
