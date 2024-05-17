import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeDayNight } from "../../store/slice/modeSlice";
import "./styles.scss";
import { Link } from "react-router-dom";
import DarkLightSwitch from "../../components/DarkLightSwitch";
import { CONSTANTS } from "../../constants/constants";
import { RootState } from "../../store/store";
import { Spinner } from "react-bootstrap";
import axios from "axios";
export interface IDarkLightSwitchProps {
  theme: string;
}

const Header = () => {
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [stars, setStars] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const daynight = useSelector((state: RootState) => state.mode);
  const dispatch = useDispatch();
  const { mode } = daynight;

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/${CONSTANTS.REPO_OWNER}/${CONSTANTS.REPO_NAME}`
        );
        const { stargazers_count } = response.data;
        setStars(stargazers_count);
      } catch (error) {
        console.error("Failed to fetch star count:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStars();
  }, []);
  const daynightHandler = () => {
    dispatch(changeDayNight());
  };

  const addStarHandler = async () => {
    try {
      const response = await axios.put(
        `https://api.github.com/user/starred/${CONSTANTS.REPO_OWNER}/${CONSTANTS.REPO_NAME}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
          },
        }
      );

      if (response.status === 204) {
        console.log("Successfully added star to the repository");
        setStars((prevStars) => (prevStars !== null ? prevStars + 1 : 1));
      } else {
        console.error("Failed to add star:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding star:", error);
    }
  };

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
    <nav className="wrap">
      <Link to="/">
        <img src="/assets/icons/lofi-logo.gif" alt="" />
      </Link>
      <div className="nav-menu"></div>
      <div className="nav-menu">
        {loading ? (
          <Spinner size="sm" />
        ) : (
          <div onClick={addStarHandler} className="button">
            <div className="icon">
              {stars !== null ? stars : "N/A"}
              <i className="fas fa-star"></i>
            </div>
          </div>
        )}
        <a target="_blank" rel="noreferrer" href={CONSTANTS.AUTHOR_GITHUB_LINK}>
          <i className="fab fa-github"></i>
          <span>GitHub</span>
        </a>

        <a
          target="_blank"
          rel="noreferrer"
          href={CONSTANTS.AUTHOR_PORTFOLIO_LINK}
        >
          <i className="fas fa-globe"></i>
          <span>portfolio</span>
        </a>
        <div onClick={daynightHandler}>
          <DarkLightSwitch theme={mode} />
        </div>

        <button onClick={fullscreenHandler} className="fullscreen-btn">
          <i className="fas fa-expand fa-lg"></i>
        </button>
      </div>
    </nav>
  );
};

export default Header;
