import { Outlet } from "react-router-dom";

const ViewGuru = () => {
    
    return(
        <div className="background">  
            <Outlet />
        </div>
    )
}
export default ViewGuru;