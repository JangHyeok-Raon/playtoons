import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Body5, Border1pxTiara } from "@/styledMixins";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/pro-solid-svg-icons";

const Input = ({
  inputType,
  label,
  callback,
  fontWeight,
  width = "400px",
  height = "40px",
  disabled,
}) => {
  const [isPwdDisabled, setIsPwdDisabled] = useState(true);
  const [type, setType] = useState(null);

  useEffect(() => {
    if (inputType === "password" && isPwdDisabled) {
      setType("password");
    } else {
      setType("text");
    }

    return () => {
      setType(null);
    };
  }, [inputType, isPwdDisabled]);

  return (
    <InputDiv width={width}>
      <InputLabel className="login-txt-form-label">{label}</InputLabel>
      <InputWithIconDiv>
        <TextInput
          className="overlap-group-3"
          type={type}
          onInput={callback}
          fontWeight={fontWeight}
          height={height}
          disabled={disabled}
        />
        {inputType === "password" && (
          <EyeIconDiv onClick={() => setIsPwdDisabled(!isPwdDisabled)}>
            <FontAwesomeIcon
              icon={isPwdDisabled ? faEye : faEyeSlash}
              color="#909DAB"
              style={{ width: "100%", height: "100%" }}
            />
          </EyeIconDiv>
        )}
      </InputWithIconDiv>
    </InputDiv>
  );
};

const InputDiv = styled.div`
  width: ${(props) => props.width};
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const InputWithIconDiv = styled.div`
  flex-direction: row;
  position: relative;
`;

const InputLabel = styled.span`
  ${Body5}
  min-height: 16px;
  font-weight: ${(props) => props.fontWeight};
  color: var(--vulcan);
  line-height: 16px;
  white-space: nowrap;
`;

const TextInput = styled.input`
  ${Border1pxTiara}
  height: ${(props) => props.height};
  margin-top: 8px;
  display: flex;
  padding: 10px 13px;
  justify-content: flex-end;
  align-items: flex-start;
  border-radius: 4px;
  width: 100%;
`;

const EyeIconDiv = styled.div`
  position: absolute;
  width: 24px;
  height: 19px;
  top: 19px;
  right: 15px;
  cursor: pointer;
`;

export default Input;
