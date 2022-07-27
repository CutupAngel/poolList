import React from "react";
import { ReactElement } from "react";

const Pagination = ({
  children,
  currentPage,
  totalPage,
  setCurrentPage,
}: {
  children: ReactElement;
  currentPage: number;
  totalPage: number;
  setCurrentPage: Function;
}) => {
  return (
    <>
      {children}
      <div className="text-center flex justify-center">
        <button
          className="mr-4"
          onClick={() => {
            currentPage - 1 >= 1 && setCurrentPage(currentPage - 1);
          }}
        >
          &larr;
        </button>
        <div className="mr-4">
          Page {currentPage} of {totalPage}
        </div>
        <button
          className="mr-4"
          onClick={() => {
            currentPage + 1 <= totalPage && setCurrentPage(currentPage + 1);
          }}
        >
          &rarr;
        </button>
      </div>
    </>
  );
};

export default Pagination;
