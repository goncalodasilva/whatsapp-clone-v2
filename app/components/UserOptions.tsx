import Button from "@mui/material/Button"
import { welcome_inbox } from "./styles"
import { removeUserFromCache } from "../local/utils"
import { useGlobalContext } from "../Context/store"

const UserOptions = () => {
    const { setUserId, setData, setChats } = useGlobalContext();

    const logOut  = () => {
        setUserId('');
        setData(null);
        setChats([]);
        removeUserFromCache();
    }

    return (
        <div className={welcome_inbox}>
            <Button 
            variant="outlined" 
            color="error"
            onClick={logOut}>
                Log out
            </Button>
        </div>
    )
}

export default UserOptions