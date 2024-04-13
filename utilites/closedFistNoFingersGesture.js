import { Finger, FingerCurl, GestureDescription } from "fingerpose";

// Define the "Closed Fist" Gesture (no fingers showing)
export const closedFistNoFingersGesture = new GestureDescription(
  "closed_fist_no_fingers"
);

// Loop through all fingers and fully curl them
for (let finger of [
  Finger.Thumb,
  Finger.Index,
  Finger.Middle,
  Finger.Ring,
  Finger.Pinky,
]) {
  closedFistNoFingersGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
}
