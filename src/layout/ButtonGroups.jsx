import React from 'react'
import Button from '../common/ButtonPrimary'
import { useLocation } from 'react-router-dom';

const ButtonGroups = () => {
  const {pathname} = useLocation();
  console.log(pathname)
  return (
    <div className="inline-flex  shadow-xs dark:bg-transparent  bg-black rounded-lg" >
      <Button name="All" order="first" isHighlight={pathname === "/" ? true : false} pathname={"/"}/>
      <Button name="Tree" order="middle" isHighlight={pathname === "/tree-visualizer" ? true : false} pathname={"/tree-visualizer"}/>
      <Button name="JSON Editor" order="last" isHighlight={pathname === "/json-editor" ? true : false} pathname={"/json-editor"}/>
    </div>
  )
}

export default ButtonGroups
