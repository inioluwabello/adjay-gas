import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
import LeftPane from './LeftPane';

const Layout = () => {

    const [leftpaneVisible, setLeftPaneVisibility] = useState(false)
    const toggleLeftPaneVisibility = () => {
      setLeftPaneVisibility(!leftpaneVisible);
    }

    return (
      <div className="app">
        <div className="main-pane">
          <div className="left-pane left-pane-left">
            <LeftPane />
          </div>

          <div className="right-pane">
            {leftpaneVisible && (
              <div className="relative">
                <div className="left-pane left-pane-right">
                  <div className="relative">
                    <button
                      className="left-pane-vb"
                      onClick={toggleLeftPaneVisibility}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>

                  <LeftPane toggleLeftPaneVisibility={toggleLeftPaneVisibility}/>
                </div>
              </div>
            )}
            <div className="toppane">
              <svg
                className='lpvb'
                onClick={toggleLeftPaneVisibility}
                style={{ cursor: "pointer" }}
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
              </svg>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    );
}

export default Layout