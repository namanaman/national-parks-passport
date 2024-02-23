"use client";

import { Park, SavedPark } from "./types";

interface Props {
  park: SavedPark | Park;
  isBucketList: boolean;
  onClickAdd?: () => void;
  onClickRemove?: () => void;
}

export default function ParkCard({
  park,
  isBucketList,
  onClickAdd,
  onClickRemove,
}: Props) {
  return (
    <div className="p-8 bg-slate-100 mb-4 rounded-sm" key={park.parkCode}>
      <div className="flex flex-row justify-between mb-4">
        <div className="text-sm p-3 bg-yellow-100	rounded-md w-fit">
          {park.states}
        </div>
        {!isBucketList && onClickAdd != null && (
          <button
            className="text-xl px-3 border-2 bg-white rounded-md"
            onClick={onClickAdd}
          >
            +
          </button>
        )}
        {isBucketList && onClickRemove != null && (
          <button
            className="text-xl px-3 border-2 bg-white rounded-md"
            onClick={onClickRemove}
          >
            -
          </button>
        )}
      </div>
      <div className="text-md font-semibold underline mb-2">
        <a href={park.url} target="_blank">
          {park.fullName}
        </a>
      </div>
      {isBucketList && "activities" in park && (
        <div className="text-sm">Activities: {park.activities.join(", ")}</div>
      )}
    </div>
  );
}
