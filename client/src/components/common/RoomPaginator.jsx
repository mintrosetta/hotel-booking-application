export default function RoomPaginator({ currentPage, totalPages, onPageChange }) {
    const pageNumbers = Array.from({length: totalPages}, (_, i) => i + 1);
    
    return (
        <>
            <nav>
                <ul className="pagination justify-content-center">
                    {pageNumbers.map((number, index) => (
                        <li key={index} className={'page-item ' + (currentPage === number) ? "active" : ""}>
                            <button className="page-link" onClick={() => onPageChange(number)}>{number}</button>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}