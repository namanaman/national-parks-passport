export interface Park {
  states: string;
  parkCode: string;
  designation: string;
  fullName: string;
  url: string;
  name: string;
}

export interface SavedPark extends Park {
  activities: string[];
}

export interface Activity {
  id: string;
  name: string;
}
