import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import {  IconSearch, IconCancle } from "@tabler/icons-react";

export default function SearchToggle() {


    const [searchToggle, setSearchToggle] = useState(false)
  return (
    <div>
      {searchToggle ? (
        <Link to="/search">
          <IconSearch />
        </Link>
      ) : (
        <Link to={"/explore"}>
          <IconCancle/>
        </Link>
      )}
    </div>
  );
}
