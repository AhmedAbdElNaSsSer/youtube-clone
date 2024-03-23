import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import CardItem from "../../components/card/card";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getVideos } from "../../store/slices/videos";

export default function Home() {
  const dispatch = useDispatch();
  const { record } = useSelector((state) => state.videoSlice);
  useEffect(() => {
    dispatch(getVideos());
  }, [dispatch]);
  const Cards = record.map((item) => {
    const { snippet } = item;
    return (
      <Grid item xs={12} md={6} lg={3} key={item.id.videoId}>
        <CardItem record={snippet} id={item.id.videoId} isAvatar={true} />
      </Grid>
    );
  });
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {Cards}
      </Grid>
    </Box>
  );
}
