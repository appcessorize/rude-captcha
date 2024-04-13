import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from "fingerpose";

// Define the "Middle Finger Up" Gesture
export const middleFingerUpGesture = new GestureDescription("middle_finger_up");

// Thumb
middleFingerUpGesture.addCurl(Finger.Thumb, FingerCurl.FullCurl, 0.75); // Reduced confidence

// Index Finger
middleFingerUpGesture.addCurl(Finger.Index, FingerCurl.FullCurl, 0.75); // Reduced confidence

// Middle Finger
middleFingerUpGesture.addCurl(Finger.Middle, FingerCurl.NoCurl, 0.75); // Reduced confidence
middleFingerUpGesture.addDirection(
  Finger.Middle,
  FingerDirection.VerticalUp,
  0.75
); // Reduced confidence

// Ring Finger
middleFingerUpGesture.addCurl(Finger.Ring, FingerCurl.FullCurl, 0.75); // Reduced confidence

// Pinky
middleFingerUpGesture.addCurl(Finger.Pinky, FingerCurl.FullCurl, 0.75); // Reduced confidence
