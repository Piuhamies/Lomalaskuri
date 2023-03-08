import React from "react";

export function QuickLaskuri() {
  redirect = redirect.bind(this);
  function redirect() {
    this.setState({ redirect: true });
  }
  return (
    <div className="quickBox anim active">
      <div className="quickBoxLeft">
        <h1 className="quickTitle">Laskuri:</h1>
        <div className="quickContent">
          {this.state.ready ? (
            <>
              {this.state.otsikko}
              <div className="ajat quickText">
                {this.state.weeks}
                {this.state.days}
                {this.state.hours}
                {this.state.minutes}
              </div>
            </>
          ) : (
            <div id="Loading" className="loader quickLoader">
              <div className="loader-inner square-spin">
                <div></div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div onClick={redirect} className="quickBoxRight">
        <div className="quickWhite arrow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 24 24"
          >
            <path
              strokeWidth="1px"
              stroke="white"
              d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z"
            />
            <path fill="none" d="M0 0h24v24H0z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
