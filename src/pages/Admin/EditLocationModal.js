import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Stack
} from "@mui/material";

import { updateLocation } from "../../api/location";

function EditLocationModal({ open, onClose, location, onUpdated }) {
  const [form, setForm] = useState({});

  useEffect(() => {
    if (location) {
      setForm({
        title: location.title || "",
        slug: location.slug || "",
        description: location.description || "",
        coverImage: location.coverImage || "",
        spots: location.spots?.join(", ") || "",
        bestFood: location.bestFood?.join(", ") || ""
      });
    }
  }, [location]);

  const change = (k, v) => setForm({ ...form, [k]: v });

  const save = async () => {
    await updateLocation(location._id, {
      ...form,
      spots: form.spots.split(",").map(s => s.trim()),
      bestFood: form.bestFood.split(",").map(s => s.trim())
    });

    onUpdated();
    onClose();
  };

  if (!location) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>

      <DialogTitle>Edit Location</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt:1 }}>

          <TextField
            label="Title"
            value={form.title}
            onChange={e => change("title", e.target.value)}
          />

          <TextField
            label="Slug"
            value={form.slug}
            onChange={e => change("slug", e.target.value)}
          />

          <TextField
            label="Cover Image URL"
            value={form.coverImage}
            onChange={e => change("coverImage", e.target.value)}
          />

          <TextField
            label="Description"
            multiline
            rows={3}
            value={form.description}
            onChange={e => change("description", e.target.value)}
          />

          <TextField
            label="Spots (comma separated)"
            value={form.spots}
            onChange={e => change("spots", e.target.value)}
          />

          <TextField
            label="Best Food (comma separated)"
            value={form.bestFood}
            onChange={e => change("bestFood", e.target.value)}
          />

          <Button variant="contained" onClick={save}>
            Update Location
          </Button>

        </Stack>
      </DialogContent>

    </Dialog>
  );
}

export default EditLocationModal;
