import Pagination from '@mui/material/Pagination';

const Paginator = ({ pagesCount, handleChangePage }) => {
    return (
        <Pagination className='m-2' count={pagesCount} onChange={handleChangePage}/>
    )
}

export default Paginator