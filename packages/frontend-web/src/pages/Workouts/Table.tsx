/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import {
  useTable,
  useGlobalFilter,
  useFilters,
  useAsyncDebounce,
  useSortBy,
  usePagination,
} from 'react-table';
import styled from 'styled-components';
import { WorkoutCard } from '../../components';

const SearchBox = styled.div`
  width: 582px;
  height: 44px;
  border-radius: 24px;
  margin: 16px 0px;
  border-color: ${(props) => props.theme.color.twitter.grey};
  border-width: 0.1px;
`;

const Search = styled.input`
  font-size: 20;
  width: 487px;
  border: 0;
  height: 44px;
  outline: none;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const MidContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-right: solid;
  border-left: solid;
  border-bottom: solid;
  border-color: ${(props) => props.theme.color.twitter.grey};
  border-width: 0.1px;
`;

const GlobalFilter = ({ globalFilter, setGlobalFilter }: any) => {
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((filterValue) => {
    setGlobalFilter(filterValue || undefined);
  }, 200);
  return (
    <SearchBox className="card p-3 d-flex align-items-center justify-content-center">
      <Search
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder="Search..."
      />
    </SearchBox>
  );
};

const Table: React.FC<any> = ({ data }): any => {
  console.log(data);
  const columns = React.useMemo(
    () => [
      {
        Header: 'Workout',
        accessor: 'name',
        disableFilters: true,
      },
    ],
    []
  );

  const {
    getTableProps,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    page,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 100 },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination
  );

  return (
    <>
      <table {...getTableProps} className="table table-hover borderless">
        <div className="d-flex flex-row justify-content-center">
          <MidContainer>
            <thead className="d-flex flex-row justify-content-center">
              <tr>
                <th
                  style={{
                    border: 0,
                  }}
                >
                  <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                  />
                </th>
              </tr>
            </thead>
            <CardContainer>
              {page.map((row: any) => {
                return <WorkoutCard name="work out time" username="joe" />;
              })}
            </CardContainer>
          </MidContainer>
        </div>
      </table>
    </>
  );
};

export default Table;
