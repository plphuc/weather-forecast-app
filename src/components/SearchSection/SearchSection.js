import { useEffect, useState } from 'react';
import { BiCurrentLocation } from 'react-icons/bi';

import { useUpdateWeather } from 'WeatherInfoProvider';
import SearchPlaceModal from 'components/SearchPlaceModal/SearchPlaceModal';

import styles from './SearchSection.module.css';

function SearchSection(props) {
  const [isSearchPlaceModalActive, setIsSearchPlaceModalActive] = useState(false);
  const [isLocateAvailable, setIsLocateAvailable] = useState(true);
  const dispatch = useUpdateWeather();
  const isLocateAvailableClass = isLocateAvailable ? styles.currentLocationIcon : styles.disabledLocation;

  function showPosition(position) {
    dispatch(position.coords.longitude, position.coords.latitude);
  }

  function showError() {
    setIsLocateAvailable(false);
  }

  const loadCurrentLocation = function () {
    navigator.geolocation ? navigator.geolocation.getCurrentPosition(showPosition, showError) : setIsLocateAvailable(false);
  };

  // Get default location information
  useEffect(() => loadCurrentLocation(), []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchContainer}>
        <button
          className={styles.searchPlaceBtn}
          onClick={() => {
            setIsSearchPlaceModalActive(true);
          }}
        >
          <span>Search For Places</span>
        </button>

        <button className={styles.currentLocationBtn} onClick={loadCurrentLocation}>
          <span className={isLocateAvailableClass}>
            <BiCurrentLocation size={27} />
          </span>
        </button>
      </div>

      {isSearchPlaceModalActive && (
        <div className={styles.searchModalContainer}>
          <SearchPlaceModal
            onCloseModal={() => {
              setIsSearchPlaceModalActive(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default SearchSection;
