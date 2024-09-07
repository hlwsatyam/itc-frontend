import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
 
const images = [
  "https://i.ibb.co/hCX2zxZ/4-Itc-Carousel.jpg",
  "https://i.ibb.co/8P3hQRR/3-Itc-Carousel.jpg",
  "https://i.ibb.co/bKLY375/2-Itc-Carousel.jpg",
 
  
];

function ImgCarousel() {
  return (
    <div className="box">
      <Carousel
        useKeyboardArrows={true}
        showThumbs={false}
        autoPlay={true}
        interval={2000}
        infiniteLoop={true}
        stopOnHover={false}
        showStatus={false}
      >
        {images.map((URL, index) => (
          <div className="slide" key={index}>
            <img className="h-[500px] object-contain"  alt={`Carousel image ${index + 1}`} src={URL} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default ImgCarousel;
