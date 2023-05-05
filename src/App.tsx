import { DateTime, Interval } from "luxon";
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";
import HeaderRow from "./components/HeaderRow/HeaderRow";
import Row from "./components/Row/Row";
import RowContainer from "./components/RowContainer/RowContainer";
import { DataContext } from "./context";
import { createItem } from "./data";
import { AppData } from "./types";

const initialData: AppData = [
  {
    id: "foo",
    items: [
      createItem("foo", DateTime.now().startOf("day"), 2),
      createItem("foo", DateTime.now().startOf("day").plus({ day: 1 }), 2),
    ],
  },
  { id: "bar", items: [] },
  { id: "baz", items: [] },
];

function App() {
  const [startDate] = useState(DateTime.now().startOf("day"));
  const [endDate] = useState(DateTime.now().plus({ day: 14 }).startOf("day"));
  const interval = Interval.fromDateTimes(startDate, endDate);
  const [data, setData] = useState<AppData>(initialData);

  return (
    <DataContext.Provider value={{ data, setData }}>
      <DndProvider backend={HTML5Backend}>
        <HeaderRow interval={interval} />
        <RowContainer>
          {data.map(({ id, items }) => (
            <Row key={id} interval={interval} id={id} items={items} />
          ))}
        </RowContainer>
      </DndProvider>
    </DataContext.Provider>
  );
}

export default App;
