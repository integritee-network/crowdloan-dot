import React, { useState, useEffect } from "react";
import Slider from "react-slick";

export default function Leaderboard() {
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [contributors, setContributors] = useState(new Map());
  const [contributorsUnsorted, setContributorsUnsorted] = useState(new Map());
  const contributorsProperty = new Map();
  const settings = {
    dots: false,
    infinite: true,
    vertical: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
  };

  // fetch contributors
  useEffect(() => {
    function makeApiCall(page) {
      // console.log(page);
      return fetch(
        "https://kusama.api.subscan.io/api/scan/parachain/contributes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": "f61b3cd451cee62383692c528215d12c",
            Accept: "application/json",
          },
          body: JSON.stringify({
            row: 100,
            page: page,
            from_history: true,
            para_id: 2004,
          }),
        }
      );
    }

    async function processUsers() {
      let result;
      for (let i = 0; i < 150; i++) {
        result = await makeApiCall(i).then((res) => res.json());
        if (result && result.data && result.data.contributes !== undefined) {
          var contributes = result.data.contributes;
        }
        if (contributes !== null) {
          {
            contributes.map((i) => {
              // add accounts and amount contributed
              if (!contributorsProperty.has(i.who)) {
                contributorsProperty.set(
                  i.who,
                  i.contributed * Math.pow(10, -12)
                );
              }
            });
            setContributorsUnsorted(contributorsProperty);
            setAllDataLoaded(true);
          }
        } else {
          console.log("all data filled");
          setContributorsUnsorted(contributorsProperty);
          setAllDataLoaded(true);
          break;
        }
      }
    }

    async function doTask() {
      await processUsers();
    }
    doTask();
  }, []);

  useEffect(() => {
    if (allDataLoaded) {
      // sort by value
      const mapSort = new Map(
        [...contributorsUnsorted.entries()].sort((a, b) => b[1] - a[1])
      );
      // console.log("sortedMap", mapSort);
      setContributors(mapSort);
    }
  }, [allDataLoaded]);

  return (
    <div className="why leaderboard">
      <div className="leaderboard">
        <h2>Leaderboard</h2>
        <div className="sliderdiv">
          {allDataLoaded ? (
            <div>
              <Slider {...settings}>
                {Array.from(contributors)
                  .slice(0, 50)
                  .map(([key, value]) => (
                    <div>
                      {key} <span>{value}</span>
                    </div>
                  ))}
              </Slider>
            </div>
          ) : (
            <p>loading</p>
          )}
        </div>
      </div>
    </div>
  );
}
