import React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const CustomTypography = styled(Link)(({ theme }) => ({
  color: "#c8c7c7",
}));

const CustomLink = styled(Link)(({ theme }) => ({
  color: "#fff",
  fontWeight: "bold",
}));

const CardItem = ({ record, id, isAvatar }) => {
  const renderAvatar = () => {
    if (isAvatar) {
      return (
        <Link to={`/channel/${record?.channelId}`}>
          <Avatar
            alt="Ahmed Nasser"
            src={record.channelThumbnail?record.channelThumbnail[0].url:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'}
            sx={{ width: 40, height: 40 }}
          />
        </Link>
      );
    }
    return null;
  };

  return record ? (
    <Card
      variant="plain"
      id={id}
      sx={{ bgcolor: "initial", p: 0, mb: 2, width: "100%" }}
    >
      <Link to={`/videoDetails/${record?.videoId || id}`}>
        <Box sx={{ position: "relative" }}>
          <AspectRatio ratio={record?.isOriginalAspectRatio ? "9/16" : "4/3"}>
            <figure>
              <img
                src={
                  record?.thumbnails?.high?.url ||
                  record?.thumbnail?.[record?.thumbnail?.length - 1]?.url
                }
                srcSet={
                  record?.thumbnails?.high?.url ||
                  record?.thumbnail?.[record?.thumbnail?.length - 1]?.url
                }
                loading="lazy"
                alt={record?.title}
              />
            </figure>
          </AspectRatio>
          <CardCover
            className="gradient-cover"
            sx={{
              "&:hover, &:focus-within": {
                opacity: 1,
              },
              opacity: 0,
              transition: "0.1s ease-in",
              background:
                "linear-gradient(180deg, transparent 62%, rgba(0,0,0,0.00345888) 63.94%, rgba(0,0,0,0.014204) 65.89%, rgba(0,0,0,0.0326639) 67.83%, rgba(0,0,0,0.0589645) 69.78%, rgba(0,0,0,0.0927099) 71.72%, rgba(0,0,0,0.132754) 73.67%, rgba(0,0,0,0.177076) 75.61%, rgba(0,0,0,0.222924) 77.56%, rgba(0,0,0,0.267246) 79.5%, rgba(0,0,0,0.30729) 81.44%, rgba(0,0,0,0.341035) 83.39%, rgba(0,0,0,0.367336) 85.33%, rgba(0,0,0,0.385796) 87.28%, rgba(0,0,0,0.396541) 89.22%, rgba(0,0,0,0.4) 91.17%)",
            }}
          >
            <Box sx={{ position: "relative" }}>
              <AspectRatio ratio="4/3">
                <figure>
                  <img
                    src={record?.thumbnails?.high?.url}
                    srcSet={record?.thumbnails?.high?.url}
                    loading="lazy"
                    alt="Yosemite by Casey Horner"
                  />
                </figure>
              </AspectRatio>
              <CardCover
                className="gradient-cover"
                sx={{
                  "&:hover, &:focus-within": {
                    opacity: 1,
                  },
                  opacity: 0,
                  transition: "0.1s ease-in",
                  background:
                    "linear-gradient(180deg, transparent 62%, rgba(0,0,0,0.00345888) 63.94%, rgba(0,0,0,0.014204) 65.89%, rgba(0,0,0,0.0326639) 67.83%, rgba(0,0,0,0.0589645) 69.78%, rgba(0,0,0,0.0927099) 71.72%, rgba(0,0,0,0.132754) 73.67%, rgba(0,0,0,0.177076) 75.61%, rgba(0,0,0,0.222924) 77.56%, rgba(0,0,0,0.267246) 79.5%, rgba(0,0,0,0.30729) 81.44%, rgba(0,0,0,0.341035) 83.39%, rgba(0,0,0,0.367336) 85.33%, rgba(0,0,0,0.385796) 87.28%, rgba(0,0,0,0.396541) 89.22%, rgba(0,0,0,0.4) 91.17%)",
                }}
              />
            </Box>
          </CardCover>
        </Box>
      </Link>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          color: "#fff",
          textAlign: "start",
        }}
      >
        {renderAvatar()}
        <Box sx={{ color: "#fff" }}>
          <CustomLink to={`/videoDetails/${record?.videoId || id}`}>
            {record?.title}
          </CustomLink>
          <CustomTypography to={`/channel/${record?.channelId}`}>
            {record?.channelTitle}
          </CustomTypography>
        </Box>
      </Box>
    </Card>
  ) : null;
};

export default CardItem;
