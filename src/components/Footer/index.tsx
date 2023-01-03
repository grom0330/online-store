import React from 'react'
import RsLogo from '../../assets/images/rs_school_js.svg'
import GitLogo from '../../assets/images/github-logo.svg'

const Footer = () => {
  return (
    <footer className="flex justify-center">
      <div className="flex justify-between items-center w-7xl m-3">
        <a>
          <img src={RsLogo} className="w-20" />
        </a>
        <div className="flex items-center">
          <img src={GitLogo} className="w-8 h-8" />
          <div className="flex flex-col text-sm ml-1">
            <a href="https://github.com/grom0330">grom0330</a>
            <a href="https://github.com/pavelgorbach">pavelgorbach</a>
          </div>
        </div>
        <div className="text-sm">2022</div>
      </div>
    </footer>
  )
}

export default Footer
