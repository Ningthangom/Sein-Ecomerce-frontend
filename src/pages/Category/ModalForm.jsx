import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const MondalForm = ({handleClose,open,slug, style, cancelDelete,UpdateCategory, name, setName}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{
        backgroundColor: "transparent",
        filter: "brightness 50%",
      }}
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Updating {`${slug}`}
        </Typography>
        <form /* onSubmit={handleSubmit} */>
        <div className="form-group">
          <label>Name</label>
          <input
            type="type"
            className="form-control"
            value={name} 
            onChange={(e) => setName(e.target.value)}
            autoFocus
            required
          />
          <br />
          <button className="btn btn-outline-primary btn-primary float-right ">
            Save
          </button>
        </div>
      </form>

        <Button
          className="float-right btn btn-sm btn-danger mt-2 pt-1 text-white"
          onClick={() => UpdateCategory(slug)}
        >
          Update
        </Button>
        <Button
          className="float-right btn btn-sm btn-danger mt-2 pt-1 text-white mr-2"
          onClick={() => cancelDelete()}
        >
          cancel
        </Button>
      </Box>
    </Modal>
  );
};


export default MondalForm;
