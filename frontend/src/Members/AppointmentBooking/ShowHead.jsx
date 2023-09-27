import { Box, Stack } from "@mui/material";
import carep from "../../assets/images/carep.png";
import { baseURL } from "../../../config";

export default function ShowHead({careprovider})
{
    return (
        <Stack direction="row" sx={{gap:"20px"}}>
        <img src={!careprovider.images?carep:`${baseURL}/images/${careprovider.images}`} style={{width:"90px",height:"90px",borderRadius:"50%"}}/>
        <Box sx={{textAlign:"start"}}>
            <p style={{color:" ar(--primary-dark, #011F1E)",
            fontSize: "20px",fontWeight: 700,margin:"0px",padding:"0px"}}>{careprovider.firstName+" "+careprovider.lastName}</p>
<p style={{margin:"0px",padding:"0px"}}>{careprovider.degree}</p>
<p style={{margin:"0px",padding:"0px"}}><span style={{fontStyle:""}}><s style={{marginRight:"5px"}}>Rp.xxx.xxx</s></span><span style={{fontWeight:700}}>FREE</span></p>
        </Box>
       </Stack>
    )
}