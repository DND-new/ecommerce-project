import RobotProfileImage from "../assets/robot.png";
import UserProfileImage from "../assets/photo.png";
import dayjs from "dayjs";
import "./ChatMessage.css";

export function ChatMessage({ message, sender, time }) {
  //const { message, sender } = props;
  /*
          if (sender === "robot") {
            return (
              <div>
                <img src="robot.png" width="50" />
                {message}
              </div>
            );
          }
          */

  return (
    <div
      className={sender === "user" ? "chat-message-user" : "chat-message-robot"}
    >
      {sender === "robot" && (
        <img src={RobotProfileImage} className="chat-message-profile" />
      )}

      <div className="chat-message-text">
        {message}
        <p className="chat-message-time">{dayjs(time).format("h:mma")}</p>
      </div>

      {sender === "user" && (
        <img src={UserProfileImage} className="chat-message-profile" />
      )}
    </div>
  );
}
