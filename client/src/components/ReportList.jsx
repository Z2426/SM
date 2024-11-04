import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Reportlist = () => {
  const nevigate = useNavigate();
  const id = "67276cedbdf484bf88585a44";
  const [listreport, setListreport] = useState([
    { id: "67276cedbdf484bf88585a44", count: 1, reason: "Spam" },
    { id: "67261c2ba0c876b170186b2b", count: 2, reason: "Spam" },
    { id: "6724d5c9dca650ec9293aed4", count: 1, reason: "Spam" },
    { id: "66f81e5ddc7ab3ee5796d862", count: 1, reason: "Spam" },
    { id: "6703badf08b250a11183a7b7", count: 1, reason: "Spam" },
    { id: "67010eaa85310d03039570f4", count: 1, reason: "Spam" },
  ]);
  console.log(listreport);
  const handlereport = (idreport) => {
    console.log(idreport);

    let list = [...listreport];

    list = list.filter((report) => {
      return report.id != idreport;
    });

    setListreport(list);
  };
  return (
    <div className="px-4 py-3 overflow-x-auto">
      <table className="table-fixed w-full gap-10 border border-collapse border-[#66666645]">
        <thead className="text-ascent-1">
          <tr>
            <th className="border border-ascent-1 bg-secondary py-4">
              id Post
            </th>
            <th className="border border-ascent-1 bg-secondary py-4">
              Report count
            </th>
            <th className="border border-ascent-1 bg-secondary py-4">
              Reasson
            </th>
            <th className="border border-ascent-1 bg-secondary py-4">Action</th>
          </tr>
        </thead>
        <tbody className="text-ascent-1">
          {/* <tr>
            <th
              onClick={() => {
                nevigate(`/post/${id}`);
              }}
              className="border border-ascent-2 py-3"
            >
              {id}
            </th>
            <th className="border border-ascent-2 py-3">1</th>
            <th className="border border-ascent-2 py-3">Spam</th>
            <th className="select-none flex justify-center gap-2 border border-ascent-2 py-3">
              <div className="px-4 rounded-lg py-1 bg-blue cursor-pointer">
                Hold
              </div>
              <div className="px-4 rounded-lg py-1 bg-[#ff0015b2] cursor-pointer">
                Delete
              </div>
            </th>
          </tr> */}
          {listreport.map((report) => (
            <tr>
              <th
                onClick={() => {
                  nevigate(`/post/${report.id}`);
                }}
                className="border border-ascent-2 py-3 underline underline-offset-2 "
              >
                {report.id}
              </th>
              <th className="border border-ascent-2 py-3">{report.count}</th>
              <th className="border border-ascent-2 py-3">{report.reason}</th>
              <th className="select-none flex justify-center gap-2 border border-ascent-2 py-3">
                <div
                  onClick={() => {
                    handlereport(report.id);
                  }}
                  className="px-4 rounded-lg py-1 bg-blue cursor-pointer"
                >
                  Hold
                </div>
                <div
                  onClick={() => {
                    handlereport(report.id);
                  }}
                  className="px-4 rounded-lg py-1 bg-[#ff0015b2] cursor-pointer"
                >
                  Delete
                </div>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reportlist;
