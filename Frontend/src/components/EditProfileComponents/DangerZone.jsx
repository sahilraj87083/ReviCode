import { Button } from '../'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
function DangerZone() {
    const navigate = useNavigate()

    const handleClick = () => {
        toast.success("Under Development")
        navigate('/user/dashboard')
    }
    return (
        <div className="border border-red-500/30 p-6 rounded">
            <h3 className="text-red-500 font-semibold">Danger Zone</h3>
            <Button className="mt-4 bg-red-700 px-4 py-2 rounded"
            onClick={handleClick}
            >
                Deactivate Account
            </Button>
        </div>
    );
}

export default DangerZone;
