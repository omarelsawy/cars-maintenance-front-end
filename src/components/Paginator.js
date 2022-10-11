import { Button } from 'react-bootstrap';
import { BsFillCaretRightFill, BsFillCaretLeftFill } from 'react-icons/bs';

const Paginator = ({ page, handlePrev, handleNext }) => {
    return (
        <div>
            <Button onClick={handlePrev}>
                <BsFillCaretLeftFill />
            </Button>
            <span className='m-3'>{page}</span>
            <Button onClick={handleNext}>
                <BsFillCaretRightFill />
            </Button>
        </div>
    )
}

export default Paginator