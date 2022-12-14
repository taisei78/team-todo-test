import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Select } from "@chakra-ui/react";

import { todoListState } from "../constants/atom";

type Props = {
  arrIndex: number;
  defaultValue: string;
};

// arrIndexにはtodoListをmapした時のindex、defaultValueには該当のpriorityを渡してください
const PrioritySelect = ({ arrIndex, defaultValue }: Props) => {
  const [selectValue, setSelectValue] = useState(defaultValue);
  const [todoList, setTodoList] = useRecoilState<any>(todoListState);

  useEffect(() => {
    const todos = todoList.map((todo: any, index: number) =>
      arrIndex === index
        ? {
            id: todo.id,
            title: todo.title,
            detail: todo.detail,
            status: todo.status,
            priority: selectValue,
            createAt: todo.createAt,
            category: todo.category,
          }
        : todo
    );
    setTodoList(todos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectValue]);

  return (
    <Select
      h={`40px`}
      w={`112px`}
      mx={`auto`}
      borderColor={`red.500`}
      borderRadius={`10px`}
      defaultValue={defaultValue}
      onChange={(e) => {
        setSelectValue(e.target.value);
      }}
    >
      <option value="high">High</option>
      <option value="middle">Middle</option>
      <option value="low">Low</option>
    </Select>
  );
};

export default PrioritySelect;
