import { TextField, Grid } from "@mui/material";

const AddressForm = () => (
  <Grid container spacing={2}>
    <Grid item xs={12} sm={6}>
      <TextField label="Full Name" fullWidth required />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField label="Phone Number" fullWidth required />
    </Grid>
    <Grid item xs={12}>
      <TextField label="Street Address" fullWidth required />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField label="City" fullWidth required />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField label="Pincode" fullWidth required />
    </Grid>
  </Grid>
);

export default AddressForm;
