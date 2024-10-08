import ReactPlayer from "react-player";
import "./VideosSection.css";
import Tilt from "react-parallax-tilt";

export const VideosSection = () => {
  return (
    <>
      <div className="video-container">
        <Tilt transitionSpeed={1000} scale={1.07} className="video-card">
          <ReactPlayer
            url="https://res.cloudinary.com/diej1zlz4/video/upload/v1727947032/samples/sea-turtle.mp4"
            playing
            playbackRate={1.15}
            muted
            loop
            controls={false}
            width="100%"
            height="119.9%"
          />
          <h3>Escapada Tropical a las Maldivas</h3>
        </Tilt>

        <Tilt transitionSpeed={1000} scale={1.07} className="video-card">
          <ReactPlayer
            url="https://res.cloudinary.com/diej1zlz4/video/upload/v1727963662/alpes_pghyab.mp4"
            playing
            playbackRate={1.6}
            muted
            loop
            controls={false}
            width="100%"
            height="112.65%"
          />
          <h3>Aventura en los Alpes Suizos</h3>
        </Tilt>

        <Tilt transitionSpeed={1000} scale={1.07} className="video-card">
          <ReactPlayer
            url="https://res.cloudinary.com/diej1zlz4/video/upload/v1727963742/europa_rryogf.mp4"
            playing
            playbackRate={2.8}
            muted
            loop
            controls={false}
            width="100%"
            margin="0px"
            padding="0px"
            height="119.9%"
          />
          <h3>Tour Cultural por las Ciudades Europeas</h3>
        </Tilt>

        <Tilt transitionSpeed={1000} scale={1.07} className="video-card">
          <ReactPlayer
            url="https://res.cloudinary.com/diej1zlz4/video/upload/v1727963827/bali_ok9p0i.mp4"
            playing
            playbackRate={1}
            muted
            loop
            controls={false}
            width="100%"
            height="119.8%"
          />
          <h3>Descanso en las Playas de Bali</h3>
        </Tilt>
      </div>
    </>
  );
};
