import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from "fingerpose";

// Define the "Moutza" Gesture
export const moutzaGesture = new GestureDescription("moutza");

// Loop through all fingers and set them to be extended
for (let finger of [
  Finger.Thumb,
  Finger.Index,
  Finger.Middle,
  Finger.Ring,
  Finger.Pinky,
]) {
  moutzaGesture.addCurl(finger, FingerCurl.NoCurl, 1.0);
}

// Optionally, you can add direction to the fingers if you want to make the gesture more specific,
// For example, ensuring the fingers are pointing upwards (which is common for Moutza):
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  moutzaGesture.addDirection(finger, FingerDirection.VerticalUp, 1.0);
}

// The thumb direction is more flexible in a Moutza, it can point outwards:
moutzaGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1.0);
moutzaGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 1.0);
