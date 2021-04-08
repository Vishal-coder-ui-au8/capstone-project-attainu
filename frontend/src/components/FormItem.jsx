import React from "react";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const Formitem = ({ currentForm, handleDelete }) => {
  function handleForm(e, name) {
    e.preventDefault();
    console.log(e);

    if (handleDelete) {
      console.log("Form item function");
      handleDelete(name);
    }
  }

  let formComp = <h1>Loading...</h1>;
  if (currentForm) {
    formComp = (
      <tr>
        <td>
          <FileCopyIcon />
        </td>

        <td>
          {" "}
          <a href={currentForm.url}>{currentForm.name} </a>
        </td>
        <td>
          <IconButton
            onClick={(e) => handleForm(e, currentForm.name)}
            color="secondary"
          >
            <DeleteIcon />
          </IconButton>
        </td>
      </tr>
    );
  }
  return formComp;
};

export default Formitem;
