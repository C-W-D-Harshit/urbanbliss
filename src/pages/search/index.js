import { useRouter } from "next/router";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

const Search = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(searchTerm);
    router.push(`/search/${searchTerm}`);
  };
  return (
    <form onSubmit={handleSubmit} className="search">
      <div className="header__searchh">
        <FiSearch />
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input type="submit" hidden />
      </div>
    </form>
  );
};

export default Search;
