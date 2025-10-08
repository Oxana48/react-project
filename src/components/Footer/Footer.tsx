import VkSvg from "../../assets/svg/vk.svg?react";
import YtSvg from "../../assets/svg/youtube.svg?react";
import OkSvg from "../../assets/svg/ok.svg?react";
import TelegramSvg from "../../assets/svg/telegram.svg?react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__links">
        <a href="#">
          <VkSvg width={36} height={36} />
        </a>
        <a href="#">
          <YtSvg width={36} height={36} />
        </a>
        <a href="#">
          <OkSvg width={36} height={36} />
        </a>
        <a href="#">
          <TelegramSvg width={36} height={36} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
