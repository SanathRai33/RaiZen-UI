import { FormControlLabel, RadioGroup, Radio } from "@mui/material";

const PaymentOptions = ({ selected, setSelected }) => (
  <RadioGroup
    value={selected}
    onChange={(e) => setSelected(e.target.value)}
    name="payment-method"
  >
    <FormControlLabel value="card" control={<Radio />} label="Credit / Debit Card" />
    <FormControlLabel value="upi" control={<Radio />} label="UPI / Wallets" />
    <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery" />
  </RadioGroup>
);

export default PaymentOptions;
