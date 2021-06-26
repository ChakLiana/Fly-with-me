import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { YMaps, Map, Placemark, Clusterer, TypeSelector, SearchControl, ZoomControl } from "react-yandex-maps";
import { iventInitFromBack, iventCreateOnBack } from "../../redux/actions/iventActions";
import { currentCoordsGet } from "../../redux/actions/currentCoordsActions";

// import styles from "./yandexMap.module.css";
import { Button } from "@material-ui/core";

function YandexMap() {
  console.log("Yandex MAP compot render");
  const key = "20c11914-368f-4020-b7de-e59f81f0ea0b";

  const dispatch = useDispatch();
  const allIvents = useSelector((state) => state.ivents);

  useEffect(() => {
    dispatch(iventInitFromBack());
  }, []);

  const curentCoords = useSelector((state) => state.curentCoords);

  const resaveCoords = (placemarkCoords) => {
    dispatch(currentCoordsGet(placemarkCoords));
  };

  const createIventHandler = (newCoords) => {
    dispatch(iventCreateOnBack(newCoords));
  };

  return (
    <YMaps query={{ lang: "ru_RU", ns: "use-load-option", apikey: key }}>
      <Map
        // className="Map"
        style={{ minWidth: 200, minHeight: 400 }}
        onClick={(event) => resaveCoords(event.get("coords"))}
        defaultState={{
          center: [55.751574, 37.573856],
          zoom: 9,
          controls: ["zoomControl", "fullscreenControl"],
        }}
        modules={[
          "control.ZoomControl",
          "control.FullscreenControl",
          "geocode",
        ]}
      //   className={styles.map}
      >
        <TypeSelector options={{ float: "right" }} />
        <SearchControl options={{ float: "left" }} />
        <ZoomControl options={{ float: "right" }} />
        {/* <Clusterer options={{ groupByCoordinates: false }}> */}
        {curentCoords.length ? <Placemark geometry={curentCoords} /> : null}

        {allIvents.length
          ? allIvents.map((elem) => (
            <Placemark
              key={elem._id}
              geometry={elem.coords}
              modules={["geoObject.addon.balloon"]}
              properties={{
                balloonContentHeader: `<h5>Летаем здесь</h5>`,
                balloonContentBody: `<p>${elem.coords}</p>`,
                balloonContentFooter: "<p>Будет круто!</p>",
              }}
            />
          ))
          : null}
        {/* </Clusterer> */}
      </Map>
      
      <form>
        <Button
          color="primary"
          onClick={() => createIventHandler(curentCoords)}
        >
          Создать событие
        </Button>
      </form>
    </YMaps>
  );
}

export default YandexMap;
