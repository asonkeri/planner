import { Item } from "../types";

export type Lane = Item[];

const isItemOverlapping = (item: Item, otherItem: Item) => {
  return (
    otherItem.id !== item.id && // Don't compare with itself
    item.startDate <= otherItem.endDate &&
    otherItem.startDate <= item.endDate
  );
};

// Returns the index of the first lane that doesn't have any overlapping items
const getFreeLane = (item: Item, lanes: Lane[]) => {
  return lanes.findIndex((lane) =>
    lane.every((laneItem) => !isItemOverlapping(item, laneItem))
  );
};

export const getLanes = (items: Item[]) => {
  const lanes: Lane[] = [[]];

  items.forEach((item) => {
    const indexOfFreeLane = getFreeLane(item, lanes);
    if (indexOfFreeLane !== -1) {
      lanes[indexOfFreeLane].push(item);
    } else {
      lanes.push([item]);
    }
  });
  return lanes;
};
