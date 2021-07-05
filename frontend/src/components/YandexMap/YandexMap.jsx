import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  YMaps,
  Map,
  Placemark,
  TypeSelector,
  SearchControl,
  ZoomControl,
} from "react-yandex-maps";

import {
  iventInitFromBack,
  //   iventAddPassengerOnBack,
} from "../../redux/actions/iventActions";
import { currentCoordsGet } from "../../redux/actions/currentCoordsActions";
import { getSelectIventFromBack } from "../../redux/actions/selectIventActions";
import IventModal from "../IventModal/IventModal";
import moment from "moment";

// import styles from "./yandexMap.module.css";

function YandexMap() {
  const key = "20c11914-368f-4020-b7de-e59f81f0ea0b";

  const dispatch = useDispatch();
  const allIvents = useSelector((state) => state.ivents);

  useEffect(() => {
    dispatch(iventInitFromBack());
  }, []);

  const curentCoords = useSelector((state) => state.curentCoords);
  const currentUser = useSelector((state) => state.user);
  const selectIvent = useSelector((state) => state.selectIvent);

  const [modalState, setmodalState] = useState(false);

  const resaveCoords = (placemarkCoords) => {
    dispatch(currentCoordsGet(placemarkCoords));
  };

  window.handleOpenModalAndSelectIvent = (lotitude, longitude) => {
    dispatch(getSelectIventFromBack(lotitude, longitude));
    setmodalState(true);
  };

  const handleCloseModal = () => {
    setmodalState(false);
  };

  return (
    <>
      {currentUser ? (
        <>
          <YMaps query={{ lang: "ru_RU", ns: "use-load-option", apikey: key }}>
            <Map
              userId={currentUser._id}
              style={{ minWidth: 400, minHeight: 500 }}
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
            >
              <TypeSelector options={{ float: "right" }} />
              <SearchControl options={{ float: "left" }} />
              <ZoomControl options={{ float: "right" }} />
              {/* <Clusterer options={{ groupByCoordinates: false }}> */}
              {curentCoords.length ? (
                <Placemark geometry={curentCoords} />
              ) : null}

              {allIvents.length && currentUser?.role === "passenger"
                ? allIvents.map((elem) => {
                    const date = elem.dateOfEvent;
                    const formatDate =
                      moment(date).format("MMMM Do YYYY, h:mm");

                    return (
                      <Placemark
                        key={elem._id}
                        preset={"islands#violetIcon"}
                        geometry={elem.coords}
                        modules={["geoObject.addon.balloon"]}
                        options={{ iconColor: "#5cb85c" }}
                        properties={{
                          balloonContentHeader: `<h5>Здесь летает ${elem.creator.nickName}</h5>`,
                          balloonContentBody: `
                <hr/><p><strong>Дата:</strong> ${formatDate}</p>
                <p><strong>Стоимость:</strong> ${elem.price} р.</p>
                <p><strong>Требования к пассажиру:</strong> ${elem.stopList}</p>
                <p><strong>Координаты старта:</strong> ${elem.coords[0]}, ${elem.coords[1]}</p>`,
                          balloonContentFooter: `<button  class ='btn btn-info' onclick="window.handleOpenModalAndSelectIvent(${elem.coords[0]}, ${elem.coords[1]})" >Подробнее</button>`,
                        }}
                      />
                    );
                  })
                : allIvents.length && currentUser?.role === "tandem"
                ? allIvents.map((elem) => {
                    const date = elem.dateOfEvent;
                    const formatDate =
                      moment(date).format("MMMM Do YYYY, h:mm");

                    return (
                      <Placemark
                        key={elem._id}
                        geometry={elem.coords}
                        modules={["geoObject.addon.balloon"]}
                        options={{ iconColor: "#5cb85c" }}
                        properties={{
                          balloonContentHeader: `<h5>Здесь летает ${elem.creator.nickName}</h5>`,
                          balloonContentBody: `
                        <hr/><p><strong>Дата:</strong> ${formatDate}</p>
                        <p><strong>Стоимость:</strong> ${elem.price} р.</p>
                        <p><strong>Требования к пассажиру:</strong> ${elem.stopList}</p>
                        <p><strong>Координаты старта:</strong> ${elem.coords[0]}, ${elem.coords[1]}</p>`,
                        }}
                      />
                    );
                  })
                : null}
              {/* </Clusterer> */}
            </Map>
          </YMaps>
          {(selectIvent.passengerPending || selectIvent.passengerAccepted) && (
            <IventModal open={modalState} handleCloseModal={handleCloseModal} />
          )}
        </>
      ) : (
        // Если user не залогинен
        <YMaps query={{ lang: "ru_RU", ns: "use-load-option", apikey: key }}>
          <Map
            style={{ minWidth: 200, minHeight: 500 }}
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
          >
            <TypeSelector options={{ float: "right" }} />
            <SearchControl options={{ float: "left" }} />
            <ZoomControl options={{ float: "right" }} />
            {/* <Clusterer options={{ groupByCoordinates: false }}> */}
            {allIvents.length
              ? allIvents.map((elem) => {
                  const date = elem.dateOfEvent;
                  const formatDate = moment(date).format("MMMM Do YYYY, h:mm");

                  return (
                    <Placemark
                      key={elem._id}
                      geometry={elem.coords}
                      modules={["geoObject.addon.balloon"]}
                      options={{ iconColor: "#5cb85c" }}
                      properties={{
                        balloonContentHeader: `<h5> Здесь летает ${elem.creator?.nickName}</h5>`,
                        balloonContentBody: `
                    <hr/><p><strong>Дата:</strong> ${formatDate}</p>
            <p><strong>Стоимость:</strong> ${elem.price} р.</p>
            <p><strong>Требования к пассажиру:</strong> ${elem.stopList}</p>
            <p><strong>Координаты старта:</strong> ${elem.coords[0]}, ${elem.coords[1]}</p>`,
                      }}
                    />
                  );
                })
              : null}
            {/* </Clusterer> */}
          </Map>
        </YMaps>
      )}
    </>
  );
}

export default YandexMap;
