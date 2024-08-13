import { Link } from "react-router-dom";

export default function Admin() {
    return (
        <>
            <section className="container mt-5">
                <div>
                    <h2>Welcome to admin panal</h2>
                    <hr />
                    <Link to={"/add-room"}>Manage Room</Link>
                </div>
            </section>
        </>
    )
}