"use client";

import { useEffect, useState } from "react";
import { Activity, Park, SavedPark } from "./types";
import ParkCard from "./ParkCard";
import { addToSavedParks, removeFromSavedParks } from "./utils";

const API_TOKEN = process.env.NEXT_PUBLIC_NPS_API_TOKEN;
const ACTIVITIES_URL = `https://developer.nps.gov/api/v1/activities?api_key=${API_TOKEN}`;

export default function App() {
  const [activities, setActivities] = useState<Activity[] | undefined>(
    undefined
  );
  const [selectedActivityId, setSelectedActivityId] = useState<
    string | undefined
  >(undefined);
  const [parksResults, setParkResults] = useState<Park[] | undefined>(
    undefined
  );
  const [savedParks, setSavedParks] = useState<SavedPark[]>([]);

  useEffect(() => {
    fetch(ACTIVITIES_URL)
      .then((response) => response.json())
      .then((data) => {
        if (data == null || data.data == null) {
          throw new Error("NPS API returned undefined activities data");
        }
        setActivities(data.data);
        setSelectedActivityId(data.data[0].id);
      })
      .catch((e) => {
        console.error(e.message);
      });
  }, []);

  useEffect(() => {
    if (selectedActivityId != null) {
      setParkResults(undefined);
      const parksUrl = `https://developer.nps.gov/api/v1/activities/parks?id=${selectedActivityId}&api_key=${API_TOKEN}`;
      fetch(parksUrl)
        .then((response) => response.json())
        .then((data) => {
          const parksData = data?.data[0]?.parks;
          if (parksData == null) {
            throw new Error("NPS API returned undefined parks data");
          }
          const filteredParksData = parksData.filter(
            (p: Park) => p.designation === "National Park"
          );
          setParkResults(filteredParksData);
        })
        .catch((e) => {
          console.error(e.message);
        });
    }
  }, [selectedActivityId]);

  return (
    <div className="grid grid-cols-2 gap-8">
      <div>
        <h2 className="text-lg mb-3 font-semibold">Search for parks</h2>
        {activities == null && selectedActivityId == null ? (
          "Loading activity options..."
        ) : (
          <>
            <label htmlFor="select-activity">Choose an activity: </label>
            <select
              name="activities"
              id="select-activity"
              value={selectedActivityId}
              onChange={(e) => setSelectedActivityId(e.target.value)}
            >
              {activities != null &&
                activities.map((activity) => (
                  <option key={activity.id} value={activity.id}>
                    {activity.name}
                  </option>
                ))}
            </select>
            <div className="mt-4">
              {parksResults == null ||
              selectedActivityId == null ||
              activities == null
                ? "Loading parks..."
                : parksResults.map((park) => (
                    <ParkCard
                      key={park.parkCode}
                      park={park}
                      isBucketList={false}
                      onClickAdd={() => {
                        setSavedParks((prevValue) =>
                          addToSavedParks(
                            prevValue,
                            park,
                            activities,
                            selectedActivityId
                          )
                        );
                      }}
                    />
                  ))}
            </div>
          </>
        )}
      </div>
      <div>
        <h2 className="text-lg mb-3 font-semibold">Bucket list</h2>
        {savedParks.map((park) => (
          <ParkCard
            key={park.parkCode}
            park={park}
            isBucketList={true}
            onClickRemove={() => {
              setSavedParks((prevValue) =>
                removeFromSavedParks(prevValue, park)
              );
            }}
          />
        ))}
      </div>
    </div>
  );
}
