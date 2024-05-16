import  { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeDayNight } from "../../store/slice/modeSlice";
import "./styles.scss";
import { Link } from "react-router-dom";
import DarkLightSwitch from "../../components/DarkLightSwitch";
import { CONSTANTS } from "../../constants/constants";
import { RootState } from "../../store/store";

export interface IDarkLightSwitchProps {
  theme: string;
}

const Header = () => {
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const daynight = useSelector((state: RootState) => state.mode);
  const dispatch = useDispatch();
  const { mode } = daynight;

  const daynightHandler = () => {
    dispatch(changeDayNight());
  };
const addStarHandler = () => {
  console.log('star');
}
const stars : number = 3;
  const fullscreenHandler = () => {
    if (!fullscreen) {
      document.documentElement.requestFullscreen();
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  return (
    <nav className='wrap'>
      <Link to='/'>
        <img src='/assets/icons/lofi-logo.gif' alt='' />
      </Link>
      <div className='nav-menu'></div>
      <div className='nav-menu'>
        <a target='_blank' rel='noreferrer' href={CONSTANTS.AUTHOR_GITHUB_LINK}>
          <i className='fab fa-github'></i>
          <span>GitHub</span>
        </a>
        <div className='github-stars'>
          <span>{stars} Stars</span>
          <button onClick={addStarHandler} className='star-btn'>
            <i className='fas fa-star'></i> Star
          </button>
        </div>
        <a target='_blank' rel='noreferrer' href={CONSTANTS.AUTHOR_PORTFOLIO_LINK}>
          <i className='fas fa-globe'></i>
          <span>portfolio</span>
        </a>
        <div onClick={daynightHandler}>
          <DarkLightSwitch theme={mode} />
        </div>

        <button onClick={fullscreenHandler} className='fullscreen-btn'>
          <i className='fas fa-expand fa-lg'></i>
        </button>
      </div>
    </nav>
  );
};

export default Header;
