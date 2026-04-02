import { useState } from "react";

function PwChecker() {
  const [pw, setPw] = useState("");
  const [status, setStatus] = useState({
    status: "neutral",
    message: "Please enter your password",
  });

  function handlePwChange(e) {
    setPw(e.target.value);
    setStatus(returnStatus(e.target.value));
  }

  function returnStatus(newPw) {
    if (newPw.length === 0)
      return { status: "neutral", message: "Please enter your password" };
    if (newPw.length < 8)
      return {
        status: "danger",
        message: "Your password needs to be more than 8 characteres",
      };

    const search_rules = {
      uppercase: {
        condition: true,
        regex: /[A-Z]/g,
        invalid_message: `It needs a capital letter: A-Z`,
      },
      number: {
        condition: true,
        regex: /[0-9]/g,
        invalid_message: `It needs a number: 0-9`,
      },
      symbol: {
        condition: true,
        regex: /[^\w\s]/g,
        invalid_message: `It needs a symbol like: [$, %, /, #]`,
      },
      whitespace: {
        condition: false,
        regex: /\s/g,
        invalid_message: `Whitespaces are not allowed!`,
      },
    };

    for (const [key, rule] of Object.entries(search_rules)) {
      const searchIndex = newPw.search(rule.regex);
      if (!newPw[searchIndex] === rule.condition) {
        return { status: "danger", message: rule.invalid_message };
      }
    }

    return { status: "safe", message: "Valid Password" };
  }

  function setStyle() {
    const style = {
      border: "1px solid grey",
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
        onChange={(e) => handlePwChange(e)}
        type="text"
      />
      <p>{status.message}</p>
    </form>
  );
}

export default PwChecker;
