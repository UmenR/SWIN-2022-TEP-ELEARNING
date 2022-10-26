import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 5,
};

export default function ModalOverlay({
  isOpen,
  header,
  body,
  handleClose,
  showReward,
}) {
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            {header}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {body}
          </Typography>
          {showReward && (
            <div>
              <Typography
                textAlign="center"
                id="modal-modal-title"
                variant="h3"
                component="h1"
              >
                Congratulations! You have earned a Star!
              </Typography>
              <Typography
                textAlign="center"
                id="modal-modal-title"
                variant="h1"
                component="h1"
              >
                🌟
              </Typography>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
