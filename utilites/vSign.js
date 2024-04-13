import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from "fingerpose";

export const vSign = new GestureDescription("vSign");
// Thumb can be either curled or not, so we give it a lower score
vSign.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.5);
vSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.5);

// Index finger (No Curl)
vSign.addCurl(Finger.Index, FingerCurl.NoCurl, 0.75);
vSign.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.75);
vSign.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 0.75);
vSign.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.75);

// Middle finger (No Curl)
vSign.addCurl(Finger.Middle, FingerCurl.NoCurl, 0.75);
vSign.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.75);
vSign.addDirection(Finger.Middle, FingerDirection.DiagonalUpLeft, 0.75);
vSign.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 0.75);

// Ring finger (Full Curl)
vSign.addCurl(Finger.Ring, FingerCurl.FullCurl, 0.75);

// Pinky (Full Curl)
vSign.addCurl(Finger.Pinky, FingerCurl.FullCurl, 0.75);
