import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTrendingVideos } from "../../store/slices/videos";
import TrendingCard from "../../components/card/trendingCard";
import { Loader } from "../../components/loader/loader";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "transparent",
  padding: theme.spacing(1),
  textAlign: "center",
  boxShadow: "none",
  color: theme.palette.text.secondary,
}));

export default function Home() {
  const dispatch = useDispatch();
  const {
    trendingVideos: { data }, loader
  } = useSelector((state) => state.videoSlice);
  useEffect(() => {
    dispatch(getTrendingVideos());
  }, [dispatch]);
  const Cards = data?.map((item) => {
    return (
      <Grid xs={12} md={6} lg={3} key={item.videoId}>
        <Item>
          <TrendingCard record={item} id={item.videoId} isAvatar={true} />
        </Item>
      </Grid>
    );
  });
  return loader ? <Loader /> : (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {Cards}
      </Grid>
    </Box>
  );
}
