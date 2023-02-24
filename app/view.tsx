import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import "./globals.css";
import { useCallback, useEffect, useState } from "react";
import { LoginComponent } from "./login";
import s from "./styles.module.css";
import { LIMIT, VIEW_LINK } from "./const";
import { FETCH } from "./helper";
import Pagination from "./pagination/pagination";

const options = [
  { value: 10, label: "10" },
  { value: 15, label: "15" },
  { value: 20, label: "20" },
  { value: 25, label: "25" },
  { value: 30, label: "30" },
  { value: 35, label: "35" },
  { value: 40, label: "40" },
  { value: 45, label: "45" },
  { value: 50, label: "50" },
];

const inter = Inter({ subsets: ["latin"] });

export interface Item {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export const ViewComponent = () => {
  const [isLogined, setIsLogined] = useState<boolean>(false);
  const [pageSize, setPagesize] = useState<number>(LIMIT);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);

  const [items, setItems] = useState<any>([]);

  const getData = useCallback(async () => {
    try {
      const res = await FETCH({
        url: `/api/view?limit=${pageSize}&offset=${currentPage - 1}`,
      });
      setItems(res.data);
      setTotalItems(res.total);
    } catch (err: any) {
      console.log(err);
    }
  }, [pageSize, currentPage]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsLogined(window.localStorage.getItem("authorization") === "true");
  }, []);

  useEffect(() => {
    getData();
  }, [getData, pageSize, currentPage]);

  const generateContent = () => {
    if (!isLogined) {
      return (
        <>
          <p className={[s.note, inter.className].join(" ")}>
            Please login first
          </p>
          <LoginComponent redirectLink={VIEW_LINK} />
        </>
      );
    }

    if (items.length === 0) {
      return (
        <p className={[s.note, inter.className].join(" ")}>There is no item</p>
      );
    }
    return (
      <div className={[s.listView, inter.className].join(" ")}>
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item: any, idx: number) => {
              return (
                <tr key={item.id}>
                  <td>{idx + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className={s.paginationCotrol}>
          <Pagination
            currentPage={currentPage}
            totalCount={totalItems}
            pageSize={pageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
          <div className={s.selectGroup}>
            <p className={s.pageSize}>Size: </p>
            <select onChange={(e) => setPagesize(Number(e.target.value))}>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  };
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <h1 className={[styles.h1, inter.className].join(" ")}>
          Welcome to view page
        </h1>
        {generateContent()}
      </div>
    </main>
  );
};
