import React from "react";
import { MessageTypes } from "../utils/enums";
import "../styles/Message.scss";

interface MessageProps {
  type: MessageTypes;
  message: string;
}

const Message = ({ message, type }: MessageProps) => {
  return (
    <div className="grid">
      <div
        className={`grid-item grid-item-xs-12 message-wrapper ${
          type === MessageTypes.Error
            ? "message-wrapper-error"
            : "message-wrapper-info"
        }`}
      >
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Message;
