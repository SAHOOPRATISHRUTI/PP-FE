
import React, { useState } from "react";
import { TextField, Button, Paper } from "@mui/material";
import { createLocation } from "../../api/location";

function LocationForm({ refresh }) {
  const [data, setData] = useState({});

  const submit = async (e) => {
    e.preventDefault();
    await createLocation({
      ...data,
      spots: data.spots?.split(","),
      bestFood: data.bestFood?.split(",")
    });
    refresh();
  };

  return (
    <Paper sx={{ p:3 }}>
      <TextField label="Title" fullWidth onChange={e=>setData({...data,title:e.target.value})}/>
      <TextField label="Slug" fullWidth onChange={e=>setData({...data,slug:e.target.value})}/>
      <TextField label="Cover Image URL" fullWidth onChange={e=>setData({...data,coverImage:e.target.value})}/>
      <TextField label="Description" fullWidth multiline rows={3}
        onChange={e=>setData({...data,description:e.target.value})}/>
      <TextField label="Spots (comma)" fullWidth
        onChange={e=>setData({...data,spots:e.target.value})}/>
      <TextField label="Best Food (comma)" fullWidth
        onChange={e=>setData({...data,bestFood:e.target.value})}/>

      <Button variant="contained" sx={{ mt:2 }} type="submit" onClick={submit}>
        Add Location
      </Button>
    </Paper>
  );
}

export default LocationForm;
