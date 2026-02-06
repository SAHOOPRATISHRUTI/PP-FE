import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Stack
} from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { getLocations } from "../api/location";
import { getPhotosByLocation } from "../api/photo";

function UserHome() {

  const [locs, setLocs] = useState([]);
  const [photosMap, setPhotosMap] = useState({});

  const load = async () => {
    const lr = await getLocations();
    setLocs(lr.data);

    const responses = await Promise.all(
      lr.data.map(l => getPhotosByLocation(l._id))
    );

    const map = {};
    lr.data.forEach((l,i)=> map[l._id] = responses[i].data);
    setPhotosMap(map);
  };

  useEffect(() => { load(); }, []);

  return (
    <Container maxWidth="lg" sx={{ pb:6 }}>

      {/* ===== Page Header ===== */}
      <Typography
        variant="h3"
        sx={{
          my:5,
          fontWeight:800,
          textAlign:"center",
          letterSpacing:1
        }}
      >
        Our Travel Memories
      </Typography>

      <Grid container spacing={4}>

        {locs.map(l => {
          const photos = photosMap[l._id] || [];

          return (
            <Grid item xs={12} md={6} lg={4} key={l._id}>

              <Card sx={{
                borderRadius:5,
                boxShadow:6,
                overflow:"hidden",
                transition:"0.3s",
                "&:hover": {
                  transform:"translateY(-6px)",
                  boxShadow:12
                }
              }}>

                {/* ===== Image Slider ===== */}
                <Box sx={{ position:"relative" }}>

                  {photos.length > 0 ? (
                 <Swiper
  modules={[Navigation, Pagination]}
  navigation
  pagination={{ clickable: true }}
  style={{ height: 260 }}
>
  {photos.map(p => (
 <SwiperSlide key={p._id}>
  <Box
    sx={{
      width: "100%",
      height: 260,
      borderRadius: 2,
      overflow: "hidden",
      background: "#f2f2f2",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    <img
      src={`http://localhost:5000${p.imageUrl}`}
      alt=""
      style={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
        objectPosition: "center"
      }}
    />
  </Box>
</SwiperSlide>

  ))}
</Swiper>

                  ) : (
                    <Box sx={{
                      height:260,
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"center"
                    }}>
                      No Images
                    </Box>
                  )}

                  {/* ===== Overlay Title ===== */}
                  <Box sx={{
                    position:"absolute",
                    bottom:0,
                    width:"100%",
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                    color:"#fff",
                    p:2
                  }}>
                    <Typography variant="h6" fontWeight={700}>
                      {l.title}
                    </Typography>
                  </Box>

                </Box>

                {/* ===== Content ===== */}
                <CardContent sx={{ p:3 }}>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb:2, lineHeight:1.6 }}
                  >
                    {l.description}
                  </Typography>

                  {/* Spots */}
                  {l.spots?.length > 0 && (
                    <>
                      <Typography fontSize={13} fontWeight={600} sx={{ mb:1 }}>
                        Best Spots
                      </Typography>
                      <Stack direction="row" flexWrap="wrap" gap={1} mb={2}>
                        {l.spots.map((s,i)=>(
                          <Chip key={i} label={s} size="small"/>
                        ))}
                      </Stack>
                    </>
                  )}

                  {/* Food */}
                  {l.bestFood?.length > 0 && (
                    <>
                      <Typography fontSize={13} fontWeight={600} sx={{ mb:1 }}>
                        Must Try Food
                      </Typography>
                      <Stack direction="row" flexWrap="wrap" gap={1}>
                        {l.bestFood.map((f,i)=>(
                          <Chip
                            key={i}
                            label={f}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Stack>
                    </>
                  )}

                </CardContent>

              </Card>

            </Grid>
          );
        })}

      </Grid>

    </Container>
  );
}

export default UserHome;
