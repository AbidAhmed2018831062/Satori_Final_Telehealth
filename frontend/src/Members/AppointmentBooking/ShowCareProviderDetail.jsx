import { Box, Stack } from "@mui/material";
import ShowHead from "./ShowHead";

export default function ShowCareProviderDetail({careprovider,type}){
    const details=[
        {
            title:"License Number",
            text:careprovider.license
        },
        {
            title:"Degree",
            text:careprovider.degree
        },
        {
            title:"Language Preferences",
            text:careprovider.languages[0]
        },
    ]
    return(
        <Box sx={{flex:1}}>
            <ShowHead careprovider={careprovider}/>
            <Stack direction="row" sx={{justifyContent:"space-between",margin:"30px 0px",alignItems:"center"}} spacing={3}>
                {details.map(detail=>{
                    return (
                        <Box sx={{flex:1}}>
                            <p style={{fontSize:"20px",fontWeight:700,marginTop:"0px",marginBottom:"10px",textAlign:"start"}}>{detail.title}</p>
                            <p style={{textAlign:"start"}}>{detail.text}</p>
                        </Box>
                    )
                })}
            </Stack>
          {careprovider.bio&& <Box> <p style={{fontSize:"20px",fontWeight:700,textAlign:"start"}}>
                Bio
            </p>
            <p style={{textAlign:"start"}}>{careprovider.bio}</p>
            </Box>}
          {careprovider.specializations&&  <Box>  <p style={{fontSize:"20px",fontWeight:700,textAlign:"start"}}>
               Specializations
            </p>
            <Stack direction="row" sx={{gap:"20px"}}>
            {careprovider.specializations.map(special=>{
                return(
                    <Box sx={{borderRadius: "20px",
                        background: "var(--secondary-color, #EBE5DE)",padding:"10px"}}>
                           {special}
                    </Box>
                )
            })}
            
            </Stack>
          
            </Box>}
            {careprovider.expertise&&  <Box>  <p style={{fontSize:"20px",fontWeight:700,textAlign:"start"}}>
               Expertise
            </p>
            <Stack direction="row" sx={{gap:"20px"}}>
            {careprovider.expertise.map(special=>{
                return(
                    <Box sx={{borderRadius: "20px",
                        background: "var(--secondary-color, #EBE5DE)",padding:"10px"}}>
                           {special}
                    </Box>
                )
            })}
            
            </Stack>
          
            </Box>}
        
        </Box>
    )
}