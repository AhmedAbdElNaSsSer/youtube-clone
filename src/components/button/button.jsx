import { Button } from "@mui/material";

export default function ButtonItem({ text, variant, color, size, startIcon, sx, onClick }) {
  return (
    <Button variant={variant} color={color} size={size} startIcon={startIcon} sx={sx} onClick={onClick}>
      {text}
    </Button>
  );
}
