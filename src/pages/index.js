import Head from "next/head";
import MyCarousel from "../../components/home/Carousel";
import Image from "next/image";
import { SiOrigin } from "react-icons/si";
import { MdOutlineSentimentSatisfiedAlt } from "react-icons/md";
import { RiLuggageCartFill } from "react-icons/ri";
import { GiHandTruck } from "react-icons/gi";
import { BiRightArrow } from "react-icons/bi";
import { AiOutlineArrowRight } from "react-icons/ai";
import ProductHolder from "../../components/product/ProductHolder";
import { useRouter } from "next/router";
import Ad from "../../components/home/Ad";

export default function Home() {
  const Card = ({ icon, title, cont }) => {
    return (
      <div className="home__3_card">
        <div className="home__3_ico">{icon}</div>
        <p>{title}</p>
        <p>{cont}</p>
      </div>
    );
  };
  const Card2 = ({ img, tit }) => {
    return (
      <div className="home__4_card">
        <div className="home__4_img">
          <Image src={img} alt="image" width={500} height={500} />
        </div>
        <div className="home__4_cta">
          <p style={{ textTransform: "capitalize" }}>{tit}</p>
          <AiOutlineArrowRight />
        </div>
      </div>
    );
  };
  return (
    <>
      <Head>
        <title>Urban Bliss</title>
        <meta name="description" content="Urban Bliss an Ecommerce Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <main className="home">
        <MyCarousel />
        <section className="home__brands">
          <div className="home__brands_tit">
            <p>Brands</p>
          </div>
          <div className="home__brands_hold">
            <Image src="/adidas.png" width={80} height={80} alt="img" />
            <Image src="/chanel.png" width={80} height={80} alt="img" />
            <Image src="/dolce.png" width={80} height={80} alt="img" />
            <Image src="/dockers.png" width={80} height={80} alt="img" />
            <Image src="/fila.png" width={80} height={80} alt="img" />
            <Image src="/calvin.png" width={80} height={80} alt="img" />
            <Image src="/authorised.png" width={80} height={80} alt="img" />
            <Image src="/armani.png" width={80} height={80} alt="img" />
          </div>
        </section>
        <section className="home__2">
          <p>We provide best customer experiences</p>
          <p>We ensure our customers have the best shopping experience</p>
        </section>
        <section className="home__3">
          <Card
            icon={<SiOrigin />}
            title="Origional Products"
            cont={
              "We provide money back gurantee if the products are not original"
            }
          />
          <Card
            icon={<MdOutlineSentimentSatisfiedAlt />}
            title="Satisfaction Gurantee"
            cont={"Exchange the products you purchased if it dosent fits you"}
          />
          <Card
            icon={<RiLuggageCartFill />}
            title="New Arrival Everyday"
            cont={"We update our collection almost everyday"}
          />
          <Card
            icon={<GiHandTruck />}
            title="fast & free shipping"
            cont={"We offer fast and free shipping for our loyal customers"}
          />
        </section>
        <section className="home__4">
          <p>Currated Picks</p>
          <div className="home__4_hold">
            <Card2 img="/c1.jpg" tit="best seller" />
            <Card2 img="/c2.jpg" tit="shop men" />
            <Card2 img="/c3.jpg" tit="shop women" />
            <Card2 img="/c4.jpg" tit="shop casual" />
          </div>
        </section>
        <ProductHolder title={"Deals of the day"} feature="dod" />
        <Ad
          img="/a1.jpg"
          title="35% off only this friday and get special gifts"
        />
        <ProductHolder title={"New Arrivals"} feature="nA" />
      </main>
    </>
  );
}
