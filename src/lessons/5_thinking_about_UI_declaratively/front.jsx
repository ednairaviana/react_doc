import { useState } from "react";

const RULES = [
  {
    condition: true,
    regex: /[A-Z]/g,
    invalid_message: `It needs a capital letter: A-Z`,
  },
  {
    condition: true,
    regex: /[0-9]/g,
    invalid_message: `It needs a number: 0-9`,
  },
  {
    condition: true,
    regex: /[^\w\s]/g,
    invalid_message: `It needs a symbol like: [$, %, /, #]`,
  },
  {
    condition: false,
    regex: /\s/g,
    invalid_message: `Whitespaces are not allowed!`,
  },
];

function PwChecker() {
  const [pw, setPw] = useState("");
  const status = returnStatus(pw);

  function returnStatus(newPw) {
    if (newPw.length === 0)
      return { status: "neutral", message: "Please enter your password" };
    if (newPw.length < 8)
      return {
        status: "danger",
        message: "Your password needs to be more than 8 characteres",
      };

    const failed = RULES.find(
      (rule) => (newPw.search(rule.regex) !== -1) !== rule.condition,
    );
    if (failed) return { status: "warning", message: failed.invalid_message };

    return { status: "safe", message: "Valid Password" };
  }

  function setStyle() {
    const style = {
      border: "1px solid grey",
      transition: "all 0.2s ease",
    };

    switch (status.status) {
      case "neutral":
        style.borderColor = "grey";
        break;
      case "danger":
        style.borderColor = "red";
        break;
      case "warning":
        style.borderColor = "yellow";
        break;
      case "safe":
        style.borderColor = "green";
        break;
    }

    return style;
  }

  return (
    <form>
      <input
        style={setStyle()}
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        type="text"
        className="mb-3"
      />
      <p>{status.message}</p>
    </form>
  );
}

export default PwChecker;
