import React from 'react'
import RsLogo from '../../assets/images/rs_school_js.svg'
import GitLogo from '../../assets/images/GitHub_logo.png'

const Footer = () => {
  return (
    <footer className="flex justify-center">
      <div className="flex justify-between items-center w-7xl m-2.5">
        <a>
          <img src={RsLogo} className="w-24 h-16" />
        </a>
        <div className="flex items-center">
          <img src={GitLogo} />
          <div className="flex flex-col text-2xl font-seaweed ml-1">
            <a href="https://github.com/grom0330">grom0330</a>
            <a href="https://github.com/pavelgorbach">pavelgorbach</a>
          </div>
        </div>
        <div className="font-seaweed text-3xl">2022</div>
      </div>
    </footer>
  )
}

export default Footer
