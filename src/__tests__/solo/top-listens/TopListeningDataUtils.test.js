import "@testing-library/jest-dom";
import axios from "axios";
import {
  retrieveTopListeningDataAxios,
  getTopListeningDataSpotifyApiURL,
  offsetQueryParam,
  limitQueryParam,
  timeRangeQueryParam,
} from "../../../js/utils/TopListeningDataUtils";

jest.mock("axios");

const goldifySoloFixtures = require("../../../__fixtures__/GoldifySoloFixtures");
const topListeningDataFixtures = require("../../../__fixtures__/TopListeningDataFixtures");

test("Check for to make sure retrieveTopListeningDataAxios throws error on bad data", async () => {
  axios.get.mockResolvedValue(null);
  console.log = jest.fn();
  await retrieveTopListeningDataAxios(goldifySoloFixtures.getTokensTestData());
  expect(console.log).toHaveBeenCalledWith(
    TypeError("Cannot read property 'data' of null")
  );

  axios.get.mockResolvedValue(undefined);
  console.log = jest.fn();
  await retrieveTopListeningDataAxios(goldifySoloFixtures.getTokensTestData());
  expect(console.log).toHaveBeenCalledWith(
    TypeError("Cannot read property 'data' of undefined")
  );
});

test("Check for to make sure retrieveTopListeningDataAxios returns correct mock data", async () => {
  axios.get.mockResolvedValue({
    data: topListeningDataFixtures.getTopListeningData(),
  });

  const responseData = await retrieveTopListeningDataAxios(
    goldifySoloFixtures.getTokensTestData()
  );
  expect(responseData).toEqual(topListeningDataFixtures.getTopListeningData());
});

test("Confirm getTopListeningDataSpotifyApiURL returns the correct Spotify API URL including params", () => {
  expect(getTopListeningDataSpotifyApiURL()).toEqual(
    "https://api.spotify.com/v1/me/top/tracks" +
      "?time_range=" +
      timeRangeQueryParam +
      "&limit=" +
      limitQueryParam +
      "&offset=" +
      offsetQueryParam
  );
});
