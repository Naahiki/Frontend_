import "./HeroVideo.css";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";

export const HeroVideo = () => {
  const Navigate = useNavigate();
  return (
    <div className="hero-video-container">
      <div className="hero-video">
        <ReactPlayer
          url="https://res.cloudinary.com/diej1zlz4/video/upload/v1727947032/samples/elephants.mp4"
          playing
          playbackRate={1.5}
          muted
          loop
          controls={false}
          width={"100%"}
          height={"100%"}
        />
      </div>
      <div className="hero-text">
        <h1>Explora el Mundo con Nuestros Paquetes de Viaje Exclusivos</h1>
        <h2>Donde la Aventura y el Confort se Unen – Prepárate para tu Próxima Escapada</h2>
      </div>


      <button
        onClick={() => Navigate("packs-listing")}
        className="shop-now-btn"
      >
        Explora ahora
      </button>
    </div>
  );
};
