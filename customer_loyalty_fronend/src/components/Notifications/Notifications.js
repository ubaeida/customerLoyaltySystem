import { useState, useEffect, useContext } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { AlertContex } from "../../context/AlertContext";
import Slide from "@mui/material/Slide";

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

const SimpleSnackbar = () => {
  // eslint-disable-next-line
  const {
    open: openGlobal,
    success,
    message,
    toggleOff,
  } = useContext(AlertContex);
  // eslint-disable-next-line
  const [open, setOpen] = useState(false);

  const handleClose = (e, reason) => {
    setOpen(false);
    toggleOff(reason);
  };
  useEffect(
    () => {
      openGlobal && setOpen(true);
    },
    [openGlobal, success, message]
  );

  return (
    <div>
      <Snackbar
        sx={{ height: "25%"}}
        style = {{ right: "0%", backgoroundColor: "fff"}}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={openGlobal}
        autoHideDuration={2500}
        onClose={handleClose}
        onClick={handleClose}
        TransitionComponent={SlideTransition}
      >
        <Alert
          variant="filled"
          severity={!success ? "error" : "success"}
          style={{ minWidth: "150px" }}
        >
          {message ? message : success ? "success" : "something went wrong"}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SimpleSnackbar;
