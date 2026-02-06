import React, { useEffect, useState } from "react";
import {
  Container, Grid, Typography, Card,
  CardContent, CardActions, Button, Box
} from "@mui/material";

import { getLocations, deleteLocation } from "../../api/location";
import { getPhotosByLocation, deletePhoto } from "../../api/photo";

import LocationForm from "../../components/Admin/LocationForm";
import PhotoUpload from "../../components/Admin/PhotoUpload";
import EditLocationModal from "./EditLocationModal";

function AdminDashboard() {

  const [locs, setLocs] = useState([]);
  const [photosMap, setPhotosMap] = useState({});
  const [selected, setSelected] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  const load = async () => {
    const lr = await getLocations();
    setLocs(lr.data);

    const photoResponses = await Promise.all(
      lr.data.map(l => getPhotosByLocation(l._id))
    );

    const map = {};
    lr.data.forEach((l,i)=> map[l._id]=photoResponses[i].data);
    setPhotosMap(map);
  };

  useEffect(()=>{ load(); }, []);

  const removeLocation = async id => {
    if (!window.confirm("Delete location?")) return;
    await deleteLocation(id);
    load();
  };

  const removePhoto = async id => {
    if (!window.confirm("Delete photo?")) return;
    await deletePhoto(id);
    load();
  };

  return (
    <Container maxWidth="lg">

      <Typography variant="h4" sx={{ my:4 }}>
        Admin CMS Dashboard
      </Typography>

      <LocationForm refresh={load} />

      <Grid container spacing={3}>

        {locs.map(l => (
          <Grid item xs={12} md={6} lg={4} key={l._id}>

            <Card sx={{ borderRadius:3, boxShadow:3 }}>

              <CardContent>

                <Typography variant="h6">{l.title}</Typography>
                <Typography>{l.description}</Typography>

                <Typography fontSize={13}>
                  Spots: {l.spots?.join(", ")}
                </Typography>

                <Typography fontSize={13}>
                  Food: {l.bestFood?.join(", ")}
                </Typography>

                <Box sx={{
                  mt:2,
                  display:"grid",
                  gridTemplateColumns:"repeat(auto-fill,80px)",
                  gap:1
                }}>
                  {(photosMap[l._id]||[]).map(p=>(
                    <Box key={p._id} position="relative">
                      <img
                        src={`http://localhost:5000${p.imageUrl}`}
                        width="80"
                        height="80"
                        style={{borderRadius:8, objectFit:"cover"}}
                      />
                      <Button
                        color="error"
                        size="small"
                        sx={{position:"absolute", top:-10, right:-10}}
                        onClick={()=>removePhoto(p._id)}
                      >
                        ✕
                      </Button>
                    </Box>
                  ))}
                </Box>

              </CardContent>

              <CardActions>
                <PhotoUpload locationId={l._id}/>
                <Button onClick={()=>{setSelected(l);setEditOpen(true);}}>
                  Edit
                </Button>
                <Button color="error"
                  onClick={()=>removeLocation(l._id)}>
                  Delete
                </Button>
              </CardActions>

            </Card>

          </Grid>
        ))}

      </Grid>

      <EditLocationModal
        open={editOpen}
        location={selected}
        onClose={()=>setEditOpen(false)}
        onUpdated={load}
      />

    </Container>
  );
}

export default AdminDashboard;
