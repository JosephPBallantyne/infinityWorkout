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
import { ExerciseCard } from '../../components';

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

const FilterContainer = styled.div`
  border: solid;
  border-radius: ${(props) => props.theme.border.radius.b};
  border-width: 0.1px;
  border-color: ${(props) => props.theme.color.twitter.grey};
  margin: ${(props) => props.theme.spacing.f};
  padding: ${(props) => props.theme.spacing.e};
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SidebarsContainer = styled.div`
  width: 300px;
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

const GlobalFilter = ({
  // preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}: any) => {
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

function MultiSelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}: any) {
  const options = React.useMemo(() => {
    const optionsSet: any = new Set();
    preFilteredRows.forEach((row: any) => {
      if (row.values[id]) {
        const splitOptions = row.values[id].split(', ');
        splitOptions.forEach((option: any) => optionsSet.add(option));
      }
    });
    return [...optionsSet.values()];
  }, [id, preFilteredRows]);
  return (
    <select
      className="custom-select"
      multiple
      value={filterValue}
      size={options.length + 1}
      onChange={(e) => {
        const allValues = Array.from(e.target.selectedOptions)
          .map((o) => o.value)
          .filter(Boolean);
        setFilter(allValues && allValues.length ? allValues : undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

const ExerciseTable: React.FC<any> = ({ data, workouts }): any => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Exercise',
        accessor: 'name',
        disableFilters: true,
      },
      {
        id: 'muscleGroup',
        Header: 'Muscle Group',
        accessor: (row: any) => {
          if (row.muscleGroup) {
            return row.muscleGroup
              .map((group: { id: number; name: string }) => group.name)
              .join(', ');
          }
          return null;
        },
        Filter: MultiSelectColumnFilter,
        filter: 'includesSome',
        disableSortBy: true,
      },
      {
        Header: 'Equipment Type',
        accessor: 'equipment.name',
        Filter: MultiSelectColumnFilter,
        filter: 'includesSome',
        disableSortBy: true,
      },
      {
        Header: 'Training Type',
        accessor: 'trainingType.name',
        Filter: MultiSelectColumnFilter,
        filter: 'includesSome',
        disableSortBy: true,
      },
    ],
    []
  );

  const {
    getTableProps,
    headerGroups,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
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
          <SidebarsContainer />
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
                return (
                  <ExerciseCard
                    exercise={row.original.name}
                    exerciseId={row.original.id}
                    muscleGroup={row.values.muscleGroup}
                    trainingType={row.original.trainingType.name}
                    equipment={row.original.equipment.name}
                    username={row.original.user.username}
                    createdAt={row.original.createdAt}
                    commentsTotal={123}
                    likesTotal={12}
                    isLiked
                    isBookmarked
                    workouts={workouts}
                  />
                );
              })}
            </CardContainer>
          </MidContainer>

          <SidebarsContainer>
            <>
              <div id="filter">
                <FilterContainer className="d-flex flex-row">
                  {headerGroups.map((headerGroup: any) => (
                    <div
                      className="d-flex flex-column"
                      style={{ width: '100%' }}
                    >
                      {headerGroup.headers.map(
                        (column: any) =>
                          column.canFilter && (
                            <div className="py-2">
                              <div>{column.render('Header')}</div>
                              <div>
                                {column.canFilter
                                  ? column.render('Filter')
                                  : null}
                              </div>
                            </div>
                          )
                      )}
                    </div>
                  ))}
                </FilterContainer>
              </div>
            </>
          </SidebarsContainer>
        </div>
      </table>

      <div className="pagination d-flex justify-content-center">
        <button
          type="button"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {'<<'}
        </button>{' '}
        <button
          type="button"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {'<'}
        </button>{' '}
        <button
          type="button"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {'>'}
        </button>{' '}
        <button
          type="button"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const newPage = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(newPage);
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[20, 50, 100].map((pageSizes) => (
            <option key={pageSizes} value={pageSizes}>
              Show {pageSizes}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default ExerciseTable;
