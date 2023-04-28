import { Item } from "../types";

export type Lane = Array<Item>;
export type LaneItem = Item & { lane: number };

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
  const lanes: Lane[] = [];
  const itemsWithLanes: LaneItem[] = items.map((item) => ({
    ...item,
    lane: 0,
  }));

  itemsWithLanes.forEach((item) => {
    const indexOfFreeLane = getFreeLane(item, lanes);
    if (indexOfFreeLane !== -1) {
      lanes[indexOfFreeLane].push(item);
      item.lane = indexOfFreeLane;
    } else {
      lanes.push([item]);
      item.lane = lanes.length - 1;
    }
  });
  const laneCount = Math.max(lanes.length, 1);
  return { lanes: laneCount, itemsWithLanes };
};
