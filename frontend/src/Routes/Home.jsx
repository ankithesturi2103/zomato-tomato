import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import LandingPage from "../LandingPage/LandingPage";
import { getCityId, getCityCollection } from "../LandingPage/Redux/action";
import RestroPage from "../RestroPage/RestroPage";
import CollectionsPage from "../CollectionsPage/CollectionsPage";
import ExploreZomato from "../ExploreZomato/ExploreZomato";
import Checkout from "../Checkout/Checkout";

function Home(props) {
  const { getCityId, searchCity, getCityCollection } = props;
  const initialData = async () => {
    let initialPayload = {
      long: 88.363895,
      lat: 22.572646,
    };
    let result = await getCityId(initialPayload);
    getCityCollection(result.cityId);
  };
  useEffect(() => {
    initialData();
  }, []);

  return (
    <div>
      <Route
        exact
        path="/"
        render={() =>
          searchCity && (
            <Redirect to={{ pathname: `/${searchCity.toLowerCase()}` }} />
          )
        }
      />
      <Route exact path="/:city">
        <LandingPage />
      </Route>
      <Route
        exact
        path="/:city/restaurants/:restaurant"
        render={() => <RestroPage />}
      />
      <Route
        path="/:city/restaurants/:restaurant/order"
        render={() => <Checkout />}
      />
      <Route
        path="/:city/collections/:collections"
        render={() => <CollectionsPage />}
      />
      <Route path="/:city/explore" render={() => <ExploreZomato />} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  searchCity: state.landingPageReducer.searchCity,
});
const mapDispatchToProps = (dispatch) => ({
  getCityId: (payload) => dispatch(getCityId(payload)),
  getCityCollection: (cityId) => dispatch(getCityCollection(cityId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
