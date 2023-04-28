import { DateTime, Interval } from "luxon";
import { createContext, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";
import HeaderRow from "./HeaderRow/HeaderRow";
import Row from "./Row/Row";
import RowContainer from "./RowContainer/RowContainer";

export type Items = Record<string, Array<DateTime>>;

type ItemsContextType = { items: Items; setItems: (items: Items) => void };
const initialContext = {
  items: {},
  setItems: () => {
    throw new Error("setItems() not implemented");
  },
};
export const ItemsContext = createContext<ItemsContextType>(initialContext);

type Item = {
  id: string;
  date: DateTime;
};

type RowData = {
  id: string;
  items: Array<Item>;
};

type AppData = Array<RowData>;

const initialItems: Items = {
  foo: [DateTime.now().plus({ day: 2 }).startOf("day")],
  bar: [],
  baz: [],
};

function App() {
  const [startDate, setStartDate] = useState(DateTime.now().startOf("day"));
  const [endDate, setEndDate] = useState(
    DateTime.now().plus({ day: 14 }).startOf("day")
  );
  const interval = Interval.fromDateTimes(startDate, endDate);
  const [items, setItems] = useState<Items>(initialItems);

  return (
    <ItemsContext.Provider value={{ items, setItems }}>
      <DndProvider backend={HTML5Backend}>
        <HeaderRow interval={interval} />
        <RowContainer>
          {Object.entries(items).map(([rowId, rowItems]) => (
            <Row key={rowId} interval={interval} id={rowId} />
          ))}
        </RowContainer>
      </DndProvider>
    </ItemsContext.Provider>
  );
}

export default App;
