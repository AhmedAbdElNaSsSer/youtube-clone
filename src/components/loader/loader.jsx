import { Box } from "@mui/material";
import img from "../../assets/imgs/Spinner-0.7s-210px.gif";
export function Loader() {
    
  return (
    <Box sx={{textAlign:'center'}} className="loader">
      <img src={img} alt="" />
    </Box>
  );
}
