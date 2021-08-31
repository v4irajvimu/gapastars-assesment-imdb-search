import React from "react";
import "../styles/grid.scss";

interface ImdbSearchProps {}

const ImdbSearch = (props: ImdbSearchProps) => {
  return (
    <div className="grid-container">
      <div className="grid">
        <div className="grid-item grid-item-xs-1">xs-1</div>
        <div className="grid-item grid-item-xs-2">xs-2</div>
        <div className="grid-item grid-item-xs-3">xs-3</div>
        <div className="grid-item grid-item-xs-6">xs-6</div>
      </div>

      <div className="grid">
        <div className="grid-item grid-item-md-4">md-4</div>
        <div className="grid-item grid-item-md-4">md-4</div>
        <div className="grid-item grid-item-md-4">md-4</div>
      </div>

      <div className="grid">
        <div className="grid-item grid-item-sm-1">sm-1</div>
        <div className="grid-item grid-item-sm-1">sm-1</div>
        <div className="grid-item grid-item-sm-1">sm-1</div>
        <div className="grid-item grid-item-sm-1">sm-1</div>
        <div className="grid-item grid-item-sm-1">sm-1</div>
        <div className="grid-item grid-item-sm-1">sm-1</div>
        <div className="grid-item grid-item-sm-1">sm-1</div>
        <div className="grid-item grid-item-sm-1">sm-1</div>
        <div className="grid-item grid-item-sm-1">sm-1</div>
        <div className="grid-item grid-item-sm-1">sm-1</div>
        <div className="grid-item grid-item-sm-1">sm-1</div>
        <div className="grid-item grid-item-sm-1">sm-1</div>
      </div>
    </div>
  );
};

export default ImdbSearch;
