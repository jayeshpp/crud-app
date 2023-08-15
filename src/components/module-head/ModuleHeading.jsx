import { IconButton, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function ModuleHeading({title, enableBack, renderRHS}) {
    const navigate = useNavigate()
    
    return (
        <div className="module-heading">
            <div className="mh-left">
                {enableBack && <IconButton onClick={()=>navigate(-1)}><ArrowBack /></IconButton>}
                <Typography variant="h5">{title}</Typography>
            </div>
            {renderRHS && <div className="mh-right">{renderRHS}</div>}
        </div>
    )
}

export default ModuleHeading
