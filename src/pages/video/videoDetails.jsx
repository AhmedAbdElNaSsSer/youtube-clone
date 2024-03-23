import { Avatar, Box, Grid, styled, useMediaQuery } from "@mui/material";

import ReactPlayer from "react-player";
import { Link, useParams } from "react-router-dom";
import CardItem from "../../components/card/card";
import { Typography, Input } from "@mui/joy";
import ButtonItem from "../../components/button/button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getSingleVideo,
  getVideoComments,
  getVideos,
} from "../../store/slices/videos";

const CustomLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: "bold",
  fontSize: 15,
}));
const CustomTypography = styled(Typography)(({ theme }) => ({
  color: "#fff",
  marginTop: "0 !important",
}));
const Description = styled(Typography)(({ theme }) => ({
  color: "#c8c7c7",
  marginTop: "0 !important",
}));
export default function VideoDetails() {
  const mediaQuery = useMediaQuery("( min-width: 900px )");
  const [isExpanded, setIsExpanded] = useState(true);
  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };
  const { id } = useParams();
  const dispatch = useDispatch();
  const { record, singleRecord, videoComments } = useSelector(
    (state) => state.videoSlice
  );
  useEffect(() => {
    dispatch(getVideos());
    dispatch(getSingleVideo(id));
    dispatch(getVideoComments(id));
  }, [dispatch, id]);
  const Cards = singleRecord?.relatedVideos?.data?.map((item) => {
    console.log('item: ', item);
    return (
      <CardItem record={item} id={item.videoId} key={item.videoId}/>
    );
  });
  const comments = videoComments?.data.map((comment) => {
    return (
      <Box
        key={comment.commentId}
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          color: "#fff",
          textAlign: "start",
          marginTop: "20px",
        }}
      >
        <Avatar
          src={comment?.authorThumbnail[2].url}
          size="sm"
          sx={{ "--Avatar-size": "1.5rem" }}
        />
        <Box sx={{ color: "#fff" }}>
          <CustomLink to="/videoDetails/1">{comment?.authorText}</CustomLink>
          <CustomTypography variant="p" component="p" title="Channel Title">
            {comment?.textDisplay}
          </CustomTypography>
          <CustomTypography variant="p" component="p" title="Channel Title">
            Total Likes: {comment?.likesCount}
          </CustomTypography>
        </Box>
      </Box>
    );
  });
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={9}>
        {/* React Player */}
        <Box>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${id}`}
            width="100%"
            height="600px"
            style={{ borderRadius: "10px" }}
          />
        </Box>
        {/* Title */}
        <Box mt={2}>
          <CustomTypography level="h3">{singleRecord?.title}</CustomTypography>
        </Box>
        {/* Channel Infos */}
        <Box sx={{ color: "#fff" }} display="flex" alignItems="center" mt={2}>
          <Avatar
            src={singleRecord?.channelThumbnail[2].url}
            size="sm"
            sx={{ "--Avatar-size": "1.5rem", marginRight: "10px" }}
          />
          <Box>
            <CustomLink to={`/channel/${singleRecord?.channelId}`}>
              {singleRecord?.channelTitle}
            </CustomLink>
            <CustomTypography title="Channel Title">
              {singleRecord?.subscriberCountText} | 3 months ago
            </CustomTypography>
          </Box>
        </Box>
        {/* Description */}
        <Box
          mt={2}
          sx={{
            backgroundColor: "#1e2337",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <Typography sx={{ color: "#fff" }} component="h1" variant="h1">
            Description:
          </Typography>
          <Description
            noWrap={isExpanded ? true : false}
            width={mediaQuery ? !isExpanded ? "100%" : "800px" : "800px"}
          >
            {singleRecord?.description}
          </Description>
          <ButtonItem
            onClick={toggleDescription}
            text={isExpanded ? "Read More" : "Read less"}
            sx={{ paddingLeft: 0, "&:hover": { backgroundColor: "inherit" } }}
          />
        </Box>
        {/* Comments */}
        <Box mt={2}>
          <Typography sx={{ color: "#fff" }} component="h1" variant="h1">
            Total comments {singleRecord?.commentCountText}
          </Typography>
          {/* Input Field */}
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              color: "#fff",
              textAlign: "start",
              marginTop: "20px",
            }}
          >
            <Avatar
              src="https://images.unsplash.com/profile-1502669002421-a8d274ad2897?dpr=2&auto=format&fit=crop&w=32&h=32&q=60&crop=faces&bg=fff"
              size="sm"
              sx={{ "--Avatar-size": "1.5rem" }}
            />
            <Box sx={{ color: "#fff" }} width={"100%"}>
              <Input
                type="text"
                placeholder="Add a comment"
                sx={{
                  width: "100%",
                  background: "transparent",
                  color: "#fff",
                  border: "none",
                  borderBottom: "1px solid gray",
                  borderRadius: 0,
                  padding: 1,
                  "--Input-focusedHighlight": "transparent !important",
                  "&:hover": {
                    color: "#fff",
                    borderBottom: "1px solid #c0bfbf",
                  },
                }}
                endDecorator={
                  <ButtonItem variant="outlined" text="Send">
                    Message
                  </ButtonItem>
                }
                variant="plain"
              />
            </Box>
          </Box>
          {/* Comments */}
          {comments}
        </Box>
      </Grid>
      {/* Related Videos */}
      <Grid item xs={12} md={3}>
        {Cards}
      </Grid>
    </Grid>
  );
}
