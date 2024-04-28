import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

      useEffect(()=>{
        window.scrollTo(0,0);
      },[location])


    const controlNavbar=()=>{
      if(window.scrollY > 200){
        if(window.scrollY > lastScrollY && !mobileMenu){
          setShow("hide")
        }
        else{
          setShow("show")
        }
       
      }else{
        setShow("top");
      }
      setLastScrollY(window.scrollY)
    }

    useEffect(()=>{
      window.addEventListener("scroll",controlNavbar);
      return ()=> window.removeEventListener("scroll",controlNavbar);
    },[lastScrollY])

    
    const openSearch=()=>{
      setMobileMenu(false)
      setShowSearch(true)
    }
    const openMobileMenu=()=>{
      setMobileMenu(true)
      setShowSearch(false)
    }

    const searchQueryHandler = () => {
      if (query.trim() !== "") {
          navigate(`/search/${query}`);
          setTimeout(()=>{
            setShowSearch(false);
          },1000)
      }
  };

  const handleKeyPress = (event) => {
      if (event.key === "Enter") {
          searchQueryHandler();
      }
  };

  const navigationHandler=(type)=>{
    if(type==="movie"){
      navigate("/explore/movie")
    }else{
      navigate("/explore/tv")
    }
    setMobileMenu(false)
  }

  const goToHome = () => {
    navigate("/");
};



    return (
        <header className={`header ${mobileMenu ? "mobileView":""} ${show}`}><ContentWrapper>
          <div className="logo" onClick={goToHome}>
            <img src={logo} alt=""/>
          </div>
          <ul className="menuItems">
            <li className="menuItem" onClick={()=>navigationHandler("movie")}>Movies</li>
            <li className="menuItem" onClick={()=>navigationHandler("tv")}>Tv Shows</li>
            <li className="menuItem"><HiOutlineSearch onClick={openSearch}/></li>
          </ul>
            
          <div className="mobileMenuItems"><HiOutlineSearch onClick={openSearch}/>
          {mobileMenu ?  <VscChromeClose onClick={()=>{
            setMobileMenu(false)
          }}/>: <SlMenu onClick={openMobileMenu}/>}
          </div>
          
          
          </ContentWrapper>
       {showSearch &&   <div className="searchBar">
            <ContentWrapper> 
                 <input className="searchInput"
                            type="text"
                            placeholder='Search for a movie or TV show...'
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={handleKeyPress}
                        />
                         <VscChromeClose onClick={()=>{
            setShowSearch(false)
          }}/>
                  
            </ContentWrapper>
          </div>}
          
          </header>
    );
};

export default Header;