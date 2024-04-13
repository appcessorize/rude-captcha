import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from "fingerpose";

// Define the "Thumbs Down" Gesture
export const thumbsDownGesture = new GestureDescription("thumbs_down");

// Thumb
// The thumb should be extended and not curled, with reduced confidence to allow for some flexibility
thumbsDownGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.75);
// The direction of the thumb is primarily downwards for a thumbs down gesture
thumbsDownGesture.addDirection(
  Finger.Thumb,
  FingerDirection.VerticalDown,
  0.75
);
// Additional directions can be added to allow for natural variation in how the gesture might be performed
thumbsDownGesture.addDirection(
  Finger.Thumb,
  FingerDirection.DiagonalDownLeft,
  0.75
);
thumbsDownGesture.addDirection(
  Finger.Thumb,
  FingerDirection.DiagonalDownRight,
  0.75
);

// Other Fingers (Index, Middle, Ring, and Pinky)
// The other fingers should be curled for a thumbs-down gesture, similar to thumbs up
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  thumbsDownGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
}
