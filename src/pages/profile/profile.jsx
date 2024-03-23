import { Avatar } from "@mui/joy";
import { Box, ButtonGroup, Container, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getChannelCommunity,
  getChannelHome,
  getChannelPlaylist,
  getChannelShorts,
  getChannelVideos,
} from "../../store/slices/channel";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Carousel from "../../components/carousel/carousel";
import Button from "../../components/button/button";
import styled from "@emotion/styled";

const CustomTypography = styled(Typography)(({ theme }) => ({
  color: "#fff",
  fontWeight: "bold",
  marginTop: 15,
  marginBottom: 5,
}));
export default function Profile() {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getChannelHome(id));
  }, [dispatch, id]);
  const { channelHome } = useSelector((state) => state.channelSlice);
  if (!channelHome) {
    return null;
  }
  const btnGroups = () => {
    return channelHome?.meta?.tabs?.map((single, i) => {
      return (
        <Button key={i} text={single} size="large" sx={{ marginBottom: 3 }} />
      );
    });
  };
  const rowCards = () => {
    return channelHome?.data?.map((single, i) => {
      return (
        <Box key={i}>
          <CustomTypography variant="h5">{single.title}</CustomTypography>
          <Carousel record={single.data} isShort={single.title === 'Short' && true} />
        </Box>
      );
    });
  };
  return (
    <>
      <Container>
        {/* Cover */}
        {channelHome?.meta?.banner && (
          <Box>
            <img
              width="100%"
              height={300}
              src={channelHome?.meta?.banner[channelHome?.meta?.banner.length-1]?.url}
              alt=""
              style={{ borderRadius: 15 }}
            />
          </Box>
        )}
        {/* Avatar & Username */}
        <Box display={"flex"} alignItems={"center"}>
          <Box padding={1}>
            <Avatar
              alt={channelHome?.meta?.title}
              elevation="5"
              sx={{ width: "100px", height: "100px", margin: "auto" }}
              
            />
          </Box>
          <Box p={2}>
            {/* UserName */}
            <Typography variant="h4" fontWeight="bold" color="#fff">
              {channelHome?.meta?.title}
            </Typography>
            {/* Channel Subscription Number */}
            <Typography variant="p" color="#ffffffa1" display="block">
              {channelHome?.meta?.subscriberCountText} |{" "}
              {channelHome?.meta?.videosCountText+'Videos'}
            </Typography>
            {/* Channel Subscription Number */}
            <Typography variant="p" color="#ffffffa1" display="block">
              {channelHome?.meta?.description}
            </Typography>
            {/* Channel Subscription Number */}
            <Typography variant="p" color="#ffffffa1" display="block">
              {channelHome?.meta?.channelHandle}
            </Typography>
          </Box>
        </Box>
      </Container>
      {/* Channel Content */}
      <Container sx={{ mt: 3 }}>
        {/* Buttons */}
        <Box>
          <ButtonGroup variant="outlined" aria-label="Disabled button group">
            {btnGroups()}
          </ButtonGroup>
        </Box>
        {/* Videos */}
        {rowCards()}
      </Container>
    </>
  );
  
}
