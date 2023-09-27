import Cookies from 'js-cookie';
import React from 'react';
import { Navigate } from 'react-router-dom';

function Redirection()
{

return(
    <div>
        {Cookies.get("id")?<Navigate to="/admin"></Navigate>:Cookies.get("careId")?<Navigate to="/cp"></Navigate>:Cookies.get("adminId")?<Navigate to="/superadmin/"></Navigate>:Cookies.get("memberId")?<Navigate to="/member"></Navigate>:<Navigate to="/register"></Navigate>}
        {/* {Cookies.get("careId")?<Navigate to="/cp"></Navigate>:<Navigate to="/register"></Navigate>}
        {Cookies.get("adminId")?<Navigate to="/superadmin/"></Navigate>:<Navigate to="/register/"></Navigate>}
        {Cookies.get("memberId")?<Navigate to="/member"></Navigate>:<Navigate to="/register/"></Navigate>}
 */}

    </div>
)
}

export default Redirection;