import { useState } from "react";

function Input(props) {
  return (
    <label>
      {props.label}:{" "}
      {!props.isEditing ? (
        <b>{props.value}</b>
      ) : (
        <input
          onChange={(e) => props.handleSetFullName(props.path, e.target.value)}
          value={props.value}
        />
      )}
    </label>
  );
}

export default function EditProfile() {
  const [fullname, setFullName] = useState({
    first_name: "Fulano",
    last_name: "Da Silva",
  });
  const [isEditing, setIsEditing] = useState(false);

  function handleSetFullName(path, value) {
    setFullName({
      ...fullname,
      [path]: value,
    });
  }

  function handleSetIsEditing(e) {
    e.preventDefault();
    setIsEditing(!isEditing);
  }

  return (
    <form
      className="flex flex-col items-start gap-2"
      onSubmit={(e) => handleSetIsEditing(e)}
    >
      <Input
        path={"first_name"}
        isEditing={isEditing}
        label={"First Name"}
        value={fullname.first_name}
        handleSetFullName={handleSetFullName}
      />
      <Input
        path={"last_name"}
        isEditing={isEditing}
        label={"Last Name"}
        value={fullname.last_name}
        handleSetFullName={handleSetFullName}
      />
      <button className="mt-9" type="submit">
        {isEditing ? "Save" : "Edit"} Profile
      </button>
      <p>
        <i>
          Hello, {fullname.first_name} {fullname.last_name}!
        </i>
      </p>
    </form>
  );
}
