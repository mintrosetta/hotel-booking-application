import HotelService from "../common/HotelService";
import Parallex from "../common/Parallex";
import RoomCarousel from "../common/RoomCarousel";
import MainHeader from "../layout/MainHeader";

export default function Home() {
    return (
        <>
            <section>
                <MainHeader />
                <section className="container">
                    <RoomCarousel />
                    <Parallex />
                    <HotelService />
                    <Parallex />
                </section>
            </section>
        </>
    );
}