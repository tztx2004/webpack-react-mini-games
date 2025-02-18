import React, { createContext, useEffect, useMemo, useReducer } from 'react';
import Table from './Table';
import Form from './Form';
import Title from '../../common/Components/Title/Title';
import Wrapper from '../../common/Components/Wrapper/Wrapper';
import styled from '@emotion/styled';
import plantMines from './utils/plantMines';

// actions
export const START_GAME = 'START_GAME';
export const FIRST_OPEN = 'FIRST_OPEN';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

// cell state
export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0,
};

export const TableContext = createContext({
  tableData: [],
  halted: true,
  dispatch: () => {},
});

const initialState = {
  tableData: [],
  isMine: false,
  data: {
    row: 0,
    cell: 0,
    mine: 0,
  },
  timer: 0,
  result: '',
  halted: true,
  openedCount: 0,
};

const makeBoard = (row, cell, mine) => {
  // 2차원 배열 만들기
  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }

  return data;
};

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        data: {
          row: action.row,
          cell: action.cell,
          mine: action.mine,
        },
        openedCount: 0,
        isMine: false,
        tableData: makeBoard(action.row, action.cell, action.mine),
        halted: false, // 재시작 시 클릭 풀어줌,
        timer: 0,
      };

    case FIRST_OPEN: // 최초 게임을 생성이후 첫클릭 시 지뢰 심기
      if (!state.isMine) {
        plantMines(state.data.row, state.data.cell, state.data.mine, [
          ...state.tableData,
        ]);
      }
      return {
        ...state,
        isMine: true,
      };

    case OPEN_CELL: {
      const tableData = [...state.tableData];

      const checked = [];
      let openedCount = 0;

      const checkAround = (row, cell) => {
        // 없는 칸 예외처리
        if (
          row < 0 ||
          row >= tableData.length ||
          cell < 0 ||
          cell >= tableData[0].length
        ) {
          return;
        }

        // 순수하게 닫힌칸을 외에 칸 제외
        if (
          [
            // CODE.OPENED,
            CODE.FLAG,
            CODE.FLAG_MINE,
            CODE.QUESTION_MINE,
            CODE.QUESTION,
          ].includes(tableData[row][cell])
        ) {
          return;
        }

        if (checked.includes(row + '/' + cell)) {
          return;
        } else {
          checked.push(row + '/' + cell);
        }
        let around = [tableData[row][cell - 1], tableData[row][cell + 1]];

        if (tableData[row - 1]) {
          around = around.concat([
            tableData[row - 1][cell - 1],
            tableData[row - 1][cell],
            tableData[row - 1][cell + 1],
          ]);
        }
        if (tableData[row + 1]) {
          around = around.concat([
            tableData[row + 1][cell - 1],
            tableData[row + 1][cell],
            tableData[row + 1][cell + 1],
          ]);
        }

        const count = around.filter(function (v) {
          return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
        }).length;

        if (count === 0) {
          // 주변칸 오픈
          const near = [];
          if (row - 1 > -1) {
            near.push([row - 1, cell - 1]);
            near.push([row - 1, cell]);
            near.push([row - 1, cell + 1]);
          }
          near.push([row, cell - 1]);
          near.push([row, cell + 1]);
          if (row + 1 < tableData.length) {
            near.push([row + 1, cell - 1]);
            near.push([row + 1, cell]);
            near.push([row + 1, cell + 1]);
          }
          near.forEach((n) => {
            if (tableData[n[0]][n[1]] !== CODE.OPENED) {
              checkAround(n[0], n[1]); // 재귀
            }
          });
        }
        if (tableData[row][cell] === CODE.NORMAL) {
          // 내 칸이 닫힌 칸이면 카운트 증가
          openedCount += 1;
        }
        tableData[row][cell] = count;
      };

      checkAround(action.row, action.cell);

      let halted = false;
      let result = '';

      // 승리조건
      if (
        state.data.row * state.data.cell - state.data.mine ===
        state.openedCount + openedCount
      ) {
        halted = true;
        result = `${state.timer}초만에 승리하셨습니다`;
      }

      return {
        ...state,
        tableData,
        openedCount: state.openedCount + openedCount,
        halted,
        result,
        isMine: !state.isMine ? true : state.isMine,
      };
    }

    case CLICK_MINE: {
      const tableData = [...state.tableData];
      tableData.forEach((row, i) => {
        tableData[i] = [...row];
      });

      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.CLICKED_MINE;

      return {
        ...state,
        tableData,
        halted: true,
      };
    }

    case FLAG_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.MINE) {
        tableData[action.row][action.cell] = CODE.FLAG_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.FLAG;
      }
      return {
        ...state,
        tableData,
      };
    }
    case QUESTION_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
        tableData[action.row][action.cell] = CODE.QUESTION_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.QUESTION;
      }
      return {
        ...state,
        tableData,
      };
    }
    case NORMALIZE_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
        tableData[action.row][action.cell] = CODE.MINE;
      } else {
        tableData[action.row][action.cell] = CODE.NORMAL;
      }
      return {
        ...state,
        tableData,
      };
    }
    case INCREMENT_TIMER: {
      return {
        ...state,
        timer: state.timer + 1,
      };
    }

    default:
      return state;
  }
};

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, halted, timer, result, data, isMine } = state;

  const value = useMemo(
    () => ({
      tableData,
      halted,
      dispatch,
      data,
      isMine,
    }),
    [tableData, halted]
  );

  // 타이머
  useEffect(() => {
    let timer;
    if (halted === false) {
      timer = setInterval(() => {
        dispatch({ type: INCREMENT_TIMER });
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [halted]);

  return (
    <Wrapper>
      <TableContext.Provider value={value}>
        <Title text={'지뢰찾기'} />
        <Form />

        <TimerWrap>
          <p>소요시간</p>
          <div>
            <p>{timer}</p>
            <p>초</p>
          </div>
        </TimerWrap>

        <Table />

        <div>{result}</div>
      </TableContext.Provider>
    </Wrapper>
  );
};

const TimerWrap = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  width: fit-content;
  min-width: 150px;

  padding: 8px 16px;
  border: 1px solid #949494;
  border-radius: 12px;

  > div {
    display: flex;
    gap: 8px;
    align-items: center;
    flex: 1;

    > p {
      min-width: 20px;
    }
  }
`;

export default MineSearch;
