import React from "react";
import { BiEdit, BiSave } from "react-icons/bi";
import { FaArchive, FaEdit, FaHistory, FaTrash } from "react-icons/fa";
import TableLoading from "../../../../partials/spinners/TableLoading";
import ServerError from "../../../../partials/ServerError";
import FetchingSpinner from "../../../../partials/spinners/FetchingSpinner";
import useQueryData from "../../../../helper/useQueryData";
import NoData from "../../../../partials/NoData";

const SettingsCategoryList = ({ setItemEdit, setIsModal }) => {
  let count = 1;
  const [isLoaded, setIsLoaded] = React.useState(false);

  const {
    isLoading,
    isFetching,
    error,
    data: category,
  } = useQueryData(
    `/rest/v1/controllers/developer/settings/category/category.php`,
    "get",
    "category",
    {},
    null,
    true
  );

  const handleEdit = (item) => {
    setItemEdit(item);
    setIsModal(true);
  };

  return (
    <>
      <div className="relative rounded-md overflow-auto z-0">
        {isFetching && !isLoading && <FetchingSpinner />}
        <div className="overflow-auto">
          <table>
            <thead>
              <tr>
                <th className="w-[3rem]">#</th>
                <th className="w-[]">Status</th>
                <th className="w-[]">Name</th>
                <th className="w-[]">Description</th>
                <th colSpan="100%"></th>
              </tr>
            </thead>

            <tbody>
              {isLoading && (
                <>
                  <tr className="text-center">
                    <td colSpan="100%">
                      <TableLoading cols={2} count={20} />
                    </td>
                  </tr>
                </>
              )}

              {error && (
                <>
                  <tr className="text-center">
                    <td colSpan="100%">
                      <ServerError />
                    </td>
                  </tr>
                </>
              )}
              {/* IF DATA HAS NO COUNT*/}
              {category?.count == 0 && (
                <>
                  <tr className="text-center">
                    <td colSpan="100%">
                      <NoData />
                    </td>
                  </tr>
                </>
              )}
              {/* IF DATA HAS COUNT */}
              {category?.count > 0 &&
                category.data.map((item, key) => {
                  return (
                    <tr key={key} className="group relative">
                      <td>{count++}.</td>
                      <td>
                        {item.category_is_active == 1 ? (
                          <span className="text-green-600">Active</span>
                        ) : (
                          <span className="text-gray-300">Inactive</span>
                        )}
                      </td>
                      <td>{item.category_name}</td>
                      <td className="max-w-[6rem] truncate">
                        {item.category_description}
                      </td>
                      <td colSpan="100%">
                        <div className="flex gap-x-3 items-center justify-end pr-1">
                          {item.category_is_active == 1 ? (
                            <>
                              <button
                                type="button"
                                className=" tooltip-action-table"
                                data-tooltip="Edit"
                                onClick={() => handleEdit(item)}
                              >
                                <FaEdit />
                              </button>
                              <button
                                type="button"
                                className=" tooltip-action-table"
                                data-tooltip="Archive"
                              >
                                <FaArchive />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                type="button"
                                className=" tooltip-action-table"
                                data-tooltip="Restore"
                              >
                                <FaHistory />
                              </button>
                              <button
                                type="button"
                                className=" tooltip-action-table"
                                data-tooltip="Delete"
                              >
                                <FaTrash />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default SettingsCategoryList;
