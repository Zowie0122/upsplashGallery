import React, { useState, useEffect, Suspense, lazy } from "react";
import Navbar from "./Navbar";

import Sprinnerdots from "./Spinner";

// // if Use lazy and Suspense

// const ImageCards = lazy(() => import("./ImageCards"));

// export default function Gallery() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:3000/api/getAllLists", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }).then((res) => {
//       res.json().then((res) => {
//         const listsArray = [];
//         for (const list of res.data) {
//           listsArray.push(list);
//         }
//         setData(listsArray);
//       });
//     });
//   }, []);

//   return (
//     <div>
//       <Navbar />
//       <Suspense
//         fallback={
//           <div>
//             {" "}
//             <Spinner animation="grow" variant="dark" />
//             <Spinner animation="grow" variant="dark" />
//             <Spinner animation="grow" variant="dark" />
//           </div>
//         }
//       >
//         <section className="card-layout">
//           <ImageCards {...data} />
//         </section>
//       </Suspense>
//     </div>
//   );
// }

import ImageCards from "./ImageCards";

export default function Gallery() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/getAllLists", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((res) => {
        if (res.data) setData(res.data);
      });
    });
  }, []);

  return (
    <div>
      <Navbar />
      {data.length !== 0 ? <ImageCards data={data} /> : <Sprinnerdots />}
    </div>
  );
}
