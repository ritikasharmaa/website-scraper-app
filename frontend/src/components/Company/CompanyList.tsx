import React, { useState, useEffect, useMemo } from 'react';
import { useTable, usePagination, Column, TableInstance, UsePaginationInstanceProps, UsePaginationState } from 'react-table';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import { CSVLink } from 'react-csv';
import { Link } from 'react-router-dom';
import { Company } from '../../types';
import { useFetchCompanies } from './hooks/useFetchCompanies';

type TableInstanceWithPagination<T extends object> = TableInstance<T> & UsePaginationInstanceProps<T> & {
  state: UsePaginationState<T>;
};

const CompanyTable: React.FC = () => {
  const { companies, setCompanies, loading, error } = useFetchCompanies();

  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [selectAll, setSelectAll] = useState(false);


 // Toggle selection for a single row
 const toggleRowSelection = (id: number) => {
  setSelectedRows((prev) => {
    const newSelectedRows = new Set(prev);
    if (newSelectedRows.has(id)) {
      newSelectedRows.delete(id);
    } else {
      newSelectedRows.add(id);
    }
    return newSelectedRows;
  });
};

// Toggle "Select All" functionality
const toggleSelectAll = () => {
  if (selectAll) {
    setSelectedRows(new Set()); 
  } else {
    setSelectedRows(new Set(companies.map((company) => company._id))); 
  }
  setSelectAll(!selectAll);
}
  const deleteSelectedRows = () => {
    setCompanies((prev) => prev.filter((company) => !selectedRows.has(company._id)));
    setSelectedRows(new Set()); 
    setSelectAll(false);
  };

  const data = React.useMemo(() => companies, [companies]);
  
  const columns: Column<Company>[] = useMemo(
    () => [
  
       
        {
          id: 'selection',
          Header: () => (
            <input
              type="checkbox"
              checked={selectAll}
              onChange={toggleSelectAll}
            />
          ),
           
            Cell: ({ row }: any) => (
              <input
                type="checkbox"
                checked={selectedRows.has(row.original._id)}
                onChange={() => toggleRowSelection(row.original._id)}
              />
            ),
          },
      {
        Header: 'COMPANY',
        accessor: 'company',
        Cell: ({ row }: { row: { original: Company } }) => (
          <div className="flex items-center space-x-2">
            <img src={row.original.logo} alt={row.original.company} className="w-6 h-6" />
            <span>{row.original.company}</span>
            <Link to={`/company/${row.original._id}`} className="text-purple-600">{row.original.name}</Link>
          </div>
        ),
      },
      {
        Header: 'SOCIAL PROFILES',
        accessor: 'socialProfiles',
        Cell: ({ row }: { row: { original: Company } }) => (
          <div className="flex space-x-2">
            
              <a  href={row.original.socialProfiles.link} className="text-gray-500 hover:text-blue-500" target="_blank" rel="noopener noreferrer">
                <i className={`fa fa-${row.original.socialProfiles.platform}`}></i>
              </a>
           
          </div>
        ),
      },
      {
        Header: 'DESCRIPTION',
        accessor: 'description',
      },
      {
        Header: 'ADDRESS',
        accessor: 'address',
      },
      {
        Header: 'PHONE NO.',
        accessor: 'phone',
      },
      {
        Header: 'EMAIL',
        accessor: 'email',
        Cell: ({ row }: { row: { original: Company } }) => (
          <a href={`mailto:${row.original.email}`} className="text-blue-500">
            {row.original.email}
          </a>
        ),
      },
    ],
    [selectedRows, selectAll]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    setPageSize,
  } = useTable<Company>(
    {
      columns,
      data,
    },
    usePagination
  ) as TableInstanceWithPagination<Company>;



  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const { pageIndex, pageSize } = state;
  const csvData = companies.map(({ _id, company }) => ({ _id, company }))

  return (
    <div>
         <div className="flex mb-4">
         
        <button onClick={deleteSelectedRows} className="bg-gray-100 text-zinc-600 p-2 mr-2">
          Delete
        </button>
        <CSVLink data={csvData} filename="companies.csv">
          <button className="bg-gray-100 text-zinc-600 p-2">
            Export as CSV
          </button>
        </CSVLink>
      </div>
      <table {...getTableProps()} className="min-w-full table-auto mt-4">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-100">
              {headerGroup.headers.map((column) => (
                <th  {...column.getHeaderProps()} className="p-2 border border-gray-200 text-zinc-600 text-left">
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="border-b border-gray-200">
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="p-2 border border-gray-200">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="px-4 py-2 border rounded-md"
          >
            Previous
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="px-4 py-2 border rounded-md ml-2"
          >
            Next
          </button>
        </div>

        <span>
          Page {pageIndex + 1} of {pageOptions.length}
        </span>

        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="border p-1 rounded-md"
        >
          {[10, 20, 30, 40, 50].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const CompanyList: React.FC = () => {
  return (
    <div className="min-h-screen bg-white p-4">
      <CompanyTable />
    </div>
  );
};

export default CompanyList;
