import { useEffect, useState } from "react";
import { getInboxService } from "../services/privateMessage.services.js";

export const useInbox = () => {
    const [inbox, setInbox] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        getInboxService().then(data => setInbox(data)).finally(() => setLoading(false))
    }, [])

    return {inbox , loading}
}

export default useInbox