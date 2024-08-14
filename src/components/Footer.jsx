import React from 'react'
import githubLogo  from "../assets/Octicons-mark-github.svg"
function Footer() {
  return (
    <footer>
      <img src={githubLogo} alt="" />
      <a href="https://github.com/Zaro-dev/cierzo-work-server">
      GitHub Repository
      </a>
    </footer>
  )
}

export default Footer