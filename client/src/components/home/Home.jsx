import HotelService from "../common/HotelService";
import Parallex from "../common/Parallex";
import MainHeader from "../layout/MainHeader";

export default function Home() {
    return (
        <>
            <section>
                <MainHeader />
                <section className="container">
                    <Parallex />
                    <HotelService />
                    <Parallex />
                </section>
            </section>
        </>
    );
}