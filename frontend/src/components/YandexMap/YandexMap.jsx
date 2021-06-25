import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { YMaps, Map, Placemark, Clusterer, TypeSelector, SearchControl, ZoomControl } from 'react-yandex-maps';
import { iventInitFromBack, iventCreateOnBack } from '../../redux/actions/iventActions';
import styles from './yandexMap.module.css';
import Button from '@material-ui/core/Button';

function YandexMap() {

  const key = '20c11914-368f-4020-b7de-e59f81f0ea0b';

  const dispatch = useDispatch();
  const allIvents = useSelector(state => state.ivents);

  useEffect(() => {
    dispatch(iventInitFromBack());
  }, []);

  const [curentCoords, setCurentCoords] = useState([]);

  const createIventHandler = (newCoords) => {
    dispatch(iventCreateOnBack(newCoords));
  }


  return (

    <YMaps query={{ lang: 'ru_RU', ns: "use-load-option", apikey: key }}>
      <div>
        <Map onClick={(event) => setCurentCoords(event.get('coords'))} defaultState={{
          center: [55.751574, 37.573856],
          zoom: 9,
          controls: ['zoomControl', 'fullscreenControl'],
        }}
          modules={['control.ZoomControl', 'control.FullscreenControl', 'geocode',]}
          className={styles.map} >
          <TypeSelector options={{ float: 'right' }} />
          <SearchControl options={{ float: 'left' }} />
          <ZoomControl options={{ float: 'right' }} />
          {/* <Clusterer options={{ groupByCoordinates: false }}> */}
          {curentCoords.length ? <Placemark
            geometry={curentCoords}
          /> : null}

          {allIvents.length ? allIvents.map((elem) => (
            < Placemark
              key={elem._id}
              geometry={elem.coords}
              modules={['geoObject.addon.balloon']}
              properties={{
                balloonContentHeader: `<h5>Летаем здесь</h5>`,
                balloonContentBody: `<p>${elem.coords}</p>`,
                balloonContentFooter: '<p>Будет круто!</p>'
              }}
            />
          )) : null}
          {/* </Clusterer> */}
        </Map>
        {/* <button onClick={() => createIventHandler(curentCoords)}>Создать событие</button> */}
        <Button onClick={() => createIventHandler(curentCoords)} variant="contained" color="primary">
          Создать событие</Button>
        {/* <form >
          <input type="text" />
          <button>Создать событие</button>
        </form> */}
      </div>

    </YMaps >
  )
}

export default YandexMap;
