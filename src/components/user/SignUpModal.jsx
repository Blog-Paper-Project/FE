import React from "react";
import "./modal.css";

const SignUpModal = (props) => {
  const { open, close, header } = props;

  return (
    <>
      <div className={open ? "openModal modal" : "modal"}>
        {open ? (
          <section>
            <header>
              {header}
              <button className="open" onClick={close}>
                닫기
              </button>
            </header>
            <div>hi!</div>
            <footer>
              <button className="close" onClick={close}>
                close
              </button>
            </footer>
          </section>
        ) : null}
      </div>
    </>
  );
};

export default SignUpModal;
