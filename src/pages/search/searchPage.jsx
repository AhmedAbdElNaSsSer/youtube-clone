import { useSelector } from "react-redux";
import CardItem from "../../components/card/card";
import { Loader } from "../../components/loader/loader";
import { Box, Grid } from "@mui/material";

export function SearchPage() {
  const { search, loader } = useSelector((state) => state.videoSlice);
  const Cards = search.filter((single) => {
    return single.type === "video";
  });
  const searchedItems = Cards.map((single) => {
    console.log('single: ', single);
    return (
      <Grid item xs={12} md={6} lg={3} key={single.videoId}>
        <CardItem record={single} id={single.videoId} isAvatar={true} />
      </Grid>
    );
  });

  return loader ? (
    <Loader />
  ) : (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {searchedItems}
      </Grid>
    </Box>
  );
}
