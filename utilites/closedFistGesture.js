import { Finger, FingerCurl, GestureDescription } from "fingerpose";

// Define the "Closed Fist" Gesture
export const closedFistGesture = new GestureDescription("closed_fist");

// Thumb
// For a closed fist, the thumb is also curled
closedFistGesture.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0);

// Other Fingers (Index, Middle, Ring, and Pinky)
// All other fingers should be fully curled for a closed fist gesture
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  closedFistGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
}
