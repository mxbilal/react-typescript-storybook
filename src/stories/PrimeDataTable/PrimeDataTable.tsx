import { useRef, useState } from 'react';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import '../../App.scss'
interface DataTableProps {
  data: Array<{ [key: string]: any }>,
  columns: Array<{ [key: string]: any }>
}

export const PrimeDataTable = ({
  data = [],
  columns = []
}: DataTableProps) => {
  let [globalFilter, setGlobalFilter] = useState<any>(null);
  let [showFilter, setShowFilter] = useState<boolean>(false);
  let renderHeader = () => {
    return (
      <div className="table-header">
        <span>
          <button
            className="btn btn-primary show_filter_btn"
            onClick={() => toggleFilter()}
          >
            {showFilter ? (
              "Hide Filter"
            ) : (
              "Show Filter"
            )}
          </button>
        </span>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            placeholder="Search"
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => setGlobalFilter(e.target.value)}
          />
        </span>
      </div>
    );
  },
    header = renderHeader(),
    toggleFilter = () => {
      setShowFilter(!showFilter);
      dt.current.reset();
    },
    dt = useRef<any>(null)
  return <div className="datatable-doc-demo mt-3"><div className='card'>
    <DataTable
      ref={dt}
      value={data}
      header={header}
      className="p-datatable-customers"
      tableStyle={{ minWidth: '50rem' }}
      dataKey="id"
      rowHover
      scrollable
      scrollHeight="470px"
      globalFilter={globalFilter}
      paginator
      rows={25}
      emptyMessage="No Data found"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
      paginatorTemplate="CurrentPageReport RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink "
      rowsPerPageOptions={[10, 25, 50]}
      loadingIcon="fa fa-spinner"
    >
      {
        columns.map(col =>
          <Column
            style={{ fontSize: "12px", width: "270px" }}
            key={col.field}
            field={col.field}
            header={col.header}
            sortable
            filter={showFilter}
            filterMatchMode="contains"
            filterPlaceholder="Search"
            body={col.field === 'userId' ? notification => {
              return (
                <div className="text-left" style={{ display: 'flex', alignItems: 'end' }}>
                  <img
                    src={`${notification?.profileImage ?? ''}`}
                    alt="ride"
                    style={{
                      marginRight: "15px",
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                  <p>{notification.userId}</p>
                </div>
              );
            }
              : col.field === "status"
                ? notification => <p>{notification.status === 1 ? 'sent' : 'unsent'}</p>
                : null
            }
          />
        )
      }
      {/* <Column
      className="text-center"
      style={{ fontSize: "12px", width: "100px" }}
      header="Action"
      headerClassName="text-center"
      body={actionTemplate}
    /> */}
    </DataTable>
  </div>
  </div>
}