import { SetStateAction } from "react";
import { Activity, Park, SavedPark } from "./types";

const API_TOKEN = process.env.NEXT_PUBLIC_NPS_API_TOKEN;

export async function fetchParks(selectedActivityId: string) {
  // TODO
}

export function removeFromSavedParks(
  savedParks: SavedPark[],
  parkToRemove: SavedPark
): SavedPark[] {
  const indexToRemove = savedParks.findIndex(
    (val) => val.parkCode === parkToRemove.parkCode
  );
  return savedParks.filter((_, i) => i !== indexToRemove);
}

export function addToSavedParks(
  savedParks: SavedPark[],
  parkToAdd: Park,
  activities: Activity[],
  selectedActivityId: string
) {
  const duplicatePark = savedParks.find(
    (savedPark) => savedPark.parkCode === parkToAdd.parkCode
  );
  const selectedActivityName =
    activities.find((a) => a.id === selectedActivityId)?.name ?? "";
  const duplicateParkAndActivity =
    duplicatePark != null &&
    duplicatePark.activities.includes(selectedActivityName);
  if (!duplicateParkAndActivity) {
    if (duplicatePark != null && selectedActivityName != null) {
      return savedParks.map((prevPark) => {
        if (prevPark.parkCode === duplicatePark.parkCode) {
          return {
            ...prevPark,
            activities: [...prevPark.activities, selectedActivityName],
          };
        } else {
          return prevPark;
        }
      });
    } else if (selectedActivityName != null) {
      return [
        ...savedParks,
        { ...parkToAdd, activities: [selectedActivityName] },
      ];
    } else {
      return savedParks;
    }
  } else {
    return savedParks;
  }
}
